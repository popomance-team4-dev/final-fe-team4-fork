import { TTSSaveDto } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

export const saveTTSProject = async (data: TTSSaveDto) => {
  try {
    console.log('보낸 데이터:', data);

    const response = await customInstance.post('/tts/save', data);
    console.log('서버 응답:', response.data);

    if (response.data?.data.ttsProject) {
      console.log('TTS 프로젝트 저장 성공:', response.data);
      return response.data.data; // 서버 응답 데이터 반환
    } else {
      console.error('TTS 프로젝트 저장 실패: 응답 데이터 없음');
      return null;
    }
  } catch (error) {
    console.error('TTS 프로젝트 저장 요청 오류:', error);
    throw error;
  }
};
