export interface TableItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed?: number;
  volume?: number;
  pitch?: number;
  fileName?: string;
}

export interface HistoryItem {
  id: string;
  text: string;
  speed: number;
  volume: number;
  pitch: number;
}
