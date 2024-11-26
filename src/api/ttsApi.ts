import { TTSSaveDto } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

export const saveTTSProject = async (data: TTSSaveDto) => {
  try {
    console.log('보낸 데이터:', data);

    // 응답은 이미 response.data만 반환
    const response = await customInstance.post('/tts/save', data);

    console.log('서버 응답:', response);

    // 성공 여부 확인
    if (response.data?.success) {
      console.log('TTS 프로젝트 저장 성공:', response.data);
      return response.data;
    } else {
      console.error('TTS 프로젝트 저장 실패:', response.data?.message || '응답 데이터 없음');
      return null;
    }
  } catch (error) {
    console.error('TTS 프로젝트 저장 요청 오류:', error);
    throw error;
  }
};
