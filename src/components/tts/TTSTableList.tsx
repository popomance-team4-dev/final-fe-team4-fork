import { TbHistory, TbX } from 'react-icons/tb';

import { AudioPlayer, PlayerMode } from '@/components/audio/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/audio/SoundStatus';
import { PlayButton } from '@/components/buttons/PlayButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

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

  return (
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
          <TbHistory className="w-5 h-5 mr-2 hover:text-blue-700 cursor-pointer" />
        </div>
      </div>
    </div>
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
          <div className="flex bg-gray-50">
            <div className="relative">
              <div className="absolute left-8 h-[50px] w-[1.5px] bg-gray-300"></div>
              <div className="ml-8 w-[21px] h-[40px] rounded-bl-3xl border-l-2 border-b-2 border-l-gray-700-500"></div>
              <div className="ml-8 w-[21px] h-[60px] rounded-bl-3xl border-l-2 border-b-2 border-l-gray-700-500"></div>
            </div>
            <div className="mb-3 w-full mr-2">
              <div className="flex items-center px-4 py-2 mt-3 mb-1 h-15 rounded-lg bg-white">
                <Checkbox className="mx-4" />
                <AudioPlayer audioUrl={''} mode={PlayerMode.MINI} className="flex-1" />
                <div className="flex gap-6 ml-auto items-center">
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.SPEED} value={1} className="ml-4" />
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={60.0} />
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={4.0} />
                  <TbX className="w-6 h-6 text-gray-700 mr-3" />
                </div>
              </div>
              <div className="flex items-center px-4 py-2 mt-3 mb-1 h-15 rounded-lg bg-white">
                <Checkbox className="mx-4" />
                <AudioPlayer audioUrl={''} mode={PlayerMode.MINI} className="flex-1" />
                <div className="flex gap-6 ml-auto items-center">
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.SPEED} value={1} className="ml-4" />
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={60.0} />
                  <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={4.0} />
                  <TbX className="w-6 h-6 text-gray-700 mr-3" />
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export { TTSTableList };
