'use client';

import React, { useEffect } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0914] px-4 py-16 text-center">
      <div className="max-w-md w-full rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-8 shadow-2xl backdrop-blur-2xl flex flex-col items-center">
        <LeylaAvatar state="concerned" size="lg" showMoodHalo priority />

        <h2 className="text-xl font-bold text-white mt-5">Something unexpected happened</h2>
        <p className="text-xs text-purple-200/70 mt-2 leading-relaxed">
          Don&apos;t worry, your safe space is still intact. Let&apos;s take a gentle breath and try refreshing.
        </p>

        <div className="mt-6 w-full">
          <Button
            onClick={() => reset()}
            className="w-full rounded-xl py-5 text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-500"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
