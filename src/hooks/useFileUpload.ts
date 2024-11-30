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

interface UseFileUploadOptions<T> {
  maxSizeInMB: number;
  allowedTypes: AllowedFileType[];
  onSuccess: (result: T[]) => void;
  onError?: (error: string) => void;
  multiple?: boolean; // 다중 파일 업로드 허용 여부
  accept?: string; // input accept 속성
  type?: 'audio' | 'text'; // 파일 타입에 따른 처리 구분
}

export const useFileUpload = <T>({
  maxSizeInMB,
  allowedTypes,
  onSuccess,
  onError,
  multiple = true,
  accept,
  type = 'audio',
}: UseFileUploadOptions<T>) => {
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
          if (type === 'text' && file.type === ALLOWED_FILE_TYPES.TEXT) {
            const text = await file.text();
            result.push(text as T);
          } else if (
            type === 'audio' &&
            (file.type === ALLOWED_FILE_TYPES.WAV || file.type === ALLOWED_FILE_TYPES.MP3)
          ) {
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
    [validateFile, onSuccess, onError, type]
  );

  const openFileDialog = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = multiple;
    input.accept = accept || allowedTypes.join(',');
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      handleFiles(files);
    };
    input.click();
  }, [multiple, accept, allowedTypes, handleFiles]);

  return {
    handleFiles,
    openFileDialog,
    isLoading,
  };
};

interface AudioUploadResult {
  id: string;
  text: string;
  isSelected: boolean;
  fileName: string;
  status: '대기중' | '완료' | '실패' | '진행';
  originalAudioUrl: string;
}

interface FileUploadConfig {
  audio: {
    maxSizeInMB: number;
    allowedTypes: [typeof ALLOWED_FILE_TYPES.WAV, typeof ALLOWED_FILE_TYPES.MP3];
    accept: 'audio/*';
  };
  text: {
    maxSizeInMB: number;
    allowedTypes: [typeof ALLOWED_FILE_TYPES.TEXT];
    accept: '.txt';
  };
}

const CONFIG: FileUploadConfig = {
  audio: {
    maxSizeInMB: 10,
    allowedTypes: [ALLOWED_FILE_TYPES.WAV, ALLOWED_FILE_TYPES.MP3],
    accept: 'audio/*',
  },
  text: {
    maxSizeInMB: 5,
    allowedTypes: [ALLOWED_FILE_TYPES.TEXT],
    accept: '.txt',
  },
} as const;

export const useAudioUpload = (
  onSuccess: (items: AudioUploadResult[]) => void,
  onError: (error: string) => void
) => {
  return useFileUpload<File>({
    ...CONFIG.audio,
    type: 'audio',
    onSuccess: (files) => {
      const newItems = files.map((file) => ({
        id: crypto.randomUUID(),
        text: '',
        isSelected: false,
        fileName: file.name,
        status: '대기중' as const,
        originalAudioUrl: URL.createObjectURL(file),
      }));
      onSuccess(newItems);
    },
    onError,
  });
};

export const useTextUpload = (onSuccess: (texts: string[]) => void) => {
  return useFileUpload<string>({
    ...CONFIG.text,
    type: 'text',
    onSuccess,
  });
};
