import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { concatLoad, concatSave } from '@/api/concatAPI';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import ConcatSidebar from '@/components/section/sidebar/ConcatSidebar';
import { Spinner } from '@/components/ui/spinner';
import PageLayout from '@/layouts/PageLayout';
import { ConcatItem, useConcatStore } from '@/stores/concat.store';

const ConcatPage = () => {
  const { id } = useParams();
  const {
    items,
    setItems,
    deleteSelectedItems,
    toggleSelection,
    toggleSelectAll,
    handleAdd,
    handleTextChange,
    handlePlay,
  } = useConcatStore();

  const [projectName, setProjectName] = useState('새 프로젝트');
  const [isLoading, setIsLoading] = useState(false);
  const [globalFrontSilenceLength, setGlobalFrontSilenceLength] = useState(0);
  const [globalTotalSilenceLength, setGlobalTotalSilenceLength] = useState(0);
  const hasAudioFile = items.length > 0;

  useEffect(() => {
    const loadConcatProject = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await concatLoad(Number(id));
        console.log('API 전체 응답:', response);
        console.log('API 응답 데이터:', response.data);

        // response.data 직접 사용
        if (response.data.cnctProjectDto) {
          console.log('프로젝트 정보:', response.data.cnctProjectDto);
          // 프로젝트 기본 정보 설정
          setProjectName(response.data.cnctProjectDto.projectName);
          setGlobalFrontSilenceLength(
            Number(response.data.cnctProjectDto.globalFrontSilenceLength) || 0
          );
          setGlobalTotalSilenceLength(
            Number(response.data.cnctProjectDto.globalTotalSilenceLength) || 0
          );
        }

        if (response.data.cnctDetailDtos && Array.isArray(response.data.cnctDetailDtos)) {
          console.log('상세 정보:', response.data.cnctDetailDtos);
          // 상세 항목 설정
          const newItems: ConcatItem[] = response.data.cnctDetailDtos.map((detail) => ({
            id: detail.id.toString(),
            text: detail.unitScript,
            isSelected: detail.checked,
            fileName: detail.srcUrl.split('/').pop() || '',
            audioUrl: detail.srcUrl,
            file: undefined,
            status: '대기중' as const,
            endSilence: detail.endSilence,
          }));
          setItems(newItems);
        }
      } catch (error) {
        console.error('프로젝트 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConcatProject();
  }, [id, setItems]);

  // 프로젝트 이름 변경
  const handleProjectNameChange = useCallback((newName: string) => {
    console.log('프로젝트 이름 변경:', newName);
    setProjectName(newName);
  }, []);

  // 저장
  const handleSave = useCallback(async () => {
    try {
      setIsLoading(true);

      const concatSaveDto = {
        projectId: id ? parseInt(id) : null,
        projectName,
        globalFrontSilenceLength: Number(globalFrontSilenceLength) || 0,
        globalTotalSilenceLength: Number(globalTotalSilenceLength) || 0,
        concatDetails: items.map((item, index) => ({
          id: id && item.id ? parseInt(item.id) : null,
          localFileName: item.fileName || '',
          audioSeq: index + 1,
          isChecked: item.isSelected,
          unitScript: item.text || '',
          endSilence: item.endSilence || 0,
        })),
      };

      const files = items
        .filter((item) => item.file instanceof File && item.file.size > 0)
        .map((item) => item.file) as File[];

      console.log('저장 요청 데이터:', concatSaveDto);

      const response = await concatSave({
        concatSaveDto,
        file: files,
      });

      console.log('저장 성공:', response);
    } catch (error) {
      console.error('저장 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, projectName, globalFrontSilenceLength, globalTotalSilenceLength, items]);

  // 파일 업로드
  const handleFileUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const updateItems = (prevItems: ConcatItem[]): ConcatItem[] =>
        prevItems.map((item, index) => {
          if (item.isSelected && files[index]) {
            return {
              ...item,
              file: files[index],
              fileName: files[index].name,
              audioUrl: URL.createObjectURL(files[index]),
            };
          }
          return item;
        });

      setItems(updateItems);
    },
    [setItems]
  );

  // 순서 변경
  const handleReorder = useCallback(
    (startIndex: number, endIndex: number) => {
      const newItems = [...items];
      const [removed] = newItems.splice(startIndex, 1);
      newItems.splice(endIndex, 0, removed);
      setItems(newItems);
    },
    [items, setItems]
  );

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={<ConcatSidebar />}
      footer={<AudioPlayer audioUrl={''} />}
    >
      <Title
        type="Concat"
        projectTitle={projectName}
        onProjectNameChange={handleProjectNameChange}
        onSave={handleSave}
        onClose={() => console.log('닫기')}
      />
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Spinner size={50} />
        </div>
      ) : (
        <MainContents
          type="Concat"
          items={items.map((item) => ({
            ...item,
            frontSilence: item.frontSilence ?? 0,
            backSilence: item.backSilence ?? 0,
            endSilence: item.endSilence ?? 0,
          }))}
          onSelectionChange={toggleSelection}
          onTextChange={handleTextChange}
          onDelete={deleteSelectedItems}
          onAdd={handleAdd}
          onPlay={handlePlay}
          onSelectAll={toggleSelectAll}
          isAllSelected={items.every((item) => item.isSelected)}
          hasAudioFile={hasAudioFile}
          onFileUpload={handleFileUpload}
          onReorder={handleReorder}
        />
      )}
    </PageLayout>
  );
};

export default ConcatPage;
