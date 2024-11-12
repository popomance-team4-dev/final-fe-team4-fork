import React, { useMemo, useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { VscChevronDown, VscChevronUp, VscLoading } from 'react-icons/vsc';

import { DeleteCompletedButton, RetryFailedButton } from '@/components/ui/IconButton';

export interface TTSFile {
  id: number;
  name: string;
  status: '진행' | '대기' | '실패' | '완료';
  progress?: number;
  createdAt: string;
}

export interface TTSDropdownProps {
  files: TTSFile[];
  onDeleteCompleted?: () => void;
  onRetryFailed?: () => void;
}

const formatDateCategory = (date: Date): string => {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '오늘';
  }
  if (diffDays === 1) {
    return '어제';
  }
  if (diffDays === 2) {
    return '그저께';
  }
  if (diffDays <= 7) {
    return '일주일 전';
  }
  return '한달 전';
};

const TTSDropdown: React.FC<TTSDropdownProps> = ({ files }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState(['진행', '대기', '실패', '완료']);

  const categorizedFiles = useMemo(() => {
    const grouped = files.reduce(
      (acc, file) => {
        const date = new Date(file.createdAt);
        const category = formatDateCategory(date);

        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(file);
        return acc;
      },
      {} as Record<string, TTSFile[]>
    );

    const categoryOrder = ['오늘', '어제', '그저께', '일주일 전', '한달 전'];

    return categoryOrder.reduce(
      (acc, category) => {
        if (grouped[category]) {
          acc[category] = grouped[category];
        }
        return acc;
      },
      {} as Record<string, TTSFile[]>
    );
  }, [files]);

  const stats = useMemo(() => {
    return files.reduce(
      (acc, file) => {
        acc[file.status] = (acc[file.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [files]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(status)) {
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((s) => s !== status);
      }
      return [...prev, status];
    });
  };

  return (
    <div className="font-['Pretendard']">
      <div className="w-[504px] h-[40px] bg-white rounded-[8px] border border-[#C4C4C4] px-4 flex items-center justify-between">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <BsFillCircleFill className="w-2 h-2 text-green mr-2" />
            <span className="text-[#1B1B1B] text-[14px] font-medium leading-[20px]">진행</span>
            <div className="ml-2 bg-[#FAF7FF] px-2 rounded-[4px] h-[18px] flex items-center">
              <span className="text-[#512A91] text-[12px] font-medium leading-[18px]">
                {stats['진행'] || 0}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <BsFillCircleFill className="w-2 h-2 text-yellow-500 mr-2" />
            <span className="text-[#1B1B1B] text-[14px] font-medium leading-[20px]">대기</span>
            <div className="ml-2 bg-[#FAF7FF] px-2 rounded-[4px] h-[18px] flex items-center">
              <span className="text-[#512A91] text-[12px] font-medium leading-[18px]">
                {stats['대기'] || 0}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <BsFillCircleFill className="w-2 h-2 text-red-500 mr-2" />
            <span className="text-[#1B1B1B] text-[14px] font-medium leading-[20px]">실패</span>
            <div className="ml-2 bg-[#FAF7FF] px-2 rounded-[4px] h-[18px] flex items-center">
              <span className="text-[#512A91] text-[12px] font-medium leading-[18px]">
                {stats['실패'] || 0}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <BsFillCircleFill className="w-2 h-2 text-blue-500 mr-2" />
            <span className="text-[#1B1B1B] text-[14px] font-medium leading-[20px]">완료</span>
            <div className="ml-2 bg-[#FAF7FF] px-2 rounded-[4px] h-[18px] flex items-center">
              <span className="text-[#512A91] text-[12px] font-medium leading-[18px]">
                {stats['완료'] || 0}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#1B1B1B]">
          {isOpen ? <VscChevronUp size={20} /> : <VscChevronDown size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="w-[504px] bg-white rounded-[8px] border border-[#C4C4C4] mt-2">
          <div className="h-[40px] border-b border-[#C4C4C4] flex items-center px-4">
            <div className="flex gap-2">
              {['진행', '대기', '실패', '완료'].map((status) => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className={`h-[24px] px-2 rounded-[4px] text-[14px] font-medium leading-[20px] ${
                    selectedStatuses.includes(status)
                      ? 'bg-[#FAF7FF] text-[#512A91]'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            {Object.entries(categorizedFiles).map(([category, categoryFiles]) => {
              const filteredFiles = categoryFiles.filter((file) =>
                selectedStatuses.includes(file.status)
              );

              if (filteredFiles.length === 0) return null;

              return (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-[14px] font-medium leading-[20px] text-[#1B1B1B] mb-2">
                    {category}
                  </h3>
                  <div className="relative">
                    {filteredFiles.length > 1 && (
                      <div
                        className="absolute left-1 top-3 bottom-3 w-[1px] bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    {filteredFiles.map((file) => (
                      <div key={file.id} className="flex items-center mb-3 last:mb-0 relative">
                        <BsFillCircleFill
                          className={`w-2 h-2 mr-3 z-10 ${
                            file.status === '진행'
                              ? 'text-green'
                              : file.status === '대기'
                                ? 'text-yellow-500'
                                : file.status === '실패'
                                  ? 'text-red-500'
                                  : 'text-blue-500'
                          }`}
                        />
                        <div className="flex items-center flex-1">
                          <span className="text-[14px] font-medium leading-[20px] text-[#1B1B1B] mr-2">
                            {file.name}
                          </span>
                          {file.status === '진행' ? (
                            <>
                              <span className="text-[14px] leading-[20px] text-gray-500 mr-2">
                                • TTS 변환 중 {file.progress}%
                              </span>
                              <VscLoading className="animate-spin text-green" />
                            </>
                          ) : (
                            <span className="text-[14px] leading-[20px] text-gray-500">
                              {file.status === '대기' && '• TTS 대기 중'}
                              {file.status === '실패' && '• TTS 실패'}
                              {file.status === '완료' && '• TTS 변환 완료'}
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

          <div className="flex items-center justify-center gap-6 border-t border-[#C4C4C4] px-3 py-4">
            <DeleteCompletedButton />
            <RetryFailedButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default TTSDropdown;
