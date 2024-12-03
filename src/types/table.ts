export interface TableItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed?: number;
  volume?: number;
  pitch?: number;
  fileName?: string;
}

export interface ProjectListTableItem {
  id: string;
  order: string;
  projectName: string;
  fileName: string;
  script: string;
  projectType: 'VC' | 'TTS' | 'CONCAT';
  status: '진행' | '대기중' | '실패' | '완료';
  updatedAt: string;
  speed?: number;
  volume?: number;
  pitch?: number;
}

export interface VCItem extends TableItem {
  fileName: string;
  status: '대기중' | '완료' | '실패' | '진행';
  originalAudioUrl?: string;
  convertedAudioUrl?: string;
  targetVoice?: string;
  file?: File;
}

export interface ConcatTableItem extends TableItem {
  audioUrl: string;
  frontSilence: number;
  backSilence: number;
  duration: number;
  fileName: string;
  silentRegions: { start: number; end: number }[];
}

export interface ListRowProps {
  id: string;
  text: string;
  isSelected: boolean;
  onPlay: (id: string) => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  type?: 'TTS' | 'VC' | 'CONCAT';
  fileName?: string;
  speed: number;
  volume: number;
  pitch: number;
  convertedAudioUrl?: string;
  status?: '대기중' | '완료' | '실패' | '진행';
  targetVoice?: string;
  frontSilence?: number;
  backSilence?: number;
  endSilence?: number;
}
