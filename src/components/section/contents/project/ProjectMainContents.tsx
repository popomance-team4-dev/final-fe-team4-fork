import FileUploadAlert, { ALERT_MESSAGES } from '@/components/custom/guide/FileUploadPopup';
import { TableContents } from '@/components/custom/tables/project/common/TableContents';
import { Button } from '@/components/ui/button';

interface ProjectMainContentsItem {
  id: string;
  text: string;
  isSelected: boolean;
  fileName?: string;
  speed?: number;
  volume?: number;
  pitch?: number;
}

interface ProjectMainContentsProps {
  type: 'TTS' | 'VC' | 'CONCAT';
  items: ProjectMainContentsItem[];
  isAllSelected: boolean;
  showAlert?: boolean;
  onCloseAlert?: () => void;
  onSelectAll: () => void;
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: () => void;
  onRegenerateItem?: (id: string) => void;
  onDownloadItem?: (id: string) => void;
  onPlay: (id: string) => void;
}

const ProjectMainContents = ({
  type,
  items,
  isAllSelected,
  showAlert,
  onCloseAlert,
  onSelectAll,
  onSelectionChange,
  onTextChange,
  onDelete,
  onAdd,
  onRegenerateItem,
  onDownloadItem,
  onPlay,
}: ProjectMainContentsProps) => {
  const getAlertMessage = () => {
    switch (type) {
      case 'VC':
        return ALERT_MESSAGES.VC_UPLOAD_REQUIRED;
      case 'CONCAT':
        return ALERT_MESSAGES.CONCAT_UPLOAD_REQUIRED;
      default:
        return '';
    }
  };

  const getButtonText = () => `${type} 생성`;

  return (
    <>
      {showAlert && (
        <div className="flex relative">
          <FileUploadAlert message={getAlertMessage()} onClose={onCloseAlert!} />
        </div>
      )}

      <div className={`h-[580px] mt-6 overflow-hidden`}>
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
          type={type === 'TTS' ? undefined : type}
        />
      </div>

      <div className={`${type === 'TTS' ? 'mt-12' : 'mt-6'} text-center`}>
        <Button>{getButtonText()}</Button>
      </div>
    </>
  );
};

export default ProjectMainContents;
