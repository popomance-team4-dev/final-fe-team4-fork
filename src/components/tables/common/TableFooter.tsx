import * as React from 'react';

import { DownloadButton, RecreateButton } from '@/components/buttons/IconButton';
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
          {type === 'TTS' && <RecreateButton onClick={onRegenerate} />}
          <DownloadButton onClick={onDownload} />
        </div>
      )}
    </div>
  </div>
);
