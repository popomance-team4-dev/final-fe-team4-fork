import { useCallback, useEffect, useState } from 'react';

import { processVoiceConversion, VCProcessResponse, VCSaveDto } from '@/api/vcApi';
import { AudioPlayer } from '@/components/custom/features/common/AudioPlayer';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import VCSidebar, { TargetVoice } from '@/components/section/sidebar/VCSidebar';
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
    cleanupAllAudioUrls,
    memberId,
    setItems,
    showAlert,
  } = useVCStore();

  const [customVoices, setCustomVoices] = useState<TargetVoice[]>([]);

  useEffect(() => {
    return () => {
      cleanupAllAudioUrls();
    };
  }, [cleanupAllAudioUrls]);

  const handleApplyTargetVoice = useCallback(async () => {
    if (!selectedVoice) return;

    const updatedItems = items.map((item) => {
      if (item.isSelected) {
        return {
          ...item,
          status: '대기중' as const,
          targetVoice: selectedVoice,
        };
      }
      return item;
    });
    setItems(updatedItems);
    showAlert('타겟 보이스가 적용되었습니다.', 'default');
  }, [selectedVoice, items, setItems, showAlert]);

  const handleVoiceConversion = useCallback(async () => {
    if (!selectedVoice) return;
    try {
      const selectedItems = items.filter((item) => item.isSelected && item.file);
      if (selectedItems.length === 0) {
        showAlert('변환할 오디오를 선택해주세요.', 'destructive');
        return;
      }

      const updatedItems = items.map((item) => {
        if (item.isSelected) {
          const updatedItem = {
            ...item,
            status: '대기중' as const,
            targetVoice: selectedVoice,
          };
          console.log('Updated item:', updatedItem);
          return updatedItem;
        }
        return item;
      });
      setItems(updatedItems);

      const vcSaveDto: VCSaveDto = {
        projectId: projectData.projectId ?? undefined,
        projectName: projectData.projectName,
        srcFiles: selectedItems.map((item) => ({
          audioType: 'VC_SRC',
          localFileName: item.fileName,
          unitScript: item.text,
          isChecked: true,
        })),
        trgFiles: [
          {
            audioType: 'VC_TRG',
            localFileName: 'rico.mp3',
            s3MemberAudioMetaId: undefined,
          },
        ],
      };

      const targetVoiceFile = await fetch('/rico.mp3').then((res) => res.blob());
      const files = [
        ...selectedItems.map((item) => item.file as File),
        new File([targetVoiceFile], 'rico.mp3', { type: 'audio/mp3' }),
      ];

      const result = await processVoiceConversion(vcSaveDto, files, memberId);

      if (result) {
        console.log('서버 응답:', result);
        const updatedItems = items.map((item) => {
          const processedItem = result?.find((r: VCProcessResponse) =>
            r.srcAudio.includes(item.fileName)
          );
          if (processedItem) {
            return {
              ...item,
              status: '완료' as const,
              convertedAudioUrl: processedItem.genAudios[0],
            };
          }
          return item;
        });
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('음성 변환 실패:', error);
    }
  }, [selectedVoice, items, projectData, memberId, setItems, showAlert]);

  const mainContentItems = items.map((item) => {
    console.log('VCPage - Item:', {
      id: item.id,
      targetVoice: item.targetVoice,
      status: item.status,
    });
    return {
      id: item.id,
      text: item.text,
      isSelected: item.isSelected,
      status: item.status,
      fileName: item.fileName,
      audioUrl: item.convertedAudioUrl || item.originalAudioUrl,
      targetVoice: item.targetVoice,
    };
  });

  const hasAudioFile = items.length > 0;

  return (
    <PageLayout
      variant="project"
      header={<></>}
      sidebar={
        <VCSidebar
          selectedVoice={selectedVoice}
          onVoiceSelect={setSelectedVoice}
          onApplyConversion={handleApplyTargetVoice}
          customVoices={customVoices}
          onVoiceUpload={setCustomVoices}
        />
      }
      footer={
        <AudioPlayer
          audioUrl={(() => {
            const url =
              items.find(
                (item) => item.isSelected && item.status === '완료' && item.convertedAudioUrl
              )?.convertedAudioUrl || '';
            console.log('AudioPlayer URL:', url);
            return url;
          })()}
        />
      }
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
        isAllSelected={items.length > 0 && items.every((item) => item.isSelected)}
        onFileUpload={handleFileUpload}
        hasAudioFile={hasAudioFile}
        onGenerate={handleVoiceConversion}
      />
    </PageLayout>
  );
};

export default VCPage;
