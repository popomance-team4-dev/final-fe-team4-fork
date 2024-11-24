import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 10, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={className?.includes('history-icon') ? 10 : sideOffset}
    align={className?.includes('history-icon') ? 'start' : undefined}
    alignOffset={className?.includes('history-icon') ? -60 : undefined}
    className={cn(
      'relative inline-block p-4 max-w-[180px] flex-shrink-0 bg-gray-900 rounded-2xl',
      "before:content-[''] before:absolute",
      'before:w-4 before:h-4 before:bg-gray-900 before:rotate-45',
      className?.includes('history-icon')
        ? 'before:bottom-0 before:right-8 before:translate-x-0 before:translate-y-1/3'
        : 'before:bottom-0 before:left-8 before:translate-y-1/2',
      'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  >
    <p className="text-white font-pretendard text-xs font-medium leading-[18px] z-10 relative whitespace-pre-wrap break-words">
      {props.children}
    </p>
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
