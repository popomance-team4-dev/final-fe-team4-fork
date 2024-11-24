import React from 'react';
import { TbTrash, TbX } from 'react-icons/tb';

import { AudioPlayer } from '@/components/custom/feature/AudioPlayer';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose, DialogContent, DialogPortal } from '@/components/ui/dialog';

const AudioHistoryDialog = () => {
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const audioHistory = [
    { id: 1, time: '오늘 오전 11:30' },
    { id: 2, time: '오늘 오전 09:30' },
    { id: 3, time: '어제 오후 11:30' },
    { id: 4, time: '어제 오후 11:20' },
    { id: 5, time: '금요일 오전 11:30' },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(audioHistory.map((audio) => audio.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems((prev) => (checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)));
  };

  const handleDelete = () => {
    console.log('삭제된 아이템:', selectedItems);
    // 삭제 로직 추가
  };

  const isAllSelected = selectedItems.length === audioHistory.length;

  return (
    <DialogPortal>
      <DialogContent className="p-0 w-[789px]">
        {/* Header */}
        <div className="flex items-center p-6 border-b gap-3">
          <h2 className="text-body1 pl-9">전체 음성 생성 내역</h2>
          <span className="text-body1 text-gray-700">{audioHistory.length}</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center px-6 py-2 gap-3 border-b">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
          />
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-2 py-1 text-gray-700 hover:cursor-pointer"
            aria-label="선택된 항목 삭제"
          >
            <TbTrash className="w-5 h-5" />
            <span className="text-body2">삭제</span>
          </button>
        </div>

        {/* History List */}
        <div className="p-6 space-y-8">
          {audioHistory.map((audio) => (
            <div key={audio.id} className="flex items-center gap-3">
              <Checkbox
                checked={selectedItems.includes(audio.id)}
                onCheckedChange={(checked) => handleSelectItem(audio.id, checked as boolean)}
              />
              <div className="flex flex-col gap-1 ">
                {/* AudioPlayer Component */}
                <AudioPlayer audioUrl="" className="w-[705px]" />
                {/* Additional Info */}
                <div className="flex justify-between text-body4 text-gray-300">
                  <span>{audio.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DialogClose asChild>
          <button
            className="absolute right-6 top-6 flex items-center justify-center"
            aria-label="Close"
          >
            <TbX className="w-6 h-6" />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  );
};

export default AudioHistoryDialog;
