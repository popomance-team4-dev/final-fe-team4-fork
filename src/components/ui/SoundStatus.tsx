'use client';

import { AudioWaveform, Play, Volume2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type StatusType = 'global_speed' | 'global_volume' | 'global_pitch';

interface SoundStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  type: StatusType;
  value: number;
}

const STATUS_CONFIGS = {
  global_speed: { icon: Play, unit: 'x' },
  global_volume: { icon: Volume2, unit: '%' },
  global_pitch: { icon: AudioWaveform, unit: '' },
} as const;

const SoundStatus = React.forwardRef<HTMLDivElement, SoundStatusProps>(
  ({ className, type, value, ...props }, ref) => {
    const { icon: Icon, unit } = STATUS_CONFIGS[type];

    return (
      <div
        ref={ref}
        className={cn('w-fit flex items-center gap-2 bg-purple-50 rounded-lg px-3 py-2', className)}
        {...props}
      >
        <Icon className="w-4 h-4 text-purple-900 flex-shrink-0" />
        <span className="text-sm text-purple-900">
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
    );
  }
);

SoundStatus.displayName = 'SoundStatus';

export { SoundStatus };
