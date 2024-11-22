import { useCallback, useState } from 'react';

import { AudioPlayer } from '@/components/feature/AudioPlayer';
import FileUploadAlert, { ALERT_MESSAGES } from '@/components/guide/FileUploadPopup';
import ProjectTitle from '@/components/section/contents/ProjectTitle';
import VCOptionsSidebar from '@/components/section/sidebar/VCOptionsSidebar';
import { TableContents } from '@/components/tables/common/TableContents';
import { Button } from '@/components/ui/button';

interface VCItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
  fileName: string;
}

const VCPage = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [items, setItems] = useState<VCItem[]>([
    {
      id: '1',
      text: '',
      isSelected: false,
      speed: 1.0,
      volume: 1.0,
      pitch: 1.0,
      fileName: 'sample1.wav',
    },
  ]);

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

  const handleAdd = useCallback(() => {
    const newItem: VCItem = {
      id: `${items.length + 1}`,
      text: '',
      isSelected: false,
      speed: 1.0,
      volume: 1.0,
      pitch: 1.0,
      fileName: `new_file_${items.length + 1}.wav`,
    };
    setItems((prev) => [...prev, newItem]);
  }, [items.length]);

  const handlePlay = useCallback((id: string) => {
    console.log('Play item:', id);
  }, []);

  const handleSelectAll = useCallback(() => {
    const isAllSelected = items.every((item) => item.isSelected);
    setItems((prev) => prev.map((item) => ({ ...item, isSelected: !isAllSelected })));
  }, [items]);

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
                type="VC"
                projectTitle="프로젝트 1"
                onSave={() => console.log('저장')}
                onClose={() => console.log('닫기')}
              />
            </div>

            {/* 팝업 창 */}
            <div className="flex relative">
              {showAlert && (
                <FileUploadAlert
                  message={ALERT_MESSAGES.VC_UPLOAD_REQUIRED}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>

            <div className="h-[580px] mt-6 overflow-hidden">
              <TableContents
                items={items}
                onSelectionChange={handleSelectionChange}
                onTextChange={handleTextChange}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onPlay={handlePlay}
                onSelectAll={handleSelectAll}
                isAllSelected={items.every((item) => item.isSelected)}
                type="VC"
              />
            </div>

            <div className="mt-6 text-center">
              <Button>VC 생성</Button>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[276px] flex-shrink-0">
          <VCOptionsSidebar />
        </aside>
      </div>

      {/* Playback */}
      <section className="h-[92px] px-6">
        <AudioPlayer audioUrl={''} />
      </section>
    </div>
  );
};

export default VCPage;
