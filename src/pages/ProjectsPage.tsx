import { ProjectListTable } from '@/components/custom/tables/history/ProjectListTable';
import TableToolbar from '@/components/custom/tables/history/TableToolbar';
import ProjectTitle from '@/components/section/contents/project/ProjectTitle';
import PaginationFooter from '@/components/section/footer/PaginationFooter';
import MainHeader from '@/components/section/header/MainHeader';
import { dummyData } from '@/constants/dummy';
import { usePagination } from '@/hooks/usePagination';
import { useTableSelection } from '@/hooks/useTableSelection';
import jisuImage from '@/images/avatar/jisu.jpg';
import PageLayout from '@/layouts/PageLayout';

const ProjectsPage = () => {
  const { currentPage, setCurrentPage, getCurrentPageItems, totalPages } = usePagination({
    data: dummyData,
    itemsPerPage: 8,
  });

  const { selectedItems, isAllSelected, handleSelectAll, handleSelectionChange } =
    useTableSelection({
      getCurrentPageItems,
    });

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
    console.log('검색어:', searchTerm);
  };

  const handleFilter = () => {
    console.log('필터 버튼 클릭');
  };

  return (
    <PageLayout
      variant="main"
      header={
        <MainHeader
          name="김바타"
          email="aipark@aipark.ai"
          imageUrl={jisuImage}
          onMyPage={() => console.log('마이페이지 이동')}
          onSignout={() => console.log('로그아웃')}
        />
      }
      footer={
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      }
    >
      <ProjectTitle
        variant="recent"
        title="프로젝트 목록"
        description="내 프로젝트를 빠르게 조회하고 관리해 보세요."
      />
      <div className="mt-2 border rounded-md">
        {/* 컨트롤 패널 */}
        <TableToolbar
          title="모든 프로젝트"
          count={dummyData.length}
          selectedItemsCount={selectedItems.length}
          onDelete={handleDelete}
          onSearch={handleSearch}
          onFilter={handleFilter}
        />

        {/* 테이블 */}
        <div>
          <ProjectListTable
            onPlay={handlePlay}
            onPause={handlePause}
            itemCount={getCurrentPageItems().length}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
            items={getCurrentPageItems()}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectsPage;
