import { useCallback, useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { Export } from '@/api/aIParkAPI.schemas';
import { fetchExports } from '@/api/workspaceAPI';
import MainContents from '@/components/section/contents/MainContents';
import Title from '@/components/section/contents/Title';
import PaginationFooter from '@/components/section/footer/PaginationFooter';
import MainHeader from '@/components/section/header/MainHeader';
import PageLayout from '@/layouts/PageLayout';
import { formatUpdatedAt } from '@/utils/dateUtils';

const HistoryPage = () => {
  const [data, setData] = useState<Export[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 선택된 항목
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태

  // const navigate = useNavigate();

  const loadProjects = useCallback(
    async (page: number) => {
      try {
        const { content, totalPages, totalElements } = await fetchExports(page, 8, searchKeyword);
        console.log('로드된 프로젝트 데이터:', content);
        setData(content); // 프로젝트 데이터 설정
        setTotalPages(totalPages); // 총 페이지 수 설정
        setTotalItemsCount(totalElements); // 전체 항목 수 설정
      } catch (error) {
        console.error('프로젝트 데이터를 불러오는 중 오류 발생:', error);
      }
    },
    [searchKeyword] // 검색 키워드가 변경될 때 함수 갱신
  );

  useEffect(() => {
    setCurrentPage(0); // 페이지 리셋
    loadProjects(0);
  }, [loadProjects]);

  const handlePlay = (id: string) => {
    console.log(`${id} 재생 시작`);
  };

  const handlePause = (id: string) => {
    console.log(`${id} 재생 중지`);
  };

  const handleDelete = () => {
    console.log('삭제:', selectedItems);
  };
  const handleSearch = (searchTerm: string) => {
    setSearchKeyword(searchTerm); // 검색 키워드 업데이트
    setCurrentPage(0); // 검색 시 첫 페이지로 이동
    loadProjects(0); // 새로운 키워드로 데이터 로드
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? data.map((project) => project.metaId) : []);
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
        title="히스토리 내역"
        description="저장된 히스토리 기록을 조회하고 파일을 편리하게 다운로드할 수 있어요."
      />
      <MainContents
        type="RECENT"
        items={data.map((item) => ({
          id: item.metaId.toString(),
          projectName: item.projectName,
          projectType: item.projectType as 'TTS' | 'VC' | 'Concat',
          fileName: item.fileName,
          script: item.script || '작성된 내용이 없습니다.',
          unitStatus: item.unitStatus as 'SUCCESS' | 'FAILURE',
          updatedAt: formatUpdatedAt(item.createdAt),
          isSelected: selectedItems.includes(item.metaId),
          text: item.projectName,
        }))}
        isAllSelected={selectedItems.length === data.length}
        onSelectAll={(checked = false) => handleSelectAll(checked)}
        onSelectionChange={(id) =>
          handleSelectionChange(Number(id), !selectedItems.includes(Number(id)))
        }
        onDelete={handleDelete}
        onAdd={() => {}}
        onPlay={handlePlay}
        onPause={handlePause}
        itemCount={data.length}
        selectedItemsCount={selectedItems.length}
        onSearch={handleSearch}
        totalItemsCount={totalItemsCount}
      />
    </PageLayout>
  );
};

export default HistoryPage;
