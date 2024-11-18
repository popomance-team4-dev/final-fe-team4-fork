import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'ui/badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
기본적인 뱃지 컴포넌트입니다.

<br />
<br />

## Import
\`\`\`tsx
import { Badge } from '@/components/ui/badge';
\`\`\`

<br />

## 사용법

### 1. 기본 사용
가장 기본적인 형태의 뱃지입니다. 기본 스타일은 파란색 배경과 흰색 텍스트를 사용합니다.

\`\`\`tsx
<Badge>기본 뱃지</Badge>
\`\`\`

### 2. TTS

\`\`\`tsx
<Badge variant="tts">TTS</Badge>
\`\`\`

### 3. VC

\`\`\`tsx
<Badge variant="vc">VC</Badge>
\`\`\`

### 4. CONCAT

\`\`\`tsx
<Badge variant="concat">CONCAT</Badge>
\`\`\`

### 5. SoundStatus

\`\`\`tsx
<Badge variant="sound">SoundStatus</Badge>
\`\`\`

### 6. 그룹으로 사용
여러 뱃지를 그룹으로 묶어서 사용할 수 있습니다.

\`\`\`tsx
<div className="flex gap-2">
 <Badge variant="default">기본</Badge>
 <Badge variant="vc">VC</Badge>
 <Badge variant="tts">TTS</Badge>
 <Badge variant="concat">Concat</Badge>
 <Badge variant="sound">Sound</Badge>
</div>
\`\`\`

### 7. 커스텀 스타일
className을 통해 추가 스타일을 적용할 수 있습니다.

\`\`\`tsx
// 크기 조정
<Badge className="text-sm">큰 텍스트</Badge>

// 패딩 조정
<Badge className="px-4 py-1">넓은 패딩</Badge>

// 추가 스타일
<Badge className="shadow-sm">그림자 효과</Badge>
\`\`\`

## Props

### variant
뱃지의 스타일을 지정합니다.

- \`default\` (기본값)
 - 파란색 배경과 흰색 텍스트
 - 호버시 80% 투명도
 - \`border-transparent bg-primary text-primary-foreground hover:bg-primary/80\`

- \`vc\` (Voice Conversion)
 - 연한 분홍색 배경과 진한 분홍색 텍스트
 - \`bg-pink-50 text-pink-500 ring-pink-50\`

- \`tts\` (Text to Speech)
 - 연한 초록색 배경과 진한 초록색 텍스트
 - \`bg-green-50 text-green-500 ring-green-50\`

- \`concat\` (Concatenative)
 - 연한 노란색 배경과 진한 노란색 텍스트
 - \`bg-yellow-50 text-yellow-500 ring-yellow-50\`

- \`sound\`
 - 연한 보라색 배경
 - 내용물 크기에 맞는 너비
 - \`w-fit bg-purple-50 ring-purple-50\`

### className
추가적인 CSS 클래스를 지정할 수 있습니다.

### 공통 스타일
모든 뱃지에 기본적으로 적용되는 스타일입니다.
- \`inline-flex\`: 인라인 플렉스 박스
- \`items-center\`: 아이템 수직 중앙 정렬
- \`rounded-md\`: 둥근 모서리
- \`px-2.5 py-0.5\`: 기본 패딩
- \`text-xs\`: 작은 글자 크기
- \`font-medium\`: 중간 굵기 폰트

## 접근성 고려사항

1. 색상만으로 의미를 전달하지 않도록 적절한 텍스트를 함께 사용하세요.
2. 높은 대비를 위해 배경색과 텍스트 색상이 조화롭게 설정되어 있습니다.
3. 텍스트 크기가 너무 작지 않도록 주의하세요.
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'vc', 'tts', 'concat', 'sound'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: '기본',
    variant: 'default',
  },
};

export const VoiceConversion: Story = {
  args: {
    children: 'VC',
    variant: 'vc',
  },
};

export const TTS: Story = {
  args: {
    children: 'TTS',
    variant: 'tts',
  },
};

export const Concatenative: Story = {
  args: {
    children: 'CONCAT',
    variant: 'concat',
  },
};

export const Sound: Story = {
  args: {
    children: 'SoundStatus',
    variant: 'sound',
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">기본</Badge>
      <Badge variant="vc">VC</Badge>
      <Badge variant="tts">TTS</Badge>
      <Badge variant="concat">CONCATt</Badge>
      <Badge variant="sound">SoundStatus</Badge>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="text-sm">큰 텍스트</Badge>
      <Badge className="px-4 py-1">넓은 패딩</Badge>
      <Badge className="shadow-sm">그림자 효과</Badge>
    </div>
  ),
};
