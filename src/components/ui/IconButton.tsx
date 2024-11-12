import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { FiPlay } from 'react-icons/fi';
import { PiTrashBold } from 'react-icons/pi';
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

export function UploadButton() {
  return (
    <IconButton
      icon={<TbUpload />}
      label="텍스트 파일 업로드"
      iconBgColor="bg-purple-50"
      iconColor="text-purple-500"
      textColor="text-gray-800"
      width="167px"
    />
  );
}

export function SaveButton() {
  return (
    <IconButton
      icon={<TbDeviceFloppy />}
      label="저장"
      iconBgColor="bg-pink-50"
      iconColor="text-pink-500"
      textColor="text-gray-800"
      width="76px"
    />
  );
}

export function RecreateButton() {
  return (
    <IconButton
      icon={<TbReload />}
      label="재생성"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-500"
      textColor="text-gray-800"
      width="90px"
    />
  );
}

export function DownloadButton() {
  return (
    <IconButton
      icon={<TbDownload />}
      label="다운로드"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-500"
      textColor="text-gray-800"
      width="104px"
    />
  );
}

export function ApplySelectionButton() {
  return (
    <IconButton
      icon={<TbStack />}
      label="선택 적용"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
    />
  );
}

export function ApplyAllButton() {
  return (
    <IconButton
      icon={<TbStack2 />}
      label="전체 적용"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
    />
  );
}

export function ResetChangesButton() {
  return (
    <IconButton
      icon={<TbRefresh />}
      label="변경 초기화"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
    />
  );
}

export function DeleteCompletedButton() {
  return (
    <IconButton
      icon={<PiTrashBold />}
      label="완료 작업 삭제"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-500"
      width="228px"
    />
  );
}

export function RetryFailedButton() {
  return (
    <IconButton
      icon={<FiPlay />}
      label="실패 작업 재실행"
      iconBgColor="bg-blue-50"
      iconColor="text-blue-600"
      width="228px"
    />
  );
}

export { IconButton };
