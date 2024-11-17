import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'ui/dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
다이얼로그 컴포넌트의 다양한 사용 예제입니다.

<br />

## Import
\`\`\`tsx
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
\`\`\`

<br />

## 사용 예제

### 1. 기본 다이얼로그
가장 기본적인 형태의 다이얼로그입니다.

\`\`\`tsx
<Dialog>
  <DialogTrigger>
    <Button>다이얼로그 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>기본 다이얼로그</DialogTitle>
      <DialogDescription>이것은 기본 다이얼로그입니다.</DialogDescription>
    </DialogHeader>
    <div>여기에 내용을 입력하세요.</div>
    <DialogFooter className="flex justify-center gap-4">
      <DialogClose>
        <Button size="sm" variant="outline" className="w-24">
          닫기
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### 2. 확인 대화상자
사용자 작업 확인을 위한 다이얼로그입니다.

\`\`\`tsx
<Dialog>
  <DialogTrigger>
    <Button>삭제</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>삭제 확인</DialogTitle>
      <DialogDescription>정말 삭제하시겠습니까?</DialogDescription>
    </DialogHeader>
    <DialogFooter className="flex justify-center gap-4">
      <DialogClose>
        <Button size="sm" variant="outline" className="w-24">
          취소
        </Button>
      </DialogClose>
      <Button size="sm" variant="destructive" className="w-24">
        삭제
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### 3. 폼 다이얼로그
사용자가 정보를 입력할 수 있는 폼을 포함한 다이얼로그입니다.

\`\`\`tsx
<Dialog>
  <DialogTrigger>
    <Button>프로필 편집</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>프로필 편집</DialogTitle>
      <DialogDescription>프로필 정보를 수정하세요.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <label htmlFor="name">이름</label>
        <Input id="name" placeholder="이름 입력" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email">이메일</label>
        <Input id="email" placeholder="이메일 입력" />
      </div>
    </div>
    <DialogFooter className="flex justify-center gap-4">
      <DialogClose>
        <Button size="sm" variant="outline" className="w-24">
          취소
        </Button>
      </DialogClose>
      <Button size="sm" className="w-24">
        저장
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### 4. 커스텀 스타일
다이얼로그에 커스텀 스타일을 적용한 예제입니다.

\`\`\`tsx
<Dialog>
  <DialogTrigger>
    맞춤 스타일
  </DialogTrigger>
  <DialogContent className="bg-blue-100">
    <DialogHeader>
      <DialogTitle className="text-blue-700">맞춤 제목</DialogTitle>
      <DialogDescription className="text-blue-500">
        맞춤 스타일의 다이얼로그입니다.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">여기에 맞춤 스타일의 내용을 입력하세요.</div>
    <DialogFooter className="flex justify-center gap-4">
      <DialogClose>
        <Button size="sm" className="text-blue-700">
          닫기
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

<br />

## 주요 스타일

### Header (DialogHeader)
- \`flex flex-col space-y-1.5\`: 수직 정렬 및 요소 간격
- \`text-center sm:text-left\`: 반응형 텍스트 정렬

### Footer (DialogFooter)
- \`flex justify-center gap-4\`: 중앙 정렬 및 간격
- 버튼을 중앙에 정렬하기 위해 사용

### Content (DialogContent)
- \`bg-background\`: 배경색
- \`p-6\`: 내부 패딩
- \`rounded-lg\`: 둥근 모서리
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Default Dialog */
export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>다이얼로그 열기</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>기본 다이얼로그</DialogTitle>
          <DialogDescription>이것은 기본 다이얼로그입니다.</DialogDescription>
        </DialogHeader>
        <div>여기에 내용을 입력하세요.</div>
        <DialogFooter className="flex justify-center gap-4">
          <DialogClose>
            <Button size="sm" variant="outline" className="w-24">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* Confirmation Dialog */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>삭제</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제 확인</DialogTitle>
          <DialogDescription>정말 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-4">
          <DialogClose>
            <Button size="sm" variant="outline" className="w-24">
              취소
            </Button>
          </DialogClose>
          <Button size="sm" variant="destructive" className="w-24">
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* Form Dialog */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>프로필 편집</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 편집</DialogTitle>
          <DialogDescription>프로필 정보를 수정하세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name">이름</label>
            <Input id="name" placeholder="이름 입력" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">이메일</label>
            <Input id="email" placeholder="이메일 입력" />
          </div>
        </div>
        <DialogFooter className="flex justify-center gap-4">
          <DialogClose>
            <Button size="sm" variant="outline" className="w-24">
              취소
            </Button>
          </DialogClose>
          <Button size="sm" className="w-24">
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/* Custom Styled Dialog */
export const CustomStyled: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>맞춤 스타일</DialogTrigger>
      <DialogContent className="bg-blue-100">
        <DialogHeader>
          <DialogTitle className="text-blue-700">맞춤 제목</DialogTitle>
          <DialogDescription className="text-blue-500">
            맞춤 스타일의 다이얼로그입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">여기에 맞춤 스타일의 내용을 입력하세요.</div>
        <DialogFooter className="flex justify-center gap-4">
          <DialogClose>
            <Button size="sm" className="text-blue-700">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
