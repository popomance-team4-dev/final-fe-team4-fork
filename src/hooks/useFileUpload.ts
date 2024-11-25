import { useState } from 'react';

export const ALLOWED_FILE_TYPES = {
  TEXT: 'text/plain',
  WAV: 'audio/wav',
  MP3: 'audio/mp3',
} as const;

export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[keyof typeof ALLOWED_FILE_TYPES];

interface UseFileUploadProps {
  maxSizeInMB: number;
  allowedTypes: AllowedFileType[];
  onSuccess: (texts: string[]) => void;
  onError: (error: string) => void;
}

export const useFileUpload = ({
  maxSizeInMB,
  allowedTypes,
  onSuccess,
  onError,
}: UseFileUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = (file: File) => {
    if (file.size > maxSizeInMB * 1024 * 1024) {
      throw new Error(`파일 크기는 ${maxSizeInMB}MB 까지만 업로드 가능합니다!`);
    }
    if (!allowedTypes.includes(file.type as AllowedFileType)) {
      throw new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setIsLoading(true);

    try {
      const fileArray = Array.from(files);
      fileArray.forEach(validateFile);

      const texts = await Promise.all(fileArray.map((file) => file.text()));

      onSuccess(texts);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'File upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFiles, isLoading };
};
