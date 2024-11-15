// Button.stories.tsx
import { Meta, StoryFn } from '@storybook/react';

import { Button, ButtonProps } from '@/components/ui/button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'mid', 'lg', 'icon'],
    },
    icon: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => (
  <Button {...args}>{args.children || 'Button'}</Button>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  size: 'default',
  children: 'Default Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'default',
  size: 'icon',
  icon: true,
  children: 'With Icon',
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: 'destructive',
  size: 'default',
  children: 'Destructive Button',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  size: 'default',
  children: 'Outline Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'mid',
  children: 'Secondary Button',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
  size: 'lg',
  children: 'Ghost Button',
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
  size: 'sm',
  children: 'Link Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'default',
  size: 'default',
  disabled: true,
  children: 'Disabled Button',
};
