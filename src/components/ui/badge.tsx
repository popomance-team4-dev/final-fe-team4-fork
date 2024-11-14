import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        // HistoryTable 컴포넌트에서 사용하는 badge 스타일
        vc: 'bg-pink-50 text-pink-500 ring-pink-50',
        tts: 'bg-green-50 text-green-500 ring-green-50',
        concat: 'bg-yellow-50 text-yellow-500 ring-yellow-50',
        // SoundStatus 컴포넌트에서 사용하는 badge 스타일
        sound: 'w-fit bg-purple-50 rounded-md px-2 py-0.75 ring-purple-50',
        // TTSdropdown 컴포넌트에서 사용하는 badge 스타일
        statuscount:
          'bg-secondary rounded ml-2 h-[18px] flex items-center text-[#512A91] text-xs font-medium ring-0',
        workstatus: 'h-6 px-2 rounded text-sm font-medium transition-colors cursor-pointer ring-0',
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

export { Badge, badgeVariants };
