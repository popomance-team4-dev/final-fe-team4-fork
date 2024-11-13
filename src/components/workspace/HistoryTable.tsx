import { TbDownload } from 'react-icons/tb';

import { PlayButton } from '@/components/buttons/PlayButton';
import { AudioBadge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface HistoryItem {
  id: string;
  order: string;
  projectName: string;
  fileName: string;
  content: string;
  type: 'VC' | 'TTS' | 'CONCAT';
  createdAt: string;
}

interface HistoryTableProps {
  items: HistoryItem[];
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
  currentPlayingId?: string;
}

export function HistoryTable({ items, onPlay, onPause, currentPlayingId }: HistoryTableProps) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="border-t">
          <TableRow>
            <TableHead className="pl-[66px] bg-gray-50 font-bold text-gray-900">순서</TableHead>
            <TableHead className="bg-gray-50 font-bold text-gray-900">프로젝트명</TableHead>
            <TableHead className="bg-gray-50 font-bold text-gray-900">파일명</TableHead>
            <TableHead className="bg-gray-50 font-bold text-gray-900">내용</TableHead>
            <TableHead className="bg-gray-50 font-bold text-gray-900">유형</TableHead>
            <TableHead className="bg-gray-50 font-bold text-gray-900">다운로드</TableHead>
            <TableHead className="pl-[60px] bg-gray-50 font-bold text-gray-900">
              업데이트 날짜
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              data-state={currentPlayingId === item.id ? 'selected' : undefined}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-7">
                  <PlayButton
                    isPlaying={currentPlayingId === item.id}
                    onPlay={() => onPlay(item.id)}
                    onPause={() => onPause(item.id)}
                  />
                  {item.order}
                </div>
              </TableCell>
              <TableCell>{item.projectName}</TableCell>
              <TableCell>{item.fileName}</TableCell>
              <TableCell className="max-w-md truncate">{item.content}</TableCell>
              <TableCell>
                <AudioBadge type={item.type} />
              </TableCell>
              <TableCell>
                <div className="flex justify-start pl-3">
                  <button
                    onClick={() => console.log('다운로드:', item.id)}
                    aria-label="Download file"
                  >
                    <TbDownload className="h-6 w-6" />
                  </button>
                </div>
              </TableCell>
              <TableCell className="text-gray-700 pl-[60px]">{item.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
