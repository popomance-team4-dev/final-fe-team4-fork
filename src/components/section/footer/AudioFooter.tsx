import * as React from 'react';
import { TbHistory } from 'react-icons/tb';

import AudioHistoryDialog from '@/components/custom/dialogs/AudioHistoryDialog';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AUDIO_FOOTER_TOOLTIP } from '@/constants/tooltips';
import Jennie from '@/images/avatar/jennie.png';
import { cn } from '@/lib/utils';

interface AudioFooterProps {
  audioUrl: string;
  className?: string;
  type?: 'TTS' | 'VC';
  label?: string;
}

const AudioFooter = React.forwardRef<HTMLDivElement, AudioFooterProps>(
  ({ audioUrl, className, type = 'TTS', label }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center h-[92px] gap-4 bg-white', className)}>
        <Badge variant="default" className="flex-shrink-0 flex items-center gap-4">
          {type === 'TTS' ? (
            <>
              <Avatar className="h-7 w-7 border border-gray-200">
                <AvatarImage src={Jennie} alt="제니" />
                <AvatarFallback>제</AvatarFallback>
              </Avatar>
              <span className="text-[14px]">KR</span>
            </>
          ) : (
            <span className="text-[14px]">converted {label || '변환된 파일'}</span>
          )}
        </Badge>

        {type === 'TTS' && (
          <Badge variant="default" className="flex-shrink-0 text-[14px] py-1.5">
            명랑한 · 재미있음
          </Badge>
        )}

        <Separator orientation="vertical" className="flex-shrink-0 h-[56px]" />

        <div className="flex-1 min-w-0">
          <AudioPlayer
            audioUrl={audioUrl}
            className="bg-transparent w-full max-w-[976px] px-0 py-0"
          />
        </div>

        <Separator orientation="vertical" className="flex-shrink-0 h-[56px] mr-4" />

        <Dialog>
          <DialogTrigger asChild>
            <TooltipWrapper content={AUDIO_FOOTER_TOOLTIP.FULL_HISTORY} className="history-icon">
              <button
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="History"
              >
                <TbHistory className="w-7 h-7 text-black" />
              </button>
            </TooltipWrapper>
          </DialogTrigger>
          <AudioHistoryDialog />
        </Dialog>
      </div>
    );
  }
);

AudioFooter.displayName = 'AudioFooter';

export default AudioFooter;
