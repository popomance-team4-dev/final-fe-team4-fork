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
  content: string;
  type: 'VC' | 'TTS' | 'CONCAT';
  status: '진행' | '대기중' | '실패' | '완료';
  createdAt: string;
}

export interface VCItem extends TableItem {
  fileName: string;
  status: '대기중' | '완료' | '실패' | '진행';
  originalAudioUrl?: string;
  convertedAudioUrl?: string;
}
