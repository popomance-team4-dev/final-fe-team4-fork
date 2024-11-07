import React from 'react';

import { Button } from '@/components/ui/CommonButton';
import { SaveButton, UploadButton } from '@/components/ui/IconButton';

const TTSMainContent: React.FC = () => {
  return (
    <div className="p-6 flex flex-col ">
      <h4 className="text-sm font-normal">텍스트 파일을 나만의 음성 파일로</h4>
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">TTS · 프로젝트 1</h2>
        <div className="flex gap-6">
          <UploadButton />
          <SaveButton />
        </div>
      </header>

      {/* 테이블 */}
      <div className="w-[872px] h-[580px] border rounded-md mt-8">
        {/* 리스트 상단 */}
        <div className="mb-4">{/* 상단 부분 추가 */}</div>

        {/* 리스트 콘텐츠 */}
        <div className="mb-4">{/* TTSListTable 리스트 추가 */}</div>

        {/* 리스트 하단 */}
        <div>{/* 하단 부분 추가 */}</div>
      </div>

      <div className="mt-6 text-center">
        <Button>TTS 생성</Button>
      </div>
    </div>
  );
};

export default TTSMainContent;
