import { TbMicrophone } from 'react-icons/tb';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
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
}

const VoiceCard = ({ voice, isSelected, onSelect }: VoiceCardProps) => {
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
            id={voice.id}
            className="translate-y-[2px] border-gray-500"
            onClick={(e) => e.stopPropagation()}
          />
          <Avatar className="h-6 w-6">
            {voice.type === 'preset' ? (
              <AvatarImage src={voice.avatarUrl} alt={voice.name} />
            ) : (
              <AvatarFallback>
                <TbMicrophone className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <div className="font-medium leading-none">{voice.name}</div>
            <div className="text-sm text-muted-foreground">{voice.description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCard;
