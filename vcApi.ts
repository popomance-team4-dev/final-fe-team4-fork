import type { ResponseDto, VCSaveDto } from './src/api/aIParkAPI.schemas';
import { customInstance } from './src/api/axios-client';

export interface VCProcessResponse {
  id: number;
  projectId: number;
  isChecked: boolean;
  unitScript: string;
  srcAudio: string;
  genAudios: string[];
}

/**
 * VC 프로젝트 처리 및 음성 변환
 * @param vcSaveDto VC 저장 데이터
 * @param files 오디오 파일 배열 (소스 파일들 + 타겟 파일)
 * @param memberId 멤버 ID
 */
export const processVoiceConversion = async (
  vcSaveDto: VCSaveDto,
  files: File[],
  memberId: number
): Promise<VCProcessResponse[]> => {
  try {
    const formData = new FormData();

    // VCSaveDto를 JSON 문자열로 변환하여 추가
    formData.append('VCSaveRequestDto', JSON.stringify(vcSaveDto));

    // 파일들을 순서대로 추가 (소스 파일들 + 타겟 파일)
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await customInstance<ResponseDto<VCProcessResponse[]>>({
      url: '/vc/process',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      params: { memberId },
    });

    console.log('서버 원본 응답:', response);
    console.log('응답 데이터:', response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('VC 프로세스 실패:', error);
    throw error;
  }
};

/**
 * VC 프로젝트 상태를 가져옵니다.
 */
export const loadVCProject = async (projectId: number) => {
  try {
    const response = await customInstance<ResponseDto>({
      url: `/vc/${projectId}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('VC 프로젝트 로드 실패:', error);
    throw error;
  }
};

// Response Types
export type ProcessVoiceConversionResult = NonNullable<
  Awaited<ReturnType<typeof processVoiceConversion>>
>;
export type LoadVCProjectResult = NonNullable<Awaited<ReturnType<typeof loadVCProject>>>;

// VCSaveDto를 export 해야 합니다
export type { VCSaveDto } from './src/api/aIParkAPI.schemas';
