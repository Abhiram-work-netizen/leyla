import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const FALLBACK_ICEBREAKERS = [
  { id: '1', text: "Hey, how's your heart doing today?", category: 'gentle', time_of_day: 'morning' },
  { id: '2', text: 'Plot twist: you’re allowed to take a break. Want to chat about it?', category: 'playful', time_of_day: 'afternoon' },
  { id: '3', text: 'Tell me one tiny win from today. Tiny counts!', category: 'playful', time_of_day: 'afternoon' },
  { id: '4', text: 'If your mood were a song right now, what would it be?', category: 'playful', time_of_day: 'afternoon' },
  { id: '5', text: 'Let’s close the day softly. What was one good moment?', category: 'evening', time_of_day: 'evening' },
  { id: '6', text: 'Want to put today’s worries in a "tomorrow" box together?', category: 'evening', time_of_day: 'night' },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale') || 'en';
    const timeOfDay = searchParams.get('timeOfDay') || 'afternoon';
    const mood = parseInt(searchParams.get('mood') || '3', 10);

    const supabase = await createClient();

    const { data: dbIcebreakers, error } = await supabase
      .from('icebreakers')
      .select('*')
      .eq('locale', locale)
      .lte('min_mood', mood)
      .gte('max_mood', mood)
      .limit(8);

    if (error || !dbIcebreakers || dbIcebreakers.length === 0) {
      // Fallback if db is not seeded or running demo
      const selected = FALLBACK_ICEBREAKERS.slice(0, 4);
      return NextResponse.json({ icebreakers: selected });
    }

    // Pick 4 random openers without repeating
    const shuffled = dbIcebreakers.sort(() => 0.5 - Math.random()).slice(0, 4);
    return NextResponse.json({ icebreakers: shuffled });
  } catch (err) {
    console.error('Icebreakers error:', err);
    return NextResponse.json({ icebreakers: FALLBACK_ICEBREAKERS.slice(0, 4) });
  }
}
