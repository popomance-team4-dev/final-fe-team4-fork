import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  // 스토리 파일들을 어디서 찾을지 지정
  // src 폴더 안에 있는 모든 .stories로 끝나는 파일들을 찾음
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  // 스토리북에서 사용할 기능들을 추가
  // essentials는 기본적으로 필요한 애드온들을 모아놓은 것
  addons: ['@storybook/addon-essentials'],

  // 프레임워크를 리액트랑 Vite로 설정
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // 컴포넌트 문서를 자동으로 만들어줌
  docs: {
    autodocs: true,
  },

  // Vite 설정을 조금 수정해서 @로 src 폴더에 접근할 수 있게 해줬음
  viteFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};

export default config;
