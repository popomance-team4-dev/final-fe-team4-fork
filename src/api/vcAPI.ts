import { ResponseDto } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

/**
 * VC 프로젝트 상태를 가져옵니다.
 * @summary VC 상태 로드
 */
export const vcLoad = (projectId: number) => {
  return customInstance<ResponseDto>({ url: `/vc/${projectId}`, method: 'GET' });
};
