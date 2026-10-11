'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  Phone,
  Moon,
  Heart,
  BookOpen,
  Users,
  ShieldAlert,
  ExternalLink,
  Search,
} from 'lucide-react';
import { CRISIS_HELPLINES_BY_LOCALE } from '@/lib/safety/crisis';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const guides = [
    {
      id: '1',
      title: 'Managing Exam & Academic Anxiety',
      category: 'study',
      desc: 'Practical cognitive tools to break study paralysis, divide tasks into bite-sized 20-minute chunks, and manage pre-test palpitations.',
      time: '4 min read',
    },
    {
      id: '2',
      title: 'The 4-7-8 Breathing Guide for Sleep',
      category: 'sleep',
      desc: 'Why balancing breath ratios stimulates the vagus nerve and triggers the parasympathetic relaxation response before bedtime.',
      time: '3 min read',
    },
    {
      id: '3',
      title: 'Recognizing Emotional Burnout Early',
      category: 'self-care',
      desc: 'Physical signs of depleted emotional batteries and how to set gentle boundaries without guilt.',
      time: '5 min read',
    },
    {
      id: '4',
      title: 'Communicating When You Feel Overwhelmed',
      category: 'relationships',
      desc: 'Scripts and phrases to tell partners, friends, or parents that you need quiet space without pushing them away.',
      time: '4 min read',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'crisis', label: 'Crisis Hotlines' },
    { id: 'sleep', label: 'Better Sleep' },
    { id: 'study', label: 'Study & Exams' },
    { id: 'self-care', label: 'Self-Care' },
    { id: 'relationships', label: 'Relationships' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <LifeBuoy className="h-6 w-6 text-purple-400" />
          <span>Mental Wellness Resources &amp; Guides</span>
        </h2>
        <p className="text-xs text-purple-200/70 mt-1">
          Evidence-based psychological tools, grounding techniques, and 24/7 verified crisis lines.
        </p>
      </div>

      {/* Emergency Crisis Callout Section */}
      <div id="crisis" className="rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/60 to-purple-950/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="h-6 w-6 text-rose-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Emergency Crisis Helplines</h3>
            <p className="text-xs text-rose-200/80">
              Free, confidential, and available 24/7. Never hesitate to call.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {CRISIS_HELPLINES_BY_LOCALE.en.map((h, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-rose-500/20 bg-black/30 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white">{h.name}</h4>
                  <span className="text-[10px] text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full font-semibold">
                    {h.hours}
                  </span>
                </div>
                <p className="text-xs text-rose-200/70 mb-3">{h.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-rose-500/10">
                <a
                  href={`tel:${h.number.replace(/\D/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call {h.number}</span>
                </a>
                <a
                  href={h.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-300 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Website</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guides & Tools Section */}
      <div className="space-y-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/5 border border-purple-500/15 text-purple-200/70 hover:bg-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Guides List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides
            .filter((g) => selectedCategory === 'all' || g.category === selectedCategory)
            .map((g) => (
              <div
                key={g.id}
                className="p-6 rounded-3xl border border-purple-500/15 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 shadow-xl backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-purple-300/60 mb-2">
                    <span className="uppercase tracking-wider font-semibold">{g.category}</span>
                    <span>{g.time}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{g.title}</h4>
                  <p className="text-xs text-purple-200/80 leading-relaxed">{g.desc}</p>
                </div>

                <div className="pt-4 border-t border-purple-500/10 mt-6 flex items-center justify-between text-xs">
                  <span className="text-purple-400 font-semibold cursor-pointer hover:underline">
                    Read guide →
                  </span>
                  <span className="text-purple-300/40">Verified by Leyla Care</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
