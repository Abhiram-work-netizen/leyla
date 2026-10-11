'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-purple-500/10 bg-[#090712] py-14 text-sm text-purple-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-purple-500/10">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Leyla
              </span>
            </Link>
            <p className="text-xs text-purple-300/50">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <Link href="#features" className="hover:text-purple-200 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-purple-200 transition-colors">
              How it works
            </Link>
            <Link href="/privacy" className="hover:text-purple-200 transition-colors">
              Privacy Center
            </Link>
            <Link href="/terms" className="hover:text-purple-200 transition-colors">
              Terms & Security
            </Link>
            <Link href="/helplines" className="hover:text-rose-300 transition-colors text-rose-400 font-semibold">
              Emergency Helplines
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-purple-300/40 text-center md:text-right">
            {t('copyright', { year: currentYear })}
          </div>
        </div>

        {/* Responsible AI & Safety Notice */}
        <div className="pt-6 text-center text-[11px] leading-relaxed text-purple-300/30 max-w-3xl mx-auto">
          Notice: Leyla is an AI wellness companion intended for emotional reflection, relaxation, and positive habit building. Leyla is not a medical professional, therapist, or emergency response service. If you are in immediate crisis or experiencing thoughts of self-harm, please reach out to emergency services or call 988 (USA/Canada) or Tele-MANAS 14416 (India).
        </div>
      </div>
    </footer>
  );
}
