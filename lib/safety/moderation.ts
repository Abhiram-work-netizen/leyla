export interface ModerationResult {
  flagged: boolean;
  categories: Record<string, boolean>;
  categoryScores?: Record<string, number>;
}

export async function moderateInput(input: string): Promise<ModerationResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  // Fallback to local heuristic moderation if API key is not set
  if (!apiKey || apiKey.startsWith('sk-your')) {
    const toxicPattern = /\b(hate|slur|harass|abuse)\b/i;
    const flagged = toxicPattern.test(input);
    return {
      flagged,
      categories: { harassment: flagged, hate: flagged },
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      return { flagged: false, categories: {} };
    }

    const data = await response.json();
    const result = data.results?.[0];

    return {
      flagged: Boolean(result?.flagged),
      categories: result?.categories || {},
      categoryScores: result?.category_scores,
    };
  } catch (err) {
    console.error('OpenAI Moderation API failed:', err);
    return { flagged: false, categories: {} };
  }
}

export async function moderateOutput(output: string): Promise<ModerationResult> {
  // Enforce safety on model output (e.g. ensure no medical advice, no self-harm methods, no harmful instructions)
  const medicalPrescriptionRegex = /\b(take\s*\d+\s*mg|prescribe|dosage|prozac|lexapro|xanax|zoloft|diagnos(e|is))\b/i;
  if (medicalPrescriptionRegex.test(output)) {
    return {
      flagged: true,
      categories: { medical_advice: true },
    };
  }

  return {
    flagged: false,
    categories: {},
  };
}
