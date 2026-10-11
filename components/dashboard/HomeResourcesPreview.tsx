'use client';

import React from 'react';
import Link from 'next/link';
import { LifeBuoy, Moon, Heart, BookOpen, Users, ShieldAlert } from 'lucide-react';

export function HomeResourcesPreview() {
  const resourceCards = [
    {
      title: 'Anxiety Relief',
      subtitle: 'Techniques to manage anxiety.',
      icon: LifeBuoy,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      href: '/dashboard/resources#anxiety',
    },
    {
      title: 'Better Sleep',
      subtitle: 'Practices for a peaceful sleep.',
      icon: Moon,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      href: '/dashboard/resources#sleep',
    },
    {
      title: 'Self-Care',
      subtitle: 'Simple ways to be kinder to yourself.',
      icon: Heart,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
      href: '/dashboard/resources#self-care',
    },
    {
      title: 'Study & Focus',
      subtitle: 'Tips to stay productive.',
      icon: BookOpen,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      href: '/dashboard/resources#study',
    },
    {
      title: 'Relationships',
      subtitle: 'Navigate emotions and connections.',
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      href: '/dashboard/resources#relationships',
    },
    {
      title: 'Crisis Help',
      subtitle: 'Get immediate support.',
      icon: ShieldAlert,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
      href: '/dashboard/resources#crisis',
    },
  ];

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-5 border-b border-purple-500/10">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Resources</h3>
          <p className="text-xs text-purple-300/60 mt-0.5">Explore helpful tools and guides</p>
        </div>
        <Link
          href="/dashboard/resources"
          className="text-xs font-semibold text-purple-300 hover:text-white"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-5">
        {resourceCards.map((res) => {
          const Icon = res.icon;
          return (
            <Link
              key={res.title}
              href={res.href}
              className={`p-3 rounded-2xl border flex flex-col justify-between transition-all hover:-translate-y-1 ${res.bg}`}
            >
              <Icon className={`h-5 w-5 mb-3 ${res.color}`} />
              <div>
                <h5 className="text-xs font-bold text-white tracking-tight">{res.title}</h5>
                <p className="text-[10px] text-purple-300/60 line-clamp-2 mt-0.5">{res.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
