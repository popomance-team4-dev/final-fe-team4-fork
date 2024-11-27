import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ttsLoad } from '@/api/aIParkAPI';
import { TTSSaveDto } from '@/api/aIParkAPI.schemas';
import { saveTTSProject } from '@/api/ttsApi';
import { FileProgressItem } from '@/components/custom/dropdowns/FileProgressDropdown';
import MainContents, { MainContentsItem } from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
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
  const [projectId, setProjectId] = useState<number | null>(null);

  // TTS 상태 저장을 위한 상태 관리
  const location = useLocation();
  const initialState: TTSSaveDto = location.state || {
    projectId: null,
    projectName: '',
    voiceStyleId: 9,
    fullScript: '',
    globalSpeed: 1.0,
    globalPitch: 0.5,
    globalVolume: 0.8,
    ttsDetails: [],
  };
  const [projectData, setProjectData] = useState<TTSSaveDto>(initialState);

  // TTS 상태 로드
  const fetchTTSState = useCallback(async (id: number) => {
    try {
      const response = await ttsLoad(id);
      if (response.data?.success && response.data.data) {
        const { ttsProject, ttsDetails } = response.data.data;

        // projectId 업데이트
        setProjectId(ttsProject.id);

        setProjectData((prev) => ({
          ...prev,
          projectId: ttsProject.id,
          projectName: ttsProject.projectName,
        }));

        const loadedItems = ttsDetails.map((detail) => ({
          id: String(detail.id),
          text: detail.unitScript || '',
          isSelected: false,
          speed: detail.unitSpeed || 1.0,
          volume: detail.unitVolume || 50,
          pitch: detail.unitPitch || 1.0,
        }));
        setItems(loadedItems);
      }
    } catch (error) {
      console.error('TTS 상태 로드 중 오류:', error);
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      fetchTTSState(projectId);
    }
  }, [projectId, fetchTTSState]);

  // 프로젝트 저장
  const handleSaveProject = useCallback(async () => {
    try {
      const response = await saveTTSProject({
        ...projectData, // 항상 최신 상태를 가져옴
      });

      if (response) {
        console.log('프로젝트 저장 성공:', response);

        // 저장된 프로젝트 ID 업데이트
        setProjectData((prev) => ({
          ...prev,
          projectId: response.ttsProject.id,
        }));
        console.log('업데이트된 projectId:', response.ttsProject.id);
      }
    } catch (error) {
      console.error('프로젝트 저장 오류:', error);
    }
  }, [projectData]);

  // 프로젝트 이름 변경 핸들러
  const handleProjectNameChange = (newName: string) => {
    setProjectData((prev) => ({
      ...prev,
      projectName: newName,
    }));
  };

  const handleDeleteCompleted = useCallback(() => {
    setProgressFiles((prev) => prev.filter((file) => file.status !== '완료'));
  }, []);

  const handleRetryFailed = useCallback(() => {
    setProgressFiles((prev) =>
      prev.map((file) => (file.status === '실패' ? { ...file, status: '대기' } : file))
    );
  }, []);

  const isAllSelected = useMemo(() => items.every((item) => item.isSelected), [items]);

  const handleSelectAll = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, isSelected: !isAllSelected })));
  }, [isAllSelected]);

  const handleSelectionChange = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item))
    );
  }, []);

  const handleTextChange = useCallback((id: string, newText: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, text: newText } : item)));
  }, []);

  const handleDelete = useCallback(() => {
    setItems((prevItems) => prevItems.filter((item) => !item.isSelected));
  }, []);

  const handleRegenerateItem = useCallback((id: string) => {
    console.log('재생성 항목:', id);
  }, []);

  const handleDownloadItem = useCallback((id: string) => {
    console.log('다운로드 항목:', id);
  }, []);

  const handleAdd = useCallback((newItems?: MainContentsItem[]) => {
    if (newItems && newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems] as TTSItem[]);
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
          <Title
            type="TTS"
            projectTitle={projectData.projectName || '새 프로젝트'}
            onProjectNameChange={handleProjectNameChange} // 이름 변경 핸들러 추가
            onSave={handleSaveProject}
          />
          <MainContents
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
