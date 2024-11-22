import React, { useCallback, useRef } from 'react';
import { TbFileMusic, TbFolderPlus } from 'react-icons/tb';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
interface FileInfo {
  id: string;
  name: string;
  size: number;
}
interface FileUploadBoxProps {
  onUploadSuccess?: (file: FileInfo) => void;
  selectedFile?: FileInfo | null;
  mode?: 'upload' | 'display';
}
const FileUploadBox: React.FC<FileUploadBoxProps> = ({
  onUploadSuccess,
  selectedFile = null,
  mode = 'upload',
}) => {
  const [state, setState] = React.useState<'empty' | 'uploading' | 'completed'>('empty');
  const [progress, setProgress] = React.useState(0);
  const [file, setFile] = React.useState<FileInfo | null>(null);
  const [uploadingFile, setUploadingFile] = React.useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout>();
  React.useEffect(() => {
    if (mode === 'display') {
      setFile(selectedFile ?? null);
      setState(selectedFile ? 'completed' : 'empty');
    }
  }, [selectedFile, mode]);
  const formatFileSize = (size: number) => {
    const sizeInMB = size / (1024 * 1024);
    return sizeInMB < 0.1 ? '0.1' : sizeInMB.toFixed(1);
  };
  const resetUpload = useCallback(() => {
    setState('empty');
    setFile(null);
    setUploadingFile(null);
    setProgress(0);
  }, []);
  React.useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    };
  }, []);
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
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
              if (onUploadSuccess) {
                setTimeout(() => {
                  onUploadSuccess(newFile);
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
      }
    },
    [mode, onUploadSuccess, resetUpload]
  );
  const handleBoxClick = useCallback(() => {
    if (state === 'empty' && mode === 'upload') {
      fileInputRef.current?.click();
    }
  }, [state, mode]);
  const renderContent = () => {
    const contents = {
      empty: (
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 mt-5 flex items-center justify-center rounded bg-secondary">
            <TbFolderPlus className="w-5 h-5 text-foreground/60" />
          </div>
          <span className="mt-2 text-[11px] font-medium leading-[18px] text-foreground font-pretendard">
            {mode === 'upload' ? '음성 파일 추가' : '음성파일을 선택해주세요'}
          </span>
        </div>
      ),
      uploading: (
        <div className="flex items-center h-full px-4">
          <div className="flex-1 flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded bg-primary/10">
              <TbFileMusic size={24} className="text-primary" />
            </div>
            <div className="ml-3">
              <div className="text-[11px] font-medium text-foreground font-pretendard">
                {uploadingFile?.name}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-pretendard">
                <span>파일 업로드 중</span>
              </div>
            </div>
          </div>
          <div className="relative w-12 h-12 mr-4">
            <Spinner size={48} />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary">
              {progress}%
            </div>
          </div>
        </div>
      ),
      completed: (
        <div className="flex items-center h-full px-4">
          <div className="flex-1 flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded bg-primary/10">
              <TbFileMusic size={24} className="text-primary" />
            </div>
            <div className="ml-3">
              <div className="text-[11px] font-medium text-foreground font-pretendard">
                {file?.name}
              </div>
              <div className="text-[11px] text-muted-foreground font-pretendard">
                {file ? `${formatFileSize(file.size)} MB` : ''}
              </div>
            </div>
          </div>
        </div>
      ),
    };
    return contents[state];
  };
  return (
    <div className="w-[228px] h-[85px] flex-shrink-0">
      <div
        onClick={handleBoxClick}
        className={cn(
          'w-full h-full bg-background rounded-lg border border-input',
          state === 'empty' && mode === 'upload' && 'hover:bg-accent cursor-pointer'
        )}
      >
        {renderContent()}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};
export default FileUploadBox;
