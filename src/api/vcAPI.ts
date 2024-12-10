import type { ResponseDto, VCSaveDto } from './aIParkAPI.schemas';
import { customInstance } from './axios-client';

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

interface VCLoadResponse {
  vcProjectRes: {
    id: number;
    projectName: string;
    trgAudios: {
      id: number;
      audioUrl: string;
    }[];
  };
  vcDetailsRes: {
    id: number;
    projectId: number;
    isChecked: boolean;
    unitScript: string;
    srcAudio: string | null;
    genAudios: {
      id: number;
      audioUrl: string;
    }[];
  }[];
}

/**
 * VC 프로젝트 상태를 가져옵니다.
 */
export const vcLoad = async (projectId: number): Promise<ResponseDto<VCLoadResponse>> => {
  try {
    const response = await customInstance<ResponseDto<VCLoadResponse>>({
      url: `/vc/${projectId}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.error('VC 프로젝트 로드 실패:', error);
    throw error;
  }
};

/**
 * VC 프로젝트를 저장합니다.
 * @param data VCSaveDto 데이터
 * @param files 오디오 파일 배열 (선택적)
 */
export const saveVCProject = async (
  data: VCSaveDto,
  files?: File[]
): Promise<ResponseDto<VCLoadResponse>> => {
  try {
    const formData = new FormData();

    // 메타데이터 구성
    const metadata: VCSaveDto = {
      projectId: data.projectId,
      projectName: data.projectName,
      srcFiles: data.srcFiles.map((file) => ({
        detailId: file.detailId,
        localFileName: file.detailId ? null : file.localFileName,
        unitScript: file.unitScript,
        isChecked: file.isChecked,
      })),
      trgFile: data.trgFile
        ? {
            localFileName: data.trgFile.s3MemberAudioMetaId ? null : data.trgFile.localFileName,
            s3MemberAudioMetaId: data.trgFile.s3MemberAudioMetaId,
          }
        : null,
    };

    formData.append('metadata', JSON.stringify(metadata));

    // 파일 추가 로직 수정
    if (files?.length) {
      files.forEach((file) => {
        const matchingSrcFile = data.srcFiles.find(
          (srcFile) => srcFile.localFileName === file.name
        );
        if (matchingSrcFile) {
          formData.append('file', file);
        }
      });
    }

    const response = await customInstance<ResponseDto<VCLoadResponse>>({
      url: '/vc/save',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('VC 프로젝트 저장 실패:', error);
    throw error;
  }
};

// Response Types
export type ProcessVoiceConversionResult = NonNullable<
  Awaited<ReturnType<typeof processVoiceConversion>>
>;
export type LoadVCProjectResult = NonNullable<Awaited<ReturnType<typeof vcLoad>>>;

// VCSaveDto를 export 해야 합니다
export type { VCSaveDto } from './aIParkAPI.schemas';
