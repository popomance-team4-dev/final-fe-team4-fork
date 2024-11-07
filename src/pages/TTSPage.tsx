import TTSMainContent from '@/components/tts/TTSMainContent';
import TTSOptionsSidebar from '@/components/tts/TTSOptionSidebar';
import { AudioPlayer } from '@/components/ui/AudioPlayer';

const TTSPage = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-200 h-[92px]">
        <h1>My work status</h1>
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
