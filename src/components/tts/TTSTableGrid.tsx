import { Download, RotateCcw } from 'lucide-react';
import React from 'react';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/audio/SoundStatus';
import { IconButton } from '@/components/buttons/IconButton';
import { TextInput } from '@/components/common/TextInput';
import { Checkbox } from '@/components/ui/checkbox';

interface TTSTableGridItemProps {
  id: string;
  text: string;
  audioUrl: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
  onPlay: () => void;
  onRegenerate: () => void;
  onDownload: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
}

interface TTSTableGridProps {
  items: TTSTableGridItemProps[];
}

const TTSTableGrid: React.FC<TTSTableGridProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-md bg-white transition-colors ${
            item.isSelected ? 'border-blue-500 border-1 ring-2 ring-blue-500' : 'border'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              <Checkbox
                checked={item.isSelected}
                onCheckedChange={() => item.onSelectionChange(item.id)}
                className="ml-2"
              />

              <div className="flex gap-5">
                <SoundStatus type={UNIT_SOUND_STATUS_TYPES.SPEED} value={item.speed} />
                <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={item.volume} />
                <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={item.pitch} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <IconButton
                icon={<RotateCcw />}
                label="재생성"
                iconBgColor="bg-blue-50"
                iconColor="text-blue-500"
                width="90px"
                onClick={item.onRegenerate}
              />
              <IconButton
                icon={<Download />}
                label="다운로드"
                iconBgColor="bg-blue-50"
                iconColor="text-blue-500"
                width="104px"
                onClick={item.onDownload}
              />
            </div>
          </div>

          <TextInput
            value={item.text}
            onChange={(e) => item.onTextChange(item.id, e.target.value)}
            placeholder="텍스트를 입력하세요."
            className="w-1/2 ml-12 mb-6"
          />

          <div className="w-1/2 ml-12">
            <AudioPlayer audioUrl={item.audioUrl} />
          </div>
        </div>
      ))}
    </div>
  );
};
export { TTSTableGrid };
