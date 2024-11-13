import React, { useState } from 'react';

import { StateController } from '@/components/audio/StateController';
import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/buttons/IconButton';
import { Select, SelectItem } from '@/components/ui/select';

const TTSOptionsSidebar: React.FC = () => {
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(60);
  const [pitch, setPitch] = useState(4.0);
  const [selectedText, setSelectedText] = React.useState<string>('선택하세요');
  const [selectedGender, setSelectedGender] = React.useState<'남자' | '여자'>('여자');

  return (
    <aside className="w-[276px] min-h-full border-l p-6">
      <h2 className="text-lg font-semibold mb-8">TTS 옵션 설정</h2>

      {/* 음성 선택 */}
      <div className="mb-10">
        <label className="block text-sm font-bold mb-2">음성 선택</label>
        <Select
          selectedValue={selectedText}
          selectedGender={selectedGender}
          onValueChange={(value, gender) => {
            setSelectedText(value);
            setSelectedGender(gender);
          }}
        >
          <SelectItem gender="여자" value="소연">
            소연
          </SelectItem>
          <SelectItem gender="남자" value="정훈">
            정훈
          </SelectItem>
        </Select>
      </div>

      <hr className="my-8" />

      {/* 속도 */}
      <div>
        <StateController
          label="속도"
          value={speed}
          unit="x"
          min={0.5}
          max={2.0}
          step={0.1}
          onChange={setSpeed}
        />
      </div>

      <hr className="my-8" />

      {/* 볼륨 */}
      <div>
        <StateController
          label="볼륨"
          value={volume}
          unit="%"
          min={0}
          max={100}
          step={1}
          onChange={setVolume}
        />
      </div>

      <hr className="my-8" />

      {/* 피치 */}
      <div>
        <StateController
          label="피치"
          value={pitch}
          unit=""
          min={0}
          max={10}
          step={0.1}
          onChange={setPitch}
        />
      </div>

      {/* 적용 버튼들 */}
      <div className="flex flex-col my-12 gap-4">
        <ApplySelectionButton />
        <ApplyAllButton />
        <ResetChangesButton />
      </div>
    </aside>
  );
};

export default TTSOptionsSidebar;
