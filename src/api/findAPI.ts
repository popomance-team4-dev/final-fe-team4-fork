/* eslint-disable @typescript-eslint/no-explicit-any */
import { customInstance } from './axios-client';

interface FindIdRequest {
  name: string;
  phoneNumber: string;
}

interface FindPasswordRequest {
  email: string;
  phoneNumber: string;
}

export const findID = async ({ name, phoneNumber }: FindIdRequest) => {
  try {
    console.log('Finding ID with data:', { name, phoneNumber });

    const response = await customInstance.post('/member/find-id', {
      name,
      phoneNumber,
    });

    console.log('Server response:', response);
    return response;
  } catch (error) {
    console.error('Failed to find ID:', error);
    const errorMessage =
      (error as any).response?.data?.message || 'ID 찾기에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};

export const findPassword = async ({ email, phoneNumber }: FindPasswordRequest) => {
  try {
    console.log('Finding password with data:', { email, phoneNumber });

    const response = await customInstance.post('/member/find-password', {
      email,
      phoneNumber,
    });

    console.log('Server response:', response);
    return response;
  } catch (error) {
    console.error('Failed to find password:', error);
    const errorMessage =
      (error as any).response?.data?.message || '비밀번호 찾기에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};
