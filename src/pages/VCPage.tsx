import { useEffect, useMemo, useState } from 'react';

import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import VCSidebar, { TargetVoice } from '@/components/section/sidebar/VCSidebar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAudioDownload } from '@/hooks/useAudioDownload';
import { useVoiceConversion } from '@/hooks/useVoiceConversion';
import PageLayout from '@/layouts/PageLayout';
import { useVCStore } from '@/stores/vc.store';

const VCPage = () => {
  const {
    items,
    deleteSelectedItems,
    toggleSelection,
    toggleSelectAll,
    selectedVoice,
    setSelectedVoice,
    alert,
    projectData,
    updateProjectName,
    handleAdd,
    handleFileUpload,
    handleTextChange,
    handlePlay,
    cleanupAllAudioUrls,
    memberId,
    setItems,
    showAlert,
  } = useVCStore();

  const [customVoices, setCustomVoices] = useState<TargetVoice[]>([]);

  // 클린업 이펙트
  useEffect(() => cleanupAllAudioUrls, [cleanupAllAudioUrls]);

  // 음성 변환 핸들러
  const { handleVoiceConversion, isGenerating } = useVoiceConversion({
    items,
    selectedVoice,
    projectData,
    memberId,
    setItems,
    showAlert,
  });

  // 다운로드 핸들러
  const handleDownload = useAudioDownload({ items, showAlert });

  // 메인 컨텐츠 아이템 변환
  const mainContentItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        text: item.text,
        isSelected: item.isSelected,
        status: item.status,
        fileName: item.fileName,
        audioUrl: item.convertedAudioUrl || item.originalAudioUrl,
        targetVoice: item.targetVoice,
      })),
    [items]
  );

  // 현재 재생중인 오디오 URL
  const currentAudioUrl = useMemo(() => {
    const selectedItem = items.find(
      (item) => item.isSelected && item.status === '완료' && item.convertedAudioUrl
    );
    return selectedItem?.convertedAudioUrl || '';
  }, [items]);

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={
        <VCSidebar
          selectedVoice={selectedVoice}
          onVoiceSelect={setSelectedVoice}
          onApplyConversion={handleVoiceConversion}
          customVoices={customVoices}
          onVoiceUpload={setCustomVoices}
        />
      }
      footer={<AudioPlayer audioUrl={currentAudioUrl} />}
    >
      {alert.show && (
        <div className="absolute left-1/2 -translate-x-1/2 top-6">
          <Alert variant={alert.variant} className="w-[360px] bg-white">
            <AlertDescription className="text-sm">{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
      <Title
        type="VC"
        projectTitle={projectData.projectName}
        onProjectNameChange={updateProjectName}
        onSave={() => console.log('저장')}
        onClose={() => console.log('닫기')}
      />
      <MainContents
        type="VC"
        items={mainContentItems}
        onSelectionChange={toggleSelection}
        onTextChange={handleTextChange}
        onDelete={deleteSelectedItems}
        onAdd={handleAdd}
        onPlay={handlePlay}
        onSelectAll={toggleSelectAll}
        isAllSelected={items.every((item) => item.isSelected)}
        onFileUpload={handleFileUpload}
        hasAudioFile={items.length > 0}
        onGenerate={handleVoiceConversion}
        isGenerating={isGenerating}
        onDownloadItem={handleDownload}
      />
    </PageLayout>
  );
};

export default VCPage;
