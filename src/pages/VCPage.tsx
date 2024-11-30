import { useCallback } from 'react';

import { AudioPlayer } from '@/components/custom/feature/AudioPlayer';
import MainContents, { MainContentsItem } from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import VCSidebar from '@/components/section/sidebar/VCSidebar';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  } = useVCStore();

  const handleVoiceConversion = useCallback(() => {
    if (!selectedVoice) return;
    // API 호출 및 변환 처리
  }, [selectedVoice]);

  const mainContentItems: MainContentsItem[] = items.map(
    ({ id, text, isSelected, status, fileName, originalAudioUrl }) => ({
      id,
      text,
      isSelected,
      status,
      fileName,
      originalAudioUrl,
    })
  );

  const hasAudioFile = items.length > 0;

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={
        <VCSidebar
          selectedVoice={selectedVoice}
          onVoiceSelect={setSelectedVoice}
          onApplyConversion={handleVoiceConversion}
        />
      }
      footer={<AudioPlayer audioUrl={''} />}
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
        hasAudioFile={hasAudioFile}
      />
    </PageLayout>
  );
};

export default VCPage;
