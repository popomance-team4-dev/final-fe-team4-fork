import { TTSSaveDto } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

export const saveTTSProject = async (data: TTSSaveDto) => {
  try {
    const response = await customInstance.post('/tts/save', data, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.data?.success) {
      console.log('TTS 프로젝트 저장 성공:', response.data);
      return response.data;
    } else {
      console.error('TTS 프로젝트 저장 실패:', response.data?.message);
      return null;
    }
  } catch (error) {
    console.error('TTS 프로젝트 저장 요청 오류:', error);
    throw error;
  }
};
