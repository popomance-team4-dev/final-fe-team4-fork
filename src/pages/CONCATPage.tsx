import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { concatLoad } from '@/api/aIParkAPI';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import CONCATOptionsSidebar from '@/components/section/sidebar/CONCATSidebar';
import { Spinner } from '@/components/ui/spinner';
import PageLayout from '@/layouts/PageLayout';

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
interface CONCATItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
  fileName: string;
}

const CONCATPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState<CONCATItem[]>([]);
  const [projectName, setProjectName] = useState('프로젝트');
  const [isLoading, setIsLoading] = useState(false);

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

          const newItems: CONCATItem[] = cnctDetailDtos.map((detail) => ({
            id: detail.id.toString(),
            text: detail.unitScript,
            isSelected: detail.checked,
            speed: 1.0,
            volume: 1.0,
            pitch: 1.0,
            fileName: detail.srcUrl.split('/').pop() || '',
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
  }, [id]);

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

  const handleAdd = useCallback(() => {
    const newItem: CONCATItem = {
      id: `${items.length + 1}`,
      text: '',
      isSelected: false,
      speed: 1.0,
      volume: 1.0,
      pitch: 1.0,
      fileName: `new_file_${items.length + 1}.wav`,
    };
    setItems((prev) => [...prev, newItem]);
  }, [items.length]);

  const handlePlay = useCallback((id: string) => {
    console.log('Play item:', id);
  }, []);

  const handleSelectAll = useCallback(() => {
    const isAllSelected = items.every((item) => item.isSelected);
    setItems((prev) => prev.map((item) => ({ ...item, isSelected: !isAllSelected })));
  }, [items]);

  return (
    <PageLayout
      variant="project"
      header={<></>} // FileProgressDropDown
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
          items={items}
          onSelectionChange={handleSelectionChange}
          onTextChange={handleTextChange}
          onDelete={handleDelete}
          onAdd={handleAdd}
          onPlay={handlePlay}
          onSelectAll={handleSelectAll}
          isAllSelected={items.every((item) => item.isSelected)}
        />
      )}
    </PageLayout>
  );
};

export default CONCATPage;
