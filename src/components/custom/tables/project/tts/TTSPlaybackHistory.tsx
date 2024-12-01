import { Checkbox } from '@radix-ui/react-checkbox';
import { TbX } from 'react-icons/tb';

import { AudioPlayer, PlayerMode } from '@/components/custom/feature/common/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/custom/feature/tts/SoundStatus';

import HistoryTree from './TTSHistoryTree';

interface TTSPlaybackHistoryProps {
  historyItems: IHistoryItem[];
  handleDelete: (id: string) => void;
}

interface IHistoryItem {
  id: string;
  text: string;
  speed: number;
  volume: number;
  pitch: number;
}

const TTSPlaybackHistory: React.FC<TTSPlaybackHistoryProps> = ({ historyItems, handleDelete }) => {
  return (
    <div className="flex bg-gray-50">
      <div>
        <HistoryTree historyItems={historyItems} />
      </div>
      <div className="mb-3 w-full mr-2">
        {historyItems.map((historyItem) => (
          <div
            key={historyItem.id}
            className="flex items-center px-4 py-2 mt-3 mb-1 h-15 rounded-lg bg-white"
          >
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
              <TbX
                className="w-6 h-6 text-gray-700 mr-3 cursor-pointer"
                onClick={() => handleDelete(historyItem.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TTSPlaybackHistory;
