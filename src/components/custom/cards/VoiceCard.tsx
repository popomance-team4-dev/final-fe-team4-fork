import { TbDotsVertical, TbEdit, TbMessageCircle, TbTrash } from 'react-icons/tb';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RadioGroupItem } from '@/components/ui/radio-group';

interface VoiceCardProps {
  voice: {
    id: string;
    name: string;
    description: string;
    avatarUrl: string;
    type: 'preset' | 'custom';
  };
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onEdit?: (type: 'name' | 'description') => void;
}

const VoiceCard = ({ voice, isSelected, onSelect, onDelete, onEdit }: VoiceCardProps) => {
  return (
    <Card
      className={`mb-1 hover:bg-secondary/50 cursor-pointer transition-colors ${
        isSelected ? 'bg-secondary' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value={voice.id}
            className="translate-y-[2px] border-gray-500"
            onClick={(e) => e.stopPropagation()}
          />
          {voice.type === 'preset' && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={voice.avatarUrl} alt={voice.name} />
            </Avatar>
          )}
          <div className="flex-1">
            <div className="font-medium leading-none">{voice.name}</div>
            <div className="text-sm text-muted-foreground">{voice.description}</div>
          </div>
          {voice.type === 'custom' && (onDelete || onEdit) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <button className=" text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50">
                  <TbDotsVertical className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <>
                    <DropdownMenuItem onClick={() => onEdit('name')}>
                      <TbEdit className="w-4 h-4 mr-2" />
                      파일명 수정
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit('description')}>
                      <TbMessageCircle className="w-4 h-4 mr-2" />
                      설명 수정
                    </DropdownMenuItem>
                  </>
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
