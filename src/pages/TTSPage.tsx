import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { convertBatchTexts, ttsLoad } from '@/api/ttsAPI';
import { uploadTTSProjectData } from '@/api/uploadTTSProjectData';
// import { FileProgressItem } from '@/components/custom/dropdowns/FileProgressDropdown';
// import { FileProgressHeader } from '@/components/section/header/FileProgressHeader';
// import { fileProgressDummy } from '@/constants/dummy';
import { TableContents } from '@/components/custom/tables/project/common/TableContents';
import Title from '@/components/section/contents/Title';
import AudioFooter from '@/components/section/footer/AudioFooter';
import TTSOptionsSidebar from '@/components/section/sidebar/TTSSidebar';
import { Button } from '@/components/ui/button';
import PageLayout from '@/layouts/PageLayout';
import { ttsInitialSettings, TTSItem, useTTSStore } from '@/stores/tts.store';
import { useTTSAudioHistoryStore } from '@/stores/TTSAudioHistory.store.ts';
const TTSPage = () => {
  const { id } = useParams<{ id: string }>();
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
    updateProjectName,
  } = useTTSStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const setHistoryItems = useTTSAudioHistoryStore((state) => state.setHistoryItems);

  console.log('useTTSStore 상태:', { items, projectData });

  const [isLoading, setIsLoading] = useState(false);

  // TTS 프로젝트 데이터 로드
  useEffect(() => {
    const loadTTSProject = async () => {
      console.log('loadTTSProject 실행'); // 함수 호출 확인

      if (!id) {
        console.warn('ID가 없습니다.');
        return;
      }

      setIsLoading(true); // 로딩 상태 업데이트
      try {
        const response = await ttsLoad(Number(id));
        console.log('API 응답:', response.data);
        const { ttsProject, ttsDetails } = response.data;

        // 상태 업데이트
        if (ttsProject) {
          setProjectData({
            projectId: ttsProject.id,
            projectName: ttsProject.projectName || '새 프로젝트',
          });
          console.log('setProjectData 호출 완료:', ttsProject);
        } else {
          console.warn('ttsProject 데이터가 없습니다.');
        }

        if (Array.isArray(ttsDetails)) {
          const loadedItems: TTSItem[] = ttsDetails.map((detail) => ({
            id: String(detail.id),
            enitityId: detail.id,
            text: detail.unitScript || '',
            isSelected: false,
            volume: detail.unitVolume || ttsInitialSettings.volume,
            speed: detail.unitSpeed || ttsInitialSettings.speed,
            pitch: detail.unitPitch || ttsInitialSettings.pitch,
            style: detail.unitVoiceStyleId || null,
          }));

          setItems(loadedItems);
          setHistoryItems(ttsDetails);
          console.log('setItems 호출 완료:', loadedItems);
        } else {
          console.warn('ttsDetails 데이터가 유효하지 않습니다.');
        }
      } catch (error) {
        console.error('TTS 프로젝트 로드 실패:', error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    loadTTSProject();
  }, [id, setProjectData, setItems, setHistoryItems]);

  const isAllSelected = useMemo(() => items.every((item) => item.isSelected), [items]);

  const handleReorder = useCallback(
    (startIndex: number, endIndex: number) => {
      const newItems = [...items];
      const [removed] = newItems.splice(startIndex, 1);
      newItems.splice(endIndex, 0, removed);
      setItems(newItems);
    },
    [items, setItems]
  );

  // TTS 오디오 데이터 생성
  const generateTTSAudioData = useCallback(async () => {
    setIsGenerating(true);

    const response = await convertBatchTexts({
      ...projectData,
      ttsDetails: items.map((item, index) => ({
        id: item.enitityId,
        unitScript: item.text,
        unitSpeed: item.speed,
        unitVolume: item.volume,
        unitPitch: item.pitch,
        unitSequence: index + 1,
        unitVoiceStyleId: item.style ? Number(item.style) : null,
        isDeleted: false,
      })),
    });
    setIsGenerating(false);

    setHistoryItems(response.data.ttsDetails);
  }, [projectData, items, setHistoryItems]);

  const historyItems = useTTSAudioHistoryStore((state) => state.historyItems);
  const audioTTSHisoryItems = Object.values(historyItems)
    .flat()
    .reverse()
    .slice(0, 7)
    .map((historyItem) => {
      return {
        id: historyItem.audioId,
        audioUrl: historyItem.audioUrl,
      };
    });

  const currentAudioUrl = audioTTSHisoryItems.length > 0 ? audioTTSHisoryItems[0].audioUrl : '';

  const handleSave = useCallback(async () => {
    try {
      await uploadTTSProjectData(projectData, items, setProjectData);
    } catch (error) {
      console.error('프로젝트 저장 오류:', error);
    }
  }, [projectData, items, setProjectData]);

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={<TTSOptionsSidebar />}
      footer={<AudioFooter audioUrl={currentAudioUrl} />}
      children={
        <>
          <Title
            type="TTS"
            projectTitle={projectData.projectName ?? '새 프로젝트'}
            onProjectNameChange={updateProjectName} // 이름 변경 핸들러 추가
            onSave={handleSave} // 저장 핸들러 추가
          />
          {isLoading ? (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              <div>Loading...</div>
            </div>
          ) : (
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
                <Button onClick={generateTTSAudioData} disabled={isGenerating}>
                  {isGenerating ? '생성 중...' : 'TTS 생성'}
                </Button>
              </div>
            </>
          )}
        </>
      }
    />
  );
};

export default TTSPage;
