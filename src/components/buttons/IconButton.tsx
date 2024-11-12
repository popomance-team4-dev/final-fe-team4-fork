import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  TbDeviceFloppy,
  TbDownload,
  TbRefresh,
  TbReload,
  TbStack,
  TbStack2,
  TbUpload,
} from 'react-icons/tb';

import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  asChild?: boolean;
  iconBgColor?: string;
  iconColor?: string;
  textColor?: string;
  width?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      asChild = false,
      iconBgColor,
      iconColor,
      textColor = 'text-gray-900',
      width = '228px',
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center text-sm font-medium transition-colors',
          'hover:bg-gray-100',
          'bg-gray-50',
          disabled ? 'opacity-40 cursor-not-allowed' : '',
          className
        )}
        aria-label={label}
        {...props}
        style={{
          display: 'flex',
          width,
          padding: '8px 10px',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '8px',
        }}
      >
        <span
          className={cn(iconBgColor, iconColor, 'flex items-center justify-center')}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '5px',
            fontSize: '20px',
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { width: 20, height: 20 })}
        </span>
        <span
          className={cn(textColor)}
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px',
          }}
        >
          {label}
        </span>
      </Comp>
    );
  }
);
IconButton.displayName = 'IconButton';

export function UploadButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbUpload />}
      label="텍스트 파일 업로드"
      iconBgColor="bg-purple-50"
      iconColor="text-purple-500"
      textColor="text-gray-800"
      width="167px"
      onClick={onClick}
    />
  );
}

export function SaveButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbDeviceFloppy />}
      label="저장"
      iconBgColor="bg-pink-50"
      iconColor="text-pink-500"
      textColor="text-gray-800"
      width="76px"
      onClick={onClick}
    />
  );
}

export function RecreateButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbReload />}
      label="재생성"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-500"
      textColor="text-gray-800"
      width="90px"
      onClick={onClick}
    />
  );
}

export function DownloadButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbDownload />}
      label="다운로드"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-500"
      textColor="text-gray-800"
      width="104px"
      onClick={onClick}
    />
  );
}

export function ApplySelectionButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbStack />}
      label="선택 적용"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
      onClick={onClick}
    />
  );
}

export function ApplyAllButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbStack2 />}
      label="전체 적용"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
      onClick={onClick}
    />
  );
}

export function ResetChangesButton({ onClick }: { onClick?: () => void }) {
  return (
    <IconButton
      icon={<TbRefresh />}
      label="변경 초기화"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
      onClick={onClick}
    />
  );
}

export { IconButton };
