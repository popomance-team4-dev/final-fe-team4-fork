import React, { useCallback, useEffect, useRef, useState } from 'react';

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

interface UseFileUploadBoxProps {
  maxSizeInMB: number;
  allowedTypes: AllowedFileType[];
  onSuccess?: (file: FileInfo) => void;
  mode?: 'upload' | 'display';
  selectedFile?: FileInfo | null;
}

interface UseFileUploadBoxReturn {
  state: 'empty' | 'uploading' | 'completed';
  progress: number;
  file: FileInfo | null;
  uploadingFile: File | null;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatFileSize: (size: number) => string;
  resetUpload: () => void;
}

export const useFileUploadBox = ({
  maxSizeInMB,
  allowedTypes,
  onSuccess,
  mode = 'upload',
  selectedFile = null,
}: UseFileUploadBoxProps): UseFileUploadBoxReturn => {
  const [state, setState] = useState<'empty' | 'uploading' | 'completed'>('empty');
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<FileInfo | null>(null);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (mode === 'display') {
      setFile(selectedFile);
      setState(selectedFile ? 'completed' : 'empty');
    }
  }, [selectedFile, mode]);

  useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    };
  }, []);

  const formatFileSize = useCallback((size: number) => {
    const sizeInMB = size / (1024 * 1024);
    return sizeInMB < 0.1 ? '0.1' : sizeInMB.toFixed(1);
  }, []);

  const resetUpload = useCallback(() => {
    setState('empty');
    setFile(null);
    setUploadingFile(null);
    setProgress(0);
    setIsLoading(false);
  }, []);

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

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      try {
        setIsLoading(true);
        validateFile(selectedFile);

        setState('uploading');
        setProgress(0);
        setUploadingFile(selectedFile);

        uploadIntervalRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 83) {
              if (uploadIntervalRef.current) {
                clearInterval(uploadIntervalRef.current);
              }

              const newFile: FileInfo = {
                id: Math.random().toString(36).slice(2),
                name: selectedFile.name,
                size: selectedFile.size,
              };

              setFile(newFile);
              setState('completed');
              setIsLoading(false);

              if (onSuccess) {
                setTimeout(() => {
                  onSuccess(newFile);
                }, 0);
              }

              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }

              if (mode === 'upload') {
                setTimeout(resetUpload, 3000);
              }

              return prev;
            }
            return prev + 10;
          });
        }, 500);
      } catch (error) {
        setIsLoading(false);
        alert(error instanceof Error ? error.message : '파일 업로드 중 오류가 발생했습니다.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [mode, onSuccess, resetUpload, validateFile]
  );

  return {
    state,
    progress,
    file,
    uploadingFile,
    isLoading,
    fileInputRef,
    handleFileSelect,
    formatFileSize,
    resetUpload,
  };
};
