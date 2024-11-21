import { Checkbox } from '@radix-ui/react-checkbox';
import { TbX } from 'react-icons/tb';

import { AudioPlayer, PlayerMode } from '@/components/audio/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/audio/SoundStatus';

interface HistoryItem {
  id: string;
  text: string;
  speed: number;
  volume: number;
  pitch: number;
}

interface TTSPlaybackHistoryProps {
  historyItems: HistoryItem[];
}

const TTSPlaybackHistory: React.FC<TTSPlaybackHistoryProps> = ({ historyItems }) => {
  return (
    <div className="flex bg-gray-50">
      <div className="relative">
        <div className="ml-8 w-[21px] h-[40px] rounded-bl-3xl border-l-2 border-b-[0.1em] border-l-gray-700-500"></div>
        {[...historyItems.slice(1)].map((_, index) => (
          <>
            <div className="ml-8 w-[21px] h-[64px] rounded-bl-3xl border-l-[0.1em] border-b-2 border-l-gray-700-500 relative">
              <div
                key={index}
                className={`absolute h-[64px] w-0 border-l-[0.1em] bg-gray-300 ml-[-2px] -translate-y-4 line`}
              />
            </div>
          </>
        ))}
      </div>
      <div className="mb-3 w-full mr-2">
        {historyItems.map((historyItem) => (
          <div className="flex items-center px-4 py-2 mt-3 mb-1 h-15 rounded-lg bg-white">
            <Checkbox className="mx-4" />
            <AudioPlayer audioUrl={''} mode={PlayerMode.MINI} className="flex-1" />
            <div className="flex gap-6 ml-auto items-center">
              <SoundStatus
                type={UNIT_SOUND_STATUS_TYPES.SPEED}
                value={historyItem.speed}
                className="ml-4"
              />
              <SoundStatus type={UNIT_SOUND_STATUS_TYPES.VOLUME} value={historyItem.volume} />
              <SoundStatus type={UNIT_SOUND_STATUS_TYPES.PITCH} value={historyItem.pitch} />
              <TbX className="w-6 h-6 text-gray-700 mr-3 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TTSPlaybackHistory;
