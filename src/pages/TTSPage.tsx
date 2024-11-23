import { useCallback, useState } from 'react';

import { FileProgressItem } from '@/components/custom/dropdowns/FileProgressDropdown';
import ProjectTitle from '@/components/section/contents/ProjectTitle';
import TTSMainContents from '@/components/section/contents/TTSMainContents';
import AudioFooter from '@/components/section/footer/AudioFooter';
import { FileProgressHeader } from '@/components/section/header/FileProgressHeader';
import TTSOptionsSidebar from '@/components/section/sidebar/TTSSidebar';
import jisuImage from '@/images/avatar/jisu.jpg';
interface TTSItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
}

const TTSPage = () => {
  const [progressFiles, setProgressFiles] = useState<FileProgressItem[]>([
    {
      id: 1,
      name: 'text_001.txt',
      status: '진행',
      progress: 75,
      createdAt: new Date().toISOString(), // 오늘
    },
    {
      id: 2,
      name: 'text_002.txt',
      status: '진행',
      progress: 82,
      createdAt: new Date().toISOString(), // 오늘
    },
    {
      id: 3,
      name: 'text_003.txt',
      status: '대기',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
    },
    {
      id: 4,
      name: 'text_004.txt',
      status: '대기',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
    },
    {
      id: 5,
      name: 'text_005.txt',
      status: '실패',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 그저께
    },
    {
      id: 6,
      name: 'text_006.txt',
      status: '완료',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 일주일 전
    },
    {
      id: 7,
      name: 'text_007.txt',
      status: '완료',
      createdAt: new Date(Date.now() - 86400000 * 31).toISOString(), // 한달 전
    },
  ]);

  const [items, setItems] = useState<TTSItem[]>([]);

  const handleDeleteCompleted = useCallback(() => {
    setProgressFiles((prev) => prev.filter((file) => file.status !== '완료'));
  }, []);

  const handleRetryFailed = useCallback(() => {
    setProgressFiles((prev) =>
      prev.map((file) => (file.status === '실패' ? { ...file, status: '대기' } : file))
    );
  }, []);

  const isAllSelected = items.every((item) => item.isSelected);

  const handleSelectAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isSelected: !isAllSelected })));
  };

  const handleSelectionChange = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item))
    );
  };

  const handleTextChange = (id: string, newText: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, text: newText } : item)));
  };

  const handleDelete = useCallback(() => {
    setItems((prevItems) => prevItems.filter((item) => !item.isSelected));
  }, []);

  const handleRegenerateItem = useCallback((id: string) => {
    console.log('재생성 항목:', id);
  }, []);

  const handleDownloadItem = useCallback((id: string) => {
    console.log('다운로드 항목:', id);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <header className="h-[92px] ml-6 border-b">
        <FileProgressHeader
          name="김바타"
          email="aipark@aipark.ai"
          imageUrl={jisuImage}
          files={progressFiles}
          onDeleteCompleted={handleDeleteCompleted}
          onRetryFailed={handleRetryFailed}
          onMyPage={() => console.log('마이페이지')}
          onSignout={() => console.log('로그아웃')}
        />
      </header>

      <div className="flex flex-1 h-[839px] ml-6 border-b">
        {/* Main1 */}
        <section className="flex-1 py-6 pr-6 flex flex-col">
          <div className="h-[71px]">
            <ProjectTitle type="TTS" projectTitle="프로젝트 1" onSave={() => console.log('저장')} />
          </div>
          <TTSMainContents
            items={items}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            onSelectionChange={handleSelectionChange}
            onTextChange={handleTextChange}
            onDelete={handleDelete}
            onAdd={() => {
              setItems((prev) => [
                ...prev,
                {
                  id: String(Date.now()),
                  text: '',
                  isSelected: false,
                  speed: 1.0,
                  volume: 60,
                  pitch: 4.0,
                },
              ]);
            }}
            onRegenerateItem={handleRegenerateItem}
            onDownloadItem={handleDownloadItem}
            onPlay={(id) => console.log('재생:', id)}
          />
        </section>

        {/* Right Sidebar */}
        <aside className="w-[276px] flex-shrink-0">
          <TTSOptionsSidebar />
        </aside>
      </div>

      {/* Playback */}
      <section className="h-[92px] px-6">
        <AudioFooter audioUrl="/sample.mp3" />
      </section>
    </div>
  );
};

export default TTSPage;
