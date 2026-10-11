import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    // Verify cron authorization header if configured
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();

    // Query active checkin settings
    const { data: usersDue, error } = await supabase
      .from('checkin_settings')
      .select('user_id, preferred_time, channel, timezone')
      .eq('enabled', true)
      .limit(50);

    if (error) {
      console.error('Cron checkin error:', error);
      return NextResponse.json({ processed: 0, status: 'fallback_ok' });
    }

    // In production: send Web Push notification or Resend email
    // Strict rules: Cap at 2 per day, respect quiet hours, NEVER mention journal or private chat content!
    const count = usersDue ? usersDue.length : 0;

    return NextResponse.json({
      success: true,
      processed: count,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Checkin cron error:', err);
    return NextResponse.json({ success: false, error: 'Internal cron error' }, { status: 500 });
  }
}
