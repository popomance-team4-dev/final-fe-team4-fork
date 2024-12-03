import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect } from 'react';

import { PlayButton } from '@/components/custom/buttons/PlayButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ListRowProps } from '@/types/table';

export const VCListRow: React.FC<ListRowProps> = ({
  id,
  text,
  isSelected,
  onPlay,
  onSelectionChange,
  onTextChange,
  fileName,
  targetVoice,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
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

  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, [text]);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <div className="flex flex-col px-4 py-2 border-b bg-white">
        <div className="grid grid-cols-[auto,auto,200px,1fr,200px] items-center group cursor-grab active:cursor-grabbing">
          <div className="flex items-center cursor-pointer relative">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelectionChange(id)}
              className="cursor-pointer ml-2 mr-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <PlayButton onClick={() => onPlay(id)} className="mx-2 w-6 h-6" />
          </div>
          <div className="ml-4 truncate">{fileName}</div>
          <Textarea
            value={text}
            onChange={(e) => {
              onTextChange(id, e.target.value);
              handleTextAreaResize(e.target);
            }}
            placeholder="스크립트를 입력하세요."
            className="flex-1 min-h-[40px] border-0 overflow-visible resize-none w-full"
            rows={1}
          />
          <div className="text-sm text-gray-600 truncate whitespace-nowrap">
            {targetVoice || ''}
          </div>
        </div>
      </div>
    </div>
  );
};
