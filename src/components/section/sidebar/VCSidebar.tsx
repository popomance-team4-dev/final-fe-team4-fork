import { useState } from 'react';
import { TbSettings } from 'react-icons/tb';

import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/custom/buttons/IconButton';
import VoiceSelection from '@/components/custom/feature/VoiceSelection';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Label } from '@/components/ui/label';
import { PRESET_VOICES } from '@/constants/dummy';
import { VC_TOOLTIP } from '@/constants/tooltips';

interface TargetVoice {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  type: 'preset' | 'custom';
}

interface VCSidebarProps {
  selectedVoice: string;
  onVoiceSelect: (voice: string) => void;
  onApplyConversion: () => void;
}

const VCSidebar: React.FC<VCSidebarProps> = ({
  selectedVoice,
  onVoiceSelect,
  onApplyConversion,
}) => {
  const [customVoices, setCustomVoices] = useState<TargetVoice[]>([]);

  const handleVoiceUpload = (file: File) => {
    const newVoice: TargetVoice = {
      id: `custom-${crypto.randomUUID()}`,
      name: file.name.split('.')[0],
      description: '내가 업로드한 목소리',
      avatarUrl: '',
      type: 'custom',
    };

    setCustomVoices((prev) => [...prev, newVoice]);
  };

  const handleVoiceDelete = (id: string) => {
    setCustomVoices((prev) => prev.filter((voice) => voice.id !== id));
  };

  const handleVoiceEdit = (id: string, type: 'name' | 'description') => {
    const voice = customVoices.find((v) => v.id === id);
    if (!voice) return;

    const newValue = prompt(
      type === 'name' ? '새로운 파일명을 입력하세요' : '새로운 설명을 입력하세요',
      type === 'name' ? voice.name : voice.description
    );

    if (newValue === null) return;

    setCustomVoices((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              [type]: newValue,
            }
          : v
      )
    );
  };

  return (
    <aside className="w-[276px] min-h-full border-l border-gray-200 bg-background">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <TbSettings className="w-5 h-5" />
            VC 옵션 설정
          </h2>
        </div>

        <div>
          <Label className="text-sm font-bold mb-4 block">타겟 보이스</Label>
          <VoiceSelection
            presetVoices={PRESET_VOICES}
            customVoices={customVoices}
            selectedVoice={selectedVoice}
            onVoiceSelect={onVoiceSelect}
            onVoiceUpload={handleVoiceUpload}
            onVoiceDelete={handleVoiceDelete}
            onVoiceEdit={handleVoiceEdit}
          />
        </div>

        <div className="mt-8">
          <div className="flex flex-col gap-4">
            <TooltipWrapper content={VC_TOOLTIP.APPLY_SELECTED}>
              <div>
                <ApplySelectionButton
                  onClick={onApplyConversion}
                  className={!selectedVoice ? 'opacity-50 cursor-not-allowed' : ''}
                />
              </div>
            </TooltipWrapper>
            <TooltipWrapper content={VC_TOOLTIP.APPLY_ALL}>
              <div>
                <ApplyAllButton
                  onClick={onApplyConversion}
                  className={!selectedVoice ? 'opacity-50 cursor-not-allowed' : ''}
                />
              </div>
            </TooltipWrapper>
            <TooltipWrapper content={VC_TOOLTIP.RESET_SETTINGS}>
              <div>
                <ResetChangesButton />
              </div>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default VCSidebar;
