import React, { useCallback, useEffect, useState } from 'react';
import { TbFileMusic, TbFolderPlus } from 'react-icons/tb';

import KebabMenu from '@/components/custom/dropdowns/KebabMenu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { ALLOWED_FILE_TYPES, FileInfo, useFileUploadBox } from '@/hooks/useFileUpload';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'voice_files';

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
  // 로컬 스토리지에서 파일 목록을 불러오거나 초기 더미 데이터 사용
  const [files, setFiles] = useState<FileInfo[]>(() => {
    const savedFiles = localStorage.getItem(STORAGE_KEY);
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [activeFile, setActiveFile] = useState<FileInfo | null>(null);

  // 파일 목록이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  const {
    state,
    progress,
    file,
    uploadingFile,
    isLoading,
    fileInputRef,
    handleFileSelect,
    formatFileSize,
    resetUpload,
  } = useFileUploadBox({
    maxSizeInMB: 10,
    allowedTypes: [ALLOWED_FILE_TYPES.WAV, ALLOWED_FILE_TYPES.MP3],
    onSuccess: (newFile) => {
      setFiles((prev) => [newFile, ...prev]);
      if (onUploadSuccess) {
        onUploadSuccess(newFile);
      }
    },
    mode,
    selectedFile,
  });

  const handleBoxClick = useCallback(() => {
    if (state === 'empty' && mode === 'upload') {
      fileInputRef.current?.click();
    }
  }, [state, mode, fileInputRef]);

  const handleFileItemSelect = (file: FileInfo) => {
    if (activeFile?.id === file.id) {
      resetUpload();
      setActiveFile(null);
      return;
    }
    setActiveFile(file);
    if (onUploadSuccess) {
      onUploadSuccess(file);
    }
  };

  const handleStartRename = (fileId: string) => {
    setFiles(
      files.map((file) => ({
        ...file,
        isEditing: file.id === fileId,
      }))
    );
  };

  const handleRename = (fileId: string, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newName = (event.target as HTMLInputElement).value;
      setFiles(
        files.map((file) => ({
          ...file,
          name: file.id === fileId ? newName : file.name,
          isEditing: false,
        }))
      );
      if (activeFile?.id === fileId) {
        setActiveFile((prev) => (prev ? { ...prev, name: newName } : null));
      }
    }
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId));
    if (activeFile?.id === fileId) {
      setActiveFile(null);
      resetUpload();
    }
  };

  const FileListItem = ({ file }: { file: FileInfo }) => (
    <div
      className={`flex items-center justify-between h-[61px] px-3
        border-b border-gray-300 bg-background cursor-pointer
        hover:bg-accent active:bg-muted
        ${activeFile?.id === file.id ? 'bg-muted' : ''}`}
      onClick={() => handleFileItemSelect(file)}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-4 h-4 text-primary">
          <TbFileMusic size={16} />
        </div>
        <div className="flex-1">
          {file.isEditing ? (
            <input
              type="text"
              defaultValue={file.name}
              className="w-full text-[11px] font-medium px-1 py-0.5 border border-input rounded"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => handleRename(file.id, e)}
              autoFocus
            />
          ) : (
            <div className="text-[11px] font-medium text-foreground">{file.name}</div>
          )}
          <div className="text-[11px] text-muted-foreground">{formatFileSize(file.size)} MB</div>
        </div>
      </div>
      <KebabMenu
        onRename={() => handleStartRename(file.id)}
        onDelete={() => handleDelete(file.id)}
      />
    </div>
  );

  const renderContent = () => {
    const contents = {
      empty: (
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 mt-5 flex items-center justify-center rounded bg-secondary">
            {isLoading ? (
              <Spinner size={20} className="text-foreground/60" />
            ) : (
              <TbFolderPlus className="w-5 h-5 text-foreground/60" />
            )}
          </div>
          <span className="mt-2 text-[11px] font-medium leading-[18px] text-foreground font-pretendard">
            {isLoading
              ? '파일을 처리하는 중...'
              : mode === 'upload'
                ? '음성 파일 추가'
                : '음성파일을 선택해주세요'}
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
    <div className="flex flex-col space-y-4">
      <div className="w-[228px] h-[85px] flex-shrink-0">
        <div
          onClick={handleBoxClick}
          className={cn(
            'w-full h-full bg-background rounded-lg border border-input',
            state === 'empty' && mode === 'upload' && 'hover:bg-accent cursor-pointer'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          {renderContent()}
        </div>
      </div>
      <ScrollArea className="border-t border-gray-300 h-[300px]">
        {files.map((file) => (
          <FileListItem key={file.id} file={file} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default FileUploadBox;
