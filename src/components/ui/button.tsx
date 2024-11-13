import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

// 아이콘 컴포넌트 정의
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="flex-shrink-0"
  >
    <path
      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const buttonVariants = cva(
  'inline-flex items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-40 disabled:bg-primary',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: [
          'border border-gray-300 rounded-lg font-medium',
          'bg-white text-gray-500',
          'hover:bg-gray-50 hover:text-black',
          'active:bg-gray-100 active:text-black',
          'disabled:bg-white disabled:text-gray-300 disabled:cursor-not-allowed',
        ],
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-14 w-[360px] flex-shrink-0 rounded-lg text-[18px] font-semibold',
        sm: 'h-9 rounded-md px-3',
        mid: 'w-[196px] px-[19px] py-3 gap-2.5 rounded-lg text-[16px] font-semibold',
        lg: 'h-11 rounded-md px-8',

        icon: 'w-14 h-14 group-hover/navbar:w-[196px] group-hover/navbar:px-[19px] flex-shrink-0 rounded-lg text-[16px] font-semibold',
      },
      hasIcon: {
        true: 'inline-flex items-center',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hasIcon: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const content =
      size === 'icon' ? (
        <>
          <PlusIcon />
          {icon && (
            <span className="opacity-0 w-0 group-hover/navbar:opacity-100 group-hover/navbar:w-auto group-hover/navbar:ml-2">
              {children}
            </span>
          )}
        </>
      ) : (
        <>
          {icon && <PlusIcon />}
          {children}
        </>
      );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, hasIcon: icon || size === 'icon', className })
        )}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
