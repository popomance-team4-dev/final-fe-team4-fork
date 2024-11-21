import { useEffect, useState } from 'react';
import { TbHistory } from 'react-icons/tb';

import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/audio/SoundStatus';
import { PlayButton } from '@/components/buttons/PlayButton';
import TTSPlaybackHistory from '@/components/tts/TTSPlaybackHistory';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TextRowProps {
  id: string;
  text: string;
  isSelected: boolean;
  onPlay: () => void;
  speed: number;
  volume: number;
  pitch: number;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
}

const TextRow: React.FC<TextRowProps> = ({
  id,
  text,
  isSelected,
  onPlay,
  speed,
  volume,
  pitch,
  onSelectionChange,
  onTextChange,
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(id, e.target.value);
  };

  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  // 음원 히스토리 내역 토글
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // 가짜 음원 히스토리 데이터
  const fakeHistoryItems = [
    {
      id: '1',
      text: '안녕하세요. 반갑습니다.',
      speed: 1.0,
      volume: 60.0,
      pitch: 4.0,
    },
    {
      id: '2',
      text: '안녕하세요. 반갑습니다.',
      speed: 1.0,
      volume: 60.0,
      pitch: 4.0,
    },
    {
      id: '3',
      text: '안녕하세요. 반갑습니다.',
      speed: 1.0,
      volume: 60.0,
      pitch: 4.0,
    },
  ];

  // 음원 히스토리 내역들
  const [historyItems, setHistoryItems] = useState([...fakeHistoryItems]);

  // 음원 히스토리 내역 초기화

  useEffect(() => {
    // 히스토리 내역을 백엔드에서 가져오는 로직이 있어야됨
    // const historyItems = await fetchHistoryItems();
    setHistoryItems([...fakeHistoryItems]);
  }, []);

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
          <SoundStatus type={UNIT_SOUND_STATUS_TYPES.SPEED} value={speed} />
          <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={volume} />
          <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={pitch} />
          <div className="flex w-11 justify-center items-center">
            <TbHistory
              className={cn(
                `w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-700 ${isHistoryOpen ? 'text-blue-700' : ''}`
              )}
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            />
          </div>
        </div>
      </div>
      {isHistoryOpen && <TTSPlaybackHistory historyItems={historyItems} />}
    </>
  );
};

interface TTSTableListProps {
  rows: Omit<TextRowProps, 'onTextChange'>[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
}

const TTSTableList: React.FC<TTSTableListProps> = ({ rows, onSelectionChange, onTextChange }) => {
  return (
    <div className="w-full mx-auto">
      {rows.map((row) => (
        <>
          <TextRow
            key={row.id}
            {...row}
            onSelectionChange={onSelectionChange}
            onTextChange={onTextChange}
          />
        </>
      ))}
    </div>
  );
};

export { TTSTableList };
