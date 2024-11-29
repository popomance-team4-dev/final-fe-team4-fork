import { useCallback, useState } from 'react';

export interface InterfaceHistoryItem {
  id: string;
  text: string;
  speed: number;
  volume: number;
  pitch: number;
}

export function usePlaybackHistory() {
  const [historyItems, setHistoryItems] = useState<InterfaceHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleDelete = useCallback((id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    historyItems,
    setHistoryItems,
    isHistoryOpen,
    setIsHistoryOpen,
    handleDelete,
  };
}
