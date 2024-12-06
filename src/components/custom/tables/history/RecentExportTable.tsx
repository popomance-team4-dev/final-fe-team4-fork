import { useCallback, useEffect, useState } from 'react';
import { TbChevronRight, TbCircleFilled, TbDownload } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { fetchRecentExports } from '@/api/workspaceAPI';
import { PlayButton } from '@/components/custom/buttons/PlayButton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface RecentExportTableItem {
  id: string;
  projectName: string;
  fileName: string;
  content: string;
  type: 'VC' | 'TTS' | 'Concat';
  unitStatus?: string;
  createdAt: string;
}

interface RecentExportTableProps {
  readonly onPlay: (id: string) => void;
  readonly onPause: (id: string) => void;
  readonly currentPlayingId?: string;
}

interface StatusBadgeProps {
  unitStatus: 'SUCCESS' | 'FAILURE';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ unitStatus }) => {
  const variantMap = {
    FAILURE: 'failed',
    SUCCESS: 'completed',
  } as const;

  const textMap = {
    FAILURE: '실패',
    SUCCESS: '완료',
  } as const;

  return (
    <div className="flex justify-start">
      <Badge variant={variantMap[unitStatus]}>
        <TbCircleFilled className="w-2 h-2 mr-2" />
        {textMap[unitStatus]}
      </Badge>
    </div>
  );
};

export function RecentExportTable({ onPlay, onPause, currentPlayingId }: RecentExportTableProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<RecentExportTableItem[]>([]);

  const AudioBadge = useCallback((type: 'VC' | 'TTS' | 'Concat') => {
    const variant = type.toLowerCase() as 'vc' | 'tts' | 'concat';
    return <Badge variant={variant}>{type}</Badge>;
  }, []);

  // 최근 내보내기 내역 호출
  useEffect(() => {
    const loadRecentExports = async () => {
      try {
        const data = await fetchRecentExports();
        if (!data || data.length === 0) {
          return;
        }
        setItems(data); // 매핑된 데이터를 그대로 설정
      } catch (err) {
        console.error(err);
      }
    };

    loadRecentExports();
  }, []);

  return (
    <div className="pt-6 h-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h3 className="text-h3">최근 내보내기</h3>
        <p
          onClick={() => navigate('/History')}
          className="text-black text-body2 flex items-center gap-1 cursor-pointer"
        >
          전체보기
          <TbChevronRight className="w-6 h-6" />
        </p>
      </div>
      <Table className="table-fixed w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="pl-16 text-body3 text-black w-[150px]">유형</TableHead>
            <TableHead className="text-body3 text-black w-[110px] truncate">프로젝트명</TableHead>
            <TableHead className="text-body3 text-black w-[100px]">파일명</TableHead>
            <TableHead className="p-0 text-body3 text-black w-[200px]">내용</TableHead>
            <TableHead className="text-body3 text-black w-[60px] text-center truncate">
              상태
            </TableHead>
            <TableHead className="text-body3 text-black w-[80px] text-center whitespace-nowrap">
              다운로드
            </TableHead>
            <TableHead className="text-body3 text-black w-[130px] truncate">
              업데이트 날짜
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.slice(0, 5).map((item, index) => (
            <TableRow
              key={`${item.id}-${index}`}
              data-state={currentPlayingId === item.id ? 'selected' : undefined}
            >
              <TableCell className="w-[100px] text-left">
                <div className="flex items-center gap-4">
                  <PlayButton
                    isPlaying={currentPlayingId === item.id}
                    onPlay={() => onPlay(item.id)}
                    onPause={() => onPause(item.id)}
                  />
                  {AudioBadge(item.type)}
                </div>
              </TableCell>

              <TableCell className="truncate text-left text-black">{item.projectName}</TableCell>
              <TableCell className="truncate text-left text-black">{item.fileName}</TableCell>
              <TableCell className="max-w-md p-0">
                <div className="truncate text-left text-black overflow-hidden text-ellipsis">
                  {item.content}
                </div>
              </TableCell>
              <TableCell className="pl-0">
                <div className="flex">
                  {item.unitStatus === 'SUCCESS' || item.unitStatus === 'FAILURE' ? (
                    <StatusBadge unitStatus={item.unitStatus} />
                  ) : null}
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
              <TableCell className="text-gray-700 whitespace-nowrap">{item.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
