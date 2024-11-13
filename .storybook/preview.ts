import '@/index.css'; // Tailwind CSS 스타일을 적용하기 위해 임포트

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    // on으로 시작하는 props들(onClick, onChange ... )은 자동으로 액션으로 만들어줌
    actions: { argTypesRegex: '^on[A-Z].*' },

    // 특별한 형태의 props들은 알아서 적절한 컨트롤을 만들어줌
    // color나 date 같은 특수한 입력이 필요한 것들을 위한 설정
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
