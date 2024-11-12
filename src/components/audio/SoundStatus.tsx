'use client';

import { AudioWaveform, CirclePlay, Volume2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const UNIT_SOUND_STATUS_TYPES = {
  SPEED: 'unit_speed',
  VOLUME: 'unit_volume',
  PITCH: 'unit_pitch',
} as const;

export type UnitStatusType = (typeof UNIT_SOUND_STATUS_TYPES)[keyof typeof UNIT_SOUND_STATUS_TYPES];

interface SoundStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  type: UnitStatusType;
  value: number;
  showLabel?: boolean;
}

export const STATUS_CONFIGS = {
  [UNIT_SOUND_STATUS_TYPES.SPEED]: { icon: CirclePlay, unit: 'x', label: '속도' },
  [UNIT_SOUND_STATUS_TYPES.VOLUME]: { icon: Volume2, unit: '%', label: '볼륨' },
  [UNIT_SOUND_STATUS_TYPES.PITCH]: { icon: AudioWaveform, unit: '', label: '피치' },
} as const;

const SoundStatus = React.forwardRef<HTMLDivElement, SoundStatusProps>(
  ({ className, type, value, showLabel = false, ...props }, ref) => {
    const { icon: Icon, unit, label } = STATUS_CONFIGS[type];

    return (
      <div
        ref={ref}
        className={cn(
          'w-fit flex items-center gap-2 bg-purple-50 rounded-md px-2 py-0.75',
          className
        )}
        {...props}
      >
        <Icon className="w-4.5 h-4.5 text-purple-900 flex-shrink-0" />
        <span className="text-sm text-purple-900">
          {showLabel ? `${label} ` : ''}
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
    );
  }
);

SoundStatus.displayName = 'SoundStatus';

export { SoundStatus };
