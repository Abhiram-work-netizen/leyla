import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { classifyCrisis } from '@/lib/safety/classifier';
import { moderateInput, moderateOutput } from '@/lib/safety/moderation';
import { getDeterministicCrisisResponse } from '@/lib/safety/crisis';
import { LEYLA_SYSTEM_PROMPT } from '@/lib/ai/system-prompt';
import { createClient } from '@/lib/supabase/server';

const chatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  conversationId: z.string().uuid().optional(),
  locale: z.string().default('en'),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Zod Validation
    const body = await req.json();
    const parseResult = chatRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid message request', details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { message, conversationId, locale } = parseResult.data;

    // 2. Safety Layer: Crisis Classifier
    const crisisCheck = await classifyCrisis(message);

    // If Risk is High -> Immediate Deterministic Crisis Response (Never LLM-generated!)
    if (crisisCheck.risk === 'high') {
      const deterministicResponse = getDeterministicCrisisResponse(locale);

      // Anonymized safety event logging (Notice: NO raw chat text in logs)
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('safety_events').insert({
            user_id: user.id,
            risk_level: 'high',
            category: crisisCheck.category,
            locale,
          });
        }
      } catch (e) {
        console.error('Safety event log error:', e);
      }

      return NextResponse.json(deterministicResponse);
    }

    // 3. Input Moderation
    const inputMod = await moderateInput(message);
    if (inputMod.flagged) {
      return NextResponse.json({
        reply: "I want to keep this space safe, kind, and supportive for everyone. Let's redirect our conversation to how you're feeling right now.",
        expression: 'concerned',
        suggested_chips: ['Tell me how you feel', 'Take a breath', 'Start fresh'],
      });
    }

    // 4. Model Generation / Companion Response
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey.startsWith('sk-your')) {
      // High-fidelity fallback companion response when running in demo/offline mode
      let fallbackReply = "I'm listening and I'm right here with you. It's completely valid to feel whatever you're feeling right now. What's one small thing that might bring a little comfort?";
      let fallbackExpression = 'idle';

      if (crisisCheck.risk === 'elevated') {
        fallbackReply = "I hear how heavy this feels right now. Please remember you don't have to carry this alone. Let's take one gentle breath together.";
        fallbackExpression = 'concerned';
      } else if (message.toLowerCase().includes('good') || message.toLowerCase().includes('happy') || message.toLowerCase().includes('win')) {
        fallbackReply = "That's wonderful to hear! Every positive moment, no matter how small, is worth appreciating. Proud of you!";
        fallbackExpression = 'happy';
      } else if (message.toLowerCase().includes('sleep') || message.toLowerCase().includes('night')) {
        fallbackReply = "Rest is so essential for healing. Let your shoulders drop, relax your jaw, and let today's thoughts settle gently.";
        fallbackExpression = 'sleepy';
      }

      return NextResponse.json({
        reply: fallbackReply,
        expression: fallbackExpression,
        suggested_chips: [
          'Tell me more',
          'Let’s do a breathing reset',
          'I need advice',
          'Just stay with me',
        ],
      });
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: LEYLA_SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 350,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI error: ${openAIResponse.statusText}`);
    }

    const aiData = await openAIResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || '{}';
    const structuredResult = JSON.parse(rawContent);

    // 5. Output Moderation
    const outputMod = await moderateOutput(structuredResult.reply || '');
    if (outputMod.flagged) {
      structuredResult.reply = "I'm here to support your emotional wellbeing, but I want to gently remind you to check in with a doctor or counselor for medical guidance.";
      structuredResult.expression = 'concerned';
    }

    return NextResponse.json({
      reply: structuredResult.reply,
      expression: structuredResult.expression || 'idle',
      suggested_chips: structuredResult.suggested_chips || [
        'Tell me more',
        'Help me relax',
        'Change topic',
      ],
    });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        reply: "I'm right here with you. Let's take a calm breath together. What's on your mind?",
        expression: 'idle',
        suggested_chips: ['Tell me a calming story', 'Breathing exercise', 'Daily check-in'],
      },
      { status: 200 }
    );
  }
}
