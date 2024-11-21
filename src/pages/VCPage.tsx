import { useState } from 'react';
import { TbX } from 'react-icons/tb';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Button } from '@/components/ui/button';

const VCPage = () => {
  const [isPopupVisible, setPopupVisible] = useState(true);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <header className="h-[92px] ml-6 border-b">
        <div className="pt-3">
          <h1 className="text-[14px] font-bold mb-2">My work status</h1>

          <div className="relative">{/* work status Dropdown */}</div>
        </div>
      </header>

      <div className="flex flex-1 h-full ml-6 border-b">
        <div className="flex flex-col w-full">
          {/* Main1 */}
          <section className="flex-1 py-6 pr-6 flex flex-col">
            <div className="h-[71px]">
              <header className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">VC · 프로젝트 1</h2>
              </header>
            </div>

            {/* 팝업 창 */}
            {isPopupVisible && (
              <div className="h-[52px] flex bg-blue-50 rounded-lg shadow-md relative">
                <button
                  className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
                  onClick={() => setPopupVisible(false)}
                >
                  <TbX /> {/* 팝업 닫기 버튼 */}
                </button>
                <p className="m-auto text-center text-gray-800">This is a popup!</p>
              </div>
            )}

            <div className="h-[580px] mt-6 overflow-hidden"></div>

            <div className="mt-6 text-center">
              <Button>VC 생성</Button>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[276px] flex-shrink-0 bg-gray-50"></aside>
      </div>

      {/* Playback */}
      <section className="h-[92px] px-6">
        <AudioPlayer audioUrl={''} />
      </section>
    </div>
  );
};

export default VCPage;
