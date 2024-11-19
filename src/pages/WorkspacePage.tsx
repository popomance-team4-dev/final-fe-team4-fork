import { useState } from 'react';

import { HistoryTable } from '@/components/workspace/HistoryTable';
import HomePopup from '@/components/workspace/HomePopup';
import RecentProject from '@/components/workspace/RecontProject';
const WorkspacePage = () => {
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
      <div className="p-6 bg-gray-200 h-[92px]">
        {/* 환영 메시지 */}
        <p>User 님, 반갑습니다.</p>
      </div>

      <div className="px-6 pt-6">
        {/* 팝업 창 */}
        <HomePopup />
      </div>

      <div>
        {/* 최근 프로젝트 영역 */}
        <div>
          <RecentProject />
        </div>
      </div>

      <div>
        {/* 최근 내보내기 영역 */}
        <div>
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
