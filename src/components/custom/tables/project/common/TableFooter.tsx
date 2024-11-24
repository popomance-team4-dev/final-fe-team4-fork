import * as React from 'react';

import { DownloadButton, RecreateButton } from '@/components/custom/buttons/IconButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface TableFooterProps {
  selectedCount: number;
  onRegenerate: () => void;
  onDownload: () => void;
  isListView: boolean;
  type?: 'TTS' | 'VC' | 'CONCAT';
}

export const TableFooter: React.FC<TableFooterProps> = ({
  selectedCount,
  onRegenerate,
  onDownload,
  isListView,
  type = 'TTS',
}) => (
  <div className={cn('bg-white', !isListView && 'rounded-md border mt-4')}>
    <div
      className={`flex items-center justify-between px-4 ${isListView ? 'py-4 border-t' : 'h-[40px]'}`}
    >
      <div className="text-sm text-black font-medium ml-2">선택 항목: {selectedCount}</div>
      {isListView && (
        <div className="flex items-center space-x-6 mr-2">
          {type === 'TTS' && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <RecreateButton onClick={onRegenerate} />
                  </div>
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>선택한 텍스트 재생성하기</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DownloadButton onClick={onDownload} />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>선택한 음성 파일 다운로드</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  </div>
);
