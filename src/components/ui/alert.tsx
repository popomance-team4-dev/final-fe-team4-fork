import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { TbCircleCheckFilled, TbCircleXFilled } from 'react-icons/tb';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-6 flex items-center gap-4 animate-in fade-in-0 slide-in-from-top-1 duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-green-50 text-green-600 border-green-600/50 [&>svg]:text-green-600 dark:text-green-600 dark:border-green-900/50 dark:dark:border-green-900 shadow-[0_4px_12px_rgba(0,128,0,0.15)]',
        destructive:
          'border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600 dark:text-red-600 dark:border-red-900/50 dark:dark:border-red-900 bg-red-50 shadow-[0_4px_12px_rgba(220,38,38,0.15)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
    {variant === 'default' && <TbCircleCheckFilled className="h-7 w-7 text-gray-600" />}
    {variant === 'destructive' && <TbCircleXFilled className="h-7 w-7 text-red-600" />}
    {props.children}
  </div>
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-2 font-medium leading-none tracking-tight text-lg', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-lg leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
