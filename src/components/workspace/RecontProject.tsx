import { useEffect, useRef, useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

import RecentProjectCard from '@/components/workspace/RecentProjectCard';

//더미 데이터
const projects = [
  {
    title: '프로젝트1 발표자료',
    description: '안녕하세요. 프로젝트1에 대한 발표를 시작해 보겠습니다.',
    date: '금요일 오후 7:24',
    type: 'TTS',
    language: 'KR',
    voice: 'Voice 1',
    hasPlayback: true,
  },
  {
    title: '프로젝트2 발표자료',
    description: '안녕하세요. 프로젝트2에 대한 발표를 시작해 보겠습니다.',
    date: '화요일 오후 3:15',
    type: 'VC',
    language: 'EN',
    voice: 'Voice 2',
    hasPlayback: false,
  },
  {
    title: '프로젝트3 발표자료',
    description: '안녕하세요. 프로젝트3에 대한 발표를 시작해 보겠습니다.',
    date: '수요일 오전 11:05',
    type: 'Concat',
    language: 'JP',
    voice: 'Voice 3',
    hasPlayback: true,
  },
  {
    title: '프로젝트4 발표자료',
    description: '안녕하세요. 프로젝트4에 대한 발표를 시작해 보겠습니다.',
    date: '목요일 오후 5:00',
    type: 'TTS',
    language: 'FR',
    voice: 'Voice 4',
    hasPlayback: false,
  },
  {
    title: '프로젝트5 발표자료',
    description: '안녕하세요. 프로젝트5에 대한 발표를 시작해 보겠습니다.',
    date: '금요일 오후 1:30',
    type: 'VC',
    language: 'EN',
    voice: 'Voice 5',
    hasPlayback: true,
  },
];

const RecentProject = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(projects.length > 4);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrolledLeft(scrollLeft > 0);
      setIsScrolledRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
      updateScrollState();
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
      updateScrollState();
    }
  };
  useEffect(() => {
    updateScrollState(); // 초기 스크롤 상태 확인
  }, []);

  return (
    <div className="p-6 h-[418px] max-w-[1336px]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h3 className="text-h3">최근 프로젝트</h3>
        <p className="text-black text-body2 flex items-center gap-1 cursor-pointer">
          전체보기
          <TbChevronRight className="w-6 h-6" />
        </p>
      </div>

      <div className="relative flex items-center">
        {/* 왼쪽 화살표 버튼 */}
        {projects.length > 4 && isScrolledLeft && (
          <>
            {/* 왼쪽 그라데이션 배경 */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-white/20 pointer-events-none z-10" />
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 w-[54px] h-[54px] rounded-xl bg-white flex items-center justify-center z-20"
            >
              <TbChevronLeft className="text-black w-8 h-8" />
            </button>
          </>
        )}

        {/* 스크롤 가능한 컨테이너 */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-hidden scrollbar-hide"
        >
          {projects.map((project, index) => (
            <RecentProjectCard
              key={index}
              title={project.title}
              description={project.description}
              date={project.date}
              type={project.type}
              language={project.language}
              voice={project.voice}
              hasPlayback={project.hasPlayback}
            />
          ))}
        </div>

        {/* 오른쪽 화살표 버튼 */}
        {projects.length > 4 && isScrolledRight && (
          <>
            {/* 오른쪽 그라데이션 배경 */}
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-white/20 pointer-events-none z-5" />
            <button
              onClick={handleScrollRight}
              className="absolute right-0 w-[54px] h-[54px] rounded-xl bg-white flex items-center justify-center z-10"
            >
              <TbChevronRight className="text-black w-8 h-8" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentProject;
