'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MoodOption {
  score: number;
  label: string;
  emoji: string;
  color: string;
  activeBg: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    score: 1,
    label: 'Terrible',
    emoji: '😣',
    color: 'text-rose-400',
    activeBg: 'border-rose-500 bg-rose-500/20 text-rose-200 shadow-rose-500/20',
  },
  {
    score: 2,
    label: 'Sad',
    emoji: '🙁',
    color: 'text-orange-400',
    activeBg: 'border-orange-500 bg-orange-500/20 text-orange-200 shadow-orange-500/20',
  },
  {
    score: 3,
    label: 'Okay',
    emoji: '😐',
    color: 'text-amber-400',
    activeBg: 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-amber-500/20',
  },
  {
    score: 4,
    label: 'Good',
    emoji: '🙂',
    color: 'text-emerald-400',
    activeBg: 'border-emerald-500 bg-emerald-500/20 text-emerald-200 shadow-emerald-500/20',
  },
  {
    score: 5,
    label: 'Great',
    emoji: '😄',
    color: 'text-purple-400',
    activeBg: 'border-purple-500 bg-purple-500/25 text-purple-200 shadow-purple-500/30',
  },
];

interface MoodPickerProps {
  onMoodSelect?: (score: number) => void;
  initialScore?: number;
}

export function MoodPicker({ onMoodSelect, initialScore }: MoodPickerProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(initialScore ?? null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelect = async (score: number) => {
    setSelectedScore(score);
    if (onMoodSelect) {
      onMoodSelect(score);
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('mood_entries').insert({
          user_id: user.id,
          score,
          tags: ['daily_checkin'],
        });
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // In local demo mode, still give visual feedback
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-purple-200/70">
          How are you feeling right now?
        </span>
        {savedSuccess && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 animate-fade-in">
            <Check className="h-3 w-3" /> Logged!
          </span>
        )}
      </div>

      {/* 5 Mood Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 justify-between">
        {MOOD_OPTIONS.map((opt) => {
          const isSelected = selectedScore === opt.score;
          return (
            <button
              key={opt.score}
              type="button"
              onClick={() => handleSelect(opt.score)}
              className={cn(
                'flex flex-1 flex-col items-center justify-center py-3 px-2 rounded-2xl border transition-all duration-200 cursor-pointer',
                isSelected
                  ? `${opt.activeBg} shadow-lg scale-105 border-2`
                  : 'border-purple-500/15 bg-purple-950/20 text-purple-200/80 hover:bg-white/5 hover:border-purple-400/40 hover:scale-102'
              )}
            >
              <span className="text-2xl sm:text-3xl mb-1 select-none transition-transform duration-200 group-hover:scale-110">
                {opt.emoji}
              </span>
              <span className="text-[11px] font-semibold tracking-tight">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
