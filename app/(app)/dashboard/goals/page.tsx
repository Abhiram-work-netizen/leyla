'use client';

import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';
import { useLeylaState } from '@/components/leyla/useLeylaState';

interface GoalItem {
  id: string;
  title: string;
  category: string;
  targetPerWeek: number;
  currentProgress: number;
  emoji: string;
  color: string;
}

export default function GoalsPage() {
  const { state: leylaState, onCelebrate } = useLeylaState();
  const [goals, setGoals] = useState<GoalItem[]>([
    {
      id: '1',
      title: 'Sleep 7-8 hours',
      category: 'Rest',
      targetPerWeek: 7,
      currentProgress: 5,
      emoji: '🌙',
      color: 'from-amber-500 to-yellow-400',
    },
    {
      id: '2',
      title: 'Exercise 3 times a week',
      category: 'Movement',
      targetPerWeek: 3,
      currentProgress: 2,
      emoji: '🏃‍♀️',
      color: 'from-emerald-500 to-teal-400',
    },
    {
      id: '3',
      title: 'Reduce overthinking / 5-min pause',
      category: 'Mindfulness',
      targetPerWeek: 7,
      currentProgress: 4,
      emoji: '🧘‍♀️',
      color: 'from-cyan-500 to-blue-400',
    },
    {
      id: '4',
      title: 'Log daily gratitude',
      category: 'Gratitude',
      targetPerWeek: 7,
      currentProgress: 6,
      emoji: '🌸',
      color: 'from-purple-500 to-pink-400',
    },
  ]);

  const [showCelebrateAlert, setShowCelebrateAlert] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState(3);
  const [isAdding, setIsAdding] = useState(false);

  const handleCheckIn = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const next = Math.min(g.targetPerWeek, g.currentProgress + 1);
          if (next === g.targetPerWeek) {
            // Completed goal! Trigger celebration
            onCelebrate();
            setShowCelebrateAlert(true);
            setTimeout(() => setShowCelebrateAlert(false), 5000);
          }
          return { ...g, currentProgress: next };
        }
        return g;
      })
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: GoalItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: 'Habit',
      targetPerWeek: newTarget,
      currentProgress: 0,
      emoji: '🎯',
      color: 'from-purple-500 to-pink-500',
    };

    setGoals([...goals, newGoal]);
    setNewTitle('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Target className="h-6 w-6 text-pink-400" />
            <span>Goals &amp; Gentle Habits</span>
          </h2>
          <p className="text-xs text-purple-200/70 mt-1">
            Build sustainable, low-pressure habits. Consistency over intensity.
          </p>
        </div>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-xl px-5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add Goal
        </Button>
      </div>

      {/* Celebrate Alert Banner if goal was just finished */}
      {showCelebrateAlert && (
        <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-950/60 to-purple-950/60 p-4 text-sm text-amber-200 flex items-center justify-between gap-4 shadow-xl animate-bounce-soft">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white">Goal Completed! 🎉</h4>
              <p className="text-xs text-amber-200/80">
                Leyla is celebrating with you! You showed up for yourself this week.
              </p>
            </div>
          </div>
          <LeylaAvatar state="celebrate" size="sm" showMoodHalo={false} />
        </div>
      )}

      {/* Add New Goal Form */}
      {isAdding && (
        <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#181230]/90 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-sm font-bold text-white mb-4">Create a New Habit</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-purple-200/80 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 10-minute evening walk"
                  className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-4 text-xs text-white focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200/80 mb-1">
                  Weekly Target (Days)
                </label>
                <select
                  value={newTarget}
                  onChange={(e) => setNewTarget(Number(e.target.value))}
                  className="w-full rounded-xl border border-purple-500/20 bg-[#0d0a1b] py-2.5 px-3 text-xs text-white focus:border-purple-400 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'time' : 'times'} a week
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl px-5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500">
                Save Habit
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const pct = Math.round((g.currentProgress / g.targetPerWeek) * 100);
          const isDone = g.currentProgress >= g.targetPerWeek;

          return (
            <div
              key={g.id}
              className="p-6 rounded-3xl border border-purple-500/15 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 shadow-xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{g.emoji}</span>
                  <span className="text-[11px] font-semibold text-purple-300/60 uppercase tracking-wider">
                    {g.category}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">{g.title}</h4>
                <div className="flex items-center justify-between text-xs text-purple-300/80 mb-2 font-medium">
                  <span>Weekly Progress:</span>
                  <span>
                    {g.currentProgress} / {g.targetPerWeek} ({pct}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 w-full rounded-full bg-purple-950/60 overflow-hidden mb-6">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${g.color} transition-all duration-300`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Action: Check-in button */}
              <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
                <span className="text-[11px] text-purple-300/50">
                  {isDone ? 'Completed for this week! 🌟' : 'Click to log today’s progress'}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleCheckIn(g.id)}
                  disabled={isDone}
                  className={`rounded-xl text-xs font-bold cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                      : 'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  {isDone ? 'Done' : 'Check-in'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
