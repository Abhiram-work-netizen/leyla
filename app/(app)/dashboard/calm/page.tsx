'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';

type BreathingTechnique = 'box' | '4-7-8';

export default function CalmSpacePage() {
  const [technique, setTechnique] = useState<BreathingTechnique>('4-7-8');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);

  // Breathing Cycle Logic
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (technique === '4-7-8') {
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 7;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 8;
          } else {
            setPhase('Inhale');
            return 4;
          }
        } else {
          // Box breathing (4-4-4-4)
          if (phase === 'Inhale') {
            setPhase('Hold');
            return 4;
          } else if (phase === 'Hold') {
            setPhase('Exhale');
            return 4;
          } else {
            setPhase('Inhale');
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, technique]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setSecondsLeft(technique === '4-7-8' ? 4 : 4);
  };

  const groundingItems = [
    { num: 5, label: 'Things you can see around you right now' },
    { num: 4, label: 'Things you can physically touch (your sweater, desk, hands)' },
    { num: 3, label: 'Things you can hear (birds, a fan, subtle hum)' },
    { num: 2, label: 'Things you can smell (tea, rain, fresh air)' },
    { num: 1, label: 'Thing you can taste or savor' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Wind className="h-6 w-6 text-indigo-400" />
            <span>Calm Space &amp; Grounding</span>
          </h2>
          <p className="text-xs text-purple-200/70 mt-1">
            Step away from mental chatter. Slow down your heart rate and settle your nervous system.
          </p>
        </div>

        {/* Ambient audio toggle */}
        <button
          type="button"
          onClick={() => setAmbientAudio(!ambientAudio)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            ambientAudio
              ? 'border-indigo-400/50 bg-indigo-500/20 text-indigo-200 shadow-md shadow-indigo-500/20'
              : 'border-purple-500/15 bg-white/5 text-purple-200/70 hover:bg-white/10'
          }`}
        >
          {ambientAudio ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          <span>{ambientAudio ? 'Ambient Rain Playing' : 'Play Ambient Sound'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Breathing Circle */}
        <div className="lg:col-span-7 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-between min-h-[520px]">
          
          {/* Technique Switcher */}
          <div className="flex items-center gap-2 bg-purple-950/40 p-1 rounded-xl border border-purple-500/20 text-xs">
            <button
              type="button"
              onClick={() => {
                setTechnique('4-7-8');
                handleReset();
              }}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                technique === '4-7-8'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-300/70 hover:text-white'
              }`}
            >
              4-7-8 Relaxing Breath
            </button>
            <button
              type="button"
              onClick={() => {
                setTechnique('box');
                handleReset();
              }}
              className={`px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                technique === 'box'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-300/70 hover:text-white'
              }`}
            >
              Box Breathing (4-4-4)
            </button>
          </div>

          {/* Animated Breath Visualizer Circle */}
          <div className="relative my-8 flex items-center justify-center">
            {/* Soft Ambient Halo */}
            <div
              className={`absolute h-64 w-64 rounded-full bg-indigo-500/20 blur-2xl transition-all duration-1000 ${
                phase === 'Inhale'
                  ? 'scale-125 opacity-80'
                  : phase === 'Hold'
                  ? 'scale-125 opacity-100'
                  : 'scale-90 opacity-40'
              }`}
            />

            {/* Expanding/Contracting Pulse Ring */}
            <div
              className={`relative flex h-56 w-56 items-center justify-center rounded-full border-4 transition-all duration-1000 ${
                phase === 'Inhale'
                  ? 'border-purple-400 bg-purple-600/25 scale-110 shadow-2xl shadow-purple-500/30'
                  : phase === 'Hold'
                  ? 'border-indigo-400 bg-indigo-600/25 scale-110 shadow-2xl shadow-indigo-500/30'
                  : 'border-pink-400 bg-pink-600/15 scale-90 shadow-md'
              }`}
            >
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-purple-300 font-bold block mb-1">
                  {phase}
                </span>
                <span className="text-5xl font-black text-white block">
                  {secondsLeft}s
                </span>
                <span className="text-[11px] text-purple-200/60 mt-1 block">
                  {phase === 'Inhale'
                    ? 'Breathe in softly'
                    : phase === 'Hold'
                    ? 'Gently retain'
                    : 'Slowly let go'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={() => setIsActive(!isActive)}
              className="rounded-2xl px-8 py-5 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-500 shadow-xl cursor-pointer"
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" /> Start Breathing
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={handleReset}
              className="p-3 rounded-2xl border border-purple-500/20 bg-white/5 text-purple-200 hover:bg-white/10 transition-colors"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Leyla Companion in Calm State & 5-4-3-2-1 Grounding */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Leyla Companion in Calm State */}
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl flex items-center gap-5">
            <LeylaAvatar state="calm" size="lg" showMoodHalo priority />
            <div>
              <h4 className="text-sm font-bold text-white">Leyla is breathing with you</h4>
              <p className="text-xs text-purple-200/70 mt-1 leading-relaxed">
                Eyes closed, steady pulse. There is nowhere else you need to be and nothing you need to solve right now.
              </p>
            </div>
          </div>

          {/* 5-4-3-2-1 Grounding Guide */}
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-[#16102a]/95 to-[#100c22]/95 p-6 shadow-xl backdrop-blur-xl">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>5-4-3-2-1 Sensory Grounding</span>
            </h4>
            <p className="text-xs text-purple-300/60 mb-5">
              Anchor your nervous system in the physical room when feeling overwhelmed.
            </p>

            <div className="space-y-3">
              {groundingItems.map((item, idx) => (
                <div
                  key={item.num}
                  onClick={() => setGroundingStep(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    groundingStep === idx
                      ? 'border-purple-400 bg-purple-600/20 text-white'
                      : 'border-purple-500/15 bg-white/[0.02] text-purple-300/70 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/20 text-xs font-bold text-purple-300">
                    {item.num}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
