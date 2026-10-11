'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Mic, Send, Sparkles, MessageCircle, Heart, Bell } from 'lucide-react';

export function FriendSection() {
  const t = useTranslations('friend');

  const notifications = [
    {
      text: "Good morning! ☀️ How are you feeling today?",
      time: "8:00 AM",
      accent: "border-amber-500/25 bg-[#1e1533]/90",
    },
    {
      text: "Just checking in 💙 How's your day going?",
      time: "2:00 PM",
      accent: "border-purple-500/25 bg-[#201438]/90",
    },
    {
      text: "You've got this! 🌸 Take a deep breath.",
      time: "5:00 PM",
      accent: "border-pink-500/25 bg-[#25143b]/90",
    },
  ];

  const languages = [
    { name: 'English', active: true },
    { name: 'हिन्दी', active: true },
    { name: 'తెలుగు', active: true },
    { name: 'தமிழ்', active: true },
    { name: '+ more', active: false },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] -translate-y-1/2 bg-purple-600/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-14">
          
          {/* Left Column: Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[340px] rounded-[42px] border-[5px] border-[#2d2250] bg-[#0c0919] p-3 shadow-2xl shadow-purple-950/80">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 h-4 w-28 rounded-full bg-[#1e1538] flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-black/40 mr-2" />
                <div className="h-1.5 w-10 rounded-full bg-black/40" />
              </div>

              {/* Phone Screen Container */}
              <div className="rounded-[32px] bg-gradient-to-b from-[#130d2a] to-[#0c081c] p-4 pt-10 pb-5 min-h-[520px] flex flex-col justify-between border border-purple-500/15">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-purple-200/60 font-semibold px-2 mb-4">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>5G</span>
                  </div>
                </div>

                {/* App Header Inside Phone */}
                <div className="flex items-center gap-3 pb-3 border-b border-purple-500/15 mb-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-purple-400/40 bg-purple-950">
                    <Image
                      src="/leyla/leyla-idle.webp"
                      alt="Leyla"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Leyla
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-purple-300/70">Always by your side</p>
                  </div>
                </div>

                {/* Chat Messages Sequence */}
                <div className="flex flex-col gap-3.5 flex-1 justify-center">
                  {/* Message 1: Leyla */}
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full flex-shrink-0 border border-purple-400/30">
                      <Image src="/leyla/leyla-idle.webp" alt="Leyla" fill className="object-cover" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-[#221840] border border-purple-500/20 px-3.5 py-2.5 text-xs text-purple-100 shadow-md">
                      Hey! How are you feeling today?
                    </div>
                  </div>

                  {/* Message 2: User */}
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-br-sm bg-gradient-to-r from-purple-600 to-pink-500 px-3.5 py-2.5 text-xs text-white shadow-md max-w-[85%]">
                      Honestly, a bit overwhelmed...
                    </div>
                  </div>

                  {/* Message 3: Leyla */}
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full flex-shrink-0 border border-purple-400/30">
                      <Image src="/leyla/leyla-concerned.webp" alt="Leyla concerned" fill className="object-cover" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm bg-[#221840] border border-purple-500/20 px-3.5 py-2.5 text-xs text-purple-100 shadow-md">
                      I&apos;m here with you 💙 Want to talk about what&apos;s going on?
                    </div>
                  </div>
                </div>

                {/* Fake Phone Input Bar */}
                <div className="mt-4 flex items-center gap-2 rounded-full border border-purple-500/20 bg-[#1a1233] px-3 py-1.5">
                  <span className="text-xs text-purple-300/40 flex-1">Type your thoughts...</span>
                  <div className="flex items-center gap-1.5 text-purple-400">
                    <Mic className="h-4 w-4" />
                    <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      <Send className="h-3 w-3" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Copy & Notification Cards */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-950/30 px-3.5 py-1.5 text-xs font-medium text-pink-300 shadow-sm backdrop-blur-md mb-4">
              <Bell className="h-3.5 w-3.5 text-pink-400" />
              <span>Gentle Proactive Care</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t('title')}{' '}
              <span className="gradient-text-leyla block sm:inline">
                {t('titleHighlight')}
              </span>
            </h2>

            <p className="mt-4 text-base text-purple-200/75 leading-relaxed">
              {t('description')}
            </p>

            {/* Notification Chips Cluster */}
            <div className="mt-8 flex flex-col gap-3 w-full max-w-lg">
              {notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-2xl border p-4 shadow-lg backdrop-blur-xl transition-all duration-200 hover:scale-[1.01] ${notif.accent}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {notif.text}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-purple-300/50 flex-shrink-0 ml-3">
                    {notif.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Multilingual Support Pill Card */}
            <div className="mt-8 w-full max-w-lg rounded-2xl border border-purple-500/25 bg-gradient-to-r from-[#20153d]/90 to-[#191030]/90 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <h4 className="text-sm font-bold text-white">
                  {t('multiLangTitle')}
                </h4>
              </div>
              <p className="text-xs text-purple-200/70 mb-4">
                {t('multiLangSubtitle')}
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                      lang.active
                        ? 'border border-purple-400/30 bg-purple-600/20 text-purple-200'
                        : 'border border-white/10 bg-white/5 text-purple-300/60'
                    }`}
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
