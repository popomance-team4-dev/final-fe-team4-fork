import { Project } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

export const fetchProjects = async (
  page: number,
  size: number,
  keyword: string = ''
): Promise<{ content: Project[]; totalPages: number }> => {
  try {
    const response = await customInstance.get('/workspace/projects', {
      params: { page, size, keyword },
    });

    console.log('API 전체 응답:', response.data);

    // 응답에서 data 필드 추출
    const data = response.data;

    if (!data) {
      throw new Error('API 응답 데이터가 비어 있습니다.');
    }

    console.log('API 전체 응답:', response.data);
    console.log('API 부분 응답:', data);
    console.log('프로젝트 데이터:', data.content);
    console.log('총 페이지 수:', data.totalPages);

    // 데이터 검증
    if (
      !Array.isArray(data.content) || // content는 배열이어야 함
      typeof data.totalPages !== 'number' // totalPages는 숫자여야 함
    ) {
      console.error('API 부분 응답:', data);
      throw new Error('API 응답 구조가 예상과 다릅니다.');
    }

    // 반환
    return {
      content: data.content,
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw new Error('API 요청 실패');
  }
};
