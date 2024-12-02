import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko'); // 한국어 설정

export const formatUpdatedAt = (updatedAt: string): string => {
  const now = dayjs(); // 현재 시간
  const updatedTime = dayjs(updatedAt); // 업데이트 시간
  const diffInHours = now.diff(updatedTime, 'hour'); // 시간 차이 계산
  const diffInDays = now.diff(updatedTime, 'day'); // 일 차이 계산

  if (diffInHours < 1) {
    // 1시간 미만: 'n분 전'
    return updatedTime.fromNow();
  } else if (diffInDays < 1) {
    // 하루 미만: 'n시간 전'
    return updatedTime.fromNow();
  } else {
    // 하루 이상: 'MM월 DD일 오후 hh:mm'
    return updatedTime.format(`MM월 DD일 A hh:mm`).replace('AM', '오전').replace('PM', '오후');
  }
};
