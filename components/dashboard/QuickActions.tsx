'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, BookOpen, Wind, Target } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      title: 'Chat with Leyla',
      subtitle: 'Talk about anything',
      href: '/dashboard/chat',
      icon: MessageCircle,
      iconBg: 'bg-purple-500/20 text-purple-300',
      border: 'hover:border-purple-400/40',
      shadow: 'hover:shadow-purple-500/20',
    },
    {
      title: 'Write in Journal',
      subtitle: 'Express your thoughts',
      href: '/dashboard/journal',
      icon: BookOpen,
      iconBg: 'bg-emerald-500/20 text-emerald-300',
      border: 'hover:border-emerald-400/40',
      shadow: 'hover:shadow-emerald-500/20',
    },
    {
      title: 'Breathing Exercise',
      subtitle: 'Feel calmer now',
      href: '/dashboard/calm',
      icon: Wind,
      iconBg: 'bg-indigo-500/20 text-indigo-300',
      border: 'hover:border-indigo-400/40',
      shadow: 'hover:shadow-indigo-500/20',
    },
    {
      title: 'Set a Goal',
      subtitle: 'Build a better you',
      href: '/dashboard/goals',
      icon: Target,
      iconBg: 'bg-pink-500/20 text-pink-300',
      border: 'hover:border-pink-400/40',
      shadow: 'hover:shadow-pink-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.title}
            href={act.href}
            className={`group flex items-center gap-3.5 p-4 rounded-2xl border border-purple-500/15 bg-gradient-to-b from-[#16102a]/80 to-[#100c22]/90 shadow-md backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 ${act.border} ${act.shadow}`}
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${act.iconBg} transition-transform duration-200 group-hover:scale-105`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-purple-200 transition-colors">
                {act.title}
              </h4>
              <p className="text-xs text-purple-300/60 mt-0.5">
                {act.subtitle}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
