import { TableContents } from '@/components/custom/tables/project/common/TableContents';
import { Button } from '@/components/ui/button';

interface TTSItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
}

interface TTSMainContentsProps {
  items: TTSItem[];
  isAllSelected: boolean;
  onSelectAll: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: () => void;
  onRegenerateItem: (id: string) => void;
  onDownloadItem: (id: string) => void;
  onPlay: (id: string) => void;
}

const TTSMainContents = ({
  items,
  isAllSelected,
  onSelectAll,
  onSelectionChange,
  onTextChange,
  onDelete,
  onAdd,
  onRegenerateItem,
  onDownloadItem,
  onPlay,
}: TTSMainContentsProps) => {
  return (
    <>
      <div className="h-[580px] mt-6 overflow-hidden">
        <TableContents
          items={items}
          isAllSelected={isAllSelected}
          onSelectAll={onSelectAll}
          onSelectionChange={onSelectionChange}
          onTextChange={onTextChange}
          onDelete={onDelete}
          onAdd={onAdd}
          onRegenerateItem={onRegenerateItem}
          onDownloadItem={onDownloadItem}
          onPlay={onPlay}
        />
      </div>

      <div className="mt-12 text-center">
        <Button>TTS 생성</Button>
      </div>
    </>
  );
};

export default TTSMainContents;
