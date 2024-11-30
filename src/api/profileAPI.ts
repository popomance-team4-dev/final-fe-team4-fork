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
    const response = await customInstance.post('/member/find-id', {
      name,
      phoneNumber,
    });
    return response;
  } catch (error) {
    const errorMessage =
      (error as any).response?.data?.message || 'ID 찾기에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};

export const findPassword = async ({ email, phoneNumber }: FindPasswordRequest) => {
  try {
    const response = await customInstance.post('/member/find-password', {
      email,
      phoneNumber,
    });
    return response;
  } catch (error) {
    const errorMessage =
      (error as any).response?.data?.message || '비밀번호 찾기에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};
