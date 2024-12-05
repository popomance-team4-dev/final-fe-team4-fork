import { useState } from 'react';

import HomePopup from '@/components/custom/guide/HomePopup';
import { RecentExportTable } from '@/components/custom/tables/history/RecentExportTable';
import RecentProject from '@/components/section/contents/RecontProject';
import MainHeader from '@/components/section/header/MainHeader';
import PageLayout from '@/layouts/PageLayout';
const HomePage = () => {
  const [currentPlayingId, setCurrentPlayingId] = useState<string>();

  const handlePlay = (id: string) => setCurrentPlayingId(id);
  const handlePause = () => setCurrentPlayingId(undefined);

  return (
    <PageLayout variant="main" header={<MainHeader />}>
      {/* 팝업 창 */}
      <HomePopup />
      {/* 최근 프로젝트 영역 */}
      <RecentProject />
      {/* 최근 내보내기 영역 */}
      <RecentExportTable
        onPlay={handlePlay}
        onPause={handlePause}
        currentPlayingId={currentPlayingId}
      />
    </PageLayout>
  );
};

export default HomePage;
