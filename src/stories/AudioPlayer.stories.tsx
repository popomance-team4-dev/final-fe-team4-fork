import type { Meta, StoryObj } from '@storybook/react';

import { AudioPlayer } from '@/components/audio/AudioPlayer';

// 이 컴포넌트의 스토리북 설정을 정의
const meta = {
  // 스토리북 사이드바에서 보여질 경로와 이름을 지정
  // Audio/AudioPlayer 이렇게 분류되어 보여짐
  title: 'Audio/AudioPlayer',
  component: AudioPlayer,

  // 스토리가 보여질 때의 기본 레이아웃을 가운데 정렬로 설정했음
  parameters: {
    layout: 'centered',
  },

  // 문서를 자동으로 생성하도록 설정
  tags: ['autodocs'],

  // Controls 패널에서 조작할 수 있는 props를 정의
  argTypes: {
    audioUrl: { control: 'text' }, // 오디오 URL을 텍스트로 입력받을 수 있게 설정
    className: { control: 'text' }, // CSS 클래스도 텍스트로 입력받을 수 있게 설정
  },

  // 컴포넌트를 감싸는 레이아웃을 설정
  // 800px 너비의 여백이 있는 박스 안에 넣어놨음
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본적인 형태를 보여주는 스토리
export const Default: Story = {
  args: {
    audioUrl: '',
  },
};

// 커스텀 스타일이 적용된 모습을 보여주는 스토리
export const CustomStyling: Story = {
  args: {
    audioUrl: '',
    className: 'bg-blue-50', // 배경색을 연한 파란색으로 설정해봤음
  },
};

// 더 큰 컨테이너에서 어떻게 보이는지 보여주는 스토리
export const WithLargerContainer: Story = {
  args: {
    audioUrl: '',
  },
  // 이 스토리에서는 1200px 너비로 설정
  decorators: [
    (Story) => (
      <div style={{ width: '1200px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};
