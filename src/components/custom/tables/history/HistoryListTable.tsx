import { TbCircleFilled, TbDownload } from 'react-icons/tb';

import { PlayButton } from '@/components/custom/buttons/PlayButton';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface ProjectListTableItem {
  id: string;
  order: string;
  projectName: string;
  fileName: string;
  script: string;
  projectType: 'VC' | 'TTS' | 'CONCAT';
  status: '진행' | '대기중' | '실패' | '완료';
  updatedAt: string;
}

interface HistoryListTableProps {
  items: ProjectListTableItem[];
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
  currentPlayingId?: string;
  isAllSelected: boolean;
  itemCount: number;
  onSelectAll: (checked: boolean) => void;
  selectedItems: string[];
  onSelectionChange: (id: string, checked: boolean) => void;
}

const AudioBadge = ({ type }: { type: 'VC' | 'TTS' | 'CONCAT' }) => (
  <Badge variant={type.toLowerCase() as 'vc' | 'tts' | 'concat'}>{type}</Badge>
);

const StatusBadge = (status: '진행' | '대기중' | '실패' | '완료') => {
  const variantMap = {
    진행: 'progress',
    대기중: 'waiting',
    실패: 'failed',
    완료: 'completed',
  } as const;

  return (
    <div className="flex justify-start">
      <Badge variant={variantMap[status]}>
        <TbCircleFilled className="w-2 h-2 mr-2" />
        {status}
      </Badge>
    </div>
  );
};

export function HistoryListTable({
  items,
  onPlay,
  onPause,
  currentPlayingId,
  isAllSelected,
  itemCount,
  onSelectAll,
  selectedItems,
  onSelectionChange,
}: HistoryListTableProps) {
  return (
    <Table className="table-fixed w-full">
      {/* Header */}
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="pl-6 w-[50px]">
            <Checkbox
              checked={itemCount > 0 && isAllSelected}
              onCheckedChange={(checked) => onSelectAll(checked as boolean)}
            />
          </TableHead>
          <TableHead className="pl-16 text-body3 text-black w-[130px]">유형</TableHead>
          <TableHead className="text-body3 text-black w-[130px]">프로젝트명</TableHead>
          <TableHead className="text-body3 text-black w-[100px]">파일명</TableHead>
          <TableHead className="p-0 text-body3 text-black w-[300px]">내용</TableHead>
          <TableHead className="text-body3 text-black w-[60px] text-center">상태</TableHead>
          <TableHead className="text-body3 text-black w-[80px] text-center whitespace-nowrap">
            다운로드
          </TableHead>
          <TableHead className="text-body3 text-black w-[130px]">업데이트 날짜</TableHead>
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            data-state={currentPlayingId === item.id ? 'selected' : undefined}
            className="text-body2"
          >
            <TableCell className="pl-6 w-[50px] ">
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={(checked) => onSelectionChange(item.id, checked as boolean)}
              />
            </TableCell>
            <TableCell className="w-[100px] text-left">
              <div className="flex items-center gap-4">
                <PlayButton
                  isPlaying={currentPlayingId === item.id}
                  onPlay={() => onPlay(item.id)}
                  onPause={() => onPause(item.id)}
                />
                <AudioBadge type={item.projectType} />
              </div>
            </TableCell>

            <TableCell className="whitespace-nowrap">{item.projectName}</TableCell>
            <TableCell className="whitespace-nowrap">{item.fileName}</TableCell>
            <TableCell className="max-w-md p-0">
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">{item.script}</div>
            </TableCell>
            <TableCell>
              <div className="flex justify-center p-0 whitespace-nowrap">
                {StatusBadge(item.status)}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => console.log('다운로드:', item.id)}
                  aria-label="Download file"
                >
                  <TbDownload className="h-6 w-6" />
                </button>
              </div>
            </TableCell>
            <TableCell className="text-gray-700 whitespace-nowrap">{item.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
