import { Checkbox } from '@radix-ui/react-checkbox';
import { useEffect, useMemo, useState } from 'react';
import { TbX } from 'react-icons/tb';

import { AudioPlayer, PlayerMode } from '@/components/feature/AudioPlayer';
import { SoundStatus, UNIT_SOUND_STATUS_TYPES } from '@/components/feature/SoundStatus';

interface TTSPlaybackHistoryProps {
  id: string;
}

const TTSPlaybackHistory: React.FC<TTSPlaybackHistoryProps> = ({ id }) => {
  console.log(id);

  // 가짜 TTS 재생성성히스토리 데이터들임, 백엔드 연결 이후 삭제 필요
  const fakeHistoryItems = useMemo(
    () => [
      {
        id: '1',
        text: '안녕하세요. 반갑습니다.',
        speed: 1.0,
        volume: 60.0,
        pitch: 4.0,
      },
      {
        id: '2',
        text: '안녕하세요. 반갑습니다.',
        speed: 1.0,
        volume: 60.0,
        pitch: 4.0,
      },
      {
        id: '3',
        text: '안녕하세요. 반갑습니다.',
        speed: 1.0,
        volume: 60.0,
        pitch: 4.0,
      },
    ],
    []
  );

  // 음원 히스토리 내역들
  const [historyItems, setHistoryItems] = useState([...fakeHistoryItems]);

  // 음원 히스토리 내역을 fetch 이후 초기화
  useEffect(() => {
    // 히스토리 내역을 백엔드에서 가져오는 로직이 있어야됨
    // const historyItems = await fetchHistoryItems(id);
    setHistoryItems([...fakeHistoryItems]);
  }, []);

  // 음원 히스토리 내역 삭제
  const handleDelete = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex bg-gray-50">
      <div className="relative">
        {[...historyItems].map((_, index) => (
          <>
            {index !== 0 ? (
              <div className="ml-8 w-[21px] h-[64px] rounded-bl-3xl border-l-[2px] border-b-2 border-l-gray-700-500 relative">
                <div
                  key={index}
                  className={`absolute h-[64px] w-0 border-l-[2px] bg-gray-300 ml-[-1.5px] -translate-y-4 line`}
                />
              </div>
            ) : (
              <div className="ml-8 w-[21px] h-[40px] rounded-bl-3xl border-l-2 border-b-[0.1em] border-l-gray-700-500"></div>
            )}
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
