import { useEffect, useState } from 'react';
import { TbHistory } from 'react-icons/tb';

import { PlayButton } from '@/components/custom/buttons/PlayButton';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/custom/feature/SoundStatus';
import TTSPlaybackHistory from '@/components/custom/tables/project/tts/TTSPlaybackHistory';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ListRowProps {
  id: string;
  text: string;
  isSelected: boolean;
  onPlay: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  type?: 'TTS' | 'VC' | 'CONCAT';
  fileName?: string;
  speed?: number;
  volume?: number;
  pitch?: number;
}

interface IHistoryItem {
  id: string;
  text: string;
  speed: number;
  volume: number;
  pitch: number;
}

const ListRow: React.FC<ListRowProps> = ({
  id,
  text,
  isSelected,
  onPlay,
  speed,
  volume,
  pitch,
  onSelectionChange,
  onTextChange,
  type = 'TTS',
  fileName,
}) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState<IHistoryItem[]>([]);
  const [isHistoryViewEnabled, setHistoryViewEnabled] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(id, e.target.value);
  };

  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  // useEffect(() => {
  //   // Dummy data for history items 백엔드 로직이 들어갈 자라
  //   const dummyHistoryItems: IHistoryItem[] = [
  //     { id: '1', text: 'Sample text 1', speed: 1, volume: 1, pitch: 1 },
  //     { id: '2', text: 'Sample text 2', speed: 1.2, volume: 0.8, pitch: 1.1 },
  //   ];
  //   setHistoryItems(dummyHistoryItems);
  // }, []);

  useEffect(() => {
    if (historyItems.length > 0) {
      setHistoryViewEnabled(true);
    } else {
      setHistoryViewEnabled(false);
    }
  }, [historyItems.length]);

  // 음원 히스토리 내역 삭제
  const handleDelete = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (type === 'TTS') {
    return (
      <>
        <div className="flex items-center px-4 py-2 border-b">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelectionChange(id)}
            className="ml-2 mr-2"
          />
          <PlayButton onClick={onPlay} className="ml-2 mr-2 w-5 h-5" />
          <Textarea
            value={text}
            onChange={(e) => {
              handleTextChange(e);
              handleTextAreaResize(e.target);
            }}
            onInput={(e) => handleTextAreaResize(e.currentTarget)}
            placeholder="텍스트를 입력하세요."
            className="flex-1 ml-2 mr-4 min-h-[40px] border-0 overflow-hidden"
            rows={1}
          />
          <div className="flex gap-6">
            {type === 'TTS' && (
              <div className="flex items-center gap-4">
                {speed !== undefined && (
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.SPEED} value={speed} />
                )}
                {volume !== undefined && (
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={volume} />
                )}
                {pitch !== undefined && (
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={pitch} />
                )}
              </div>
            )}
            <div className="flex w-11 justify-center items-center">
              <TbHistory
                className={cn(
                  'w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-700',
                  isHistoryOpen && 'text-blue-700',
                  isHistoryViewEnabled ||
                    'pointer-events-none text-gray-700 opacity-50 cursor-not-allowed'
                )}
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              />
            </div>
          </div>
        </div>
        {isHistoryOpen && isHistoryViewEnabled && (
          <TTSPlaybackHistory historyItems={historyItems} handleDelete={handleDelete} />
        )}
      </>
    );
  }

  return (
    <div className="grid grid-cols-[auto,auto,200px,1fr] px-4 py-2 border-b items-center">
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelectionChange(id)}
        className="ml-2 mr-2"
      />
      <PlayButton onClick={onPlay} className="mx-2 w-5 h-5" />
      <div className="ml-4 truncate">{fileName || `${id}.wav`}</div>
      <Textarea
        value={text}
        onChange={(e) => {
          handleTextChange(e);
          handleTextAreaResize(e.target);
        }}
        onInput={(e) => handleTextAreaResize(e.currentTarget)}
        placeholder="텍스트를 입력하세요."
        className="flex-1 min-h-[40px] border-0 overflow-hidden w-full"
        rows={1}
      />
    </div>
  );
};

interface TableListViewProps {
  rows: Omit<ListRowProps, 'onTextChange'>[];
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
    if (type === 'TTS') {
      return (
        <div className="grid grid-cols-[auto,auto,1fr,auto] px-4 py-2 border-b bg-gray-50 text-sm font-medium text-black">
          <div className="w-4 ml-2 mr-2" />
          <div className="w-4 ml-2 mr-2" />
          <div className="ml-6">텍스트</div>
          <div className="flex gap-8">
            <div className="w-[56px] text-center">속도</div>
            <div className="w-[60px] text-center">볼륨</div>
            <div className="w-[60px] text-center">피치</div>
            <div className="text-center mr-3">내역</div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-[auto,auto,200px,1fr] px-4 py-2 border-b bg-gray-50 text-sm font-medium text-black">
        <div className="w-4 ml-2 mr-2" />
        <div className="w-4 ml-2 mr-2" />
        <div className="ml-6">파일명</div>
        <div className="ml-4">텍스트</div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto">
      {renderHeader()}
      {rows.map((row) => (
        <ListRow
          key={row.id}
          {...row}
          onSelectionChange={onSelectionChange}
          onTextChange={onTextChange}
          type={type}
        />
      ))}
    </div>
  );
};
