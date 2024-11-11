import { CirclePlus, Download, RefreshCw, Trash2 } from 'lucide-react';
import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { TTSTableGrid } from '@/components/tts/TTSTableGrid';
import { TtsTableList } from '@/components/tts/TTSTableList';
import { Checkbox } from '@/components/ui/CheckBox';
import { IconButton } from '@/components/ui/IconButton';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';
import ViewButtonGroup from '@/components/ui/ViewFilterButton';

interface TTSListItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
}

interface TableHeaderProps {
  onDelete: () => void;
  onAdd: () => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  isListView: boolean;
  onViewChange: (isListView: boolean) => void;
  itemCount: number;
}

interface TableFooterProps {
  selectedCount: number;
  onRegenerate: () => void;
  onDownload: () => void;
  isListView?: boolean;
}

interface TTSTableProps {
  items: TTSListItem[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: () => void;
  onRegenerateItem: (id: string) => void;
  onDownloadItem: (id: string) => void;
  onPlay: (id: string) => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  onDelete,
  onAdd,
  onSelectAll,
  isAllSelected,
  isListView,
  onViewChange,
  itemCount,
}) => (
  <div className="flex flex-col bg-white">
    <div className="flex items-center justify-between px-4 py-5 border-b">
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={itemCount > 0 && isAllSelected}
          onCheckedChange={onSelectAll}
          className="ml-2.5 mr-9"
        />
        <div onClick={onDelete} className="flex items-center gap-2 py-2 hover:cursor-pointer">
          <Trash2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-800">삭제</span>
        </div>
        <Separator orientation="vertical" className="h-6 mr-2" />
        <div onClick={onAdd} className="flex items-center gap-2 py-2 hover:cursor-pointer">
          <CirclePlus className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-800">텍스트 추가</span>
        </div>
      </div>
      <ViewButtonGroup isListView={isListView} onViewChange={onViewChange} />
    </div>
  </div>
);

export const TableFooter: React.FC<TableFooterProps> = ({
  selectedCount,
  onRegenerate,
  onDownload,
  isListView = true,
}) => (
  <div className="bg-white">
    <div className="flex items-center justify-between px-4 py-5 border-t">
      <div className="text-sm text-black font-medium ml-2">선택 항목: {selectedCount}</div>
      {isListView && (
        <div className="flex items-center space-x-2 mr-2">
          <IconButton
            icon={<RefreshCw />}
            label="재생성"
            iconBgColor="bg-blue-50"
            iconColor="text-blue-500"
            width="90px"
            onClick={onRegenerate}
          />
          <IconButton
            icon={<Download />}
            label="다운로드"
            iconBgColor="bg-blue-50"
            iconColor="text-blue-500"
            width="104px"
            onClick={onDownload}
          />
        </div>
      )}
    </div>
  </div>
);

export const TTSTable: React.FC<TTSTableProps> = ({
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
        onRegenerateItem(itemId);
      } else if (selectedItems.length > 0) {
        selectedItems.forEach((item) => onRegenerateItem(item.id));
      }
    },
    [items, onRegenerateItem]
  );

  const handleDownload = useCallback(
    (itemId?: string) => {
      const selectedItems = items.filter((item) => item.isSelected);
      if (itemId) {
        onDownloadItem(itemId);
      } else if (selectedItems.length > 0) {
        selectedItems.forEach((item) => onDownloadItem(item.id));
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
    <div className="flex flex-col h-[580px] bg-white">
      <TableHeader
        onDelete={onDelete}
        onAdd={onAdd}
        onSelectAll={onSelectAll}
        isAllSelected={isAllSelected}
        isListView={isListView}
        onViewChange={setIsListView}
        itemCount={items.length}
      />
      <div className="flex-1 min-h-0">
        {isListView ? (
          <>
            <div className="grid grid-cols-[auto,auto,1fr,auto] px-4 py-3 border-b bg-gray-50 text-sm font-medium text-black">
              <div className="w-4 ml-2 mr-2" />
              <div className="w-4 ml-2 mr-2" />
              <div className="ml-6">텍스트</div>
              <div className="w-[250px] flex gap-5">
                <div className="w-[60px] text-center">속도</div>
                <div className="w-[80px] text-center">볼륨</div>
                <div className="w-[60px] text-center">피치</div>
              </div>
            </div>
            <ScrollArea className="h-[calc(100%-48px)] pr-2">
              <TtsTableList
                rows={listItems}
                onSelectionChange={onSelectionChange}
                onTextChange={onTextChange}
              />
            </ScrollArea>
          </>
        ) : (
          <ScrollArea className="h-[calc(100%-48px)] pr-2">
            <TTSTableGrid items={gridItems} />
          </ScrollArea>
        )}
      </div>
      <TableFooter
        selectedCount={selectedCount}
        onRegenerate={() => handleRegenerate()}
        onDownload={() => handleDownload()}
        isListView={isListView}
      />
    </div>
  );
};
