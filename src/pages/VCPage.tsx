import { useState } from 'react';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { Button } from '@/components/ui/button';
import FileUploadAlert from '@/components/ui/FileUploadAlert';

const VCPage = () => {
  const [showAlert, setShowAlert] = useState(true);

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
            <div className="flex relative">
              {showAlert && (
                <FileUploadAlert
                  message="VC 작업을 시작하려면 반드시 오디오 파일을 업로드해 주세요."
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>

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
