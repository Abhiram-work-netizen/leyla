'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit2, Sparkles, ArrowLeft, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminIcebreaker {
  id: string;
  locale: string;
  category: string;
  text: string;
  timeOfDay: string;
  minMood: number;
  maxMood: number;
}

export default function AdminIcebreakersPage() {
  const [icebreakers, setIcebreakers] = useState<AdminIcebreaker[]>([
    { id: '1', locale: 'en', category: 'gentle', text: "Hey, how's your heart doing today?", timeOfDay: 'morning', minMood: 1, maxMood: 5 },
    { id: '2', locale: 'en', category: 'playful', text: 'Plot twist: you’re allowed to take a break. Want to chat about it?', timeOfDay: 'afternoon', minMood: 2, maxMood: 5 },
    { id: '3', locale: 'en', category: 'playful', text: 'My cat says you’ve earned a snack and a deep breath. Which first?', timeOfDay: 'afternoon', minMood: 2, maxMood: 5 },
    { id: '4', locale: 'en', category: 'evening', text: 'Let’s close the day softly. What was one good moment?', timeOfDay: 'evening', minMood: 1, maxMood: 5 },
    { id: '5', locale: 'hi', category: 'gentle', text: 'अरे, आज आपका दिल कैसा महसूस कर रहा है?', timeOfDay: 'morning', minMood: 1, maxMood: 5 },
  ]);

  const [text, setText] = useState('');
  const [category, setCategory] = useState('gentle');
  const [locale, setLocale] = useState('en');
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newItem: AdminIcebreaker = {
      id: Date.now().toString(),
      locale,
      category,
      text,
      timeOfDay,
      minMood: 1,
      maxMood: 5,
    };

    setIcebreakers((prev) => [newItem, ...prev]);
    setText('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    setIcebreakers((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-300/70 mb-1">
            <Shield className="h-3.5 w-3.5 text-purple-400" />
            <span>Admin Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Icebreaker Management
          </h2>
          <p className="text-xs text-purple-200/70 mt-1">
            Manage cozy conversational openers across locales. Rules: Never romantic, possessive, or guilt-inducing.
          </p>
        </div>
      </div>

      {/* Add New Icebreaker Form */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#181230]/90 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span>Add New Opener</span>
        </h3>

        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-200/80 mb-1">
              Opener Text
            </label>
            <input
              type="text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Ready for a 1-minute breathing reset?"
              className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-4 text-sm text-white focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-purple-200/80 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-3 text-xs text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="gentle">Gentle Check-in</option>
                <option value="playful">Playful &amp; Light</option>
                <option value="evening">Evening Wind-down</option>
                <option value="study">Study &amp; Exam Stress</option>
                <option value="celebration">Streak &amp; Celebration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200/80 mb-1">
                Language / Locale
              </label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-3 text-xs text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="en">English (en)</option>
                <option value="hi">Hindi (hi)</option>
                <option value="te">Telugu (te)</option>
                <option value="ta">Tamil (ta)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200/80 mb-1">
                Time of Day
              </label>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-3 text-xs text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-purple-300/50">
              Tone guidelines: Cozy, supportive, never romantic, skippable.
            </span>
            <Button
              type="submit"
              className="rounded-xl px-5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Save Icebreaker
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Icebreakers List */}
      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-4">
          Active Icebreaker Bank ({icebreakers.length})
        </h3>

        <div className="space-y-3">
          {icebreakers.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-2xl border border-purple-500/15 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center gap-2 text-[10px] text-purple-300/60 font-semibold">
                  <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-purple-300 uppercase">
                    {item.locale}
                  </span>
                  <span>• {item.category}</span>
                  <span>• {item.timeOfDay}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                  title="Delete Opener"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
