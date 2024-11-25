import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { ProjectMainContentsItem } from '@/components/section/contents/project/ProjectMainContents';
import { ScrollArea } from '@/components/ui/scroll-area';
import TableUploadMessage from '@/images/table-upload-message.svg';
import { cn } from '@/lib/utils';
import { parseText } from '@/utils/textParser';

import { TTSTableGridView } from '../tts/TTSTableGridView';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableListView } from './TableListView';

interface TableContentsProps {
  items: ProjectMainContentsItem[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: (newItems?: ProjectMainContentsItem[]) => void;
  onRegenerateItem?: (id: string) => void;
  onDownloadItem?: (id: string) => void;
  onPlay: (id: string) => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  type?: 'TTS' | 'VC' | 'CONCAT';
  onReorder?: (items: ProjectMainContentsItem[]) => void;
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
  onReorder,
}) => {
  const selectedCount = items.filter((item) => item.isSelected).length;
  const [isListView, setIsListView] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (items.length === 0 && isAllSelected) {
      onSelectAll?.();
    }
  }, [items.length, isAllSelected, onSelectAll]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        onReorder?.(newItems);
      }
    }
  };

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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setIsLoading(true);
    try {
      const filePromises = Array.from(files).map((file) => file.text());
      const texts = await Promise.all(filePromises);

      const sentences = texts.flatMap((text) => parseText(text));

      const newItems: ProjectMainContentsItem[] = sentences.map((text) => ({
        id: crypto.randomUUID(),
        text,
        isSelected: false,
        speed: 1.0,
        volume: 60,
        pitch: 4.0,
      }));

      onAdd?.(newItems);
    } catch (error) {
      console.error('파일 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
      />
      <div className="flex-1 min-h-0">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-12">
            <img src={TableUploadMessage} alt="Empty table message" />
          </div>
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <ScrollArea className={cn('h-full', !isListView && 'mt-3')}>
                {isListView ? (
                  <TableListView
                    rows={listItems}
                    onSelectionChange={onSelectionChange}
                    onTextChange={onTextChange}
                    type={type}
                  />
                ) : (
                  <TTSTableGridView items={gridItems} />
                )}
              </ScrollArea>
            </SortableContext>
          </DndContext>
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
