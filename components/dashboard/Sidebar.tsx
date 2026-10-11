'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Home,
  MessageCircle,
  Smile,
  BookOpen,
  LineChart,
  Target,
  Wind,
  LifeBuoy,
  Settings,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const NAV_ITEMS = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { name: 'Mood Tracker', href: '/dashboard/mood', icon: Smile },
  { name: 'Journal', href: '/dashboard/journal', icon: BookOpen },
  { name: 'Insights', href: '/dashboard/insights', icon: LineChart },
  { name: 'Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Calm Space', href: '/dashboard/calm', icon: Wind },
  { name: 'Resources', href: '/dashboard/resources', icon: LifeBuoy },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-purple-500/10 bg-[#0c0919] p-4 text-[#f5f3f9] min-h-screen">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2.5 px-3 py-3 mb-6 group">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Leyla
        </span>
      </Link>

      {/* Main Navigation List */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-purple-600/30 to-purple-600/10 text-white border border-purple-500/30 shadow-md shadow-purple-950/30 font-semibold'
                  : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 transition-colors',
                  isActive ? 'text-purple-400' : 'text-purple-300/60'
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Emergency Helpline Link */}
      <div className="pt-4 border-t border-purple-500/10 mt-auto">
        <Link
          href="/dashboard/resources#crisis"
          className="flex items-center gap-2.5 rounded-xl border border-rose-500/20 bg-rose-950/30 px-3 py-2.5 text-xs text-rose-300 hover:bg-rose-900/40 transition-colors"
        >
          <Shield className="h-4 w-4 text-rose-400 flex-shrink-0" />
          <div className="leading-tight">
            <span className="font-bold block">Need Urgent Help?</span>
            <span className="text-[10px] text-rose-200/60">24/7 Free Helplines</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
