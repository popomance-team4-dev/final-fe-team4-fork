import * as React from 'react';
import { TbHistory } from 'react-icons/tb';

import AudioHistoryDialog from '@/components/audio/AudioHistoryDialog';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
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
      <div ref={ref} className={cn('flex items-center h-[92px] gap-4 bg-white', className)}>
        <Badge variant="default" className="flex-shrink-0 flex items-center gap-4">
          <Avatar className="h-7 w-7 border border-gray-200">
            <AvatarImage src={Jennie} alt="제니" />
            <AvatarFallback>제</AvatarFallback>
          </Avatar>
          <span className="text-[14px]">KR</span>
        </Badge>

        <Badge variant="default" className="flex-shrink-0 text-[14px] py-1.5">
          명랑한 · 재미있음
        </Badge>

        <Separator orientation="vertical" className="flex-shrink-0 h-[56px]" />

        <div className="flex-1 min-w-0">
          <AudioPlayer
            audioUrl={audioUrl}
            className="bg-transparent w-full max-w-[976px] px-0 py-0"
          />
        </div>

        <Separator orientation="vertical" className="flex-shrink-0 h-[56px] mr-4" />

        {/* Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="History"
            >
              <TbHistory className="w-7 h-7 text-black" />
            </button>
          </DialogTrigger>

          {/* Dialog Content */}
          <AudioHistoryDialog />
        </Dialog>
      </div>
    );
  }
);

AudioFooter.displayName = 'AudioFooter';

export default AudioFooter;
