'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Sun } from 'lucide-react';

export function ClosingCta() {
  const t = useTranslations('cta');

  return (
    <section className="relative overflow-hidden py-28 text-center">
      {/* Background twilight gradients and stars */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b0914] via-[#1a1133] to-[#0c0819]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,rgba(236,72,153,0.12)_40%,transparent_75%)] blur-2xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {t('title')}{' '}
          <span className="gradient-text-leyla block sm:inline">
            {t('subtitle')}
          </span>
        </h2>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="rounded-2xl px-9 py-6 text-base font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 shadow-2xl shadow-purple-600/40 hover:shadow-purple-500/60 hover:brightness-110 group cursor-pointer"
            >
              <span>{t('button')}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* 4 Trust & Reassurance Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-purple-200/75">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
              <Heart className="h-3 w-3" />
            </div>
            <span>{t('noJudgement')}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20 text-pink-400">
              <ShieldCheck className="h-3 w-3" />
            </div>
            <span>{t('privacyMatters')}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-3 w-3" />
            </div>
            <span>{t('realSupport')}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
              <Sun className="h-3 w-3" />
            </div>
            <span>{t('brighterTomorrow')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
