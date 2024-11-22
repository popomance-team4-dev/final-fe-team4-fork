import React, { useState } from 'react';
import { TbSettings } from 'react-icons/tb';

import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/custom/buttons/IconButton';
import { StateController } from '@/components/custom/feature/StateController';

const CONCATSidebar: React.FC = () => {
  const [silenceAfterSentence, setSilenceAfterSentence] = useState(0); // 문장 뒤 무음 추가
  const [silenceAtStart, setSilenceAtStart] = useState(0); // 맨 앞 무음 추가
  const [silenceAtEnd, setSilenceAtEnd] = useState(0); // 맨 뒤 무음 추가

  return (
    <aside className="relative w-[276px] min-h-full border-l p-6">
      <div className="flex items-center mb-8 gap-2">
        <TbSettings className="h-6 w-6" />
        <div className="text-body1">Concat 옵션 설정</div>
      </div>

      <div className="flex flex-col gap-6">
        {/* 문장 뒤 무음 추가 */}
        <StateController
          label="문장 뒤 무음 추가"
          value={silenceAfterSentence}
          unit=""
          min={0}
          max={10}
          step={0.1}
          onChange={setSilenceAfterSentence}
        />

        {/* 맨 앞 무음 추가 */}
        <StateController
          label="맨 앞 무음 추가"
          value={silenceAtStart}
          unit=""
          min={0}
          max={10}
          step={0.1}
          onChange={setSilenceAtStart}
        />

        {/* 맨 뒤 무음 추가 */}
        <StateController
          label="맨 뒤 무음 추가"
          value={silenceAtEnd}
          unit=""
          min={0}
          max={10}
          step={0.1}
          onChange={setSilenceAtEnd}
        />
      </div>

      {/* 적용 버튼들 */}
      <div className="absolute bottom-0 flex flex-col gap-4 mb-[100px] ">
        <ApplySelectionButton />
        <ApplyAllButton />
        <ResetChangesButton />
      </div>
    </aside>
  );
};

export default CONCATSidebar;
