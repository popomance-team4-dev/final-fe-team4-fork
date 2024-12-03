import { useEffect, useRef, useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { Project } from '@/api/aIParkAPI.schemas';
import { fetchRecentProjects } from '@/api/workspaceAPI';
import RecentProjectCard from '@/components/custom/cards/RecentProjectCard';
import { formatUpdatedAt } from '@/utils/dateUtils';

const RecentProject = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(false);

  useEffect(() => {
    const loadRecentProjects = async () => {
      try {
        const data = await fetchRecentProjects();
        setProjects(data);
        setIsScrolledRight(data.length > 4);
      } catch (error) {
        console.error('최근 프로젝트 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    loadRecentProjects();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrolledLeft(scrollLeft > 0);
      setIsScrolledRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-8 h-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h3 className="text-h3">최근 프로젝트</h3>
        <p
          onClick={() => navigate('/project')}
          className="text-black text-body2 flex items-center gap-1 cursor-pointer"
        >
          전체보기
          <TbChevronRight className="w-6 h-6" />
        </p>
      </div>

      <div className="relative flex items-center">
        {/* 왼쪽 화살표 버튼 */}
        {projects.length > 4 && isScrolledLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 w-[54px] h-[54px] rounded-xl bg-white flex items-center justify-center z-20"
          >
            <TbChevronLeft className="text-black w-8 h-8" />
          </button>
        )}

        {/* 스크롤 가능한 컨테이너 */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-hidden snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {projects.map((project) => (
            <div key={project.projectId} className="snap-start">
              <RecentProjectCard
                title={project.projectName}
                description={project.script}
                date={formatUpdatedAt(project.updatedAt)}
                type={project.projectType}
              />
            </div>
          ))}
        </div>

        {/* 오른쪽 화살표 버튼 */}
        {projects.length > 4 && isScrolledRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 w-[54px] h-[54px] rounded-xl bg-white flex items-center justify-center z-20"
          >
            <TbChevronRight className="text-black w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentProject;
