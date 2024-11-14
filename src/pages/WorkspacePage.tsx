import { useState } from 'react';
import { TbX } from 'react-icons/tb';

import RecentProject from '@/components/workspace/RecontProject';

const WorkspacePage = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  return (
    <div className="max-w-[1200px]">
      <div className="p-6 bg-gray-200">
        {/* 환영 메시지 */}
        <p>User 님, 반갑습니다.</p>
      </div>

      <div>
        {/* 팝업 창 */}
        {isPopupVisible && (
          <div className="h-[428px] relative bg-blue-50 p-6 rounded-lg shadow-md">
            <button
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
              onClick={() => setPopupVisible(false)}
            >
              <TbX /> {/* 팝업 닫기 버튼 */}
            </button>
          </div>
        )}
      </div>

      <div>
        {/* 최근 프로젝트 영역 */}
        <div>
          <RecentProject />
        </div>
      </div>
      <div>
        {/* 최근 내보내기 영역 */}
        <div className="h-[370px] bg-gray-100 p-4"></div>
      </div>
    </div>
  );
};

export default WorkspacePage;
