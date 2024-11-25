import { useState } from 'react';

import {
  ProjectListTable,
  ProjectListTableItem,
} from '@/components/custom/tables/history/ProjectListTable';
import TableToolbar from '@/components/custom/tables/history/TableToolbar';
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
];

const ProjectsPage = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // 선택된 항목 관리
  const [isAllSelected, setIsAllSelected] = useState(false); // 전체 선택 상태 관리

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
    if (checked) {
      setSelectedItems(dummyData.map((item) => item.id));
      setIsAllSelected(true);
    } else {
      setSelectedItems([]);
      setIsAllSelected(false);
    }
    console.log(`전체 선택 상태: ${checked ? '선택됨' : '해제됨'}`);
  };

  const handleSelectionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
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
            itemCount={dummyData.length}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
            items={dummyData}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProjectsPage;
