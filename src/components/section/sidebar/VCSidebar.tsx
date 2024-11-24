import React from 'react';
import { TbSettings } from 'react-icons/tb';

import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/custom/buttons/IconButton';
import VCSidebarTabs from '@/components/custom/tabs/VCSidebarTabs';
import { Switch } from '@/components/ui/switch';
const VCSidebar: React.FC = () => {
  const [isNoiseReductionEnabled, setIsNoiseReductionEnabled] = React.useState(false);
  return (
    <aside className="w-[276px] min-h-full border-l border-gray-200 bg-background">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <TbSettings className="w-5 h-5" />
            VC 옵션 설정
          </h2>
        </div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-foreground font-pretendard text-sm font-bold leading-5">
            배경소음 없애기
          </span>
          <Switch
            className="h-6"
            checked={isNoiseReductionEnabled}
            onCheckedChange={setIsNoiseReductionEnabled}
          />
        </div>
        <div className="mb-6">
          <VCSidebarTabs />
        </div>
        <div className="mt-auto space-y-2">
          <ApplySelectionButton />
          <ApplyAllButton />
          <ResetChangesButton />
        </div>
      </div>
    </aside>
  );
};
export default VCSidebar;
