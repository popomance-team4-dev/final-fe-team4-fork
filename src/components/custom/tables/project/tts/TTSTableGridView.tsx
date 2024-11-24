import React, { useState } from 'react';

import {
  DownloadButton,
  RecreateButton,
  TTSPlaybackHistoryButton,
} from '@/components/custom/buttons/IconButton';
import { AudioPlayer } from '@/components/custom/feature/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/custom/feature/SoundStatus';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import TTSPlaybackHistory from './TTSPlaybackHistory';

interface TTSTableGridViewItemProps {
  id: string;
  text: string;
  audioUrl: string;
  isSelected: boolean;
  speed?: number;
  volume?: number;
  pitch?: number;
  onPlay: () => void;
  onRegenerate: () => void;
  onDownload: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
}

interface TTSGridItemProps {
  item: TTSTableGridViewItemProps;
}

interface TTSTableGridViewProps {
  items: TTSTableGridViewItemProps[];
}

const TTSGridItem: React.FC<TTSGridItemProps> = ({ item }) => {
  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  // TTS 음원 재생성 히스토리 내역 토글
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div
          key={item.id}
          className={`p-4 rounded-md bg-white transition-colors ${
            item.isSelected
              ? 'border border-primary shadow-[inset_0px_0px_5px_2px_rgba(59,130,246,0.2)]'
              : 'border'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-5">
              <Checkbox
                checked={item.isSelected}
                onCheckedChange={() => item.onSelectionChange(item.id)}
                className="ml-2 mr-4"
              />

              <div className="flex gap-5">
                {item.speed !== undefined && (
                  <SoundStatus
                    type={UNIT_SOUND_STATUS_TYPES.SPEED}
                    value={item.speed}
                    showLabel={true}
                  />
                )}
                {item.volume !== undefined && (
                  <SoundStatus
                    type={UNIT_SOUND_STATUS_TYPES.VOLUME}
                    value={item.volume}
                    showLabel={true}
                  />
                )}
                {item.pitch !== undefined && (
                  <SoundStatus
                    type={UNIT_SOUND_STATUS_TYPES.PITCH}
                    value={item.pitch}
                    showLabel={true}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 mr-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <RecreateButton onClick={item.onRegenerate} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>선택한 텍스트 재생성하기</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <DownloadButton onClick={item.onDownload} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>선택한 음성 파일 다운로드</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <TTSPlaybackHistoryButton
                        onClick={() => {
                          setIsHistoryOpen(!isHistoryOpen);
                        }}
                        isActive={isHistoryOpen}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>음성 생성 기록 및 히스토리 보기</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <Textarea
            value={item.text}
            onChange={(e) => {
              item.onTextChange(item.id, e.target.value);
              handleTextAreaResize(e.target);
            }}
            onInput={(e) => handleTextAreaResize(e.currentTarget)}
            placeholder="텍스트를 입력하세요."
            className="w-3/5 min-h-[40px] overflow-hidden mb-2 border-0"
            rows={1}
          />
          <div className="w-3/5 mb-5">
            <AudioPlayer audioUrl={item.audioUrl} className="px-6 py-3" />
          </div>
          <div className="-mx-4 -my-4">{isHistoryOpen && <TTSPlaybackHistory id={'id'} />}</div>
        </div>
      </div>
    </div>
  );
};

const TTSTableGridView: React.FC<TTSTableGridViewProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <TTSGridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export { TTSGridItem as TTSGridItem, TTSTableGridView };
