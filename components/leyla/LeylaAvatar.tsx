'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LeylaState, LeylaAvatarProps, LEYLA_STATE_LABELS } from './types';
import { cn } from '@/lib/utils';

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

const SIZE_CLASSES = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-36 h-36',
  '2xl': 'w-52 h-52 sm:w-64 sm:h-64',
};

export function LeylaAvatar({
  state = 'idle',
  className,
  size = 'md',
  showMoodHalo = true,
  interactive = false,
  onClick,
  priority = false,
}: LeylaAvatarProps) {
  const [activeState, setActiveState] = useState<LeylaState>(state);
  const [previousState, setPreviousState] = useState<LeylaState | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync state prop with internal state machine
  useEffect(() => {
    if (state !== activeState) {
      setPreviousState(activeState);
      setActiveState(state);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousState(null);
      }, 300); // 300ms crossfade

      return () => clearTimeout(timer);
    }
  }, [state, activeState]);

  // Micro-animation classes based on active state
  const isPlayful = activeState === 'celebrate' || activeState === 'happy';
  const isBreathing = activeState === 'calm' || activeState === 'idle';
  const isCrisisOrConcerned = activeState === 'concerned';

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={cn(
        'relative select-none flex-shrink-0 group',
        SIZE_CLASSES[size],
        interactive && 'cursor-pointer hover:scale-105 transition-transform duration-200',
        className
      )}
      role="img"
      aria-label={`Leyla Avatar (${LEYLA_STATE_LABELS[activeState]?.label || activeState})`}
    >
      {/* Background Mood Halo / Glow */}
      {showMoodHalo && (
        <div
          className={cn(
            'absolute inset-0 -z-10 rounded-full blur-xl transition-all duration-700 pointer-events-none',
            activeState === 'happy' && 'bg-emerald-500/25 scale-110',
            activeState === 'celebrate' && 'bg-amber-400/30 scale-125 animate-pulse',
            activeState === 'concerned' && 'bg-rose-500/20 scale-100',
            activeState === 'calm' && 'bg-indigo-500/25 scale-105 animate-pulse-soft',
            activeState === 'sleepy' && 'bg-purple-900/30 scale-95',
            activeState === 'thinking' && 'bg-fuchsia-500/20 scale-105',
            activeState === 'listening' && 'bg-cyan-500/20 scale-105',
            activeState === 'idle' && 'bg-purple-600/20 scale-105',
            activeState === 'hug' && 'bg-pink-500/25 scale-110'
          )}
        />
      )}

      {/* Main Avatar Frame */}
      <div
        className={cn(
          'relative w-full h-full overflow-hidden rounded-full border-2 transition-all duration-300',
          'border-purple-400/25 shadow-lg bg-[#140f26]',
          isBreathing && !isCrisisOrConcerned && 'animate-breathe',
          isPlayful && !isCrisisOrConcerned && 'hover:rotate-1'
        )}
      >
        {/* Render Previous State during 300ms crossfade */}
        {previousState && isTransitioning && (
          <div className="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 pointer-events-none">
            <Image
              src={`/leyla/leyla-${previousState}.webp`}
              alt="Leyla previous expression"
              fill
              sizes="(max-width: 768px) 150px, 250px"
              className="object-cover"
            />
          </div>
        )}

        {/* Current Active Expression */}
        <div
          className={cn(
            'absolute inset-0 z-20 transition-opacity duration-300',
            isTransitioning ? 'opacity-100' : 'opacity-100'
          )}
        >
          <Image
            src={`/leyla/leyla-${activeState}.webp`}
            alt={`Leyla is ${activeState}`}
            fill
            sizes="(max-width: 768px) 150px, 250px"
            className="object-cover"
            priority={priority}
          />
        </div>

        {/* Preload other states invisibly for instantaneous switching */}
        <div className="hidden" aria-hidden="true">
          {ALL_STATES.map((s) => (
            <Image
              key={s}
              src={`/leyla/leyla-${s}.webp`}
              alt=""
              width={10}
              height={10}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Small mood status indicator badge on bottom right for medium+ sizes */}
      {(size === 'lg' || size === 'xl' || size === '2xl') && (
        <div
          className={cn(
            'absolute bottom-0 right-0 z-30 flex items-center justify-center rounded-full border border-purple-400/30 bg-[#1e153b] shadow-md transition-transform duration-200',
            size === 'lg' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm'
          )}
          title={LEYLA_STATE_LABELS[activeState]?.label}
        >
          <span>{LEYLA_STATE_LABELS[activeState]?.moodEmoji}</span>
        </div>
      )}
    </div>
  );
}
