import { useCallback, useEffect, useState } from 'react';

import { Project } from '@/api/aIParkAPI.schemas';
import { fetchProjects } from '@/api/workspaceAPI';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import PaginationFooter from '@/components/section/footer/PaginationFooter';
import MainHeader from '@/components/section/header/MainHeader';
import PageLayout from '@/layouts/PageLayout';
import { formatUpdatedAt } from '@/utils/dateUtils';

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 선택된 항목
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태

  // 페이지네이션 데이터를 가져오는 함수
  const loadProjects = useCallback(
    async (page: number) => {
      try {
        const { content, totalPages } = await fetchProjects(page, 8, searchKeyword);
        console.log('로드된 프로젝트 데이터:', content);
        setProjects(content); // 프로젝트 데이터 설정
        setTotalPages(totalPages); // 총 페이지 수 설정
      } catch (error) {
        console.error('프로젝트 데이터를 불러오는 중 오류 발생:', error);
      }
    },
    [searchKeyword] // 검색 키워드가 변경될 때 함수 갱신
  );

  useEffect(() => {
    loadProjects(0); // 새로운 키워드로 검색 시 0번째 페이지부터 다시 로드
  }, [loadProjects]);

  const handlePlay = (id: string) => {
    console.log(`${id} 재생 시작`);
  };

  const handlePause = (id: string) => {
    console.log(`${id} 재생 중지`);
  };

  const handleDelete = () => {
    console.log('선택된 항목 삭제');
    // 삭제 로직
  };

  const handleSearch = (searchTerm: string) => {
    setSearchKeyword(searchTerm); // 검색 키워드 업데이트
    setCurrentPage(0); // 검색 시 첫 페이지로 이동
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? projects.map((project) => project.projectId) : []);
  };

  const handleSelectionChange = (id: number, selected: boolean) => {
    setSelectedItems((prev) =>
      selected ? [...prev, id] : prev.filter((projectId) => projectId !== id)
    );
  };

  return (
    <PageLayout
      variant="main"
      header={<MainHeader />}
      footer={
        <PaginationFooter
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page - 1);
            loadProjects(page - 1); // API에 맞는 페이지 번호 요청
          }}
        />
      }
    >
      <Title
        variant="recent"
        title="프로젝트 목록"
        description="내 프로젝트를 빠르게 조회하고 관리해 보세요."
      />
      <MainContents
        type="PROJECT"
        items={projects.map((project) => ({
          id: project.projectId.toString(),
          projectName: project.projectName,
          projectType: project.projectType as 'TTS' | 'VC' | 'CONCAT',
          script: project.script || '작성된 내용이 없습니다.',
          updatedAt: formatUpdatedAt(project.updatedAt),
          isSelected: selectedItems.includes(project.projectId),
          text: project.projectName,
        }))}
        isAllSelected={selectedItems.length === projects.length}
        onSelectAll={(checked = false) => handleSelectAll(checked)}
        onSelectionChange={(id) =>
          handleSelectionChange(Number(id), !selectedItems.includes(Number(id)))
        }
        onDelete={handleDelete}
        onAdd={() => console.log('프로젝트 추가')}
        onPlay={handlePlay}
        onPause={handlePause}
        itemCount={projects.length}
        selectedItemsCount={selectedItems.length}
        onSearch={handleSearch}
      />
    </PageLayout>
  );
};

export default ProjectPage;
