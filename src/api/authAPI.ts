import { AxiosError } from 'axios';

import { customInstance } from './axios-client';

export const login = async (email: string, pwd: string) => {
  try {
    // 보낸 데이터 출력
    console.log('보낸 데이터:', { email, pwd });

    // 서버에 로그인 요청
    const data = await customInstance.post('/member/login', {
      email,
      pwd,
    });

    console.log('서버 응답 데이터:', data); // data는 이미 응답 데이터 자체
    return data; // 명시적으로 반환

    // 세션 기반 인증에서는 별도로 토큰을 저장하지 않음.
    // 서버가 세션을 설정하면 브라우저가 쿠키를 통해 자동으로 세션을 관리합니다.
  } catch (error) {
    if (error instanceof AxiosError) {
      // 오류 메시지 처리
      const errorMessage =
        error.response?.data?.message || '로그인 요청에 실패했습니다. 다시 시도해주세요.';
      throw new Error(errorMessage);
    }
    throw error;
  }
};
