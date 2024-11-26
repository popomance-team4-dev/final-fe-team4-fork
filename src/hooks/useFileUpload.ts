import { useState } from 'react';

export const ALLOWED_FILE_TYPES = {
  TEXT: 'text/plain',
  WAV: 'audio/wav',
  MP3: 'audio/mp3',
} as const;

export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[keyof typeof ALLOWED_FILE_TYPES];

const FILE_TYPES_TO_KOREAN = {
  'text/plain': '텍스트(.txt)',
  'audio/wav': '오디오(.wav)',
  'audio/mp3': '오디오(.mp3)',
};

interface UseFileUploadProps<T> {
  maxSizeInMB: number;
  allowedTypes: AllowedFileType[];
  onSuccess: (files: T[]) => void;
  onError: (error: string) => void;
}

export const useFileUpload = <T extends string | File>({
  maxSizeInMB,
  allowedTypes,
  onSuccess,
  onError,
}: UseFileUploadProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = (file: File) => {
    if (file.size === 0) {
      throw new Error('빈 파일은 업로드할 수 없습니다!');
    }
    if (file.size > maxSizeInMB * 1024 * 1024) {
      throw new Error(`파일 크기는 ${maxSizeInMB}MB를 초과할 수 없습니다.`);
    }
    if (!allowedTypes.includes(file.type as AllowedFileType)) {
      throw new Error(`${FILE_TYPES_TO_KOREAN[allowedTypes[0]]} 파일만 업로드할 수 있습니다.`);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    if (Array.from(files).some((file) => file.size === 0)) return;
    setIsLoading(true);

    try {
      const fileArray = Array.from(files);
      fileArray.forEach(validateFile);

      const result: T[] = [];

      for (const file of fileArray) {
        if (file.type === ALLOWED_FILE_TYPES.TEXT) {
          const text = await file.text();
          result.push(text as T);
        } else if (file.type === ALLOWED_FILE_TYPES.WAV || file.type === ALLOWED_FILE_TYPES.MP3) {
          result.push(file as T);
        }
      }

      onSuccess(result);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'File upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFiles, isLoading };
};
