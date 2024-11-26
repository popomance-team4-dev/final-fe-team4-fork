import { useState } from 'react';

import { ERROR_MESSAGES } from '@/constants/messages';
import { FILE_CONSTANTS } from '@/constants/messages';
import { validateTextFile } from '@/utils/fileValidator';
import { parseText } from '@/utils/textParser';

interface UseTextFileUploadProps {
  onFileUpload: (texts: string[]) => void;
  onError: (error: string) => void;
}

export const useTextFileUpload = ({ onFileUpload, onError }: UseTextFileUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (files: FileList | null) => {
    if (!files) return;

    setIsLoading(true);

    try {
      const fileArray = Array.from(files);

      fileArray.forEach((file) => {
        if (file.size > FILE_CONSTANTS.MAX_FILE_SIZE) {
          throw new Error(
            `파일 크기는 ${FILE_CONSTANTS.MAX_FILE_SIZE / 1024 / 1024}MB를 초과할 수 없습니다.`
          );
        }
        validateTextFile(file);
      });

      const filePromises = fileArray.map(async (file) => {
        const text = await file.text();
        return text;
      });

      const texts = await Promise.all(filePromises);
      const sentences = texts.flatMap((text) => parseText(text));

      if (sentences.length === 0) {
        throw new Error(ERROR_MESSAGES.NO_PROCESSABLE_TEXT);
      }

      onFileUpload(sentences);
    } catch (error) {
      onError(error instanceof Error ? error.message : ERROR_MESSAGES.FILE_UPLOAD_FAILED);
      console.error('파일 처리 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleFileChange,
    isLoading,
  };
};
