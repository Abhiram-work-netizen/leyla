'use client';

import React, { useState, useEffect } from 'react';
import { MoodPicker } from '@/components/dashboard/MoodPicker';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { MoodWeeklyChart } from '@/components/dashboard/MoodWeeklyChart';
import { HomeChatPreview } from '@/components/dashboard/HomeChatPreview';
import { HomeJournalPreview } from '@/components/dashboard/HomeJournalPreview';
import { HomeGoalsPreview } from '@/components/dashboard/HomeGoalsPreview';
import { HomeResourcesPreview } from '@/components/dashboard/HomeResourcesPreview';
import { useLeylaState } from '@/components/leyla/useLeylaState';

export default function DashboardHomePage() {
  const { state: leylaState, onMoodSelect } = useLeylaState();
  const [greeting, setGreeting] = useState('Good morning, Arya! ☀️');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning, Arya! ☀️');
    } else if (hour < 17) {
      setGreeting('Good afternoon, Arya! 🌤️');
    } else {
      setGreeting('Good evening, Arya! 🌙');
    }
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Section: Greeting, Mood Picker & Streak Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Dynamic Greeting & Mood Picker */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#181230]/90 to-[#100c22]/95 p-6 sm:p-7 shadow-xl backdrop-blur-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {greeting}
            </h2>
            <p className="text-sm text-purple-200/70 mt-1">
              Your safe space is ready whenever you are.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-purple-500/10">
            <MoodPicker onMoodSelect={onMoodSelect} initialScore={4} />
          </div>
        </div>

        {/* Right Card: Streak & Reactive Leyla Avatar */}
        <div className="lg:col-span-5 flex">
          <StreakCard streakDays={12} leylaState={leylaState} />
        </div>

      </div>

      {/* Quick Actions Row */}
      <QuickActions />

      {/* Middle Section: Chat Interface + Mood Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <HomeChatPreview leylaState={leylaState} />
        </div>
        <div className="lg:col-span-5">
          <MoodWeeklyChart />
        </div>
      </div>

      {/* Lower Section: Journal + Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7">
          <HomeJournalPreview />
        </div>
        <div className="lg:col-span-5">
          <HomeGoalsPreview />
        </div>
      </div>

      {/* Bottom Section: Resources Library */}
      <HomeResourcesPreview />
    </div>
  );
}
