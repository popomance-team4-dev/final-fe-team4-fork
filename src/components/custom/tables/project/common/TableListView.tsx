import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
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

const SortableRow: React.FC<ListRowProps> = ({
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [historyItems, setHistoryItems] = useState<IHistoryItem[]>([]);

  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // useEffect(() => {
  //!TODO 백엔드 로직이 들어갈 자리, TTS 재생성 히스토리 API 호출
  // }, []);

  // 음원 히스토리 내역 삭제
  const handleDelete = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (type === 'TTS') {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
        <div className="flex items-center px-4 py-2 border-b group bg-white cursor-grab active:cursor-grabbing">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelectionChange(id)}
            className="ml-2 mr-2"
          />
          <PlayButton onClick={onPlay} className="ml-2 mr-2 w-5 h-5" />
          <Textarea
            value={text}
            onChange={(e) => {
              onTextChange(id, e.target.value);
              handleTextAreaResize(e.target);
            }}
            onInput={(e) => handleTextAreaResize(e.currentTarget)}
            placeholder="텍스트를 입력하세요."
            className="flex-1 ml-2 mr-4 min-h-[40px] border-0 overflow-hidden"
            rows={1}
          />
          <div className="flex gap-6">
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
            <div className="flex w-11 justify-center items-center">
              <TbHistory
                className={cn(
                  'w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-700',
                  isHistoryOpen && 'text-blue-700',
                  historyItems.length > 0 ||
                    'pointer-events-none text-gray-700 opacity-50 cursor-not-allowed'
                )}
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              />
            </div>
          </div>
        </div>
        {isHistoryOpen && historyItems.length > 0 && (
          <TTSPlaybackHistory historyItems={historyItems} handleDelete={handleDelete} />
        )}
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <div className="grid grid-cols-[auto,auto,200px,1fr] px-4 py-2 border-b items-center group bg-white cursor-grab active:cursor-grabbing">
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
            onTextChange(id, e.target.value);
            handleTextAreaResize(e.target);
          }}
          onInput={(e) => handleTextAreaResize(e.currentTarget)}
          placeholder="텍스트를 입력하세요."
          className="flex-1 min-h-[40px] border-0 overflow-hidden w-full"
          rows={1}
        />
      </div>
    </div>
  );
};

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
    if (type === 'TTS') {
      return (
        <div className="sticky top-0 z-10 grid grid-cols-[auto,auto,auto,1fr,auto] px-4 py-2 border-b bg-gray-50 text-sm font-medium text-black">
          <div className="w-6" />
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
      <div className="sticky top-0 z-10 grid grid-cols-[auto,auto,auto,200px,1fr] px-4 py-2 border-b bg-gray-50 text-sm font-medium text-black">
        <div className="w-6" />
        <div className="w-4 ml-2 mr-2" />
        <div className="w-4 ml-2 mr-2" />
        <div className="ml-6">파일명</div>
        <div className="ml-4">텍스트</div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto relative">
      {renderHeader()}
      {rows.map((row) => (
        <SortableRow
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
