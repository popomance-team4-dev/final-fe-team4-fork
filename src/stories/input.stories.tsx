import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Input } from '@/components/ui/input';

// Storybook 메타 데이터 설정
export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Input 컴포넌트는 다양한 type을 지원하며, 다양한 입력 필드로 사용할 수 있습니다.',
      },
    },
  },
} as Meta;

// 기본 템플릿 설정
const Template: StoryFn<React.ComponentProps<'input'>> = (args) => <Input {...args} />;

// 기본 스토리 (Default) 설정
export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter text...',
};

// 텍스트 입력 필드
export const TextInput = Template.bind({});
TextInput.args = {
  type: 'text',
  placeholder: 'Enter text...',
};

// 비밀번호 입력 필드
export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: 'password',
  placeholder: 'Enter password...',
};

// 이메일 입력 필드
export const EmailInput = Template.bind({});
EmailInput.args = {
  type: 'email',
  placeholder: 'Enter email...',
};

// 숫자 입력 필드
export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'number',
  placeholder: 'Enter number...',
};

// 검색 입력 필드
export const SearchInput = Template.bind({});
SearchInput.args = {
  type: 'search',
  placeholder: 'Search...',
};

// 사용법 설명 추가
Default.parameters = {
  docs: {
    source: {
      code: `
import { Input } from './Input';

// 기본 사용법
<Input type="text" placeholder="Enter text..." />

// 다양한 입력 필드 예제
<Input type="password" placeholder="Enter password..." />
<Input type="email" placeholder="Enter email..." />
<Input type="number" placeholder="Enter number..." />
<Input type="search" placeholder="Search..." />
      `,
    },
  },
};
