// toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

const meta = {
  title: 'ui/toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: `
Toast 컴포넌트는 사용자 알림 메시지를 표시하는 데 사용됩니다.

<br />

## Import
\`\`\`tsx
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';
\`\`\`

<br />

## 사용 예제

### 1. 기본 Toast
\`\`\`tsx
<ToastProvider>
  <Toast>
    <ToastTitle>알림 제목</ToastTitle>
    <ToastDescription>알림 내용</ToastDescription>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>
\`\`\`

### 2. 파괴적 메시지
\`\`\`tsx
<Toast variant="destructive">
  <ToastTitle>경고</ToastTitle>
  <ToastDescription>위험한 작업입니다.</ToastDescription>
</Toast>
\`\`\`

### 3. 다중 Toast
\`\`\`tsx
<ToastProvider>
  <Toast>
    <ToastTitle>첫 번째 알림</ToastTitle>
  </Toast>
  <Toast>
    <ToastTitle>두 번째 알림</ToastTitle>
  </Toast>
  <ToastViewport />
</ToastProvider>
\`\`\`

---
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <ToastTitle>알림 제목</ToastTitle>
        <ToastDescription>알림 내용입니다.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive">
      <ToastTitle>경고</ToastTitle>
      <ToastDescription>위험한 작업입니다.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <ToastTitle>첫 번째 알림</ToastTitle>
      </Toast>
      <Toast>
        <ToastTitle>두 번째 알림</ToastTitle>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
