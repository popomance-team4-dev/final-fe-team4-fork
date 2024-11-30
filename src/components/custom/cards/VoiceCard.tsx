import { useState } from 'react';
import { TbDotsVertical, TbEdit, TbTrash } from 'react-icons/tb';

import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';

interface VoiceCardProps {
  voice: {
    id: string;
    name: string;
    description: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onEdit?: (newName: string) => void;
}

const VoiceCard = ({ voice, onSelect, onDelete, onEdit }: VoiceCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, fileExt] = voice.name.split('.');

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEdit?.(`${e.currentTarget.value}.${fileExt}`);
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <Card
      className={`mb-1 cursor-pointer transition-colors`}
      onClick={isEditing ? undefined : onSelect}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value={voice.id}
            className="translate-y-[2px] border-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              if (!isEditing) onSelect();
            }}
          />
          <div className="flex-1">
            <div className="font-medium leading-none">
              {isEditing ? (
                <Input
                  autoFocus
                  defaultValue={fileName}
                  onKeyDown={handleEdit}
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 py-0"
                />
              ) : (
                voice.name
              )}
            </div>
            <div className="text-sm text-muted-foreground">{voice.description}</div>
          </div>
          {(onDelete || onEdit) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className="p-1 text-gray-800 rounded-md hover:bg-gray-100">
                  <TbDotsVertical className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <TbEdit className="w-4 h-4 mr-2" />
                    파일명 수정
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-red-500 hover:!text-red-600 focus:!text-red-600"
                  >
                    <TbTrash className="w-4 h-4 mr-2" />
                    삭제
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCard;
