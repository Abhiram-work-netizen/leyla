'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Smile, BookOpen, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const mobileTabs = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
    { name: 'Mood', href: '/dashboard/mood', icon: Smile },
    { name: 'Journal', href: '/dashboard/journal', icon: BookOpen },
    { name: 'Calm', href: '/dashboard/calm', icon: Wind },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex h-16 items-center justify-around border-t border-purple-500/15 bg-[#0d0919]/95 px-2 backdrop-blur-xl lg:hidden">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors',
              isActive
                ? 'text-purple-400 font-bold'
                : 'text-purple-300/60 hover:text-white'
            )}
          >
            <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
