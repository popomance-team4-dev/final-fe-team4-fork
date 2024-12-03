import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect } from 'react';
import { TbHistory } from 'react-icons/tb';

import { PlayButton } from '@/components/custom/buttons/PlayButton';
import {
  SILENCE_STATUS_TYPES,
  SilenceStatus,
} from '@/components/custom/features/concat/SilenceStatus';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/custom/features/tts/SoundStatus';
import TTSPlaybackHistory from '@/components/custom/tables/project/tts/TTSPlaybackHistory';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { usePlaybackHistory } from '@/hooks/usePlaybackHistory';
import { cn } from '@/lib/utils';
import { useConcatStore } from '@/stores/concat.store';
import { useVCStore } from '@/stores/vc.store';

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
  targetVoice,
  frontSilence = 0,
  backSilence = 0,
  endSilence = 0,
}) => {
  console.log('TableListView - Row:', {
    id,
    type,
    targetVoice,
  });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { historyItems, isHistoryOpen, setIsHistoryOpen, handleDelete } = usePlaybackHistory();
  const vcStore = useVCStore();
  const concatStore = useConcatStore();
  const { audioPlayer, handlePause } = type === 'CONCAT' ? concatStore : vcStore;
  const isPlaying = audioPlayer.currentPlayingId === id;

  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, [text]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPlaying) {
      handlePause();
    } else {
      onPlay(id);
    }
  };

  if (type === 'TTS') {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
        <div className="flex items-center px-4 py-2 border-b group bg-white cursor-grab active:cursor-grabbing">
          <div className="flex items-center cursor-pointer relative">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelectionChange(id)}
              className="cursor-pointer ml-2 mr-2"
              id={`checkbox-${id}`}
            />
            <div className="absolute inset-0" onClick={() => onSelectionChange(id)} />
          </div>
          <PlayButton
            isPlaying={isPlaying}
            onClick={handlePlayClick}
            className="ml-2 mr-2 w-5 h-5"
          />
          <Textarea
            value={text}
            onChange={(e) => {
              onTextChange(id, e.target.value);
              handleTextAreaResize(e.target);
            }}
            onInput={(e) => handleTextAreaResize(e.currentTarget)}
            placeholder="스크립트를 입력하세요."
            className="flex-1 ml-2 mr-4 min-h-[40px] border-0 overflow-visible resize-none"
            rows={1}
          />
          <div className="flex gap-6">
            <div className="flex items-center gap-4">
              {type === 'TTS' && (
                <>
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.SPEED} value={speed ?? 1} />
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={volume ?? 1} />
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={pitch ?? 1} />
                </>
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

  if (type === 'CONCAT') {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
        <div className="flex flex-col px-4 py-2 border-b bg-white">
          <div className="grid grid-cols-[auto,auto,200px,1fr,auto] items-center group cursor-grab active:cursor-grabbing">
            <div className="flex items-center cursor-pointer relative">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onSelectionChange(id)}
                className="cursor-pointer ml-2 mr-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <PlayButton
                isPlaying={isPlaying}
                onClick={handlePlayClick}
                className="mx-2 w-6 h-6"
              />
            </div>
            <div className="ml-4 truncate">{fileName}</div>
            <Textarea
              value={text}
              onChange={(e) => onTextChange(id, e.target.value)}
              placeholder="스크립트를 입력하세요."
              className="flex-1 min-h-[40px] border-0 overflow-visible resize-none w-full"
              rows={1}
            />
            <div className="flex gap-6">
              <div className="flex items-center gap-8">
                <SilenceStatus
                  type={SILENCE_STATUS_TYPES.FRONT_SILENCE}
                  value={frontSilence ?? 0}
                />
                <SilenceStatus type={SILENCE_STATUS_TYPES.BACK_SILENCE} value={backSilence ?? 0} />
                <SilenceStatus
                  type={SILENCE_STATUS_TYPES.END_SILENCE}
                  value={endSilence ?? 0}
                  className="mr-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <div className="flex flex-col px-4 py-2 border-b bg-white">
        <div className="grid grid-cols-[auto,auto,200px,1fr,200px] items-center group cursor-grab active:cursor-grabbing">
          <div className="flex items-center cursor-pointer relative">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelectionChange(id)}
              className="cursor-pointer ml-2 mr-2"
              id={`checkbox-${id}`}
            />
            <div className="absolute inset-0" onClick={() => onSelectionChange(id)} />
          </div>
          <div className="flex items-center gap-2">
            <PlayButton isPlaying={isPlaying} onClick={handlePlayClick} className="mx-2 w-6 h-6" />
          </div>
          <div className="ml-4 truncate">{fileName}</div>
          <Textarea
            value={text}
            onChange={(e) => {
              onTextChange(id, e.target.value);
              handleTextAreaResize(e.target);
            }}
            onInput={(e) => handleTextAreaResize(e.currentTarget)}
            placeholder="스크립트를 입력하세요."
            className="flex-1 min-h-[40px] border-0 overflow-visible resize-none w-full"
            rows={1}
          />
          {type === 'VC' && (
            <div className="text-sm text-gray-600 truncate whitespace-nowrap">
              {targetVoice || ''}
            </div>
          )}
        </div>
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
          <div>텍스트</div>
          <div className="flex gap-7">
            <div className="w-[60px] text-center mr-1">속도</div>
            <div className="w-[52px] text-center mr-2">볼륨</div>
            <div className="w-[56px] text-center mr-2">피치</div>
            <div className="text-center mr-3">내역</div>
          </div>
        </div>
      );
    }

    if (type === 'CONCAT') {
      return (
        <div className="sticky top-0 z-10 grid grid-cols-[auto,auto,193px,1fr,auto] px-4 py-2 border-b bg-gray-50 text-sm font-medium text-black">
          <div className="w-6" />
          <div className="w-4 ml-2 mr-[42px]" />
          <div>파일명</div>
          <div>텍스트</div>
          <div className="flex gap-8">
            <div className="w-[60px] text-center mr-1">맨 앞</div>
            <div className="text-center mr-1.5">맨 뒤</div>
            <div className="w-[60px] text-center mr-2">간격</div>
          </div>
        </div>
      );
    }

    return (
      <div className="sticky top-0 z-10 grid grid-cols-[auto,auto,193px,1fr,202px] px-4 py-2 border-b bg-gray-50 text-sm font-medium text-black">
        <div className="w-6" />
        <div className="w-4 ml-2 mr-[42px]" />
        <div>파일명</div>
        <div>텍스트</div>
        {type === 'VC' && <div>타겟 보이스</div>}
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
