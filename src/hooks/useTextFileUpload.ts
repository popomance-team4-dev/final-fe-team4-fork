import { useState } from 'react';

import { validateTextFile } from '@/utils/fileValidation';
import { parseText } from '@/utils/textParser';

interface UseTextFileUploadProps {
  onUploadSuccess: (texts: string[]) => void;
  onError: (error: string) => void;
}

export const useTextFileUpload = ({ onUploadSuccess, onError }: UseTextFileUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      validateTextFile(file);

      const text = await file.text();
      const sentences = parseText(text);

      if (sentences.length === 0) {
        throw new Error('처리할 수 있는 텍스트가 없습니다.');
      }

      onUploadSuccess(sentences);
    } catch (error) {
      onError(error instanceof Error ? error.message : '파일 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleFileUpload,
    isLoading,
  };
};
