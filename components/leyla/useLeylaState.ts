'use client';

import { useState, useCallback, useEffect } from 'react';
import { LeylaState } from './types';

export interface UseLeylaStateOptions {
  initialState?: LeylaState;
  checkLateNight?: boolean;
}

export function useLeylaState(options: UseLeylaStateOptions = {}) {
  const { initialState = 'idle', checkLateNight = true } = options;
  const [state, setState] = useState<LeylaState>(initialState);
  const [isCrisisLocked, setIsCrisisLocked] = useState(false);

  // Check late night after 11pm (23:00)
  useEffect(() => {
    if (checkLateNight && !isCrisisLocked) {
      const hour = new Date().getHours();
      if (hour >= 23 || hour < 5) {
        setState('sleepy');
      }
    }
  }, [checkLateNight, isCrisisLocked]);

  // Set explicit state
  const setLeylaState = useCallback(
    (newState: LeylaState) => {
      if (isCrisisLocked) {
        // Crisis locks to concerned
        setState('concerned');
        return;
      }
      setState(newState);
    },
    [isCrisisLocked]
  );

  // Trigger: User is typing / recording voice
  const onTyping = useCallback(
    (isTyping: boolean) => {
      if (isCrisisLocked) return;
      if (isTyping) {
        setState('listening');
      } else {
        setState('idle');
      }
    },
    [isCrisisLocked]
  );

  // Trigger: Waiting for model completion
  const onAwaitingResponse = useCallback(
    (isAwaiting: boolean) => {
      if (isCrisisLocked) return;
      if (isAwaiting) {
        setState('thinking');
      } else {
        setState('idle');
      }
    },
    [isCrisisLocked]
  );

  // Trigger: Mood Picker (1-5 scale)
  // 1: Terrible -> concerned
  // 2: Sad -> concerned
  // 3: Okay -> idle / calm
  // 4: Good -> happy
  // 5: Great -> happy
  const onMoodSelect = useCallback(
    (moodScore: number) => {
      if (isCrisisLocked) return;
      if (moodScore <= 2) {
        setState('concerned');
      } else if (moodScore >= 4) {
        setState('happy');
      } else {
        setState('calm');
      }
    },
    [isCrisisLocked]
  );

  // Trigger: Streak Milestone or Completed Goal
  const onCelebrate = useCallback(() => {
    if (isCrisisLocked) return;
    setState('celebrate');
    // Return to happy or idle after 5 seconds
    const timer = setTimeout(() => {
      setState('happy');
    }, 5000);
    return () => clearTimeout(timer);
  }, [isCrisisLocked]);

  // Trigger: Breathing Exercise Active
  const onBreathingActive = useCallback(
    (isActive: boolean) => {
      if (isCrisisLocked) return;
      if (isActive) {
        setState('calm');
      } else {
        setState('idle');
      }
    },
    [isCrisisLocked]
  );

  // Trigger: Safety Crisis Response (Deterministic Lock)
  const onCrisisTrigger = useCallback((isCrisis: boolean) => {
    if (isCrisis) {
      setIsCrisisLocked(true);
      setState('concerned');
    } else {
      setIsCrisisLocked(false);
      setState('idle');
    }
  }, []);

  // Trigger: Model structured output expression
  const onModelExpression = useCallback(
    (expression?: LeylaState) => {
      if (isCrisisLocked) return;
      if (expression) {
        setState(expression);
      }
    },
    [isCrisisLocked]
  );

  return {
    state,
    isCrisisLocked,
    setLeylaState,
    onTyping,
    onAwaitingResponse,
    onMoodSelect,
    onCelebrate,
    onBreathingActive,
    onCrisisTrigger,
    onModelExpression,
  };
}
