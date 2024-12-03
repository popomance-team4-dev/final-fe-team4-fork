import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { concatLoad } from '@/api/aIParkAPI';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import CONCATOptionsSidebar from '@/components/section/sidebar/CONCATSidebar';
import { Spinner } from '@/components/ui/spinner';
import PageLayout from '@/layouts/PageLayout';
import { ConcatItem, useConcatStore } from '@/stores/concat.store';

interface ConcatProjectDto {
  id: number;
  projectName: string;
  globalFrontSilenceLength: number;
  globalTotalSilenceLength: number;
  concatAudios: Array<{
    id: number;
    audioUrl: string;
  }>;
}
interface ConcatDetailDto {
  id: number;
  audioSeq: number;
  srcUrl: string;
  unitScript: string;
  endSilence: number;
  checked: boolean;
}
interface ConcatData {
  cnctProjectDto: ConcatProjectDto;
  cnctDetailDtos: ConcatDetailDto[];
}

const CONCATPage = () => {
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
  const hasAudioFile = items.length > 0;

  useEffect(() => {
    const loadConcatProject = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await concatLoad(Number(id));
        console.log('API 응답:', response);

        if (response.data) {
          const { cnctProjectDto, cnctDetailDtos } = response.data as ConcatData;
          console.log('프로젝트 정보:', cnctProjectDto);

          if (cnctProjectDto && cnctProjectDto.projectName) {
            setProjectName(cnctProjectDto.projectName);
          }

          const newItems: ConcatItem[] = cnctDetailDtos.map((detail) => ({
            id: detail.id.toString(),
            text: detail.unitScript,
            isSelected: detail.checked,
            speed: 1.0,
            volume: 1.0,
            pitch: 1.0,
            fileName: detail.srcUrl.split('/').pop() || '',
            audioUrl: '',
            file: new File([], ''),
            status: '대기중' as const,
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const texts = await Promise.all(Array.from(files).map((file) => file.text()));

    setItems(
      items.map((item, index) => {
        if (item.isSelected && texts[index]) {
          return {
            ...item,
            text: texts[index],
          };
        }
        return item;
      })
    );
  };

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={<CONCATOptionsSidebar />}
      footer={<AudioPlayer audioUrl={''} />}
    >
      <Title
        type="CONCAT"
        projectTitle={projectName}
        onSave={() => console.log('저장')}
        onClose={() => console.log('닫기')}
      />
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Spinner size={50} />
        </div>
      ) : (
        <MainContents
          type="CONCAT"
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
          isAllSelected={items.every((item: ConcatItem) => item.isSelected)}
          hasAudioFile={hasAudioFile}
          onFileUpload={handleFileUpload}
        />
      )}
    </PageLayout>
  );
};

export default CONCATPage;
