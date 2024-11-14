import { useState } from 'react';
import { TbChevronRight, TbX } from 'react-icons/tb';

import { HistoryTable } from '@/components/workspace/HistoryTable';

const WorkspacePage = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [currentPlayingId, setCurrentPlayingId] = useState<string>();

  const historyItems = [
    {
      id: '1',
      order: '01',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오11.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'VC' as const,
      createdAt: '2024. 11. 12',
    },
    {
      id: '2',
      order: '02',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오12.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'TTS' as const,
      createdAt: '2024. 11. 12',
    },
    {
      id: '3',
      order: '03',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오13.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'CONCAT' as const,
      createdAt: '2024. 11. 12',
    },
    {
      id: '4',
      order: '04',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오14.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'VC' as const,
      createdAt: '2024. 11. 13',
    },
    {
      id: '5',
      order: '05',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오15.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'TTS' as const,
      createdAt: '2024. 11. 13',
    },
  ];

  const handlePlay = (id: string) => setCurrentPlayingId(id);
  const handlePause = () => setCurrentPlayingId(undefined);

  return (
    <div>
      <div className="p-6 bg-gray-200">
        {/* 환영 메시지 */}
        <p>User 님, 반갑습니다.</p>
      </div>

      <div>
        {/* 팝업 창 */}
        {isPopupVisible && (
          <div className="h-[428px] relative bg-blue-50 p-6 rounded-lg shadow-md">
            <button
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
              onClick={() => setPopupVisible(false)}
            >
              <TbX /> {/* 팝업 닫기 버튼 */}
            </button>
          </div>
        )}
      </div>

      <div>
        {/* 최근 프로젝트 영역 */}
        <div className="h-[370px] bg-gray-400 p-4"></div>
      </div>

      <div>
        {/* 최근 내보내기 영역 */}
        <div className="bg-white p-4">
          <div className="flex items-end justify-between mb-6">
            <h3 className="text-2xl font-bold leading-9">최근 내보내기</h3>
            <button
              onClick={() => console.log('전체 보기')}
              className="flex items-center text-black"
            >
              <span className="text-sm mr-1">전체 보기</span>
              <TbChevronRight />
            </button>
          </div>
          <HistoryTable
            items={historyItems}
            onPlay={handlePlay}
            onPause={handlePause}
            currentPlayingId={currentPlayingId}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
