import { AlignJustify, LayoutGrid } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface ViewButtonProps {
  label: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  position: 'left' | 'right';
  ariaLabel: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  label,
  isSelected,
  onClick,
  position,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        ' flex items-center justify-center p-1.5 transition-colors border w-7 h-6',
        position === 'left' ? 'rounded-l-full' : 'rounded-r-full',
        isSelected ? 'bg-blue-50 border-blue-600 text-blue-600' : 'border-gray-300'
      )}
    >
      {label}
    </button>
  );
};

const ViewButtonGroup: React.FC = () => {
  const [isListView, setIsListView] = useState(true);

  return (
    <div className="flex rounded-full border-blue-500">
      <ViewButton
        label={<AlignJustify />}
        isSelected={isListView}
        onClick={() => setIsListView(true)}
        position="left"
        ariaLabel="리스트 보기"
      />
      <ViewButton
        label={<LayoutGrid />}
        isSelected={!isListView}
        onClick={() => setIsListView(false)}
        position="right"
        ariaLabel="그리드 보기"
      />
    </div>
  );
};

export default ViewButtonGroup;
