import React from 'react';

import { cn } from '@/lib/utils';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

const Tooltip = ({ text, className, ...props }: TooltipProps) => {
  return (
    <div
      className={cn(
        'relative inline-block p-4 max-w-[180px] flex-shrink-0 bg-[#111827] rounded-2xl',
        "before:content-[''] before:absolute before:bottom-0 before:left-8",
        'before:w-4 before:h-4 before:bg-[#111827]',
        'before:translate-y-1/2 before:rotate-45',
        className
      )}
      {...props}
    >
      <p className="text-[#FFF] font-pretendard text-xs font-medium leading-[18px] z-10 relative whitespace-pre-wrap break-words">
        {text}
      </p>
    </div>
  );
};

export default Tooltip;
