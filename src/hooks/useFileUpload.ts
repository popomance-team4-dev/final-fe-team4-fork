import { useCallback, useState } from 'react';

export const ALLOWED_FILE_TYPES = {
  WAV: 'audio/wav',
  MP3: 'audio/mpeg',
  TEXT: 'text/plain',
} as const;

export const FILE_TYPES_TO_KOREAN = {
  [ALLOWED_FILE_TYPES.WAV]: 'WAV',
  [ALLOWED_FILE_TYPES.MP3]: 'MP3',
  [ALLOWED_FILE_TYPES.TEXT]: '텍스트',
} as const;

export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[keyof typeof ALLOWED_FILE_TYPES];

export interface FileInfo {
  id: string;
  name: string;
  size: number;
  isEditing?: boolean;
}

interface UseFileUploadProps<T> {
  maxSizeInMB: number;
  allowedTypes: AllowedFileType[];
  onSuccess: (files: T[]) => void;
  onError?: (error: string) => void;
}

export const useFileUpload = <T extends string | File>({
  maxSizeInMB,
  allowedTypes,
  onSuccess,
  onError,
}: UseFileUploadProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = useCallback(
    (file: File) => {
      if (file.size === 0) {
        throw new Error('빈 파일은 업로드할 수 없습니다!');
      }
      if (file.size > maxSizeInMB * 1024 * 1024) {
        throw new Error(`파일 크기는 ${maxSizeInMB}MB를 초과할 수 없습니다.`);
      }
      if (!allowedTypes.includes(file.type as AllowedFileType)) {
        const allowedTypeNames = allowedTypes.map((type) => FILE_TYPES_TO_KOREAN[type]).join(', ');
        throw new Error(`${allowedTypeNames} 파일만 업로드할 수 있습니다.`);
      }
    },
    [maxSizeInMB, allowedTypes]
  );

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
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
        if (onError) {
          onError(error instanceof Error ? error.message : '파일 업로드에 실패했습니다.');
        } else {
          alert(error instanceof Error ? error.message : '파일 업로드에 실패했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [validateFile, onSuccess, onError]
  );

  return { handleFiles, isLoading };
};
