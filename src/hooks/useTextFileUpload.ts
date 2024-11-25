import { useState } from 'react';

import { validateTextFile } from '@/utils/fileValidator';
import { parseText } from '@/utils/textParser';

interface UseTextFileUploadProps {
  onFileUpload: (texts: string[]) => void;
  onError: (error: string) => void;
}

export const useTextFileUpload = ({ onFileUpload, onError }: UseTextFileUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      setIsLoading(true);
      const file = files[0];
      validateTextFile(file);

      const text = await file.text();
      const sentences = parseText(text);

      if (sentences.length === 0) {
        throw new Error('처리할 수 있는 텍스트가 없습니다.');
      }

      onFileUpload(sentences);
    } catch (error) {
      onError(error instanceof Error ? error.message : '파일 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleFileChange,
    isLoading,
  };
};
