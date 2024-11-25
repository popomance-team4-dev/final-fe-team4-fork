import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';

import { ProjectMainContentsItem } from '@/components/section/contents/project/ProjectMainContents';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTableItems } from '@/hooks/useTableItems';
import { useTextFileUpload } from '@/hooks/useTextFileUpload';
import TableUploadMessage from '@/images/table-upload-message.svg';
import { cn } from '@/lib/utils';

import { TTSTableGridView } from '../tts/TTSTableGridView';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableListView } from './TableListView';

interface TableContentsProps {
  type?: 'TTS' | 'VC' | 'CONCAT';
  items: ProjectMainContentsItem[];
  onAdd: () => void;
  onDelete: (ids: string[]) => void;
  onPlay: (id: string) => void;
  onSelectionChange: (id: string, isSelected: boolean) => void;
  onTextChange: (id: string, text: string) => void;
  onItemsChange: (items: ProjectMainContentsItem[]) => void;
}

export const TableContents = ({
  type = 'TTS',
  items,
  onAdd,
  onDelete,
  onPlay,
  onSelectionChange,
  onTextChange,
  onItemsChange,
}: TableContentsProps) => {
  const [isListView, setIsListView] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    })
  );

  const { handleFileChange, isLoading } = useTextFileUpload({
    onFileUpload: (texts) => {
      const newItems = texts.map((text) => ({
        id: crypto.randomUUID(),
        text,
        isSelected: false,
      }));
      onItemsChange([...items, ...newItems]);
    },
    onError: (errorMessage) => {
      setError(errorMessage);
    },
  });

  const { handleRegenerate, handleDownload, listItems, gridItems, selectedCount } = useTableItems({
    items,
    onPlay,
    onDelete: (id) => onDelete([id]),
    onSelectionChange,
    onTextChange,
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        onItemsChange(newItems);
      }
    },
    [items, onItemsChange]
  );

  const handleSelectAll = useCallback(() => {
    const allSelected = items.every((item) => item.isSelected);
    const newItems = items.map((item) => ({
      ...item,
      isSelected: !allSelected,
    }));
    onItemsChange(newItems);
  }, [items, onItemsChange]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="fixed top-4 right-4 w-96">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col h-full">
        <TableHeader
          onDelete={() => onDelete(items.filter((item) => item.isSelected).map((item) => item.id))}
          onAdd={onAdd}
          onSelectAll={handleSelectAll}
          isAllSelected={items.every((item) => item.isSelected)}
          isListView={isListView}
          onViewChange={setIsListView}
          itemCount={items.length}
          type={type}
          onFileUpload={handleFileChange}
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
                      onSelectionChange={(id) =>
                        onSelectionChange(id, !items.find((item) => item.id === id)?.isSelected)
                      }
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
          onRegenerate={handleRegenerate}
          onDownload={handleDownload}
          isListView={isListView}
          type={type}
        />
      </div>
    </>
  );
};
