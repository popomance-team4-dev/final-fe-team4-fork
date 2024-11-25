export const validateTextFile = (file: File): boolean => {
  return file.type === 'text/plain' || file.name.endsWith('.txt');
};

export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: '텍스트(.txt) 파일만 업로드할 수 있습니다.',
  FILE_UPLOAD_FAILED: '파일 업로드에 실패했습니다. 다시 시도해주세요.',
} as const;
