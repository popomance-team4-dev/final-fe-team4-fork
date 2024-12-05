import * as React from 'react';
import { TbHistory } from 'react-icons/tb';

import AudioHistoryDialog from '@/components/custom/dialogs/AudioHistoryDialog';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { AUDIO_FOOTER_TOOLTIP } from '@/constants/tooltips';
import { cn } from '@/lib/utils';
import { useAudioHistoryStore } from '@/stores/ttsPlayback.store.ts';

interface AudioFooterProps {
  audioUrl: string;
  className?: string;
}

const AudioFooter = React.forwardRef<HTMLDivElement, AudioFooterProps>(
  ({ audioUrl, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const historyItems = useAudioHistoryStore((state) => state.historyItems);

    const audiohisoryItems = Object.values(historyItems)
      .flat()
      .reverse()
      .slice(0, 7)
      .map((historyItem) => {
        return {
          id: historyItem.audioId,
          audioUrl: historyItem.audioUrl,
        };
      });

    //!TODO TTS 오디오 히스토리 삭제 기능 추가 필요

    return (
      <div ref={ref} className={cn('flex items-center h-[92px] gap-4 bg-white', className)}>
        <div className="px-20 flex-1 min-w-0">
          <AudioPlayer
            audioUrl={audioUrl}
            className="bg-transparent w-full max-w-[976px] px-0 py-0"
          />
        </div>

        <Separator orientation="vertical" className="flex-shrink-0 h-[56px] mr-4" />

        {/* Dialog Trigger */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <TooltipWrapper content={AUDIO_FOOTER_TOOLTIP.FULL_HISTORY} className="history-icon">
              <button
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="History"
                onClick={() => setIsOpen(true)}
              >
                <TbHistory className="w-7 h-7 text-black" />
              </button>
            </TooltipWrapper>
          </DialogTrigger>

          {/* Dialog Content */}
          <AudioHistoryDialog audioHistory={audiohisoryItems} />
        </Dialog>
      </div>
    );
  }
);

AudioFooter.displayName = 'AudioFooter';

export default AudioFooter;
