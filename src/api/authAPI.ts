import { AxiosError } from 'axios';

import { customInstance } from './axios-client';

export const login = async (email: string, pwd: string) => {
  try {
    // 서버에 로그인 요청
    const data = await customInstance.post('/member/login', { email, pwd });
    return data; // 명시적으로 반환
  } catch (error: unknown) {
    // AxiosError 타입인지 확인
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || '로그인 요청에 실패했습니다. 다시 시도해주세요.';
      throw new Error(errorMessage);
    }

    // 일반적인 Error 타입인지 확인
    if (error instanceof Error) {
      throw new Error(error.message || '알 수 없는 오류가 발생했습니다.');
    }

    // 예상하지 못한 에러 처리
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const logout = async () => {
  try {
    // 서버에 로그아웃 요청
    await customInstance.post('/member/logout');
    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 요청 실패:', error);
    throw new Error('로그아웃 요청에 실패했습니다. 다시 시도해주세요.');
  }
};
