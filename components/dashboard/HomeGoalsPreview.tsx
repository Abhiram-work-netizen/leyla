'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Plus } from 'lucide-react';

export function HomeGoalsPreview() {
  const goals = [
    {
      title: 'Sleep 7-8 hours',
      emoji: '🌙',
      progress: 71,
      ratio: '5/7',
      color: 'from-amber-500 to-yellow-400',
    },
    {
      title: 'Exercise 3 times a week',
      emoji: '🏃‍♀️',
      progress: 67,
      ratio: '2/3',
      color: 'from-emerald-500 to-teal-400',
    },
    {
      title: 'Reduce overthinking',
      emoji: '🧘‍♀️',
      progress: 57,
      ratio: '4/7',
      color: 'from-cyan-500 to-blue-400',
    },
    {
      title: 'Be more positive',
      emoji: '🌸',
      progress: 86,
      ratio: '6/7',
      color: 'from-purple-500 to-pink-400',
    },
  ];

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-5 border-b border-purple-500/10">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-pink-400" />
          <h3 className="text-base font-bold text-white tracking-tight">Goals &amp; Habits</h3>
        </div>
        <Link
          href="/dashboard/goals"
          className="flex items-center gap-1.5 rounded-xl border border-purple-500/20 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-900/40 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Goal</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4 pt-5">
        {goals.map((g, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-white">
                <span>{g.emoji}</span>
                <span>{g.title}</span>
              </span>
              <span className="font-bold text-purple-300">
                {g.progress}% <span className="text-purple-300/40 text-[10px]">({g.ratio})</span>
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-purple-950/60 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${g.color}`}
                style={{ width: `${g.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
