'use client';

import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';
import { LeylaState } from '@/components/leyla/types';

interface StreakCardProps {
  streakDays?: number;
  leylaState?: LeylaState;
}

export function StreakCard({ streakDays = 12, leylaState = 'idle' }: StreakCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#1b1335]/90 via-[#140e29]/95 to-[#0e091d] p-6 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
      
      {/* Left: Streak Information */}
      <div className="flex-1 flex flex-col items-start">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <Flame className="h-4 w-4 fill-amber-400" />
          </div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Daily Streak
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {streakDays} days
          </span>
          <span className="text-xs font-semibold text-purple-300/80">
            Keep going!
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-950/40 px-3.5 py-2 text-xs font-medium text-purple-200 shadow-inner">
          &ldquo;A small step forward is still progress. 💜&rdquo;
        </div>
      </div>

      {/* Right: Leyla Reactive Companion Hero Avatar */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <LeylaAvatar
          state={leylaState}
          size="lg"
          showMoodHalo
          interactive
        />
      </div>

    </div>
  );
}
