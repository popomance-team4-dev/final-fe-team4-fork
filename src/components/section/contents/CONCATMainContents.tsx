import FileUploadAlert, { ALERT_MESSAGES } from '@/components/guide/FileUploadPopup';
import { TableContents } from '@/components/tables/common/TableContents';
import { Button } from '@/components/ui/button';

interface CONCATItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
  fileName: string;
}

interface CONCATMainContentsProps {
  items: CONCATItem[];
  showAlert: boolean;
  onCloseAlert: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: () => void;
  onPlay: (id: string) => void;
  onSelectAll: () => void;
  isAllSelected: boolean;
}

const CONCATMainContents = ({
  items,
  showAlert,
  onCloseAlert,
  onSelectionChange,
  onTextChange,
  onDelete,
  onAdd,
  onPlay,
  onSelectAll,
  isAllSelected,
}: CONCATMainContentsProps) => {
  return (
    <>
      {/* 팝업 창 */}
      <div className="flex relative">
        {showAlert && (
          <FileUploadAlert message={ALERT_MESSAGES.CONCAT_UPLOAD_REQUIRED} onClose={onCloseAlert} />
        )}
      </div>

      <div className="h-[580px] mt-6 overflow-hidden">
        <TableContents
          items={items}
          onSelectionChange={onSelectionChange}
          onTextChange={onTextChange}
          onDelete={onDelete}
          onAdd={onAdd}
          onPlay={onPlay}
          onSelectAll={onSelectAll}
          isAllSelected={isAllSelected}
          type="CONCAT"
        />
      </div>

      <div className="mt-6 text-center">
        <Button>CONCAT 생성</Button>
      </div>
    </>
  );
};

export default CONCATMainContents;
