import axios from 'axios';

export const sendSMS = async (phone: string) => {
  try {
    const response = await axios.post(
      'https://xh4zix4q5pdhkgx3gortekzesa0wpqxd.lambda-url.ap-northeast-2.on.aws/send',
      { phone: phone }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', (error as any).response?.data);
  }
};

export const verifySMS = async (phone: string, token: string) => {
  try {
    const response = await axios.post(
      'https://xh4zix4q5pdhkgx3gortekzesa0wpqxd.lambda-url.ap-northeast-2.on.aws/verify',
      { phone: phone, token: token }
    );
    return response;
  } catch (error) {
    const errorMessage =
      (error as any).response?.data?.message || '인증번호 확인에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};
