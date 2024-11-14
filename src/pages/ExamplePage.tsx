import { useCallback, useState } from 'react';
import { TbChevronRight } from 'react-icons/tb';

import { AudioPlayer } from '@/components/audio/AudioPlayer';
import {
  ApplyAllButton,
  ApplySelectionButton,
  DownloadButton,
  RecreateButton,
  ResetChangesButton,
  SaveButton,
  UploadButton,
} from '@/components/buttons/IconButton';
import Tooltip from '@/components/common/Tooltip';
import { TTSTable } from '@/components/tts/table/TTSTable';
import TTSDropdown, { TTSFile } from '@/components/tts/TTSdropdown';
import TTSOptionsSidebar from '@/components/tts/TTSOptionsSidebar';
import { Button } from '@/components/ui/button';
import { HistoryTable } from '@/components/workspace/HistoryTable';
import RecentProjectCard from '@/components/workspace/RecentProjectCard';

const ExamplePage = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      text: '안녕하세요',
      isSelected: false,
      speed: 1.0,
      volume: 60,
      pitch: 4.0,
    },
    {
      id: '2',
      text: '반갑습니다',
      isSelected: false,
      speed: 1.0,
      volume: 60,
      pitch: 4.0,
    },
  ]);

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

  // History 테이블을 위한 상태
  const [historyItems] = useState([
    {
      id: '1',
      order: '01',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오13.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'VC' as const,
      createdAt: '2024. 11. 12',
    },
    {
      id: '2',
      order: '02',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오13.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'TTS' as const,
      createdAt: '2024. 11. 12',
    },
    {
      id: '3',
      order: '03',
      projectName: '프로젝트1 발표자료',
      fileName: '오디오13.wav',
      content: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'CONCAT' as const,
      createdAt: '2024. 11. 12',
    },
  ]);

  const [currentPlayingId, setCurrentPlayingId] = useState<string>();

  const handleDeleteCompleted = useCallback(() => {
    setTTSFiles((prev) => prev.filter((file) => file.status !== '완료'));
  }, []);

  const handleRetryFailed = useCallback(() => {
    setTTSFiles((prev) =>
      prev.map((file) => (file.status === '실패' ? { ...file, status: '대기' } : file))
    );
  }, []);

  const isAllSelected = items.every((item) => item.isSelected);

  const handleSelectAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isSelected: !isAllSelected })));
  };

  const handleSelectionChange = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isSelected: !item.isSelected } : item))
    );
  };

  const handleTextChange = (id: string, newText: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, text: newText } : item)));
  };

  const handleDelete = useCallback(() => {
    setItems((prevItems) => prevItems.filter((item) => !item.isSelected));
  }, []);

  const handleRegenerateItem = useCallback((id: string) => {
    console.log('재생성 항목:', id);
  }, []);

  const handleDownloadItem = useCallback((id: string) => {
    console.log('다운로드 항목:', id);
  }, []);

  const handlePlay = (id: string) => setCurrentPlayingId(id);
  const handlePause = () => setCurrentPlayingId(undefined);

  return (
    <div className="p-8 space-y-28">
      {/* 버튼 컴포넌트 */}
      <section className="space-y-12">
        <h2 className="text-xl font-bold mb-4">버튼</h2>
        <div>
          {/* default */}
          <div className="flex flex-wrap gap-4">
            <Button>Button</Button>
            <Button disabled>Button</Button>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            {/* Secondary - Grey */}
            <Button variant="secondary">Button</Button>
            <Button variant="secondary" disabled>
              Button
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            {/* mid + icon */}
            <Button size="mid" icon>
              Button
            </Button>
            <Button size="mid" icon disabled>
              Button
            </Button>
            {/* icon */}
            <Button size="icon" />
            <Button size="icon" disabled />
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            <UploadButton />
            <SaveButton />
            <RecreateButton />
            <DownloadButton />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <ApplySelectionButton />
            <ApplyAllButton />
            <ResetChangesButton />
          </div>
        </div>
      </section>

      {/* 툴팁 컴포넌트 */}
      <section>
        <h2 className="text-xl font-bold mb-4">툴팁</h2>
        <Tooltip text="변경된 설정을 적용하려면 재생성 버튼을 눌러주세요!" />
      </section>

      {/* AudioPlayer 컴포넌트 */}
      <section>
        <h2 className="text-xl font-bold mb-4">오디오 플레이어</h2>
        <div className="w-1/2">
          <AudioPlayer audioUrl="/sample.mp3" />
        </div>
      </section>

      {/* 최근프로젝트 카드 컴포넌트 */}
      <section>
        <h2 className="text-xl font-bold mb-4">최근프로젝트</h2>
        <RecentProjectCard
          language={'KR'}
          type={'TTS'}
          title={'프로젝트1 발표자료'}
          description={
            'Lorem ipsum dolor sit amet consectetur. Pulvinar sed diam eu turpis vitae arcu pel'
          }
          date={'금요일 오후 7:24'}
          voice={''}
          hasPlayback={true}
        />
      </section>

      {/* TTS */}
      <section>
        <h2 className="text-xl font-bold mb-4">TTS</h2>
        <div className="flex">
          <div className="flex-1">
            <div>
              <TTSDropdown
                files={ttsFiles}
                onDeleteCompleted={handleDeleteCompleted}
                onRetryFailed={handleRetryFailed}
              />
            </div>
            <div className="w-[872px] h-[580px] border rounded-md overflow-hidden">
              <TTSTable
                items={items}
                isAllSelected={isAllSelected}
                onSelectAll={handleSelectAll}
                onSelectionChange={handleSelectionChange}
                onTextChange={handleTextChange}
                onDelete={handleDelete}
                onAdd={() => {
                  setItems((prev) => [
                    ...prev,
                    {
                      id: String(Date.now()),
                      text: '',
                      isSelected: false,
                      speed: 1.0,
                      volume: 60,
                      pitch: 4.0,
                    },
                  ]);
                }}
                onRegenerateItem={handleRegenerateItem}
                onDownloadItem={handleDownloadItem}
                onPlay={(id) => console.log('재생:', id)}
              />
            </div>
          </div>
          <TTSOptionsSidebar />
        </div>
      </section>

      {/* History 테이블 섹션 */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <h3 className="text-2xl font-bold leading-9">최근 내보내기</h3>
          <button onClick={() => console.log('전체 보기')} className="flex items-center text-black">
            <span className="text-sm mr-1">전체 보기</span>
            <TbChevronRight />
          </button>
        </div>
        <HistoryTable
          items={historyItems}
          currentPlayingId={currentPlayingId}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      </section>
    </div>
  );
};

export default ExamplePage;
