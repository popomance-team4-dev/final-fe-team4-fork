/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbChevronDown, TbChevronUp, TbCircleFilled, TbRotate } from 'react-icons/tb';

import { taskAPI } from '@/api/taskAPI';
import { DeleteCompletedButton, RetryFailedButton } from '@/components/custom/buttons/IconButton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth.store';
import { useSSEConnection } from '@/utils/sseConnetion';

export interface FileProgressItem {
  id: number;
  name: string;
  status: '진행' | '대기' | '실패' | '완료';
  progress?: number;
  createdAt: string;
}

export interface FileProgressDropdownProps {
  items: FileProgressItem[];
  onDeleteCompleted?: () => void;
  onRetryFailed?: () => void;
}

const statusColorMap = {
  진행: 'text-green-500',
  대기: 'text-yellow-500',
  실패: 'text-red-500',
  완료: 'text-blue-500',
} as const;

const formatDateCategory = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays === 2) return '그저께';
  if (diffDays <= 7) return '일주일 전';
  return '한달 전';
};

const FileProgressDropdown: React.FC<FileProgressDropdownProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [items, setItems] = useState<FileProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();
  const memberId = user?.id;

  // SSE 훅 사용
  const taskUpdates = useSSEConnection(memberId?.toString() || '');

  // 상태 매핑 함수
  const getStatusMapping = (status: string): FileProgressItem['status'] => {
    switch (status) {
      case 'BLOCKED':
      case 'NEW':
      case 'WAITING':
        return '대기';
      case 'RUNNABLE':
        return '진행';
      case 'TERMINATED':
        return '완료';
      default:
        return '대기';
    }
  };

  useEffect(() => {
    if (!memberId) {
      console.error('사용자 ID를 찾을 수 없습니다.');
      return;
    }

    // 초기 작업 목록 로드
    const fetchInitialTasks = async () => {
      try {
        const loadedTasks = await taskAPI.loadTasks();
        const progressItems: FileProgressItem[] = loadedTasks.map((task) => ({
          id: task.id,
          name: `프로젝트 ${task.projectId}`,
          status: getStatusMapping(task.taskStatus),
          progress: task.taskStatus === 'RUNNABLE' ? 50 : undefined,
          createdAt: new Date().toISOString(),
        }));

        setItems(progressItems);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setIsLoading(false);
      }
    };

    fetchInitialTasks();
  }, [memberId]);

  // SSE 업데이트 처리
  useEffect(() => {
    if (taskUpdates.length > 0) {
      const latestUpdate = taskUpdates[taskUpdates.length - 1];
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === latestUpdate.id
            ? {
                ...item,
                status: getStatusMapping(latestUpdate.taskStatus),
                progress: latestUpdate.taskStatus === 'RUNNABLE' ? 50 : undefined,
              }
            : item
        )
      );
    }
  }, [taskUpdates]);

  // 파일 카테고리화
  const categorizedFiles = useMemo(() => {
    const grouped = items.reduce(
      (acc, file) => {
        const date = new Date(file.createdAt);
        const category = formatDateCategory(date);

        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(file);
        return acc;
      },
      {} as Record<string, FileProgressItem[]>
    );

    const categoryOrder = ['오늘', '어제', '그저께', '일주일 전', '한달 전'];

    return categoryOrder.reduce(
      (acc, category) => {
        if (grouped[category]) {
          acc[category] = grouped[category];
        }
        return acc;
      },
      {} as Record<string, FileProgressItem[]>
    );
  }, [items]);

  // 파일 상태 통계
  const fileStats = useMemo(() => {
    return items.reduce(
      (acc, file) => {
        acc[file.status] = (acc[file.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [items]);

  // 상태 토글 함수
  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  // 로딩 및 에러 상태 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      {/* 기존 드롭다운 렌더링 로직 그대로 유지 */}
      <div className="w-[504px] h-10 bg-background rounded-lg border border-gray-300 px-4 flex items-center justify-between">
        <div className="flex gap-4">
          {/* 상태별 배지 렌더링 */}
          {(['진행', '대기', '실패', '완료'] as const).map((status) => (
            <Badge key={status} variant={status as any}>
              <TbCircleFilled className="w-2 h-2 mr-2" />
              <span className="text-foreground text-sm font-medium">{status}</span>
              <div className="ml-2 bg-secondary rounded px-2 h-[18px] flex items-center">
                <span className="text-[#512A91] text-xs font-medium">{fileStats[status] || 0}</span>
              </div>
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:bg-gray-100 p-1 rounded transition-colors"
          >
            {isOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* 나머지 드롭다운 렌더링 로직도 그대로 유지 */}
      {isOpen && (
        <div className="absolute w-[504px] bg-background rounded-lg border border-gray-300 mt-2 z-50 shadow-md">
          {/* 필터 버튼 영역 */}
          <div className="h-10 border-b border-gray-300 flex items-center px-4">
            <div className="flex gap-2">
              {['진행', '대기', '실패', '완료'].map((status) => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`h-6 px-2 rounded text-sm font-medium transition-colors ${
                    selectedStatuses.includes(status)
                      ? 'bg-[#E2E8F0] text-[#512A91]'
                      : 'bg-secondary text-[#512A91]'
                  }`}
                >
                  {status}
                </button>
              ))}
              {/* 리셋 버튼 */}
              {selectedStatuses.length > 0 && (
                <button
                  onClick={() => setSelectedStatuses([])}
                  className="text-gray-500 ml-2"
                  title="필터 초기화"
                >
                  <TbRotate size={16} />
                </button>
              )}
            </div>
          </div>
          {/* 파일 목록 영역 */}
          <div className="p-4">
            {Object.entries(categorizedFiles).map(([category, categoryItems]) => {
              const filteredItems = categoryItems.filter(
                (item) => selectedStatuses.length === 0 || selectedStatuses.includes(item.status)
              );

              if (filteredItems.length === 0) return null;

              return (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-sm font-medium text-foreground mb-2">{category}</h3>
                  <div className="relative">
                    {filteredItems.length > 1 && (
                      <div
                        className="absolute left-1 top-3 bottom-3 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    {filteredItems.map((item) => (
                      <div key={item.id} className="flex items-center mb-3 last:mb-0 relative">
                        <TbCircleFilled
                          className={cn(`w-2 h-2 mr-3 z-10 `, statusColorMap[item.status])}
                        />
                        <div className="flex items-center flex-1">
                          <span className="text-sm font-medium text-foreground mr-2">
                            {item.name}
                          </span>
                          {item.status === '진행' ? (
                            <>
                              <span className="text-sm text-gray-500 mr-2">• TTS 변환 중</span>
                              <AiOutlineLoading3Quarters className="animate-spin text-green-500 mr-2" />
                              <span className="text-sm text-gray-500">{item.progress}%</span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {item.status === '대기' && '• TTS 대기 중'}
                              {item.status === '실패' && '• TTS 실패'}
                              {item.status === '완료' && '• TTS 변환 완료'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {/* 하단 버튼 영역 */}
          <div className="flex items-center justify-center gap-6 border-t border-gray-300 px-3 py-4">
            <DeleteCompletedButton />
            <RetryFailedButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileProgressDropdown;
