import React from 'react';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/audio/SoundStatus';
import { DownloadButton, RecreateButton } from '@/components/buttons/IconButton';
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
    <div className="flex flex-col gap-4 px-0.5 pt-0.5">
      {items.map((item) => (
        <div
          key={item.id}
          className={`p-4 rounded-md bg-white transition-colors shadow-[0px_0px_8px_0px_rgba(0,0,0,0.08)] ${
            item.isSelected ? 'ring-2 ring-blue-500 ' : 'border border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5">
              <Checkbox
                checked={item.isSelected}
                onCheckedChange={() => item.onSelectionChange(item.id)}
                className="ml-2 mr-4"
              />

              <div className="flex gap-5">
                <SoundStatus
                  type={UNIT_SOUND_STATUS_TYPES.SPEED}
                  value={item.speed}
                  showLabel={true}
                />
                <SoundStatus
                  type={UNIT_SOUND_STATUS_TYPES.VOLUME}
                  value={item.volume}
                  showLabel={true}
                />
                <SoundStatus
                  type={UNIT_SOUND_STATUS_TYPES.PITCH}
                  value={item.pitch}
                  showLabel={true}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <RecreateButton onClick={item.onRegenerate} />
              <DownloadButton onClick={item.onDownload} />
            </div>
          </div>

          <TextInput
            value={item.text}
            onChange={(e) => item.onTextChange(item.id, e.target.value)}
            placeholder="텍스트를 입력하세요."
            className="w-3/5 mb-6"
          />

          <div className="w-3/5">
            <AudioPlayer audioUrl={item.audioUrl} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { TTSTableGrid };
