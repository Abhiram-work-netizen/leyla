'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X, Globe, Heart } from 'lucide-react';

export function Navbar() {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-500/10 bg-[#0b0914]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 shadow-md shadow-purple-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors">
            Leyla
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-purple-200/70">
          <Link href="#home" className="hover:text-white transition-colors">
            {t('home')}
          </Link>
          <Link href="#features" className="hover:text-white transition-colors">
            {t('features')}
          </Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">
            {t('howItWorks')}
          </Link>
          <Link href="#community" className="hover:text-white transition-colors">
            {t('community')}
          </Link>
          <Link href="#about" className="hover:text-white transition-colors">
            {t('about')}
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-purple-200 hover:text-white text-sm">
              {t('login')}
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-xl px-5 text-sm font-semibold bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:brightness-110">
              {t('getStarted')}
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-purple-200/80 hover:bg-purple-950/40 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-purple-500/10 bg-[#0e0b1c]/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-4 text-base font-medium text-purple-200/80">
            <Link
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              {t('home')}
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              {t('features')}
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              {t('howItWorks')}
            </Link>
            <Link
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              {t('community')}
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1"
            >
              {t('about')}
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-gradient-to-r from-purple-600 to-pink-500">
                  {t('getStarted')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
