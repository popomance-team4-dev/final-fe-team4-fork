import { useNavigate } from 'react-router-dom';

import { HistoryListTable } from '@/components/custom/tables/history/HistoryListTable';
import { ProjectListTable } from '@/components/custom/tables/history/ProjectListTable';
import TableToolbar from '@/components/custom/tables/history/TableToolbar';
import { TableContents } from '@/components/custom/tables/project/common/TableContents';
import { Button } from '@/components/ui/button';
import { ProjectListTableItem, TableItem } from '@/types/table';

export interface MainContentsItem extends TableItem {
  status?: '대기중' | '완료' | '실패' | '진행';
  fileName?: string;
  originalAudioUrl?: string;
  convertedAudioUrl?: string;
  order?: string;
  projectName?: string;
  script?: string;
  projectType?: 'VC' | 'TTS' | 'CONCAT';
  updatedAt?: string;
}

interface MainContentsProps {
  type: 'TTS' | 'VC' | 'CONCAT' | 'RECENT' | 'PROJECT';
  items: MainContentsItem[];
  isAllSelected: boolean;
  showAlert?: boolean;
  onCloseAlert?: () => void;
  onSelectAll: (checked?: boolean) => void;
  onSelectionChange: (id: string) => void;
  onTextChange?: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: (newItems?: TableItem[]) => void;
  onRegenerateItem?: (id: string) => void;
  onDownloadItem?: (id: string) => void;
  onPlay: (id: string) => void;
  onPause?: (id: string) => void;
  onReorder?: (newItems: MainContentsItem[]) => void;
  currentPlayingId?: string;
  itemCount?: number;
  totalItemsCount?: number;
  selectedItemsCount?: number;
  onSearch?: (searchTerm: string) => void;
  onFilter?: () => void;
  onFileUpload?: (files: FileList | null) => void;
  hasAudioFile?: boolean;
}

const MainContents = ({
  type,
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
  onPause,
  onReorder,
  currentPlayingId,
  itemCount,
  selectedItemsCount,
  onSearch,
  onFileUpload,
  hasAudioFile,
  totalItemsCount,
}: MainContentsProps) => {
  const getButtonText = () => `${type} 생성`;
  const navigate = useNavigate();

  const renderTable = () => {
    if (type === 'RECENT' || type === 'PROJECT') {
      return (
        <div className="mt-2 border rounded-md">
          <TableToolbar
            title={type === 'RECENT' ? '모든 히스토리 내역' : '모든 프로젝트'}
            totalItemsCount={totalItemsCount || 0}
            selectedItemsCount={selectedItemsCount || 0}
            onDelete={onDelete}
            onSearch={onSearch!}
          />
          <div>
            {type === 'RECENT' ? (
              <HistoryListTable
                onPlay={onPlay}
                onPause={onPause!}
                itemCount={itemCount!}
                isAllSelected={isAllSelected}
                onSelectAll={onSelectAll}
                selectedItems={items.filter((item) => item.isSelected).map((item) => item.id)}
                onSelectionChange={(id) => onSelectionChange(id)}
                items={items as ProjectListTableItem[]}
                currentPlayingId={currentPlayingId}
              />
            ) : (
              <ProjectListTable
                itemCount={itemCount!}
                isAllSelected={isAllSelected}
                onSelectAll={onSelectAll}
                selectedItems={items.filter((item) => item.isSelected).map((item) => item.id)}
                onSelectionChange={(id) => onSelectionChange(id)}
                items={
                  items.map((item) => ({
                    ...item,
                    onClick: () => {
                      if (item.projectType && item.id) {
                        const path = `/${item.projectType.toLowerCase()}/${item.id}`;
                        navigate(path); // 상세 페이지로 이동
                      }
                    },
                  })) as ProjectListTableItem[]
                }
                currentPlayingId={currentPlayingId}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className={`h-[580px] mt-6 overflow-hidden`}>
          <TableContents
            items={items}
            isAllSelected={isAllSelected}
            onSelectAll={onSelectAll}
            onSelectionChange={onSelectionChange}
            onTextChange={onTextChange!}
            onDelete={onDelete}
            onAdd={onAdd}
            onRegenerateItem={onRegenerateItem}
            onDownloadItem={onDownloadItem}
            onPlay={onPlay}
            onReorder={onReorder}
            type={type === 'TTS' ? undefined : type}
            onFileUpload={onFileUpload}
            hasAudioFile={hasAudioFile}
          />
        </div>
        <div className={`${type === 'TTS' ? 'mt-12' : 'mt-6'} text-center`}>
          <Button>{getButtonText()}</Button>
        </div>
      </>
    );
  };

  return renderTable();
};

export default MainContents;
