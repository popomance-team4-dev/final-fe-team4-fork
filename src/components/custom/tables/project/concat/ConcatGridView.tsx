import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import _ from 'lodash';
import React from 'react';
import { TbReplace } from 'react-icons/tb';

import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import { StateController } from '@/components/custom/features/common/StateController';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
// import { Slider } from '@/components/ui/slider';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
// import { TTS_TOOLTIP } from '@/constants/tooltips';
// import { cn } from '@/lib/utils';
import { TableItem } from '@/types/table';

interface ConcatGridItemProps extends Pick<TableItem, 'id' | 'text' | 'isSelected'> {
  audioUrl: string;
  duration: number;
  fileName: string;
  silentRegions: { start: number; end: number }[];
  onPlay: () => void;
  onRegenerate?: () => void;
  onDownload?: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
  onSilentRegionAdd: (region: { start: number; end: number }) => void;
  onAudioReplace: (file: File) => void;
  type?: 'TTS' | 'VC' | 'CONCAT';
  frontSilence?: number;
  backSilence?: number;
  onSilenceChange?: (id: string, type: 'front' | 'back', value: number) => void;
}

const debouncedUpdate = _.debounce(
  (
    region: { start: number; end: number },
    duration: number,
    onSilentRegionAdd: (region: { start: number; end: number }) => void
  ) => {
    onSilentRegionAdd({
      ...region,
      end: region.start + duration,
    });
  },
  100
);

const SortableGridItem: React.FC<ConcatGridItemProps> = (props) => {
  const [selectedRegion, setSelectedRegion] = React.useState<{
    index: number;
    duration: number;
  } | null>(null);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTextAreaResize = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleAudioReplace = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        props.onAudioReplace(file);
      }
    };
    input.click();
  };

  const handleRegionClick = (index: number, duration: number) => {
    setSelectedRegion({ index, duration });
  };

  const handleDurationChange = (duration: number) => {
    if (selectedRegion) {
      setSelectedRegion({
        ...selectedRegion,
        duration,
      });

      const region = props.silentRegions[selectedRegion.index];
      debouncedUpdate(region, duration, props.onSilentRegionAdd);
    }
  };

  const audioPlayerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`bg-white rounded-md border p-4 group cursor-grab active:cursor-grabbing ${
          props.isSelected
            ? 'border border-primary shadow-[inset_0px_0px_5px_2px_rgba(59,130,246,0.2)]'
            : 'border'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center cursor-pointer relative">
              <Checkbox
                checked={props.isSelected}
                onCheckedChange={() => props.onSelectionChange(props.id)}
                className="cursor-pointer ml-2 mr-4"
                id={`checkbox-grid-${props.id}`}
              />
              <div className="absolute inset-0" onClick={() => props.onSelectionChange(props.id)} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">파일명:</span>
              <span className="text-sm font-medium">{props.fileName || '파일 없음'}</span>
              {props.duration > 0 && (
                <>
                  <span className="text-sm text-gray-500 ml-4">길이:</span>
                  <span className="text-sm font-medium">{props.duration.toFixed(1)}초</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center mr-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleAudioReplace}
            >
              <TbReplace className="w-4 h-4" />
              <span>오디오 교체</span>
            </Button>
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
            placeholder="텍스트를 입력하세요."
            className="w-4/5 min-h-[40px] overflow-hidden mb-2 border-0"
            rows={1}
          />
          <div className="mt-4">
            <div className="flex items-center gap-4 mb-4">{/* regionDuration 표시 제거 */}</div>

            {selectedRegion && (
              <div className="mb-4">
                <StateController
                  label="무음 구간 길이"
                  value={selectedRegion.duration}
                  unit="초"
                  min={0}
                  max={10}
                  step={0.1}
                  onChange={handleDurationChange}
                  onIncrease={() => handleDurationChange(selectedRegion.duration + 0.1)}
                  onDecrease={() =>
                    handleDurationChange(Math.max(0, selectedRegion.duration - 0.1))
                  }
                />
              </div>
            )}

            <AudioPlayer
              ref={audioPlayerRef}
              audioUrl={props.audioUrl}
              className="w-[1100px] px-6 py-3"
              silentRegions={props.silentRegions}
              onSilentRegionAdd={props.onSilentRegionAdd}
              onRegionClick={handleRegionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConcatGridViewProps {
  items: ConcatGridItemProps[];
  onAudioReplace: (id: string, file: File) => void;
  onSilentRegionAdd: (id: string, region: { start: number; end: number }) => void;
}

export const ConcatGridView: React.FC<ConcatGridViewProps> = ({
  items,
  onAudioReplace,
  onSilentRegionAdd,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <SortableGridItem
          key={item.id}
          {...item}
          onAudioReplace={(file) => onAudioReplace(item.id, file)}
          onSilentRegionAdd={(region) => onSilentRegionAdd(item.id, region)}
        />
      ))}
    </div>
  );
};
