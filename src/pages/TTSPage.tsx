import { useCallback, useEffect, useMemo, useState } from 'react';

import { saveTTSProject, ttsLoad } from '@/api/ttsApi';
import { FileProgressItem } from '@/components/custom/dropdowns/FileProgressDropdown';
import { TableContents } from '@/components/custom/tables/project/common/TableContents';
import Title from '@/components/section/contents/Title';
import AudioFooter from '@/components/section/footer/AudioFooter';
import { FileProgressHeader } from '@/components/section/header/FileProgressHeader';
import TTSOptionsSidebar from '@/components/section/sidebar/TTSSidebar';
import { Button } from '@/components/ui/button';
import { fileProgressDummy } from '@/constants/dummy';
import PageLayout from '@/layouts/PageLayout';
import { ttsInitialSettings, useTTSStore } from '@/stores/tts.store';
const TTSPage = () => {
  const {
    items,
    projectData,
    setItems,
    setProjectData,
    toggleSelection,
    toggleSelectAll,
    updateItem,
    deleteSelectedItems,
    addItems,
    handleReorder,
    updateProjectName,
  } = useTTSStore();

  const [progressFiles, setProgressFiles] = useState<FileProgressItem[]>(fileProgressDummy);

  // TTS 상태 로드
  const fetchTTSState = useCallback(
    async (id: number) => {
      try {
        const response = await ttsLoad(id);
        if (response.data?.success && response.data.data) {
          const { ttsProject, ttsDetails } = response.data.data;

          setProjectData({
            projectId: ttsProject.id,
            projectName: ttsProject.projectName,
          });

          const loadedItems = ttsDetails.map((detail) => ({
            id: String(detail.id),
            text: detail.unitScript || '',
            isSelected: false,
            speed: detail.unitSpeed || ttsInitialSettings.speed,
            volume: detail.unitVolume || ttsInitialSettings.volume,
            pitch: detail.unitPitch || ttsInitialSettings.pitch,
          }));
          setItems(loadedItems);
        }
      } catch (error) {
        console.error('TTS 프로젝트 로드 실패', error);
      }
    },
    [setProjectData, setItems]
  );

  useEffect(() => {
    if (projectData.projectId) {
      fetchTTSState(projectData.projectId);
    }
  }, [projectData.projectId, fetchTTSState]);

  // 프로젝트 저장
  const handleSaveProject = useCallback(async () => {
    try {
      const response = await saveTTSProject({
        ...projectData,
        ttsDetails: items.map((item) => ({
          id: parseInt(item.id),
          unitScript: item.text,
          unitSpeed: item.speed,
          unitVolume: item.volume,
          unitPitch: item.pitch,
        })),
      });

      if (response) {
        setProjectData({
          projectId: response.ttsProject.id,
          projectName: response.ttsProject.projectName,
          // !TODO다른 업데이트할 프로젝트 데이터들이 들어가면 좋을듯
        });
      }
    } catch (error) {
      console.error('프로젝트 저장 오류:', error);
    }
  }, [projectData, items, setProjectData]);

  const handleDeleteCompleted = () => {
    setProgressFiles((prev) => prev.filter((file) => file.status !== '완료'));
  };

  const handleRetryFailed = useCallback(() => {
    setProgressFiles((prev) =>
      prev.map((file) => (file.status === '실패' ? { ...file, status: '대기' } : file))
    );
  }, []);

  const isAllSelected = useMemo(() => items.every((item) => item.isSelected), [items]);

  return (
    <PageLayout
      variant="project"
      header={
        <FileProgressHeader
          files={progressFiles}
          onDeleteCompleted={handleDeleteCompleted}
          onRetryFailed={handleRetryFailed}
        />
      }
      sidebar={<TTSOptionsSidebar />}
      footer={<AudioFooter audioUrl="/sample.mp3" />}
      children={
        <>
          <Title
            type="TTS"
            projectTitle={projectData.projectName ?? '새 프로젝트'}
            onProjectNameChange={updateProjectName} // 이름 변경 핸들러 추가
            onSave={handleSaveProject}
          />
          <>
            <div className={`h-[580px] mt-6 overflow-hidden`}>
              <TableContents
                items={items}
                isAllSelected={isAllSelected}
                onSelectAll={toggleSelectAll}
                onSelectionChange={toggleSelection}
                onTextChange={(id, text) => updateItem(id, { text })}
                onDelete={deleteSelectedItems}
                onAdd={addItems}
                onRegenerateItem={(id) => console.log('재생성 항목:', id)}
                onDownloadItem={(id) => console.log('다운로드 항목:', id)}
                onPlay={(id) => console.log('재생:', id)}
                onReorder={handleReorder}
                type={'TTS'}
              />
            </div>
            <div className={`TTS mt-12 text-center`}>
              <Button>{'TTS 생성'}</Button>
            </div>
          </>
        </>
      }
    />
  );
};

export default TTSPage;
