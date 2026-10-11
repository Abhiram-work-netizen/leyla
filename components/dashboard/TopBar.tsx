'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Bell, Moon, Sun, Shield } from 'lucide-react';

export function TopBar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Home';
    if (pathname.includes('/chat')) return 'Chat with Leyla';
    if (pathname.includes('/mood')) return 'Mood Tracker';
    if (pathname.includes('/journal')) return 'Personal Journal';
    if (pathname.includes('/insights')) return 'Weekly Insights';
    if (pathname.includes('/goals')) return 'Goals & Habits';
    if (pathname.includes('/calm')) return 'Calm Space';
    if (pathname.includes('/resources')) return 'Mental Wellness Resources';
    if (pathname.includes('/settings')) return 'Settings & Privacy';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-purple-500/10 bg-[#0b0914]/80 px-6 backdrop-blur-xl">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-white tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Quick Crisis Badge */}
        <Link
          href="/dashboard/resources#crisis"
          className="hidden sm:flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/30 px-3 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-900/40 transition-colors"
        >
          <Shield className="h-3.5 w-3.5 text-rose-400" />
          <span>Crisis Support</span>
        </Link>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/15 bg-white/5 text-purple-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-purple-500/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-xs font-bold text-white shadow-sm">
            A
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-purple-200">
            Arya
          </span>
        </div>
      </div>
    </header>
  );
}
