export const MAX_FILE_SIZE = 1024 * 1024;

export const validateTextFile = (file: File) => {
  if (!file.name.toLowerCase().endsWith('.txt')) {
    throw new Error('txt 파일만 업로드 가능합니다.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('파일 크기는 1MB를 초과할 수 없습니다.');
  }
};
