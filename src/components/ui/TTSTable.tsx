import { CirclePlus, Download, RefreshCw, Trash2 } from 'lucide-react';
import * as React from 'react';

import { Checkbox } from '@/components/ui/CheckBox';
import { ScrollArea } from '@/components/ui/ScrollArea';

import { IconButton } from './IconButton';
import { Separator } from './Separator';
import { TtsListTable } from './TTSListTable';
import ViewButtonGroup from './ViewFilterButton';

interface TTSListItem {
  id: string;
  text: string;
  isSelected: boolean;
  speed: number;
  volume: number;
  pitch: number;
}

interface TableHeaderProps {
  onDelete: () => void;
  onAdd: () => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
}

interface TableFooterProps {
  selectedCount: number;
  onRegenerate: () => void;
  onDownload: () => void;
}

interface TTSTableProps {
  items: TTSListItem[];
  onSelectionChange: (id: string) => void;
  onTextChange: (id: string, newText: string) => void;
  onDelete: () => void;
  onAdd: () => void;
  onRegenerate: () => void;
  onDownload: () => void;
  onPlay: (id: string) => void;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onDelete,
  onAdd,
  onSelectAll,
  isAllSelected,
}) => (
  <div className="flex flex-col bg-white w-full max-w-4xl mx-auto">
    <div className="flex items-center justify-between px-4 py-5 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        <Checkbox checked={isAllSelected} onCheckedChange={onSelectAll} className="ml-2.5 mr-9" />
        <div onClick={onDelete} className="flex items-center gap-2 py-2 hover:cursor-pointer">
          <Trash2 className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-800">삭제</span>
        </div>
        <Separator orientation="vertical" className="h-6 mr-2" />
        <div onClick={onAdd} className="flex items-center gap-2 py-2 hover:cursor-pointer">
          <CirclePlus className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-800">텍스트 추가</span>
        </div>
      </div>
      <ViewButtonGroup />
    </div>
    <div className="grid grid-cols-[auto,auto,1fr,auto] px-4 py-3 border-b border-gray-300 bg-gray-50 text-sm font-medium text-black">
      <div className="w-4 ml-2 mr-2" />
      <div className="w-4 ml-2 mr-2" />
      <div className="ml-6">텍스트</div>
      <div className="w-[246px] flex gap-4.5">
        <div className="w-[64px] text-center">속도</div>
        <div className="w-[80px] text-center">볼륨</div>
        <div className="w-[60px] text-center">피치</div>
      </div>
    </div>
  </div>
);

const TableFooter: React.FC<TableFooterProps> = ({ selectedCount, onRegenerate, onDownload }) => (
  <div className="w-full max-w-4xl mx-auto">
    <div className="flex items-center justify-between px-4 py-5 border-t border-gray-300 bg-white">
      <div className="text-sm text-black font-medium ml-2">선택 항목: {selectedCount}</div>
      <div className="flex items-center space-x-2 mr-2">
        <IconButton
          icon={<RefreshCw />}
          label="재생성"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
          width="90px"
          onClick={onRegenerate}
        />
        <IconButton
          icon={<Download />}
          label="다운로드"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
          width="104px"
          onClick={onDownload}
        />
      </div>
    </div>
  </div>
);

export const TTSTable: React.FC<TTSTableProps> = ({
  items,
  onSelectionChange,
  onTextChange,
  onDelete,
  onAdd,
  onRegenerate,
  onDownload,
  onPlay,
  onSelectAll,
  isAllSelected,
}) => {
  const selectedCount = items.filter((item) => item.isSelected).length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col rounded-lg border border-gray-300 overflow-hidden bg-white">
      <TableHeader
        onDelete={onDelete}
        onAdd={onAdd}
        onSelectAll={onSelectAll}
        isAllSelected={isAllSelected}
      />
      <div className="relative flex-1">
        <ScrollArea className="h-[400px] absolute inset-0 pl-0.5 mr-0.5 my-0.5">
          <div className="flex-1">
            <TtsListTable
              rows={items.map((item) => ({
                id: item.id,
                text: item.text,
                isSelected: item.isSelected,
                onPlay: () => onPlay(item.id),
                speed: item.speed,
                volume: item.volume,
                pitch: item.pitch,
                onSelectionChange,
                onTextChange,
              }))}
              onSelectionChange={onSelectionChange}
              onTextChange={onTextChange}
            />
          </div>
        </ScrollArea>
      </div>
      <TableFooter
        selectedCount={selectedCount}
        onRegenerate={onRegenerate}
        onDownload={onDownload}
      />
    </div>
  );
};
