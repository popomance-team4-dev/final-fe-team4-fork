import * as React from 'react';
import { TbCirclePlus, TbTrash } from 'react-icons/tb';

import { UploadAudioButton, UploadTextButton } from '@/components/custom/buttons/IconButton';
import ViewButtonGroup from '@/components/custom/buttons/ViewFilterButton';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { VC_TOOLTIP } from '@/constants/tooltips';
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
  onFileUpload: (files: FileList | null) => void;
  isLoading?: boolean;
  hasAudioFile?: boolean;
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
  onFileUpload,
  isLoading,
  hasAudioFile = false,
}) => (
  <div className={cn('flex flex-col bg-white', !isListView ? 'rounded-md border' : 'border-b')}>
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-4">
        <div className="flex items-center mr-9">
          <Checkbox
            id="select-all"
            checked={itemCount > 0 && isAllSelected}
            onCheckedChange={() => onSelectAll?.()}
            className="cursor-pointer"
          />
        </div>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-50 transition-colors"
        >
          <TbTrash className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-800">삭제</span>
        </button>
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
      <div className="flex items-center gap-4">
        {type === 'VC' ? (
          <div className="flex items-center gap-4">
            <UploadAudioButton onClick={onAdd} />
            <div className="flex items-center gap-2">
              <TooltipWrapper
                content={
                  hasAudioFile ? VC_TOOLTIP.UPLOAD_TEXT.ENABLED : VC_TOOLTIP.UPLOAD_TEXT.DISABLED
                }
              >
                <div>
                  <UploadTextButton
                    onClick={() => {
                      if (!hasAudioFile) return;
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.txt';
                      input.multiple = true;
                      input.onchange = (e) => {
                        onFileUpload((e.target as HTMLInputElement).files);
                      };
                      input.click();
                    }}
                    isLoading={isLoading}
                    disabled={!hasAudioFile}
                  />
                </div>
              </TooltipWrapper>
            </div>
          </div>
        ) : type === 'TTS' ? (
          <>
            <UploadTextButton
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.txt';
                input.multiple = true;
                input.onchange = (e) => {
                  onFileUpload((e.target as HTMLInputElement).files);
                };
                input.click();
              }}
              isLoading={isLoading}
            />
            <ViewButtonGroup isListView={isListView} onViewChange={onViewChange} />
          </>
        ) : (
          <>
            <UploadTextButton
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.txt';
                input.multiple = true;
                input.onchange = (e) => {
                  onFileUpload((e.target as HTMLInputElement).files);
                };
                input.click();
              }}
              isLoading={isLoading}
            />
            <UploadAudioButton onClick={onAdd} />
          </>
        )}
      </div>
    </div>
  </div>
);
