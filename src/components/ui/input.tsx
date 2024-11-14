import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'login' | 'text';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'login', ...props }, ref) => {
    const loginStyles =
      'flex w-full rounded-lg border border-gray-100 bg-background px-4 py-3 text-base text-black ring-offset-background placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-primary focus:ring-1 disabled:cursor-not-allowed disabled:opacity-40';

    const textStyles =
      'pl-2 pr-2 border border-transparent focus:border focus:border-blue-500 rounded focus:outline-none';

    const baseStyles = variant === 'login' ? loginStyles : textStyles;

    return <input type={type} className={cn(baseStyles, className)} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';

export { Input, type InputProps };
