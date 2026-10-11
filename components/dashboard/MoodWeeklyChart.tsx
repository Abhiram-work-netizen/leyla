'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Sparkles, TrendingUp } from 'lucide-react';

const WEEK_DATA = [
  { day: 'Mon', score: 3, label: 'Okay' },
  { day: 'Tue', score: 2, label: 'Sad' },
  { day: 'Wed', score: 3, label: 'Okay' },
  { day: 'Thu', score: 2, label: 'Sad' },
  { day: 'Fri', score: 4, label: 'Good' },
  { day: 'Sat', score: 4, label: 'Good' },
  { day: 'Sun', score: 5, label: 'Great' },
];

const MONTH_DATA = [
  { day: 'W1', score: 2.8, label: 'Okay' },
  { day: 'W2', score: 3.2, label: 'Okay' },
  { day: 'W3', score: 3.8, label: 'Good' },
  { day: 'W4', score: 4.4, label: 'Good' },
];

const DISTRIBUTION_DATA = [
  { name: 'Great', value: 20, color: '#a855f7' },
  { name: 'Good', value: 30, color: '#22c55e' },
  { name: 'Okay', value: 25, color: '#eab308' },
  { name: 'Sad', value: 15, color: '#f97316' },
  { name: 'Terrible', value: 10, color: '#ef4444' },
];

const Y_LABELS: Record<number, string> = {
  1: 'Terrible',
  2: 'Sad',
  3: 'Okay',
  4: 'Good',
  5: 'Great',
};

export function MoodWeeklyChart() {
  const [range, setRange] = useState<'week' | 'month' | '3months'>('week');

  const chartData = range === 'week' ? WEEK_DATA : MONTH_DATA;

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/90 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
      {/* Card Header with Range Switcher */}
      <div className="flex items-center justify-between pb-6 border-b border-purple-500/10">
        <div className="flex items-center gap-2">
          <span className="text-xl">☀️</span>
          <h3 className="text-base font-bold text-white tracking-tight">
            Mood Tracker
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-purple-950/40 p-1 rounded-xl border border-purple-500/20 text-xs">
          <button
            type="button"
            onClick={() => setRange('week')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              range === 'week'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-purple-300/70 hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setRange('month')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${
              range === 'month'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-purple-300/70 hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Main Content Grid: Line Chart on Left, Donut + Insight on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Weekly Line Chart */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  stroke="#9a92b2"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#251f3e' }}
                />
                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(val) => Y_LABELS[val] || ''}
                  stroke="#9a92b2"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#251f3e' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-purple-500/30 bg-[#1e153b] p-2.5 shadow-xl text-xs text-white">
                          <span className="font-bold">{data.day}: </span>
                          <span className="text-purple-300">{data.label} ({data.score}/5)</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#c084fc"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#ec4899', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#a855f7' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-purple-300/60 pt-2 border-t border-purple-500/10">
            <span>Weekly trend: Rising (+1.4 pts)</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" /> 82% positive days
            </span>
          </div>
        </div>

        {/* Mood Distribution Donut Chart & Insight */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-28 w-28 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DISTRIBUTION_DATA}
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {DISTRIBUTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Distribution Legend */}
            <div className="flex flex-col gap-1 text-[11px] text-purple-200/80">
              <span className="text-xs font-bold text-white mb-1">Distribution</span>
              {DISTRIBUTION_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="w-14">{item.name}</span>
                  <span className="font-semibold text-purple-300/60">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Computed Insights Card */}
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/30 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-200 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>Insights</span>
            </div>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Your mood has been improving this week! You seem to feel better on days you exercise and get enough sleep.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
