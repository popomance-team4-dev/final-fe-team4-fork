import type { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const meta = {
  title: 'ui/tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
탭(Tabs) 컴포넌트는 콘텐츠를 카테고리별로 구분하여 표시하는 데 사용됩니다.

<br />

## Import
\`\`\`tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
\`\`\`

<br />

## 구성 요소

### Tabs (Root)
탭의 최상위 컨테이너입니다.

### TabsList
탭 트리거들을 그룹화하는 컨테이너입니다.
- \`h-10\`: 높이 40px
- \`bg-muted\`: 연한 배경색
- \`p-1\`: 패딩
- \`rounded-md\`: 모서리 둥글게

### TabsTrigger
각 탭을 선택하는 버튼입니다.
- \`px-3 py-1.5\`: 좌우 12px, 상하 6px 패딩
- \`font-medium\`: 중간 굵기 폰트
- \`text-sm\`: 작은 텍스트 크기
- 활성화 상태(\`data-[state=active]\`)
  - \`bg-background\`: 흰색 배경
  - \`text-foreground\`: 진한 텍스트 색상
  - \`shadow-sm\`: 약간의 그림자

### TabsContent
탭 내용을 표시하는 영역입니다.
- \`mt-2\`: 상단 여백
- 포커스 시 링 효과

<br />

## 스타일 커스터마이징

### 1. 기본 스타일 변경

TabsList의 배경색과 패딩 조정:
\`\`\`tsx
<TabsList className="bg-gray-100 p-2">
\`\`\`

TabsTrigger의 크기와 색상 변경:
\`\`\`tsx
<TabsTrigger className="px-4 py-2 text-base text-gray-600 data-[state=active]:text-blue-600">
\`\`\`

TabsContent의 여백과 테두리 추가:
\`\`\`tsx
<TabsContent className="mt-4 p-4 border rounded-lg">
\`\`\`

### 2. 테마 스타일링

블루 테마:
\`\`\`tsx
<Tabs>
  <TabsList className="bg-blue-50">
    <TabsTrigger className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
  </TabsList>
</Tabs>
\`\`\`

보더 테마:
\`\`\`tsx
<Tabs>
  <TabsList className="border rounded-none bg-transparent">
    <TabsTrigger className="border-b-2 border-transparent data-[state=active]:border-blue-600">
  </TabsList>
</Tabs>
\`\`\`

### 3. 반응형 디자인

모바일 최적화:
\`\`\`tsx
<TabsList className="flex-col sm:flex-row">
  <TabsTrigger className="w-full sm:w-auto">
\`\`\`

### 4. 아이콘 추가

TabsTrigger에 아이콘 추가:
\`\`\`tsx
<TabsTrigger>
  <Icon className="mr-2 h-4 w-4" />
  텍스트
</TabsTrigger>
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="flex justify-between bg-gray-50 p-1 rounded-md">
        <TabsTrigger
          value="account"
          className="flex-1 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          계정
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="flex-1 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          비밀번호
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4">
        계정 설정 내용이 들어갑니다.
      </TabsContent>
      <TabsContent value="password" className="p-4">
        비밀번호 설정 내용이 들어갑니다.
      </TabsContent>
    </Tabs>
  ),
};
export const CustomStyle: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="bg-blue-50 p-1 rounded-lg">
        <TabsTrigger
          value="tab1"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          첫 번째 탭
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          두 번째 탭
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 mt-4 bg-blue-50 rounded-lg">
        첫 번째 탭 내용
      </TabsContent>
      <TabsContent value="tab2" className="p-4 mt-4 bg-blue-50 rounded-lg">
        두 번째 탭 내용
      </TabsContent>
    </Tabs>
  ),
};

export const BorderStyle: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="bg-transparent border-b">
        <TabsTrigger
          value="tab1"
          className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
        >
          첫 번째 탭
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          className="border-b-2 border-transparent data-[state=active]:border-blue-600 rounded-none"
        >
          두 번째 탭
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        첫 번째 탭 내용
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        두 번째 탭 내용
      </TabsContent>
    </Tabs>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-[400px]">
      <TabsList className="flex-col sm:flex-row bg-gray-50">
        <TabsTrigger value="tab1" className="w-full sm:w-auto">
          첫 번째 탭
        </TabsTrigger>
        <TabsTrigger value="tab2" className="w-full sm:w-auto">
          두 번째 탭
        </TabsTrigger>
        <TabsTrigger value="tab3" className="w-full sm:w-auto">
          세 번째 탭
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        첫 번째 탭 내용
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        두 번째 탭 내용
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        세 번째 탭 내용
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1" className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          정보
        </TabsTrigger>
        <TabsTrigger value="tab2" className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3v18M3 12h18" />
          </svg>
          추가
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        정보 탭 내용
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        추가 탭 내용
      </TabsContent>
    </Tabs>
  ),
};
