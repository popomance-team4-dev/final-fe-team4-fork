import { ResponseDto, TTSSaveDto, TTSSpecificResponse } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

/**
 * TTS 프로젝트를 저장합니다.
 * @param data: TTSSaveDto
 * @returns Promise<TTSSpecificResponse>
 */
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

/**
 * TTS 프로젝트 상태를 가져옵니다.
 * @summary TTS 상태 로드
 */
export const ttsLoad = (projectId: number) => {
  return customInstance<ResponseDto<TTSSpecificResponse>>({
    url: `/tts/${projectId}`,
    method: 'GET',
  });
};

export type TtsLoadResult = NonNullable<Awaited<ReturnType<typeof ttsLoad>>>;
