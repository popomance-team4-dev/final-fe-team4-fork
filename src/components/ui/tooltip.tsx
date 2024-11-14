import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'relative inline-block p-4 max-w-[180px] flex-shrink-0 bg-gray-900 rounded-2xl',
      "before:content-[''] before:absolute before:bottom-0 before:left-8",
      'before:w-4 before:h-4 before:bg-gray-900',
      'before:translate-y-1/2 before:rotate-45',
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

interface TooltipWrapperProps {
  text: string;
  children: React.ReactNode;
  delayDuration?: number;
  className?: string;
}

const TooltipWrapper = ({ text, children, delayDuration = 0, className }: TooltipWrapperProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className}>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipWrapper };
