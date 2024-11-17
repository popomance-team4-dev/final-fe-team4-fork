// tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const meta = {
  title: 'ui/tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `
Tooltip 컴포넌트는 추가 정보를 제공하는 팝업입니다.

<br />

## Import
\`\`\`tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
\`\`\`

<br />

## 사용 예제

### 1. 기본 Tooltip
\`\`\`tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <button>마우스를 올려보세요</button>
    </TooltipTrigger>
    <TooltipContent>추가 정보입니다.</TooltipContent>
  </Tooltip>
</TooltipProvider>
\`\`\`

### 2. 커스텀 오프셋
\`\`\`tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <button>커스텀 오프셋</button>
    </TooltipTrigger>
    <TooltipContent sideOffset={10}>커스텀 오프셋 적용</TooltipContent>
  </Tooltip>
</TooltipProvider>
\`\`\`

        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button>마우스를 올려보세요</button>
        </TooltipTrigger>
        <TooltipContent>추가 정보입니다.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button>커스텀 오프셋</button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>커스텀 오프셋 적용</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
