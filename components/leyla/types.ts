export type LeylaState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'happy'
  | 'concerned'
  | 'calm'
  | 'celebrate'
  | 'sleepy'
  | 'hug';

export interface LeylaAvatarProps {
  state?: LeylaState;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showMoodHalo?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  priority?: boolean;
}

export const LEYLA_STATE_LABELS: Record<LeylaState, { label: string; description: string; moodEmoji: string }> = {
  idle: {
    label: 'Gentle & Present',
    description: 'Default calm presence, soft breathing and blinking',
    moodEmoji: '🌸',
  },
  listening: {
    label: 'Listening Closely',
    description: 'Head tilted, attentiveness as you type or speak',
    moodEmoji: '👂',
  },
  thinking: {
    label: 'Reflecting',
    description: 'Looking upward thoughtfully, considering your thoughts',
    moodEmoji: '✨',
  },
  happy: {
    label: 'Warmly Happy',
    description: 'Joyful smile and shared happiness for your wins',
    moodEmoji: '😊',
  },
  concerned: {
    label: 'Empathetic & Caring',
    description: 'Gentle compassionate brow, attentive to your struggle',
    moodEmoji: '🤍',
  },
  calm: {
    label: 'Peaceful Breathing',
    description: 'Eyes closed in rhythm, guiding relaxation and mindfulness',
    moodEmoji: '🍃',
  },
  celebrate: {
    label: 'Celebrating You',
    description: 'Fist up with sparkle, cheering for your streaks and milestones',
    moodEmoji: '🎉',
  },
  sleepy: {
    label: 'Restful Twilight',
    description: 'Gentle yawning / resting, nudging you toward healthy sleep',
    moodEmoji: '🌙',
  },
  hug: {
    label: 'Comforting Hug',
    description: 'Warm embrace with soft pillow, holding space for you',
    moodEmoji: '🫂',
  },
};
