import React from 'react';

import { ConcatListRow } from '../concat/ConcatListRow';
import { TTSListRow } from '../tts/TTSListRow';
import { VCListRow } from '../vc/VCListRow';
import { ConcatTableHeader, TTSTableHeader, VCTableHeader } from './TableHeader';

interface ListRowProps {
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

interface TableListViewProps {
  rows: ListRowProps[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  type?: 'TTS' | 'VC' | 'CONCAT';
}

export const TableListView: React.FC<TableListViewProps> = ({
  rows,
  onSelectionChange,
  onTextChange,
  type = 'TTS',
}) => {
  const renderHeader = () => {
    switch (type) {
      case 'TTS':
        return <TTSTableHeader />;
      case 'VC':
        return <VCTableHeader />;
      case 'CONCAT':
        return <ConcatTableHeader />;
    }
  };

  const renderRow = (row: ListRowProps) => {
    switch (type) {
      case 'TTS':
        return (
          <TTSListRow {...row} onSelectionChange={onSelectionChange} onTextChange={onTextChange} />
        );
      case 'VC':
        return (
          <VCListRow {...row} onSelectionChange={onSelectionChange} onTextChange={onTextChange} />
        );
      case 'CONCAT':
        return (
          <ConcatListRow
            {...row}
            onSelectionChange={onSelectionChange}
            onTextChange={onTextChange}
          />
        );
    }
  };

  return (
    <div className="w-full mx-auto relative">
      {renderHeader()}
      {rows.map((row) => renderRow(row))}
    </div>
  );
};
