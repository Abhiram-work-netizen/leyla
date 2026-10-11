'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0914] px-4 py-16 text-center selection:bg-purple-500/30">
      <div className="max-w-md w-full rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-8 shadow-2xl backdrop-blur-2xl flex flex-col items-center">
        <LeylaAvatar state="sleepy" size="xl" showMoodHalo priority />

        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mt-6">
          Error 404
        </span>
        <h2 className="text-2xl font-bold text-white mt-1">Page not found</h2>
        <p className="text-xs text-purple-200/70 mt-2 leading-relaxed">
          Looks like this corner of your safe space wandered off. Leyla is here to guide you back home.
        </p>

        <div className="mt-6 w-full flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full rounded-xl py-5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500">
              Return to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full text-xs text-purple-300">
              Go to Landing Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
