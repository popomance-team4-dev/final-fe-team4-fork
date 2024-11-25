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

interface ProjectListTableItem {
  id: string;
  order: string;
  projectName: string;
  fileName: string;
  content: string;
  type: 'VC' | 'TTS' | 'CONCAT';
  status: '진행' | '대기중' | '실패' | '완료';
  createdAt: string;
}

interface ProjectListTableProps {
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

export function ProjectListTable({
  items,
  onPlay,
  onPause,
  currentPlayingId,
  isAllSelected,
  itemCount,
  onSelectAll,
  selectedItems,
  onSelectionChange,
}: ProjectListTableProps) {
  return (
    <Table>
      {/* Header */}
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="pl-6 w-[50px]">
            <Checkbox
              checked={itemCount > 0 && isAllSelected}
              onCheckedChange={(checked) => onSelectAll(checked as boolean)}
            />
          </TableHead>
          <TableHead className="pl-14 text-body3 text-black w-[100px]">목소리</TableHead>
          <TableHead className="text-body3 text-black w-[100px]">유형</TableHead>
          <TableHead className="text-body3 text-black w-[150px]">프로젝트명</TableHead>
          <TableHead className="text-body3 text-black w-[300px]">내용</TableHead>
          <TableHead className="pl-6 text-body3 text-black w-[150px]">업데이트 날짜</TableHead>
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
                {item.order}
              </div>
            </TableCell>
            <TableCell className="w-[100px]">
              <AudioBadge type={item.type} />
            </TableCell>
            <TableCell className="text-black w-[150px] text-left ">{item.projectName}</TableCell>
            <TableCell className="max-w-[300px] truncate text-left text-black">
              {item.content}
            </TableCell>
            <TableCell className="pl-6 w-[150px] text-gray-500">{item.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
