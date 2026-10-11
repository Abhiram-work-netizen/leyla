'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  MessageSquareHeart,
  BellRing,
  Smile,
  Sparkles,
  ShieldAlert,
  HeartHandshake,
} from 'lucide-react';

export function FeatureCards() {
  const t = useTranslations('features');

  const features = [
    {
      title: t('naturalConversations'),
      desc: t('naturalConversationsDesc'),
      icon: MessageSquareHeart,
      color: 'from-cyan-500 to-teal-400',
      glow: 'group-hover:shadow-cyan-500/20',
      border: 'group-hover:border-cyan-500/30',
      iconBg: 'bg-cyan-500/15 text-cyan-300',
    },
    {
      title: t('proactiveCheckIns'),
      desc: t('proactiveCheckInsDesc'),
      icon: BellRing,
      color: 'from-purple-500 to-pink-500',
      glow: 'group-hover:shadow-purple-500/20',
      border: 'group-hover:border-purple-500/30',
      iconBg: 'bg-purple-500/15 text-purple-300',
    },
    {
      title: t('moodTracking'),
      desc: t('moodTrackingDesc'),
      icon: Smile,
      color: 'from-amber-400 to-yellow-500',
      glow: 'group-hover:shadow-amber-500/20',
      border: 'group-hover:border-amber-500/30',
      iconBg: 'bg-amber-500/15 text-amber-300',
    },
    {
      title: t('personalizedSupport'),
      desc: t('personalizedSupportDesc'),
      icon: Sparkles,
      color: 'from-fuchsia-500 to-pink-500',
      glow: 'group-hover:shadow-fuchsia-500/20',
      border: 'group-hover:border-fuchsia-500/30',
      iconBg: 'bg-fuchsia-500/15 text-fuchsia-300',
    },
    {
      title: t('crisisResources'),
      desc: t('crisisResourcesDesc'),
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-400',
      glow: 'group-hover:shadow-rose-500/20',
      border: 'group-hover:border-rose-500/30',
      iconBg: 'bg-rose-500/15 text-rose-300',
    },
    {
      title: t('hundredPercentFree'),
      desc: t('hundredPercentFreeDesc'),
      icon: HeartHandshake,
      color: 'from-emerald-400 to-teal-500',
      glow: 'group-hover:shadow-emerald-500/20',
      border: 'group-hover:border-emerald-500/30',
      iconBg: 'bg-emerald-500/15 text-emerald-300',
    },
  ];

  return (
    <section id="features" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-purple-200/70">
            Carefully engineered tools for emotional balance, self-expression, and peace of mind.
          </p>
        </div>

        {/* Feature Cards Grid (6 cards matching showcase layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl border border-purple-500/15 bg-gradient-to-b from-[#18122f]/80 to-[#100c22]/90 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${feat.border} ${feat.glow}`}
              >
                {/* Glowing icon container */}
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feat.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {feat.title}
                </h3>

                {/* Card Description */}
                <p className="mt-2 text-sm leading-relaxed text-purple-200/70">
                  {feat.desc}
                </p>

                {/* Subtle bottom edge gradient line */}
                <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
