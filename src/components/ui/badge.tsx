import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        vc: 'bg-pink-50 text-pink-500 ring-pink-50',
        tts: 'bg-green-50 text-green-500 ring-green-50',
        concat: 'bg-yellow-50 text-yellow-500 ring-yellow-50',
        sound: 'w-fit bg-purple-50 rounded-md px-2 py-0.75 ring-purple-50',
      },
    },
    defaultVariants: {
      variant: 'tts',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

const AudioBadge = ({ type }: { type: 'VC' | 'TTS' | 'CONCAT' }) => {
  const variant = type.toLowerCase() as 'vc' | 'tts' | 'concat';

  return <Badge variant={variant}>{type}</Badge>;
};

export { AudioBadge, Badge, badgeVariants };
