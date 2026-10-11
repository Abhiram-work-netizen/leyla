'use client';

import React from 'react';
import { LineChart, Sparkles, TrendingUp, Sun, Moon, Dumbbell, ShieldCheck } from 'lucide-react';
import { MoodWeeklyChart } from '@/components/dashboard/MoodWeeklyChart';

export default function InsightsPage() {
  const insights = [
    {
      title: 'Sleep & Mood Correlation',
      desc: 'You recorded your best mood scores (Good & Great) on mornings following 7+ hours of rest. Prioritizing early wind-downs has a gentle, positive ripple effect on your energy.',
      icon: Moon,
      color: 'text-indigo-400 bg-indigo-500/15',
    },
    {
      title: 'Movement & Clarity',
      desc: 'On days you completed your light movement habit, you reported fewer anxious thoughts in your evening check-ins. Even short 15-minute walks helped shift your perspective.',
      icon: Dumbbell,
      color: 'text-emerald-400 bg-emerald-500/15',
    },
    {
      title: 'Best Day of the Week',
      desc: 'Sunday and Friday showed the highest average emotional calm (4.5/5). Weekends bring a natural sigh of relief — see if you can carry a 5-minute piece of that weekend stillness into Wednesday.',
      icon: Sun,
      color: 'text-amber-400 bg-amber-500/15',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <LineChart className="h-6 w-6 text-purple-400" />
          <span>Weekly Reflections &amp; Insights</span>
        </h2>
        <p className="text-xs text-purple-200/70 mt-1">
          Gentle, non-judgmental pattern recognition. Discover what helps you recharge.
        </p>
      </div>

      {/* Main Charts */}
      <MoodWeeklyChart />

      {/* Computed Correlation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-purple-500/15 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 shadow-xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${item.color} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-purple-500/10 mt-6 flex items-center gap-1.5 text-[11px] text-purple-300/50">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>Computed from your logged check-ins</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ethical AI & Non-Medical Disclaimer */}
      <div className="p-4 rounded-2xl border border-purple-500/15 bg-purple-950/20 text-xs text-purple-300/70 flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-purple-400 flex-shrink-0" />
        <span>
          <strong>Friendly Reminder:</strong> Leyla’s insights are observational reflections based on your self-reported logs, designed to encourage mindfulness. They are not clinical diagnoses or psychiatric assessments.
        </span>
      </div>
    </div>
  );
}
