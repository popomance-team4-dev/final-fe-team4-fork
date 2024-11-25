import { useCallback, useState } from 'react';

import { FileProgressItem } from '@/components/custom/dropdowns/FileProgressDropdown';
import ProjectMainContents from '@/components/section/contents/project/ProjectMainContents';
import ProjectTitle from '@/components/section/contents/project/ProjectTitle';
import AudioFooter from '@/components/section/footer/AudioFooter';
import { FileProgressHeader } from '@/components/section/header/FileProgressHeader';
import TTSOptionsSidebar from '@/components/section/sidebar/TTSSidebar';
import jisuImage from '@/images/avatar/jisu.jpg';
import PageLayout from '@/layouts/PageLayout';

interface TTSItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed?: number;
  volume?: number;
  pitch?: number;
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

  const handleAdd = useCallback((newItems?: TTSItem[]) => {
    if (newItems) {
      setItems((prev) => [...prev, ...newItems]);
    } else {
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
    }
  }, []);

  const handlePlay = useCallback((id: string) => {
    console.log('재생:', id);
  }, []);

  const handleReorder = useCallback((newItems: TTSItem[]) => {
    setItems(newItems);
  }, []);

  return (
    <PageLayout
      variant="project"
      header={
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
      }
      sidebar={<TTSOptionsSidebar />}
      footer={<AudioFooter audioUrl="/sample.mp3" />}
      children={
        <>
          <ProjectTitle type="TTS" projectTitle="프로젝트 1" onSave={() => console.log('저장')} />
          <ProjectMainContents
            type="TTS"
            items={items}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            onSelectionChange={handleSelectionChange}
            onTextChange={handleTextChange}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onRegenerateItem={handleRegenerateItem}
            onDownloadItem={handleDownloadItem}
            onPlay={handlePlay}
            onReorder={handleReorder}
          />
        </>
      }
    />
  );
};

export default TTSPage;
