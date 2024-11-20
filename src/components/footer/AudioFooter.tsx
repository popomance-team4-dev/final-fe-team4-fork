import * as React from 'react';
import { TbHistory } from 'react-icons/tb';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AudioFooterProps {
  audioUrl: string;
  className?: string;
}

const AudioFooter = React.forwardRef<HTMLDivElement, AudioFooterProps>(
  ({ audioUrl, className }, ref) => {
    return (
      <div ref={ref} className={cn('h-[80px] flex items-center gap-4 p-4 bg-white', className)}>
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="profile.jpg" alt="KR" />
            <AvatarFallback>KR</AvatarFallback>
          </Avatar>

          <Badge variant="sound" className="text-[11px] bg-purple-50 text-purple-900">
            KR
          </Badge>

          <span className="text-sm text-gray-900">명랑한 · 재미있음</span>
        </div>

        {/* AudioPlayer Section */}
        <div className="flex-1">
          <AudioPlayer audioUrl={audioUrl} className="bg-transparent px-0 py-0" />
        </div>

        {/* History Button */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <TbHistory className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  }
);

AudioFooter.displayName = 'AudioFooter';

export default AudioFooter;
