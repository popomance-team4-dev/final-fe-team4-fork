// select.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TbBrush, TbMoon, TbSun } from 'react-icons/tb';

import { Select } from '@/components/ui/select';

const meta: Meta<typeof Select> = {
  title: 'ui/select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
선택 메뉴 컴포넌트입니다.

<br />
<br />

## Import
\`\`\`tsx
import { Select } from '@/components/ui/select';
\`\`\`

<br />

## 사용법

### 1. 기본 사용
가장 기본적인 형태의 Select 컴포넌트입니다.

\`\`\`tsx
const items = [
 { value: "light", label: "라이트" },
 { value: "dark", label: "다크" },
];

<Select 
 items={items} 
 placeholder="테마 선택" 
/>
\`\`\`

### 2. 기본값 설정
defaultValue prop을 사용하여 초기 선택값을 설정할 수 있습니다.

\`\`\`tsx
<Select 
 items={items} 
 placeholder="테마 선택"
 defaultValue="light"
/>
\`\`\`

### 3. 아이콘 사용
개별 아이템과 Select 트리거 모두에 아이콘을 추가할 수 있습니다.

\`\`\`tsx
const itemsWithIcons = [
 { 
   value: "light", 
   label: "라이트", 
   icon: <TbSun className="h-4 w-4" /> 
 },
 { 
   value: "dark", 
   label: "다크", 
   icon: <TbMoon className="h-4 w-4" /> 
 },
];

<Select
 items={itemsWithIcons}
 placeholder="테마 선택"
 icon={<TbBrush className="h-4 w-4" />}
/>
\`\`\`

### 4. 비활성화
Select 컴포넌트 전체를 비활성화할 수 있습니다.

\`\`\`tsx
<Select
 items={items}
 placeholder="선택 불가"
 disabled
/>
\`\`\`

### 5. 이벤트 핸들링
값이 변경될 때의 이벤트를 처리할 수 있습니다.

\`\`\`tsx
<Select
 items={items}
 placeholder="테마 선택"
 onValueChange={(value) => {
   console.log('선택된 값:', value);
   // 값 변경 시 처리할 로직
 }}
/>
\`\`\`

### 6. Form에서 사용
React Hook Form과 함께 사용할 때의 예시입니다.

\`\`\`tsx
import { useForm } from 'react-hook-form';

function Form() {
 const { register } = useForm();

 return (
   <form>
     <Select
       items={items}
       placeholder="테마 선택"
       {...register('theme')}
     />
   </form>
 );
}
\`\`\`

## Props

### SelectItemType
\`\`\`ts
type SelectItemType = {
 value: string;   // 실제 값
 label: string;   // 표시될 텍스트
 icon?: React.ReactNode;  // 선택적 아이콘
}
\`\`\`

### SelectProps
- \`items: SelectItemType[]\`: 선택 항목 배열 (필수)
- \`placeholder?: string\`: 선택 전 표시될 텍스트
- \`icon?: React.ReactNode\`: Select 트리거에 표시될 아이콘
- \`disabled?: boolean\`: 비활성화 여부
- \`defaultValue?: string\`: 초기 선택 값
- \`onValueChange?: (value: string) => void\`: 값 변경 시 호출될 함수
`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[200px] w-full flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  args: {
    items: [
      { value: 'light', label: '라이트' },
      { value: 'dark', label: '다크' },
      { value: 'system', label: '시스템' },
    ],
    placeholder: '테마 선택',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { value: 'light', label: '라이트', icon: <TbSun className="h-4 w-4" /> },
      { value: 'dark', label: '다크', icon: <TbMoon className="h-4 w-4" /> },
      { value: 'system', label: '시스템', icon: <TbBrush className="h-4 w-4" /> },
    ],
    placeholder: '테마 선택',
    icon: <TbBrush className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { value: '1', label: '옵션 1' },
      { value: '2', label: '옵션 2' },
    ],
    placeholder: '비활성화',
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    items: [
      { value: 'light', label: '라이트' },
      { value: 'dark', label: '다크' },
      { value: 'system', label: '시스템' },
    ],
    placeholder: '테마 선택',
    defaultValue: 'dark',
  },
};

export const LongList: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      value: String(i + 1),
      label: `긴 옵션 목록 ${i + 1}`,
    })),
    placeholder: '옵션 선택',
  },
};
