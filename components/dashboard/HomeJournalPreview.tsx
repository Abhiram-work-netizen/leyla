'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Plus, Calendar } from 'lucide-react';

export function HomeJournalPreview() {
  const entries = [
    {
      date: 'Today',
      title: 'Feeling a bit anxious but also hopeful',
      snippet: 'Today was a mix of emotions. I felt anxious about my exams, but I also managed to complete my assignments. I’m proud of myself for not giving up.',
      moodTag: '✨ Anxious & Hopeful',
    },
    {
      date: 'Oct 9',
      title: 'A good day!',
      snippet: 'Felt more positive and productive today. Morning walk helped a lot.',
      moodTag: '🙂 Good',
    },
    {
      date: 'Oct 8',
      title: 'Overthinking',
      snippet: 'Need to be kinder to myself. Small steps still count.',
      moodTag: '🤍 Low',
    },
  ];

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-5 border-b border-purple-500/10">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white tracking-tight">Journal</h3>
        </div>
        <Link
          href="/dashboard/journal"
          className="flex items-center gap-1.5 rounded-xl border border-purple-500/20 bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-200 hover:bg-purple-900/40 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Entry</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5">
        {/* Entry History list on left */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                idx === 0
                  ? 'border-purple-400/40 bg-purple-900/20 text-white'
                  : 'border-purple-500/10 bg-white/[0.02] text-purple-200/70 hover:bg-white/[0.05]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-purple-300/60 mb-1">
                <span>{entry.date}</span>
                <span className="text-[10px] text-purple-400">{entry.moodTag}</span>
              </div>
              <h5 className="text-xs font-bold text-white line-clamp-1">{entry.title}</h5>
              <p className="text-[11px] text-purple-300/60 line-clamp-2 mt-1">{entry.snippet}</p>
            </div>
          ))}
        </div>

        {/* Selected entry detailed card on right */}
        <div className="md:col-span-7 rounded-2xl border border-purple-500/15 bg-[#120d26]/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-purple-300/60 mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-purple-400" /> Oct 10, 2026 • 10:30 AM
              </span>
              <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-300">
                Encrypted
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">
              Feeling a bit anxious but also hopeful
            </h4>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Today was a mix of emotions. I felt anxious about my exams, but I also managed to complete my assignments. I&apos;m proud of myself for not giving up. I need to remind myself that it&apos;s okay to feel overwhelmed sometimes. Tomorrow is a new day. 💙
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs text-purple-300/60">
            <span>Private &amp; Secure storage</span>
            <Link href="/dashboard/journal" className="text-purple-400 hover:underline">
              View all entries →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
