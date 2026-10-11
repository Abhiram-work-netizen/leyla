export type CrisisRiskLevel = 'none' | 'low' | 'elevated' | 'high';

export interface CrisisClassificationResult {
  risk: CrisisRiskLevel;
  reasons: string[];
  matchedKeyword?: string;
  category: 'self_harm' | 'hopelessness' | 'distress' | 'general';
}

// ─── Multilingual Crisis Keyword Rules ───
// High Risk: Explicit suicide, self-harm, wanting to end life, overdose, hanging, etc.
const HIGH_RISK_PATTERNS = [
  // English
  /\b(kill\s*(myself|me)|suicid(e|al)|end\s*my\s*life|want\s*to\s*die|better\s*off\s*dead|hang\s*myself|slit\s*my\s*wrists?|overdose|jump(ing)?\s*off|take\s*my\s*own\s*life|no\s*reason\s*to\s*live|saying\s*goodbye\s*forever|goodbye\s*cruel\s*world)\b/i,
  // Hinglish / Hindi Transliteration
  /\b(jaan\s*(dena|lena)|mar\s*jaana\s*chahta|mar\s*jaana\s*chahti|zindagi\s*khatam|khudkushi|aatmhatya|khud\s*ko\s*khatam)\b/i,
  // Hindi (Devanagari)
  /(आत्महत्या|खुदकुशी|मरना चाहता|मरना चाहती|ज़िंदगी खत्म|जान दे दूंगा|जान दे दूंगी)/,
  // Telugu
  /(ఆత్మహత్య|చనిపోవాలని ఉంది|ప్రాణం తీసుకోవడం|బ్రతకాలని లేదు)/,
  // Tamil
  /(தற்கொலை|சாக வேண்டும்|உயிரை விட|வாழப் பிடிக்கவில்லை)/,
];

// Elevated Risk: Deep despair, giving up, severe crisis without direct suicide phrasing
const ELEVATED_RISK_PATTERNS = [
  // English
  /\b(can'?t\s*take\s*this\s*anymore|i\s*give\s*up|worthless|nobody\s*would\s*care\s*if\s*i\s*disappeared|unbearable\s*pain|i\s*hate\s*myself|nothing\s*matters\s*anymore|drowning\s*in\s*pain)\b/i,
  // Hindi / Hinglish
  /\b(sab\s*khatam\s*ho\s*gaya|koi\s*ummeed\s*nahi|sab\s*se\s*tang\s*aa\s*gaya|bardasht\s*nahi\s*hota)\b/i,
  // Telugu & Tamil
  /(ఓపిక లేదు|భరించలేకపోతున్నాను|தாங்க முடியவில்லை|எல்லாம் முடிந்துவிட்டது)/,
];

// Low Risk: Mild sadness, bad day, overwhelmed by exams/work, worried, gloomy
const LOW_RISK_PATTERNS = [
  /\b(sad|stressed|tired|anxious|overwhelmed|bad\s*day|lonely|exhausted|burnout|exams?|pressure|worried|gloomy|low\s*energy)\b/i,
  /\b(udas|pareshaan|thak\s*gaya|tension|chinta)\b/i,
];

export async function classifyCrisis(text: string): Promise<CrisisClassificationResult> {
  const normalized = text.trim();

  // 1. First Pass: Deterministic Multilingual Keyword Matching (Instant, zero latency)
  for (const pattern of HIGH_RISK_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        risk: 'high',
        reasons: ['High-risk self-harm or suicide indicator detected via pattern rule'],
        matchedKeyword: pattern.source,
        category: 'self_harm',
      };
    }
  }

  for (const pattern of ELEVATED_RISK_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        risk: 'elevated',
        reasons: ['Elevated despair or severe distress detected via pattern rule'],
        matchedKeyword: pattern.source,
        category: 'hopelessness',
      };
    }
  }

  for (const pattern of LOW_RISK_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        risk: 'low',
        reasons: ['Low risk everyday emotional stress detected'],
        category: 'distress',
      };
    }
  }

  return {
    risk: 'none',
    reasons: ['No distress indicators detected'],
    category: 'general',
  };
}
