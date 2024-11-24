import * as React from 'react';
import { TbCirclePlus, TbTrash } from 'react-icons/tb';

import { UploadAudioButton, UploadTextButton } from '@/components/custom/buttons/IconButton';
import ViewButtonGroup from '@/components/custom/buttons/ViewFilterButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface TableHeaderProps {
  onDelete: () => void;
  onAdd: () => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  isListView: boolean;
  onViewChange: (isListView: boolean) => void;
  itemCount: number;
  type?: 'TTS' | 'VC' | 'CONCAT';
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  onDelete,
  onAdd,
  onSelectAll,
  isAllSelected,
  isListView,
  onViewChange,
  itemCount,
  type = 'TTS',
}) => (
  <div className={cn('flex flex-col bg-white', !isListView ? 'rounded-md border' : 'border-b')}>
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={itemCount > 0 && isAllSelected}
          onCheckedChange={onSelectAll}
          className="mr-9"
        />
        <div onClick={onDelete} className="flex items-center gap-2 py-2 hover:cursor-pointer">
          <TbTrash className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-800">삭제</span>
        </div>
        {type === 'TTS' && (
          <>
            <Separator orientation="vertical" className="h-6 mr-2" />
            <div onClick={onAdd} className="flex items-center gap-2 py-2 hover:cursor-pointer">
              <TbCirclePlus className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-800">텍스트 추가</span>
            </div>
          </>
        )}
      </div>
      {type === 'TTS' ? (
        <ViewButtonGroup isListView={isListView} onViewChange={onViewChange} />
      ) : (
        <div className="flex items-center gap-4">
          <UploadAudioButton />
          <UploadTextButton />
        </div>
      )}
    </div>
  </div>
);
