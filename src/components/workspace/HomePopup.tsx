import { useState } from 'react';
import { TbX } from 'react-icons/tb';

import HomePopupBg from '@/images/HomePopupbg.svg';

import HomeCard from './HomeCard';

const HomePopup = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="relative w-[1148px] h-[451px] rounded-xl bg-background flex-shrink-0"
      style={{
        backgroundImage: `url(${HomePopupBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-6 top-6 hover:text-muted-foreground transition-colors"
      >
        <TbX className="w-6 h-6" />
      </button>

      {/* Text Content */}
      <h2 className="absolute left-6 top-[46px] text-2xl font-bold leading-9">
        AI 기술이 만든 스마트한 음성 솔루션
      </h2>
      <p className="absolute left-6 top-[88px] text-base font-medium leading-6">
        오디오 작업의 새로운 경험. 지금 시작해 보세요!
      </p>

      {/* Cards Container */}
      <div className="absolute left-6 top-[152px] flex gap-4">
        <HomeCard
          title="Text to Speech"
          description1="텍스트 파일 업로드로"
          description2="다양한 스타일의 음성 생성"
          number="01"
        />
        <HomeCard
          title="Voice Conversion"
          description1="다양한 음성 샘플을 사용하여"
          description2="원하는 음색으로 변환"
          number="02"
        />
        <HomeCard
          title="Concat"
          description1="다양한 오디오 파일을"
          description2="하나로 연결"
          number="03"
        />
      </div>
    </div>
  );
};

export default HomePopup;
