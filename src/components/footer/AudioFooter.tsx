import * as React from 'react';
import { TbHistory } from 'react-icons/tb';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Jennie from '@/images/avatar/jennie.png';
import { cn } from '@/lib/utils';

interface AudioFooterProps {
  audioUrl: string;
  className?: string;
}

const AudioFooter = React.forwardRef<HTMLDivElement, AudioFooterProps>(
  ({ audioUrl, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center h-[92px] pl-4 gap-3 bg-white', className)}>
        <Badge variant="default" className="flex items-center gap-4">
          <Avatar className="h-7 w-7 border border-gray-200">
            <AvatarImage src={Jennie} alt="제니" />
            <AvatarFallback>제</AvatarFallback>
          </Avatar>
          <span className="text-[14px]">KR</span>
        </Badge>

        <Badge variant="default" className="text-[14px] mr-4 py-1.5 ">
          명랑한 · 재미있음
        </Badge>

        <Separator orientation="vertical" className="h-[52px] mr-4" />

        <div className="flex-1">
          <AudioPlayer audioUrl={audioUrl} className="bg-transparent w-[900px] px-0 py-0" />
        </div>

        <Separator orientation="vertical" className="h-[52px] mr-4" />

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="History"
        >
          <TbHistory className="w-7 h-7 text-black" />
        </button>
      </div>
    );
  }
);

AudioFooter.displayName = 'AudioFooter';

export default AudioFooter;
