import { useState } from 'react';

import {
  ProjectListTable,
  ProjectListTableItem,
} from '@/components/custom/tables/history/ProjectListTable';
import TableToolbar from '@/components/custom/tables/history/TableToolbar';
import PaginationFooter from '@/components/section/footer/PaginationFooter';
import MainHeader from '@/components/section/header/MainHeader';
import jisuImage from '@/images/avatar/jisu.jpg';
import PageLayout from '@/layouts/PageLayout';

const dummyData: ProjectListTableItem[] = [
  {
    id: '1',
    order: '1',
    projectName: '프로젝트1 발표자료',
    fileName: '파일1.wav',
    content: '안녕하세요. 프로젝트1에 대한 발표를 시작해 보겠습니다.',
    type: 'TTS',
    status: '완료',
    createdAt: '금요일 오후 7:24',
  },
  {
    id: '2',
    order: '2',
    projectName: '프로젝트2 발표자료',
    fileName: '파일2.wav',
    content: '프로젝트2에 대해 간단히 설명드리겠습니다.',
    type: 'CONCAT',
    status: '진행',
    createdAt: '금요일 오후 6:20',
  },
  {
    id: '3',
    order: '3',
    projectName: '프로젝트3 자료',
    fileName: '파일3.wav',
    content: '이 자료는 프로젝트3에 관련된 것입니다.',
    type: 'VC',
    status: '실패',
    createdAt: '금요일 오후 5:10',
  },
  {
    id: '4',
    order: '4',
    projectName: '프로젝트4 요약자료',
    fileName: '파일4.wav',
    content: '프로젝트4 요약자료입니다.',
    type: 'TTS',
    status: '대기중',
    createdAt: '금요일 오후 4:30',
  },
  {
    id: '5',
    order: '5',
    projectName: '프로젝트5 발표자료',
    fileName: '파일5.wav',
    content: '프로젝트5에 대한 발표 자료입니다.',
    type: 'CONCAT',
    status: '완료',
    createdAt: '금요일 오후 3:45',
  },
  {
    id: '6',
    order: '6',
    projectName: '프로젝트6 회의자료',
    fileName: '파일6.wav',
    content: '프로젝트6 회의 내용입니다.',
    type: 'TTS',
    status: '완료',
    createdAt: '금요일 오후 3:00',
  },
  {
    id: '7',
    order: '7',
    projectName: '프로젝트7 기획안',
    fileName: '파일7.wav',
    content: '프로젝트7 기획안 발표입니다.',
    type: 'VC',
    status: '진행',
    createdAt: '금요일 오후 2:30',
  },
  {
    id: '8',
    order: '8',
    projectName: '프로젝트8 보고서',
    fileName: '파일8.wav',
    content: '프로젝트8 보고서 내용입니다.',
    type: 'CONCAT',
    status: '대기중',
    createdAt: '금요일 오후 2:00',
  },
  {
    id: '9',
    order: '9',
    projectName: '프로젝트9 제안서',
    fileName: '파일9.wav',
    content: '프로젝트9 제안서 발표입니다.',
    type: 'TTS',
    status: '완료',
    createdAt: '금요일 오후 1:30',
  },
  {
    id: '10',
    order: '10',
    projectName: '프로젝트10 결과보고',
    fileName: '파일10.wav',
    content: '프로젝트10 결과보고 발표입니다.',
    type: 'VC',
    status: '실패',
    createdAt: '금요일 오후 1:00',
  },
  {
    id: '11',
    order: '11',
    projectName: '프로젝트11 중간발표',
    fileName: '파일11.wav',
    content: '프로젝트11 중간발표 자료입니다.',
    type: 'CONCAT',
    status: '완료',
    createdAt: '금요일 오전 11:30',
  },
  {
    id: '12',
    order: '12',
    projectName: '프로젝트12 최종발표',
    fileName: '파일12.wav',
    content: '프로젝트12 최종발표 자료입니다.',
    type: 'TTS',
    status: '진행',
    createdAt: '금요일 오전 11:00',
  },
  {
    id: '13',
    order: '13',
    projectName: '프로젝트13 연구자료',
    fileName: '파일13.wav',
    content: '프로젝트13 연구자료 발표입니다.',
    type: 'VC',
    status: '대기중',
    createdAt: '금요일 오전 10:30',
  },
  {
    id: '14',
    order: '14',
    projectName: '프로젝트14 분석보고',
    fileName: '파일14.wav',
    content: '프로젝트14 분석보고 발표입니다.',
    type: 'CONCAT',
    status: '완료',
    createdAt: '금요일 오전 10:00',
  },
  {
    id: '15',
    order: '15',
    projectName: '프로젝트15 요약본',
    fileName: '파일15.wav',
    content: '프로젝트15 요약본 발표입니다.',
    type: 'TTS',
    status: '실패',
    createdAt: '금요일 오전 9:30',
  },
  {
    id: '16',
    order: '16',
    projectName: '프로젝트16 계획서',
    fileName: '파일16.wav',
    content: '프로젝트16 계획서 발표입니다.',
    type: 'VC',
    status: '완료',
    createdAt: '금요일 오전 9:00',
  },
  {
    id: '17',
    order: '17',
    projectName: '프로젝트17 제안발표',
    fileName: '파일17.wav',
    content: '프로젝트17 제안발표 자료입니다.',
    type: 'CONCAT',
    status: '진행',
    createdAt: '금요일 오전 8:30',
  },
  {
    id: '18',
    order: '18',
    projectName: '프로젝트18 검토자료',
    fileName: '파일18.wav',
    content: '프로젝트18 검토자료 발표입니다.',
    type: 'TTS',
    status: '대기중',
    createdAt: '금요일 오전 8:00',
  },
  {
    id: '19',
    order: '19',
    projectName: '프로젝트19 회의록',
    fileName: '파일19.wav',
    content: '프로젝트19 회의록 발표입니다.',
    type: 'VC',
    status: '완료',
    createdAt: '금요일 오전 7:30',
  },
  {
    id: '20',
    order: '20',
    projectName: '프로젝트20 종합보고',
    fileName: '파일20.wav',
    content: '프로젝트20 종합보고 발표입니다.',
    type: 'CONCAT',
    status: '실패',
    createdAt: '금요일 오전 7:00',
  },
];

const ProjectsPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // 선택된 항목 관리
  const [isAllSelected, setIsAllSelected] = useState(false); // 전체 선택 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const handleSelectAll = (checked: boolean) => {
    const currentPageItems = getCurrentPageItems();
    if (checked) {
      setSelectedItems((prev) => [
        ...new Set([...prev, ...currentPageItems.map((item) => item.id)]),
      ]);
      setIsAllSelected(true);
    } else {
      setSelectedItems((prev) =>
        prev.filter((id) => !currentPageItems.find((item) => item.id === id))
      );
      setIsAllSelected(false);
    }
  };

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return dummyData.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

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
      <div className="py-6">
        <h2 className="text-h2 text-black mb-2">프로젝트 목록</h2>
        <p className="text-body2 text-black">내 프로젝트를 빠르게 조회하고 관리해 보세요.</p>
      </div>
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
