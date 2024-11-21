import { useState } from 'react';

import FileUploadAlert, { ALERT_MESSAGES } from '@/components/alerts/FileUploadAlert';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import ProjectTitle from '@/components/section/ProjectTitle';
import CONCATOptionsSidebar from '@/components/sidebar/CONCATOptionsSidebar';
import { Button } from '@/components/ui/button';

const CONCATPage = () => {
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
              <ProjectTitle
                type="CONCAT"
                projectTitle="프로젝트 1"
                onSave={() => console.log('저장')}
                onClose={() => console.log('닫기')}
              />
            </div>

            {/* 팝업 창 */}
            <div className="flex relative">
              {showAlert && (
                <FileUploadAlert
                  message={ALERT_MESSAGES.CONCAT_UPLOAD_REQUIRED}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>

            <div className="h-[580px] mt-6 overflow-hidden"></div>

            <div className="mt-6 text-center">
              <Button>Concat 생성</Button>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[276px] flex-shrink-0">
          <CONCATOptionsSidebar />
        </aside>
      </div>

      {/* Playback */}
      <section className="h-[92px] px-6">
        <AudioPlayer audioUrl={''} />
      </section>
    </div>
  );
};

export default CONCATPage;
