import { useCallback, useState } from 'react';

import { AudioPlayer } from '@/components/custom/feature/AudioPlayer';
import MainContents, { MainContentsItem } from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import VCSidebar from '@/components/section/sidebar/VCSidebar';
import { ALLOWED_FILE_TYPES, useFileUpload } from '@/hooks/useFileUpload';
import PageLayout from '@/layouts/PageLayout';

interface VCItem extends MainContentsItem {
  fileName: string;
  status: '대기중' | '완료' | '실패' | '진행';
  originalAudioUrl?: string;
  convertedAudioUrl?: string;
}

const VCPage = () => {
  const [items, setItems] = useState<VCItem[]>([]);
  const [selectedTargetVoice, setSelectedTargetVoice] = useState<string>('');

  // 오디오 파일 업로드
  const { handleFiles: handleAudioUpload } = useFileUpload<File>({
    maxSizeInMB: 10,
    allowedTypes: [ALLOWED_FILE_TYPES.WAV, ALLOWED_FILE_TYPES.MP3],
    onSuccess: (files) => {
      const newItems = files.map((file) => ({
        id: crypto.randomUUID(),
        text: '',
        isSelected: false,
        fileName: file.name,
        status: '대기중' as const,
        originalAudioUrl: URL.createObjectURL(file),
      }));
      setItems((prev) => [...prev, ...newItems]);
    },
  });

  // 텍스트 파일 업로드
  const { handleFiles: handleTextUpload } = useFileUpload<string>({
    maxSizeInMB: 5,
    allowedTypes: [ALLOWED_FILE_TYPES.TEXT],
    onSuccess: (texts) => {
      setItems((prev) =>
        prev.map((item) => (item.isSelected ? { ...item, text: texts[0] || '' } : item))
      );
    },
  });

  // 텍스트 파일 업로드 핸들러
  const handleFileUpload = (files: FileList | null) => {
    if (files) handleTextUpload(files);
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

  const handleAdd = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleAudioUpload(files);
      }
    };
    input.click();
  }, [handleAudioUpload]);

  const handlePlay = useCallback((id: string) => {
    console.log('Play item:', id);
  }, []);

  const handleSelectAll = useCallback(() => {
    const isAllSelected = items.every((item) => item.isSelected);
    setItems((prev) => prev.map((item) => ({ ...item, isSelected: !isAllSelected })));
  }, [items]);

  const handleVoiceConversion = useCallback(() => {
    if (!selectedTargetVoice) return;

    setItems((prev) => prev.map((item) => (item.isSelected ? { ...item, status: '진행' } : item)));
    // API 호출 및 변환 처리
  }, [selectedTargetVoice]);

  // 컴포넌트 최상위 레벨이 아닌 useMemo나 렌더링 직전에 변환
  const mainContentItems: MainContentsItem[] = items.map(
    ({ id, text, isSelected, status, fileName, originalAudioUrl }) => {
      const item = {
        id,
        text,
        isSelected,
        status,
        fileName,
        originalAudioUrl,
      };
      return item;
    }
  );

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={
        <VCSidebar
          selectedVoice={selectedTargetVoice}
          onVoiceSelect={setSelectedTargetVoice}
          onApplyConversion={handleVoiceConversion}
        />
      }
      footer={<AudioPlayer audioUrl={''} />}
    >
      <Title
        type="VC"
        projectTitle="프로젝트 1"
        onSave={() => console.log('저장')}
        onClose={() => console.log('닫기')}
      />
      <MainContents
        type="VC"
        items={mainContentItems}
        onSelectionChange={handleSelectionChange}
        onTextChange={handleTextChange}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onPlay={handlePlay}
        onSelectAll={handleSelectAll}
        isAllSelected={items.every((item) => item.isSelected)}
        onFileUpload={handleFileUpload}
      />
    </PageLayout>
  );
};

export default VCPage;
