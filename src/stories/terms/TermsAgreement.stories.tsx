import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import TermsAgreement from '@/components/terms/TermsAgreement';
import { Form } from '@/components/ui/form';
import { SignupFormData } from '@/types/signup';

const meta = {
  title: 'terms/TermsAgreement',
  component: TermsAgreement,
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
          birth_date: '',
          phone: '',
          terms: [],
        },
      });

      return (
        <Form {...form}>
          <Story control={form.control} />
        </Form>
      );
    },
  ],
} satisfies Meta<typeof TermsAgreement>;

export default meta;

type Story = StoryObj<typeof TermsAgreement>;

export const Default: Story = {
  args: {
    onOpenTerms: (type) => {
      console.log(`Opening ${type} terms`);
    },
  },
};

export const WithPreselectedterms: Story = {
  decorators: [
    (Story) => {
      const form = useForm<SignupFormData>({
        defaultValues: {
          email: '',
          password: '',
          passwordConfirm: '',
          name: '',
          birth_date: '',
          phone: '',
          terms: ['age', 'service'],
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
    onOpenTerms: (type) => {
      console.log(`Opening ${type} terms`);
    },
  },
};

export const WithAlltermsSelected: Story = {
  decorators: [
    (Story) => {
      const form = useForm<SignupFormData>({
        defaultValues: {
          email: '',
          password: '',
          passwordConfirm: '',
          name: '',
          birth_date: '',
          phone: '',
          terms: ['age', 'service', 'privacy'],
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
    onOpenTerms: (type) => {
      console.log(`Opening ${type} terms`);
    },
  },
};

export const Interactive: Story = {
  args: {
    onOpenTerms: (type) => {
      alert(`Opening ${type} terms and conditions dialog`);
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
