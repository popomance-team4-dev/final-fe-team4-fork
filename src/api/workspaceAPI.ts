import { Project } from '@/api/aIParkAPI.schemas';
import { customInstance } from '@/api/axios-client';

export const fetchProjects = async (
  page: number,
  size: number,
  keyword: string = ''
): Promise<{ content: Project[]; totalPages: number; totalElements: number }> => {
  try {
    const response = await customInstance.get('/workspace/projects', {
      params: { page, size, keyword },
    });

    console.log('API 전체 응답:', response.data);

    // 응답에서 data 필드 추출
    const data = response.data;

    console.log('API 전체 응답:', response.data);
    console.log('API 부분 응답:', data);
    console.log('프로젝트 데이터:', data.content);
    console.log('총 페이지 수:', data.totalPages);

    // 데이터 검증
    if (!data || !Array.isArray(data.content) || typeof data.totalPages !== 'number') {
      throw new Error('API 응답 데이터가 예상과 다릅니다.');
    }

    // 반환
    return {
      content: data.content,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
    };
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw new Error('API 요청 실패');
  }
};

export const deleteProject = async (projectIds: number[]) => {
  try {
    const response = await customInstance.delete('/workspace/delete/project', {
      data: projectIds, // 요청 본문에 ID 배열 전달
    });
    console.log('프로젝트 삭제 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('프로젝트 삭제 실패:', error);
    throw error;
  }
};
