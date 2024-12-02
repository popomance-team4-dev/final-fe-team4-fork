import React from 'react';

import { Button } from '@/components/ui/button';

interface SilenceControlProps {
  onAddSilence: () => void; // 선택된 구간을 무음으로 추가
}

export const SilenceControl: React.FC<SilenceControlProps> = ({ onAddSilence }) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-md border p-4">
      <Button variant="outline" onClick={onAddSilence} className="text-sm">
        선택 구간 무음 추가
      </Button>
      <p className="text-sm text-gray-500">
        * 파형에서 구간을 선택한 후 클릭하면 무음이 추가됩니다
      </p>
    </div>
  );
};
