import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const LoginInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-lg border border-[#E4E4E4] bg-background px-4 py-3 text-base text-[#1B1B1B] ring-offset-background placeholder:text-[#ADADAD] focus:outline-none focus:border-[#3A74FE] focus:ring-[#3A74FE] focus:ring-1 disabled:cursor-not-allowed disabled:opacity-40',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
LoginInput.displayName = 'Input';

export { LoginInput };
