'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
import { TbChevronDown, TbChevronUp, TbMoodSmile, TbMoodSmileFilled } from 'react-icons/tb';

import { cn } from '@/lib/utils';

const Select = ({
  children,
  onValueChange,
  selectedValue,
  selectedGender,
  ...props
}: {
  children: React.ReactNode;
  onValueChange: (value: string, gender: '남자' | '여자') => void;
  selectedValue: string;
  selectedGender: '남자' | '여자';
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SelectPrimitive.Root
      onOpenChange={setIsOpen}
      onValueChange={(value) => {
        const selectedChild = React.Children.toArray(children).find(
          (child) => React.isValidElement(child) && child.props.value === value
        ) as React.ReactElement<{ gender: '남자' | '여자'; value: string }>;

        if (selectedChild) {
          const gender = selectedChild.props.gender;
          onValueChange(value, gender);
        } else {
          console.error('Invalid value:', value);
        }
      }}
      {...props}
    >
      <SelectTrigger selectedValue={selectedValue} gender={selectedGender} isOpen={isOpen} />
      <SelectContent>{children}</SelectContent>
    </SelectPrimitive.Root>
  );
};

const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  gender?: '남자' | '여자';
  isOpen?: boolean;
  selectedValue?: string;
};

const SelectTrigger = React.forwardRef<SelectTriggerElement, SelectTriggerProps>(
  ({ className, gender = '여자', selectedValue = '선택하세요', isOpen = false, ...props }, ref) => {
    const Icon = gender === '여자' ? TbMoodSmile : TbMoodSmileFilled;

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between rounded-md',
          'border border-gray-300 bg-white',
          'px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-expanded={isOpen}
        {...props}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {selectedValue}
        </div>
        <SelectPrimitive.Icon asChild>
          {isOpen ? <TbChevronUp className="h-4 w-4" /> : <TbChevronDown className="h-4 w-4" />}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

const SelectContent = React.forwardRef<SelectContentElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 w-[var(--radix-select-trigger-width)] overflow-hidden',
          'rounded-md',
          'bg-white text-black shadow-md',
          className
        )}
        position="popper"
        side="bottom"
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

type SelectItemElement = React.ElementRef<typeof SelectPrimitive.Item>;
type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  gender?: '남자' | '여자';
};

const SelectItem = React.forwardRef<SelectItemElement, SelectItemProps>(
  ({ className, children, gender = '여자', ...props }, ref) => {
    const Icon = gender === '여자' ? TbMoodSmile : TbMoodSmileFilled;

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          'relative flex w-full cursor-default select-none items-center',
          'rounded-sm py-1.5 px-3 text-sm outline-none',
          'focus:bg-gray-50',
          className
        )}
        data-gender={gender}
        {...props}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </div>
      </SelectPrimitive.Item>
    );
  }
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue };
