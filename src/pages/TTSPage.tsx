import { useCallback, useState } from 'react';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import TTSDropdown, { TTSFile } from '@/components/tts/TTSdropdown';
import TTSMainContent from '@/components/tts/TTSMainContent';
import TTSOptionsSidebar from '@/components/tts/TTSOptionsSidebar';

const TTSPage = () => {
  const [ttsFiles, setTTSFiles] = useState<TTSFile[]>([
    {
      id: 1,
      name: 'text_001.txt',
      status: '진행',
      progress: 75,
      createdAt: new Date().toISOString(), // 오늘
    },
    {
      id: 2,
      name: 'text_002.txt',
      status: '진행',
      progress: 82,
      createdAt: new Date().toISOString(), // 오늘
    },
    {
      id: 3,
      name: 'text_003.txt',
      status: '대기',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
    },
    {
      id: 4,
      name: 'text_004.txt',
      status: '대기',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
    },
    {
      id: 5,
      name: 'text_005.txt',
      status: '실패',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 그저께
    },
    {
      id: 6,
      name: 'text_006.txt',
      status: '완료',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 일주일 전
    },
    {
      id: 7,
      name: 'text_007.txt',
      status: '완료',
      createdAt: new Date(Date.now() - 86400000 * 31).toISOString(), // 한달 전
    },
  ]);

  const handleDeleteCompleted = useCallback(() => {
    setTTSFiles((prev) => prev.filter((file) => file.status !== '완료'));
  }, []);

  const handleRetryFailed = useCallback(() => {
    setTTSFiles((prev) =>
      prev.map((file) => (file.status === '실패' ? { ...file, status: '대기' } : file))
    );
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <header className="h-[92px] border-b ">
        <div className="pt-3 px-6">
          <h1 className=" text-[14px] font-bold mb-2">My work status</h1>
          <div className="relative">
            <TTSDropdown
              files={ttsFiles}
              onDeleteCompleted={handleDeleteCompleted}
              onRetryFailed={handleRetryFailed}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Content Group */}
        <div className="flex-1 flex flex-col">
          {/* Main1 */}
          <section className="flex-1 ">
            <TTSMainContent />
          </section>

          {/* Main2 */}
          <section className="h-[145px] mx-6">
            <h2 className="text-[18px] font-semibold mb-2">전체 재생</h2>
            <AudioPlayer audioUrl={''} />
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[276px] flex-shrink-0 min-h-full">
          <TTSOptionsSidebar />
        </aside>
      </div>
    </div>
  );
};

export default TTSPage;
