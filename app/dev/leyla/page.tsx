'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LeylaAvatar } from '@/components/leyla/LeylaAvatar';
import { useLeylaState } from '@/components/leyla/useLeylaState';
import { LeylaState, LEYLA_STATE_LABELS } from '@/components/leyla/types';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowLeft,
  Volume2,
  Smile,
  Frown,
  Trophy,
  Moon,
  Wind,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

const ALL_STATES: LeylaState[] = [
  'idle',
  'listening',
  'thinking',
  'happy',
  'concerned',
  'calm',
  'celebrate',
  'sleepy',
  'hug',
];

export default function LeylaDevPreviewPage() {
  const {
    state,
    isCrisisLocked,
    setLeylaState,
    onTyping,
    onAwaitingResponse,
    onMoodSelect,
    onCelebrate,
    onBreathingActive,
    onCrisisTrigger,
  } = useLeylaState({ checkLateNight: false });

  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('2xl');
  const [typingSim, setTypingSim] = useState(false);
  const [breathingSim, setBreathingSim] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0914] text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-purple-500/15">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-purple-300 hover:text-white text-sm">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-purple-500/40">•</span>
            <div className="flex items-center gap-2 text-purple-200">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <h1 className="text-xl font-bold">Leyla Reactive Avatar Preview</h1>
            </div>
          </div>
          <div className="text-xs text-purple-300/60 font-mono bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-500/20">
            Phase 5 Dev Inspector
          </div>
        </div>

        {/* Crisis Warning Banner if Active */}
        {isCrisisLocked && (
          <div className="my-6 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
              <span>
                <strong>CRISIS MODE ACTIVE:</strong> Avatar is locked to &quot;concerned&quot; and playful animations are strictly disabled.
              </span>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCrisisTrigger(false)}
            >
              Reset Crisis Lock
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          
          {/* Left Column: Live Reactive Avatar & Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center p-8 rounded-3xl bg-[#140f26]/80 border border-purple-500/20 shadow-2xl backdrop-blur-xl">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-widest text-purple-400/80 font-bold">
                Current Active State
              </span>
              <h2 className="text-2xl font-black capitalize text-white flex items-center justify-center gap-2 mt-1">
                <span>{LEYLA_STATE_LABELS[state]?.moodEmoji}</span>
                <span>{state}</span>
              </h2>
              <p className="text-xs text-purple-200/70 mt-1 max-w-xs">
                {LEYLA_STATE_LABELS[state]?.description}
              </p>
            </div>

            {/* Live Interactive Avatar */}
            <div className="my-6 flex items-center justify-center">
              <LeylaAvatar
                state={state}
                size={selectedSize}
                priority
                showMoodHalo
                interactive
              />
            </div>

            {/* Size Switcher */}
            <div className="flex items-center gap-2 mt-4 bg-purple-950/40 p-1.5 rounded-xl border border-purple-500/20">
              {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                    selectedSize === s
                      ? 'bg-purple-600 text-white font-bold'
                      : 'text-purple-300/70 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Quick State Select Buttons */}
            <div className="mt-8 w-full">
              <div className="text-xs font-semibold text-purple-300/60 mb-2">
                Direct State Switch (300ms Crossfade):
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ALL_STATES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeylaState(st)}
                    disabled={isCrisisLocked}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      state === st
                        ? 'border-purple-400 bg-purple-600/30 text-white shadow-md'
                        : 'border-purple-500/15 bg-white/5 text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    <span>{LEYLA_STATE_LABELS[st]?.moodEmoji}</span>
                    <span className="capitalize">{st}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Trigger Machine Simulator */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-7 rounded-3xl bg-[#140f26]/80 border border-purple-500/20 shadow-xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                State Machine Trigger Simulator
              </h3>
              <p className="text-xs text-purple-200/70 mb-6">
                Test the real-world events that trigger Leyla&apos;s expressions in the app.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Trigger: User typing */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>User Typing / Voice Input</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Transitions avatar to &quot;listening&quot;.
                  </p>
                  <Button
                    size="sm"
                    variant={typingSim ? 'default' : 'outline'}
                    className="w-full text-xs"
                    onClick={() => {
                      const next = !typingSim;
                      setTypingSim(next);
                      onTyping(next);
                    }}
                  >
                    {typingSim ? 'Stop Typing' : 'Simulate Typing'}
                  </Button>
                </div>

                {/* Trigger: Model thinking */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
                    <span>AI Stream Generating</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Transitions avatar to &quot;thinking&quot;.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => {
                      onAwaitingResponse(true);
                      setTimeout(() => onAwaitingResponse(false), 2500);
                    }}
                  >
                    Simulate AI Thinking (2.5s)
                  </Button>
                </div>

                {/* Trigger: Mood Tracker Low */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Frown className="h-3.5 w-3.5 text-rose-400" />
                    <span>Low Mood (1 - Terrible / 2 - Sad)</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Transitions avatar to &quot;concerned&quot;.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => onMoodSelect(1)}
                  >
                    Log Terrible Mood (1)
                  </Button>
                </div>

                {/* Trigger: Mood Tracker High */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Smile className="h-3.5 w-3.5 text-emerald-400" />
                    <span>High Mood (4 - Good / 5 - Great)</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Transitions avatar to &quot;happy&quot;.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => onMoodSelect(5)}
                  >
                    Log Great Mood (5)
                  </Button>
                </div>

                {/* Trigger: Goal / Streak Completed */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Trophy className="h-3.5 w-3.5 text-amber-400" />
                    <span>Goal Completed / Milestone</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Transitions avatar to &quot;celebrate&quot;.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => onCelebrate()}
                  >
                    Simulate Milestone (5s)
                  </Button>
                </div>

                {/* Trigger: Breathing Active */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Wind className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Calm Space Breathing</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Transitions avatar to &quot;calm&quot;.
                  </p>
                  <Button
                    size="sm"
                    variant={breathingSim ? 'default' : 'outline'}
                    className="w-full text-xs"
                    onClick={() => {
                      const next = !breathingSim;
                      setBreathingSim(next);
                      onBreathingActive(next);
                    }}
                  >
                    {breathingSim ? 'End Breathing' : 'Start Breathing (calm)'}
                  </Button>
                </div>

                {/* Trigger: Late Night */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/15">
                  <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5 mb-2">
                    <Moon className="h-3.5 w-3.5 text-purple-400" />
                    <span>Late Night (&gt; 11:00 PM)</span>
                  </h4>
                  <p className="text-[11px] text-purple-300/60 mb-3">
                    Nudges the user toward rest (&quot;sleepy&quot;).
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => setLeylaState('sleepy')}
                  >
                    Simulate 11:30 PM (sleepy)
                  </Button>
                </div>

                {/* Trigger: Safety Crisis */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30">
                  <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                    <span>Crisis Classification High</span>
                  </h4>
                  <p className="text-[11px] text-rose-200/60 mb-3">
                    Forces &quot;concerned&quot; &amp; disables animations.
                  </p>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full text-xs"
                    onClick={() => onCrisisTrigger(!isCrisisLocked)}
                  >
                    {isCrisisLocked ? 'Unlock Crisis' : 'Lock Crisis Mode'}
                  </Button>
                </div>

              </div>
            </div>

            {/* Gallery of all 9 expressions */}
            <div className="p-7 rounded-3xl bg-[#140f26]/80 border border-purple-500/20 shadow-xl backdrop-blur-xl">
              <h3 className="text-sm font-bold text-white mb-4">
                Full 3×3 Expression Matrix
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {ALL_STATES.map((s) => (
                  <div
                    key={s}
                    onClick={() => setLeylaState(s)}
                    className="flex flex-col items-center p-3 rounded-2xl bg-[#1b1433] border border-purple-500/15 hover:border-purple-400/50 cursor-pointer transition-all hover:scale-105"
                  >
                    <LeylaAvatar state={s} size="lg" showMoodHalo={false} />
                    <span className="text-xs font-bold text-white capitalize mt-2">
                      {s}
                    </span>
                    <span className="text-[10px] text-purple-300/60">
                      {LEYLA_STATE_LABELS[s]?.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
