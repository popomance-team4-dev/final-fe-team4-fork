import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ERROR_MESSAGES } from '@/constants/messages';
import { useTableItems } from '@/hooks/useTableItems';
import TableUploadMessage from '@/images/table-upload-message.svg';
import { cn } from '@/lib/utils';
import { TableItem } from '@/types/table';
import { validateTextFile } from '@/utils/fileValidator';
import { parseText } from '@/utils/textParser';

import { TTSTableGridView } from '../tts/TTSTableGridView';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableListView } from './TableListView';

interface TableContentsProps {
  items: TableItem[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: (newItems?: TableItem[]) => void;
  onRegenerateItem?: (id: string) => void;
  onDownloadItem?: (id: string) => void;
  onPlay: (id: string) => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
  type?: 'TTS' | 'VC' | 'CONCAT';
  onReorder?: (items: TableItem[]) => void;
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
  const [isListView, setIsListView] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const { selectedCount, handleRegenerate, handleDownload, listItems, gridItems } = useTableItems({
    items,
    onPlay,
    onRegenerateItem,
    onDownloadItem,
    onSelectionChange,
    onTextChange,
  });

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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    setError(null);

    try {
      // 파일 타입 검증
      const invalidFiles = Array.from(files).filter((file) => {
        try {
          return !validateTextFile(file);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
          return true;
        }
      });

      if (invalidFiles.length > 0) {
        return;
      }

      setIsLoading(true);
      const filePromises = Array.from(files).map((file) => file.text());
      const texts = await Promise.all(filePromises);

      const sentences = texts.flatMap((text) => parseText(text));

      const newItems = sentences.map((text) => ({
        id: crypto.randomUUID(),
        text,
        isSelected: false,
        speed: 1.0,
        volume: 60,
        pitch: 4.0,
      }));

      onAdd(newItems);
    } catch (error) {
      setError(ERROR_MESSAGES.FILE_UPLOAD_FAILED);
      console.error('파일 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          variant="destructive"
          className="fixed left-1/2 top-8 -translate-x-1/2 transform z-[9999] w-auto min-w-[300px] max-w-[400px] shadow-lg bg-white border border-red-200"
        >
          <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
        </Alert>
      )}
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
    </>
  );
};
