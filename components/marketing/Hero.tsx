'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Check, Globe, Shield, Clock } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');
  const tTrust = useTranslations('trust');
  const tBubbles = useTranslations('chatBubbles');

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Background radial twilight gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[650px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.18)_0%,rgba(236,72,153,0.12)_35%,rgba(11,9,20,0)_70%)] blur-2xl" />
      <div className="pointer-events-none absolute top-1/4 right-0 -z-10 h-[450px] w-[450px] bg-purple-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-0 -z-10 h-[350px] w-[350px] bg-pink-600/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs font-medium text-purple-200 shadow-sm backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {t('titleLine1')}{' '}
              <br className="hidden sm:inline" />
              {t('titleLine2')}{' '}
              <span className="gradient-text-leyla font-black">
                through
              </span>
              <br />
              this,{' '}
              <span className="gradient-text-leyla font-black">
                together.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-purple-200/75 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="rounded-2xl px-7 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 hover:brightness-110 group cursor-pointer"
                >
                  <span>{t('cta')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <button
                type="button"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-purple-100 backdrop-blur-md hover:bg-white/[0.08] hover:border-purple-400/30 transition-all cursor-pointer"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                  <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                </div>
                <span>{t('watchVideo')}</span>
              </button>
            </div>

            {/* Trust row micro indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-medium text-purple-200/70 border-t border-purple-500/10 pt-6">
              <div className="flex items-center gap-1.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
                <span>{tTrust('free')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-purple-400" />
                <span>{tTrust('multiLang')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>{tTrust('private')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-purple-400" />
                <span>{tTrust('available')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Leyla Illustration with Floating Chat Bubbles */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-purple-600/30 to-pink-500/20 blur-3xl" />

              {/* Central Illustration Card */}
              <div className="relative mx-auto overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#1b1433]/80 to-[#100c22]/90 p-3 shadow-2xl shadow-purple-950/60 backdrop-blur-xl">
                <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-2xl bg-[#16102a]">
                  <Image
                    src="/leyla/hero-illustration.webp"
                    alt="Leyla resting peacefully with kitten in twilight"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  {/* Soft bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100c22]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Chat Bubble 1: Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-6 z-20 animate-float">
                <div className="rounded-2xl border border-purple-400/25 bg-[#1f173b]/90 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-xl shadow-purple-950/60 backdrop-blur-xl">
                  <span>{tBubbles('talkAbout')}</span>
                </div>
              </div>

              {/* Floating Chat Bubble 2: Right Middle */}
              <div className="absolute top-24 -right-4 sm:-right-8 z-20 animate-float-delayed">
                <div className="rounded-2xl border border-pink-400/25 bg-[#251842]/90 px-3.5 py-1.5 text-xs font-medium text-pink-200 shadow-lg shadow-purple-950/60 backdrop-blur-xl">
                  <span>{tBubbles('inYourLanguage')}</span>
                </div>
              </div>

              {/* Floating Chat Bubble 3: Left Middle */}
              <div className="absolute top-28 -left-4 sm:-left-8 z-20 animate-float">
                <div className="rounded-2xl border border-purple-400/25 bg-[#1b1435]/90 px-4 py-2 text-xs sm:text-sm font-medium text-purple-100 shadow-xl shadow-purple-950/60 backdrop-blur-xl">
                  <span>{tBubbles('imHereForYou')}</span>
                </div>
              </div>

              {/* Floating Chat Bubble 4: Bottom Right badge */}
              <div className="absolute -bottom-3 right-4 z-20 animate-float-delayed">
                <div className="rounded-xl border border-purple-500/30 bg-[#281a4d]/95 px-3 py-1.5 text-[11px] font-medium text-purple-200/90 shadow-lg shadow-purple-950/50 backdrop-blur-xl">
                  <span>{tBubbles('kinder')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
