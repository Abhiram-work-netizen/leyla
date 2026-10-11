'use client';

import React, { useState } from 'react';
import { MoodWeeklyChart } from '@/components/dashboard/MoodWeeklyChart';
import { MoodPicker } from '@/components/dashboard/MoodPicker';
import { Sparkles, Calendar, TrendingUp, Heart, ArrowUpRight } from 'lucide-react';

export default function MoodTrackerPage() {
  const [activeMoodScore, setActiveMoodScore] = useState<number | null>(4);

  const pastEntries = [
    { date: 'Today, 2:15 PM', score: 4, label: 'Good', emoji: '🙂', note: 'Morning meditation and walk in the garden helped center me.' },
    { date: 'Yesterday, 8:40 PM', score: 3, label: 'Okay', emoji: '😐', note: 'Felt tired after assignments, but drank chamomile tea.' },
    { date: 'Oct 9, 1:10 PM', score: 4, label: 'Good', emoji: '🙂', note: 'Caught up with an old friend on call.' },
    { date: 'Oct 8, 10:20 PM', score: 2, label: 'Sad', emoji: '🙁', note: 'Felt a wave of loneliness, practiced 4-7-8 breathing.' },
    { date: 'Oct 7, 3:30 PM', score: 5, label: 'Great', emoji: '😄', note: 'Got positive feedback on project, celebrated small win!' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Mood Tracker &amp; Emotional Trends
        </h2>
        <p className="text-sm text-purple-200/70 mt-1">
          Track your emotions over time to uncover patterns, triggers, and what brings you peace.
        </p>
      </div>

      {/* Quick Check-in Card */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#181230]/90 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
        <MoodPicker onMoodSelect={(s) => setActiveMoodScore(s)} initialScore={activeMoodScore ?? undefined} />
      </div>

      {/* Main Charts & Analytics */}
      <MoodWeeklyChart />

      {/* History Log */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between pb-5 border-b border-purple-500/10 mb-6">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-400" />
            <span>Recent Mood Check-in History</span>
          </h3>
          <span className="text-xs text-purple-300/60 font-medium">Last 5 entries</span>
        </div>

        <div className="space-y-3">
          {pastEntries.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-2xl border border-purple-500/15 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.label}</span>
                    <span className="text-xs text-purple-400/80 font-medium">({item.score}/5)</span>
                  </div>
                  <p className="text-xs text-purple-200/70 mt-0.5 line-clamp-1">{item.note}</p>
                </div>
              </div>
              <span className="text-xs text-purple-300/50 flex-shrink-0 ml-4">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
