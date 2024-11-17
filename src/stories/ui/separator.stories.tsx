// separator.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'ui/separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: `
구분선(Separator) 컴포넌트입니다.

<br />

## Import
\`\`\`tsx
import { Separator } from '@/components/ui/separator';
\`\`\`

<br />

## Variants

### 1. 기본 스타일
수평 구분선입니다.

\`\`\`tsx
<Separator />
\`\`\`

### 2. 수직 구분선
수직 방향으로 사용하는 구분선입니다.

\`\`\`tsx
<Separator orientation="vertical" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => <Separator />,
};

export const Vertical: Story = {
  render: () => <Separator orientation="vertical" className="h-16" />,
};
