import type { Meta, StoryObj } from '@storybook/react';

import SignupForm from '@/components/forms/SignupForm';

const meta = {
  title: 'Forms/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
      values: [{ name: 'white', value: '#FFFFFF' }],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {};

export const WithValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const submitButton = canvasElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.click();
    }
  },
};

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector('form');
    const emailInput = form?.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = form?.querySelector('input[name="password"]') as HTMLInputElement;
    const passwordConfirmInput = form?.querySelector(
      'input[name="passwordConfirm"]'
    ) as HTMLInputElement;
    const nameInput = form?.querySelector('input[name="name"]') as HTMLInputElement;
    const phoneInput = form?.querySelector('input[name="phone"]') as HTMLInputElement;

    if (emailInput) emailInput.value = 'test@example.com';
    if (passwordInput) passwordInput.value = 'Test1234!';
    if (passwordConfirmInput) passwordConfirmInput.value = 'Test1234!';
    if (nameInput) nameInput.value = '홍길동';
    if (phoneInput) phoneInput.value = '010-1234-5678';
  },
};
