import { ReactNode } from 'react';
import { TbWorld } from 'react-icons/tb';

import {
  ApplyAllButton,
  ApplySelectionButton,
  ResetChangesButton,
} from '@/components/custom/buttons/IconButton';
import { StateController } from '@/components/custom/feature/common/StateController';
import TooltipWrapper from '@/components/custom/guide/TooltipWrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select } from '@/components/ui/select';
import { TTS_TOOLTIP } from '@/constants/tooltips';
import Ian from '@/images/avatar/ian.jpg';
import Jennie from '@/images/avatar/jennie.png';
import Jisu from '@/images/avatar/jisu.jpg';
import Lisa from '@/images/avatar/lisa.jpg';
import Rose from '@/images/avatar/rose.jpg';
import Ryan from '@/images/avatar/ryan.jpg';
import { useTTSStore } from '@/stores/tts.store';

type SelectItemType = {
  value: string;
  label: string;
  icon?: ReactNode;
};

const voiceOptions: SelectItemType[] = [
  {
    value: '제니',
    label: '제니',
    icon: (
      <Avatar className="h-5 w-5">
        <AvatarImage src={Jennie} alt="제니" />
        <AvatarFallback>제</AvatarFallback>
      </Avatar>
    ),
  },
  {
    value: '리사',
    label: '리사',
    icon: (
      <Avatar className="h-5 w-5">
        <AvatarImage src={Lisa} alt="리사" />
        <AvatarFallback>리</AvatarFallback>
      </Avatar>
    ),
  },
  {
    value: '지수',
    label: '지수',
    icon: (
      <Avatar className="h-5 w-5">
        <AvatarImage src={Jisu} alt="지수" />
        <AvatarFallback>지</AvatarFallback>
      </Avatar>
    ),
  },
  {
    value: '로제',
    label: '로제',
    icon: (
      <Avatar className="h-5 w-5">
        <AvatarImage src={Rose} alt="로제" />
        <AvatarFallback>로</AvatarFallback>
      </Avatar>
    ),
  },
  {
    value: '라이언',
    label: '라이언',
    icon: (
      <Avatar className="h-5 w-5">
        <AvatarImage src={Ryan} alt="라이언" />
        <AvatarFallback>라</AvatarFallback>
      </Avatar>
    ),
  },
  {
    value: '이안',
    label: '이안',
    icon: (
      <Avatar className="h-5 w-5">
        <AvatarImage src={Ian} alt="이안" />
        <AvatarFallback>이</AvatarFallback>
      </Avatar>
    ),
  },
];

const languageOptions: SelectItemType[] = [
  { value: '영어 (US)', label: '영어 (US)' },
  { value: '구자라트어 (인도)', label: '구자라트어 (인도)' },
  { value: '그리스어', label: '그리스어' },
  { value: '네덜란드어 (네덜란드)', label: '네덜란드어 (네덜란드)' },
  { value: '네덜란드어 (벨기에)', label: '네덜란드어 (벨기에)' },
  { value: '한국어', label: '한국어' },
];

const styleOptions: SelectItemType[] = [
  { value: '명랑한 · 재미있음', label: '명랑한 · 재미있음' },
  { value: '신뢰할 수 있는 · 따뜻함', label: '신뢰할 수 있는 · 따뜻함' },
  { value: '사려깊은 · 차분함', label: '사려깊은 · 차분함' },
  { value: '편안한 · 온화함', label: '편안한 · 온화함' },
  { value: '자신감있는 · 전문가', label: '자신감있는 · 전문가' },
  { value: '날카로운 · 정확함', label: '날카로운 · 정확함' },
];

const TTSSidebar: React.FC = () => {
  const {
    speed,
    volume,
    pitch,
    language,
    voice,
    style,
    setField,
    reset,
    isModified,
    isAllConfigured,
    applyToSelected,
    applyToAll,
  } = useTTSStore();

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
          items={languageOptions}
          icon={<TbWorld className="h-5 w-5" />}
          placeholder="-"
        />
      </div>

      {/* 목소리 선택 */}
      <div className="mb-8">
        <label className="block text-sm font-bold mb-2">목소리</label>
        <Select
          id="voice"
          value={voice}
          onValueChange={(value) => setField('voice', value)}
          items={voiceOptions}
          icon={voiceOptions.find((voiceOption) => voiceOption.value === voice)?.icon || null}
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
          items={styleOptions}
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
