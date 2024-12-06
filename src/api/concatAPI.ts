import { customInstance } from '@/api/axios-client';

export interface ConcatSaveDto {
  projectId: number | null;
  projectName: string;
  globalFrontSilenceLength: number;
  globalTotalSilenceLength: number;
  concatDetails: {
    id: number | null;
    localFileName: string;
    audioSeq: number;
    isChecked: boolean;
    unitScript: string;
    endSilence: number;
  }[];
}
// 프로젝트 기본 정보 타입
export interface ConcatProjectDto {
  id: number;
  projectName: string;
  globalFrontSilenceLength: number;
  globalTotalSilenceLength: number;
  concatAudios: Array<{
    id: number;
    audioUrl: string;
  }>;
}

// 상세 정보 타입
export interface ConcatDetailDto {
  id: number;
  audioSeq: number;
  srcUrl: string;
  unitScript: string;
  endSilence: number;
  checked: boolean;
}

// API 데이터 구조
export interface ConcatData {
  cnctProjectDto: ConcatProjectDto;
  cnctDetailDtos: ConcatDetailDto[];
}

// Save API 요청 데이터 구조
interface ConcatSaveRequest {
  concatSaveDto: ConcatSaveDto;
  file?: File[];
}

/**
 * Concat 프로젝트 상태를 가져옵니다.
 */
export const concatLoad = async (projectId: number) => {
  try {
    const response = await customInstance<ConcatData>({
      url: `/concat/${projectId}`,
      method: 'GET',
    });

    console.log('Load API 응답:', response);
    return response;
  } catch (error) {
    console.error('Concat Load API 에러:', error);
    throw error;
  }
};
/**
 * Concat 프로젝트 상태를 저장합니다.
 */
export const concatSave = async (data: ConcatSaveRequest) => {
  try {
    const formData = new FormData();

    // 저장할 데이터 로깅
    console.log('Save API 요청 데이터:', data.concatSaveDto);

    formData.append('concatSaveDto', JSON.stringify(data.concatSaveDto));

    if (data.file && data.file.length > 0) {
      data.file.forEach((file) => {
        console.log('첨부 파일:', file.name);
        formData.append('file', file);
      });
    }

    const response = await customInstance.post('/concat/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Save API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('Concat Save API 에러:', error);
    throw error;
  }
};
