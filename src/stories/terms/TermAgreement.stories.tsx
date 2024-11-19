import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import termAgreement from '@/components/terms/TermAgreement';
import { Form } from '@/components/ui/form';
import { SignupFormData } from '@/types/signup';

const meta = {
  title: 'term/termAgreement',
  component: termAgreement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const form = useForm<SignupFormData>({
        defaultValues: {
          email: '',
          password: '',
          passwordConfirm: '',
          name: '',
          gender: '',
          birth_date: '',
          phone: '',
          term: [],
        },
      });

      return (
        <Form {...form}>
          <Story control={form.control} />
        </Form>
      );
    },
  ],
} satisfies Meta<typeof termAgreement>;

export default meta;

type Story = StoryObj<typeof termAgreement>;

export const Default: Story = {
  args: {
    onOpenTerm: (type) => {
      console.log(`Opening ${type} term`);
    },
  },
};

export const WithPreselectedterm: Story = {
  decorators: [
    (Story) => {
      const form = useForm<SignupFormData>({
        defaultValues: {
          email: '',
          password: '',
          passwordConfirm: '',
          name: '',
          gender: '',
          birth_date: '',
          phone: '',
          term: ['age', 'service'],
        },
      });

      return (
        <Form {...form}>
          <Story control={form.control} />
        </Form>
      );
    },
  ],
  args: {
    onOpenTerm: (type) => {
      console.log(`Opening ${type} term`);
    },
  },
};

export const WithAlltermSelected: Story = {
  decorators: [
    (Story) => {
      const form = useForm<SignupFormData>({
        defaultValues: {
          email: '',
          password: '',
          passwordConfirm: '',
          name: '',
          gender: '',
          birth_date: '',
          phone: '',
          term: ['age', 'service', 'privacy'],
        },
      });

      return (
        <Form {...form}>
          <Story control={form.control} />
        </Form>
      );
    },
  ],
  args: {
    onOpenTerm: (type) => {
      console.log(`Opening ${type} term`);
    },
  },
};

export const Interactive: Story = {
  args: {
    onOpenTerm: (type) => {
      alert(`Opening ${type} term and conditions dialog`);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '실제 상호작용이 가능한 약관 동의 컴포넌트입니다. 체크박스를 클릭하고 약관 보기 버튼을 눌러보세요.',
      },
    },
  },
};
