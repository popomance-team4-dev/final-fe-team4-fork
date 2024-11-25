export const textSplitter = (text: string) => {
  return text.split(/\r?\n/).filter((line) => line.trim() !== '');
};
