// 이모지와 특수문자 제거 (한글, 영문, 숫자, 기본 문장부호 유지)
const removeSpecialChars = (text: string): string => {
  return text
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[^\uAC00-\uD7A3a-zA-Z0-9.,!?\s]/g, '');
};

// 문장부호 정리 및 간격 조정
const cleanPunctuation = (text: string): string => {
  return text
    .replace(/[.]{2,}/g, '...')
    .replace(/[!]{2,}/g, '!!')
    .replace(/[?]{2,}/g, '??')
    .replace(/\s*([.,!?])\s*/g, '$1')
    .replace(/[!?]{2,}/g, '?!');
};

// 공백 정리 (탭 변환, 중복 제거, 앞뒤 공백 제거)
const cleanWhitespace = (text: string): string => {
  return text.replace(/\t/g, ' ').replace(/\s+/g, ' ').trim();
};

// 괄호 처리 (빈 괄호 제거, 괄호 안 문장 처리)
const handleParentheses = (text: string): string => {
  text = text.replace(/[({[][\s]*[)}\]]/g, '');

  return text.replace(/[({[]([^)}\]]+)[)}\]]/g, (_, content) => {
    if (!content.trim().match(/[.!?]$/)) {
      content += '.';
    }
    return content;
  });
};

export const parseText = (text: string): string[] => {
  // 줄바꿈 정리 및 텍스트 정제
  let cleanText = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');

  // 텍스트 정제 함수들 순차 적용
  cleanText = removeSpecialChars(cleanText);
  cleanText = handleParentheses(cleanText);
  cleanText = cleanPunctuation(cleanText);
  cleanText = cleanWhitespace(cleanText);

  if (!cleanText) {
    return [];
  }

  // 문장 단위로 분리
  const sentences: string[] = [];
  const sentencePattern = /[^.!?]+[.!?]+/g;
  const matches = cleanText.match(sentencePattern) || [];

  if (matches.length > 0) {
    sentences.push(...matches);
  } else {
    // 문장부호가 없는 경우 줄바꿈 기준으로 분리
    const lines = cleanText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length > 0) {
      sentences.push(...lines.map((line) => (line.match(/[.!?]$/) ? line : `${line}.`)));
    }
  }

  // 최종 공백 정리
  return sentences.map((sentence) => cleanWhitespace(sentence));
};
