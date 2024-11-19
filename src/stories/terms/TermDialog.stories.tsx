import type { Meta, StoryObj } from '@storybook/react';

import termDialog from '@/components/terms/TermDialog';

const meta = {
  title: 'term/termDialog',
  component: termDialog,
  parameters: {
    docs: {
      description: {
        component: `
약관 내용을 표시하는 다이얼로그 컴포넌트입니다.

<br />

## Import
\`\`\`tsx
import { termDialog } from '@/components/term/termDialog';
\`\`\`

<br />

## Props

- \`open\`: 다이얼로그 표시 여부
- \`onOpenChange\`: 다이얼로그 표시 상태 변경 핸들러
- \`title\`: 다이얼로그 제목
- \`content\`: 다이얼로그 내용

<br />

## 사용 예시

\`\`\`tsx
<termDialog 
  open={open}
  onOpenChange={setOpen}
  title="이용약관"
  content="약관 내용..."
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof termDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: '이용약관',
    content: `제1조 (목적)
이 약관은 회사가 제공하는 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.
2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.

제3조 (약관의 효력과 변경)
1. 이 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
2. 회사는 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.`,
  },
};

export const LongContent: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    title: '개인정보 처리방침',
    content: Array(20)
      .fill(
        `
개인정보 처리방침

1. 개인정보의 처리 목적
회사는 다음의 목적을 위하여 개인정보를 처리합니다.
- 회원 가입 및 관리
- 서비스 제공 및 운영
- 마케팅 및 광고 활용

2. 개인정보의 처리 및 보유기간
회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.`
      )
      .join('\n'),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: '이용약관',
    content: '약관 내용...',
  },
};
