import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

import {
  DownloadButton,
  RecreateButton,
  TTSPlaybackHistoryButton,
} from '@/components/custom/buttons/IconButton';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/custom/features/tts/SoundStatus';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { TTS_TOOLTIP } from '@/constants/tooltips';
import { useAudioHistoryStore } from '@/stores/ttsPlayback.store.ts';

import TTSPlaybackHistory from './TTSPlaybackHistory';

interface TTSGridItemProps {
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

import React, { memo } from 'react';

const SortableGridItem = memo((props: TTSGridItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  const historyItems = useAudioHistoryStore((state) => state.historyItems)[props.id] || [];
  const handleDelete = useAudioHistoryStore((state) => state.deleteHistoryItem)(props.id);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  console.log('props.id', props.id);
  console.log('isHistoryOpen', isHistoryOpen);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`bg-white rounded-md border p-4 group cursor-grab active:cursor-grabbing ${
          props.isSelected
            ? 'border border-primary shadow-[inset_0px_0px_5px_2px_rgba(59,130,246,0.2)]'
            : 'border'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-5">
              <div className="flex items-center cursor-pointer relative">
                <Checkbox
                  checked={props.isSelected}
                  onCheckedChange={() => props.onSelectionChange(props.id)}
                  className="cursor-pointer ml-2 mr-4"
                  id={`checkbox-grid-${props.id}`}
                />
                <div
                  className="absolute inset-0"
                  onClick={() => props.onSelectionChange(props.id)}
                />
              </div>

              <div className="flex gap-5">
                {props.speed !== undefined && (
                  <SoundStatus
                    type={UNIT_SOUND_STATUS_TYPES.SPEED}
                    value={props.speed}
                    showLabel={true}
                  />
                )}
                {props.volume !== undefined && (
                  <SoundStatus
                    type={UNIT_SOUND_STATUS_TYPES.VOLUME}
                    value={props.volume}
                    showLabel={true}
                  />
                )}
                {props.pitch !== undefined && (
                  <SoundStatus
                    type={UNIT_SOUND_STATUS_TYPES.PITCH}
                    value={props.pitch}
                    showLabel={true}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 mr-2">
              <TooltipWrapper content={TTS_TOOLTIP.REGENERATE_SELECTED}>
                <div>
                  <RecreateButton onClick={props.onRegenerate} />
                </div>
              </TooltipWrapper>

              <DownloadButton onClick={props.onDownload} />

              <TooltipWrapper content={TTS_TOOLTIP.VIEW_HISTORY}>
                <div>
                  <TTSPlaybackHistoryButton
                    onClick={() => {
                      setIsHistoryOpen(!isHistoryOpen);
                    }}
                    isActive={isHistoryOpen}
                    isHistoryViewEnabled={historyItems.length > 0}
                  />
                </div>
              </TooltipWrapper>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Textarea
            value={props.text}
            onChange={(e) => {
              props.onTextChange(props.id, e.target.value);
              handleTextAreaResize(e.target);
            }}
            onInput={(e) => handleTextAreaResize(e.currentTarget)}
            placeholder="스크립트를 입력하세요."
            className="w-3/5 min-h-[40px] overflow-hidden mb-2 border-0"
            rows={1}
          />
          <div className="w-3/5 mb-5">
            <AudioPlayer audioUrl={props.audioUrl} className="px-6 py-3" />
          </div>
        </div>
        {isHistoryOpen && historyItems.length > 0 && (
          <TTSPlaybackHistory historyItems={historyItems} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
});

SortableGridItem.displayName = 'SortableGridItem';

interface TTSTableGridViewProps {
  items: TTSGridItemProps[];
  onReorder?: (startIndex: number, endIndex: number) => void;
}

export const TTSTableGridView: React.FC<TTSTableGridViewProps> = ({ items, onReorder }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    onReorder?.(oldIndex, newIndex);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <>
              <SortableGridItem key={item.id} {...item} />
            </>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
