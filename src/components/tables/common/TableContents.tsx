import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { TableListView } from '@/components/tables/common/TableListView';
import { TTSTableGridView } from '@/components/tables/tts/TTSTableGridView';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';

interface TableItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
  fileName?: string;
}

interface TableContentsProps {
  items: TableItem[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: () => void;
  onRegenerateItem?: (id: string) => void;
  onDownloadItem?: (id: string) => void;
  onPlay: (id: string) => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  type?: 'TTS' | 'VC' | 'CONCAT';
}

export const TableContents: React.FC<TableContentsProps> = ({
  items,
  onSelectionChange,
  onTextChange,
  onDelete,
  onAdd,
  onRegenerateItem,
  onDownloadItem,
  onPlay,
  onSelectAll,
  isAllSelected,
  type,
}) => {
  const selectedCount = items.filter((item) => item.isSelected).length;
  const [isListView, setIsListView] = React.useState(true);

  useEffect(() => {
    if (items.length === 0 && isAllSelected) {
      onSelectAll?.();
    }
  }, [items.length, isAllSelected, onSelectAll]);

  const handleRegenerate = useCallback(
    (itemId?: string) => {
      const selectedItems = items.filter((item) => item.isSelected);
      if (itemId) {
        onRegenerateItem?.(itemId);
      } else if (selectedItems.length > 0) {
        selectedItems.forEach((item) => onRegenerateItem?.(item.id));
      }
    },
    [items, onRegenerateItem]
  );

  const handleDownload = useCallback(
    (itemId?: string) => {
      const selectedItems = items.filter((item) => item.isSelected);
      if (itemId) {
        onDownloadItem?.(itemId);
      } else if (selectedItems.length > 0) {
        selectedItems.forEach((item) => onDownloadItem?.(item.id));
      }
    },
    [items, onDownloadItem]
  );

  const listItems = React.useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        text: item.text,
        isSelected: item.isSelected,
        onPlay: () => onPlay(item.id),
        speed: item.speed,
        volume: item.volume,
        pitch: item.pitch,
        onSelectionChange,
        onTextChange,
      })),
    [items, onPlay, onSelectionChange, onTextChange]
  );

  const gridItems = React.useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        text: item.text,
        isSelected: item.isSelected,
        audioUrl: '',
        speed: item.speed,
        volume: item.volume,
        pitch: item.pitch,
        onPlay: () => onPlay(item.id),
        onRegenerate: () => handleRegenerate(item.id),
        onDownload: () => handleDownload(item.id),
        onSelectionChange,
        onTextChange,
      })),
    [items, onPlay, handleRegenerate, handleDownload, onSelectionChange, onTextChange]
  );

  return (
    <div
      className={cn(
        'flex flex-col h-[580px]',
        isListView ? 'bg-white border rounded-md overflow-hidden' : 'bg-transparent'
      )}
    >
      <TableHeader
        onDelete={onDelete}
        onAdd={onAdd}
        onSelectAll={onSelectAll}
        isAllSelected={isAllSelected}
        isListView={isListView}
        onViewChange={setIsListView}
        itemCount={items.length}
        type={type}
      />
      <div className={cn('flex-1 min-h-0', !isListView && 'mb-4.5')}>
        {isListView ? (
          <div className="h-full relative">
            <div className="absolute inset-x-0 bottom-0 top-0">
              <ScrollArea className="h-full">
                <TableListView
                  rows={listItems}
                  onSelectionChange={onSelectionChange}
                  onTextChange={onTextChange}
                  type={type}
                />
              </ScrollArea>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-full mt-3">
            <TTSTableGridView items={gridItems} />
          </ScrollArea>
        )}
      </div>
      <TableFooter
        selectedCount={selectedCount}
        onRegenerate={() => handleRegenerate()}
        onDownload={() => handleDownload()}
        isListView={isListView}
        type={type}
      />
    </div>
  );
};
