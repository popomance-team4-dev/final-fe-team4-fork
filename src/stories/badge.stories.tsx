import { Meta, StoryFn } from '@storybook/react';

import { Badge, BadgeProps } from '@/components/ui/badge';

// Storybook 메타 데이터 설정
export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['vc', 'tts', 'concat', 'sound'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Badge 컴포넌트는 다양한 스타일 변형을 제공하여 상황에 맞는 배지를 표시할 수 있습니다.',
      },
    },
  },
} as Meta;

// 템플릿 설정
const Template: StoryFn<BadgeProps> = (args) => <Badge {...args} />;

// 기본 스토리 (Default) 설정
export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  variant: 'default',
};

// 각 variant에 대한 스토리
export const VC = Template.bind({});
VC.args = {
  children: 'VC',
  variant: 'vc',
};

export const TTS = Template.bind({});
TTS.args = {
  children: 'TTS',
  variant: 'tts',
};

export const Concat = Template.bind({});
Concat.args = {
  children: 'Concat',
  variant: 'concat',
};

export const Sound = Template.bind({});
Sound.args = {
  children: 'Sound',
  variant: 'sound',
};

// 사용법 설명 추가
Default.parameters = {
  docs: {
    source: {
      code: `
import { Badge } from './Badge';

// 기본 사용법
<Badge variant="tts">Default Badge</Badge>

// 다양한 variant 사용 예
<Badge variant="vc">VC Badge</Badge>
<Badge variant="concat">Concat Badge</Badge>
<Badge variant="sound">Sound Badge</Badge>
      `,
    },
  },
};
