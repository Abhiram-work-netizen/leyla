'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      step: '1',
      title: t('step1Title'),
      desc: t('step1Desc'),
      color: 'from-purple-500 to-indigo-500',
    },
    {
      step: '2',
      title: t('step2Title'),
      desc: t('step2Desc'),
      color: 'from-indigo-500 to-pink-500',
    },
    {
      step: '3',
      title: t('step3Title'),
      desc: t('step3Desc'),
      color: 'from-pink-500 to-rose-500',
    },
    {
      step: '4',
      title: t('step4Title'),
      desc: t('step4Desc'),
      color: 'from-rose-500 to-purple-500',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-[#0d0918]/60 border-y border-purple-500/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-purple-200/70">
            {t('subtitle')}
          </p>
        </div>

        {/* 4-Step Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-start p-6 rounded-2xl bg-[#140f28]/70 border border-purple-500/15 backdrop-blur-md">
              {/* Step indicator header */}
              <div className="flex items-center justify-between w-full mb-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${item.color} text-white font-bold text-sm shadow-md shadow-purple-500/20`}>
                  {item.step}
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block h-5 w-5 text-purple-400/40" />
                )}
              </div>

              {/* Step Content */}
              <h3 className="text-lg font-bold text-white tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-purple-200/65 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
