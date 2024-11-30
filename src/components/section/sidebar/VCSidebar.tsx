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
import { VC_TOOLTIP } from '@/constants/tooltips';

interface TargetVoice {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  type: 'custom';
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

  const handleVoiceUpload = (files: File[]) => {
    const newVoices = files.map((file) => ({
      id: `custom-${crypto.randomUUID()}`,
      name: file.name,
      description: '',
      avatarUrl: '',
      type: 'custom' as const,
    }));

    setCustomVoices((prev) => [...prev, ...newVoices]);
  };

  const handleVoiceDelete = (id: string) => {
    setCustomVoices((prev) => prev.filter((voice) => voice.id !== id));
  };

  const handleVoiceEdit = (newName: string) => {
    setCustomVoices((prev) =>
      prev.map((v) =>
        v.id === selectedVoice
          ? {
              ...v,
              name: newName,
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
            customVoices={customVoices}
            selectedVoice={selectedVoice}
            onVoiceSelect={onVoiceSelect}
            onVoiceUpload={handleVoiceUpload}
            onVoiceDelete={handleVoiceDelete}
            onVoiceEdit={handleVoiceEdit}
          />
        </div>

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
    </aside>
  );
};

export default VCSidebar;
