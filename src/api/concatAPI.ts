import { ConcatSaveDto, ResponseDto } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

/**
 * Concat 프로젝트 상태를 가져옵니다.
 * @summary Concat 상태 로드
 */
export const concatLoad = (projectId: number) => {
  return customInstance<ResponseDto>({ url: `/concat/${projectId}`, method: 'GET' });
};

/**
 * Concat 프로젝트 상태를 저장합니다.
 * @summary Concat 상태 저장
 */
export const concatSave = (concatSaveDto: ConcatSaveDto) => {
  return customInstance<ResponseDto>({
    url: `/concat/save`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: concatSaveDto,
  });
};
