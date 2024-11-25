import { useCallback, useMemo } from 'react';

import { ProjectMainContentsItem } from '@/components/section/contents/project/ProjectMainContents';

interface UseTableItemsProps {
  items: ProjectMainContentsItem[];
  onPlay: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelectionChange?: (id: string, isSelected: boolean) => void;
  onTextChange?: (id: string, text: string) => void;
}

export const useTableItems = ({
  items,
  onPlay,
  onDelete,
  onSelectionChange,
  onTextChange,
}: UseTableItemsProps) => {
  const handleRegenerate = useCallback(
    (itemId?: string) => {
      const selectedItems = items.filter((item) => item.isSelected);
      if (itemId) {
        onDelete?.(itemId);
      } else if (selectedItems.length > 0) {
        selectedItems.forEach((item) => onDelete?.(item.id));
      }
    },
    [items, onDelete]
  );

  const handleDownload = useCallback(
    (itemId?: string) => {
      const selectedItems = items.filter((item) => item.isSelected);
      if (itemId) {
        onDelete?.(itemId);
      } else if (selectedItems.length > 0) {
        selectedItems.forEach((item) => onDelete?.(item.id));
      }
    },
    [items, onDelete]
  );

  const listItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        text: item.text,
        isSelected: item.isSelected,
        onPlay: () => onPlay(item.id),
        speed: item.speed,
        volume: item.volume,
        pitch: item.pitch,
        onSelectionChange: (id: string) => onSelectionChange?.(id, !item.isSelected),
        onTextChange: (id: string, newText: string) => onTextChange?.(id, newText),
      })),
    [items, onPlay, onSelectionChange, onTextChange]
  );

  const gridItems = useMemo(
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
        onSelectionChange: (id: string) => onSelectionChange?.(id, !item.isSelected),
        onTextChange: (id: string, newText: string) => onTextChange?.(id, newText),
      })),
    [items, onPlay, handleRegenerate, handleDownload, onSelectionChange, onTextChange]
  );

  const selectedCount = useMemo(() => items.filter((item) => item.isSelected).length, [items]);

  return {
    handleRegenerate,
    handleDownload,
    listItems,
    gridItems,
    selectedCount,
  };
};
