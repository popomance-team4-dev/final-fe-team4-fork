import { Meta, StoryFn } from '@storybook/react';

import { Button } from '@/components/ui/button';
import { TooltipWrapper, TooltipWrapperProps } from '@/components/ui/tooltip';

/**
 * TooltipWrapper 컴포넌트는 호버 시 툴팁을 표시하는 래퍼 컴포넌트입니다.
 *
 * ### 기본적인 사용법
 * ```tsx
 * <TooltipWrapper text="툴팁 메시지">
 *   <Button />
 * </TooltipWrapper>
 * ```
 *
 * ### 딜레이 추가
 * ```tsx
 * <TooltipWrapper text="툴팁 메시지" delayDuration={200}>
 *   <Button />
 * </TooltipWrapper>
 * ```
 *
 * ### 커스텀 스타일 추가
 * ```tsx
 * <TooltipWrapper
 *   text="툴팁 메시지"
 *   className="bg-blue-500 text-white"
 * >
 *   <Button />
 * </TooltipWrapper>
 * ```
 *
 * ### 여러 옵션 조합
 * ```tsx
 * <TooltipWrapper
 *   text="툴팁 메시지"
 *   delayDuration={200}
 *   className="max-w-xs z-50"
 * >
 *   <Button />
 * </TooltipWrapper>
 * ```
 */
export default {
  title: 'Components/TooltipWrapper',
  component: TooltipWrapper,
  argTypes: {
    text: {
      control: 'text',
      defaultValue: '툴팁 메시지',
      description: '툴팁에 표시될 텍스트',
    },
    delayDuration: {
      control: 'number',
      defaultValue: 0,
      description: '툴팁이 나타나기까지의 지연 시간 (ms)',
    },
    className: {
      control: 'text',
      defaultValue: '',
      description: '추가적인 스타일링을 위한 클래스',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<TooltipWrapperProps> = (args) => (
  <TooltipWrapper {...args}>
    <Button>버튼</Button>
  </TooltipWrapper>
);

export const Default = Template.bind({});
Default.args = {
  text: '툴팁 메시지',
  className: 'max-w-xs z-50',
};

export const DelayedTooltip = Template.bind({});
DelayedTooltip.args = {
  text: '툴팁 메시지 딜레이',
  delayDuration: 500,
  className: 'max-w-xs z-50',
};
