import { useEffect, useState } from 'react';
import { TbWorld } from 'react-icons/tb';

import { loadVoiceLanguageOptions, loadVoiceStyleOptions, voiceStyleData } from '@/api/ttsAPI';
import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/custom/buttons/IconButton';
import { StateController } from '@/components/custom/features/common/StateController';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Select } from '@/components/ui/select';
import { TTS_TOOLTIP } from '@/constants/tooltips';
import { useTTSStore } from '@/stores/tts.store';

const TTSSidebar: React.FC = () => {
  const {
    speed,
    volume,
    pitch,
    language,
    style,
    setField,
    reset,
    isModified,
    isAllConfigured,
    applyToSelected,
    applyToAll,
  } = useTTSStore();

  const [voiceStyleList, setVoiceStyleList] = useState<voiceStyleData[]>([]);
  const [voiceLanguageList, setVoiceLanguageLists] = useState<string[]>([]);

  useEffect(() => {
    // 목소리 언어 옵션 로드
    const fetchVoiceLanguageOptions = async () => {
      const response = await loadVoiceLanguageOptions();
      setVoiceLanguageLists(Array.from(response.data || []));
    };
    fetchVoiceLanguageOptions();
  }, []);

  useEffect(() => {
    // 목소리 스타일 로드
    if (!language) return;
    const fetchTTSVoiceOptions = async () => {
      const response = await loadVoiceStyleOptions(language);
      setVoiceStyleList(Array.from(response) || []);
    };
    fetchTTSVoiceOptions();
  }, [language]);

  return (
    <aside className="w-[276px] min-h-full border-l p-6">
      <h2 className="text-lg font-semibold mb-8">TTS 옵션 설정</h2>

      {/* 언어 선택 */}
      <div className="mb-8">
        <label htmlFor="language" className="block text-sm font-bold mb-2">
          언어
        </label>
        <Select
          id="language"
          value={language}
          onValueChange={(value) => setField('language', value)}
          items={
            voiceLanguageList.map((languageOption) => ({
              value: languageOption,
              label: languageOption,
            })) || []
          }
          icon={<TbWorld className="h-5 w-5" />}
          placeholder="-"
        />
      </div>

      {/* 스타일 선택 */}
      <div>
        <label htmlFor="voice-style" className="block text-sm font-bold mb-2">
          스타일
        </label>
        <Select
          id="voice-style"
          value={style}
          onValueChange={(value) => setField('style', value)}
          items={
            voiceStyleList.map((option) => ({
              value: String(option.value),
              label: option.label,
            })) || []
          }
          placeholder="-"
        />
      </div>

      <hr className="my-8" />

      {/* 속도 */}
      <div className="mb-6">
        <StateController
          label="속도"
          value={speed}
          unit="x"
          min={0.5}
          max={2.0}
          step={0.1}
          onChange={(value) => setField('speed', value)}
        />
      </div>
      {/* 볼륨 */}
      <div className="mb-6">
        <StateController
          label="볼륨"
          value={volume}
          unit="%"
          min={0}
          max={100}
          step={1}
          onChange={(value) => setField('volume', value)}
        />
      </div>

      {/* 피치 */}
      <div className="mb-12">
        <StateController
          label="피치"
          value={pitch}
          unit=""
          min={0}
          max={10}
          step={0.1}
          onChange={(value) => setField('pitch', value)}
        />
      </div>

      {/* 적용 버튼들 */}
      <div className="flex flex-col gap-4">
        <TooltipWrapper content={TTS_TOOLTIP.APPLY_SELECTED}>
          <div>
            <ApplySelectionButton
              className={isAllConfigured ? '' : `pointer-events-none opacity-50 cursor-not-allowed`}
              onClick={applyToSelected}
            />
          </div>
        </TooltipWrapper>

        <TooltipWrapper content={TTS_TOOLTIP.APPLY_ALL}>
          <div>
            <ApplyAllButton
              className={isAllConfigured ? '' : `pointer-events-none opacity-50 cursor-not-allowed`}
              onClick={applyToAll}
            />
          </div>
        </TooltipWrapper>
        <TooltipWrapper content={TTS_TOOLTIP.RESET_SETTINGS}>
          <div>
            <ResetChangesButton
              onClick={reset}
              className={isModified ? '' : `pointer-events-none opacity-50 cursor-not-allowed`}
            />
          </div>
        </TooltipWrapper>
      </div>
    </aside>
  );
};

export default TTSSidebar;
