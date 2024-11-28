import React from 'react';
import { TbSettings } from 'react-icons/tb';

import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/custom/buttons/IconButton';
import FileUploadBox from '@/components/custom/feature/FileUploadBox';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { VC_TOOLTIP } from '@/constants/tooltips';

const VCSidebar: React.FC = () => {
  return (
    <aside className="w-[276px] min-h-full border-l border-gray-200 bg-background">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <TbSettings className="w-5 h-5" />
            VC 옵션 설정
          </h2>
        </div>
        <div className="mb-6">
          <h2 className="text-foreground font-pretendard text-sm font-bold leading-5 mb-2">
            목소리
          </h2>
          <FileUploadBox />
        </div>
        <div className="flex flex-col gap-4 mt-[13px]">
          <TooltipWrapper content={VC_TOOLTIP.APPLY_SELECTED}>
            <div>
              <ApplySelectionButton />
            </div>
          </TooltipWrapper>

          <TooltipWrapper content={VC_TOOLTIP.APPLY_ALL}>
            <div>
              <ApplyAllButton />
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
