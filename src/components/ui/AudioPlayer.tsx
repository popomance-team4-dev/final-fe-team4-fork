'use client';

import * as React from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

import { PlayButton } from '@/components/ui/playButton';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioUrl: string;
  className?: string;
}

const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  ({ audioUrl, className }, ref) => {
    const waveformRef = React.useRef<HTMLDivElement>(null);
    const wavesurferRef = React.useRef<WaveSurfer | null>(null);

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [totalTime, setTotalTime] = React.useState(0);

    React.useEffect(() => {
      const controller = new AbortController(); // AbortController 생성
      const { signal } = controller; // signal을 비동기 작업에 전달

      let wavesurfer: WaveSurfer | null = null;

      const initWavesurfer = async () => {
        if (!waveformRef.current || signal.aborted) return;

        // WaveSurfer 설정 옵션
        const options: WaveSurferOptions = {
          container: waveformRef.current, // 파형을 그릴 컨테이너
          waveColor: '#c2d4ff', // 파형 색상
          progressColor: '#356ae7', // 재생 진행 색상
          cursorColor: 'transparent', // 커서 색상
          barWidth: 2, // 파형 바 너비
          barGap: 3, // 파형 바 간격
          height: 36, // 파형 높이
          normalize: true, // 파형 정규화 (진폭 균일화)
          interact: true, // 사용자 상호작용 활성화
          minPxPerSec: 30, // 초당 최소 픽셀 수 (파형 압축률)
          fillParent: true, // 부모 요소 크기에 맞춤
        };

        try {
          // WaveSurfer 인스턴스를 만들고 이벤트를 설정
          wavesurfer = WaveSurfer.create(options);
          wavesurferRef.current = wavesurfer;

          if (!signal.aborted) {
            // 오디오 파일 로드 시 전체 시간 설정
            wavesurfer.on('ready', () => {
              if (!signal.aborted) {
                const duration = wavesurfer?.getDuration() || 0;
                setTotalTime(duration);
              }
            });

            // 재생 중 현재 시간 업데이트
            wavesurfer.on('audioprocess', (time) => {
              if (!signal.aborted) {
                setCurrentTime(time);
              }
            });

            // 재생/일시정지/종료 상태 관리
            wavesurfer.on('play', () => !signal.aborted && setIsPlaying(true));
            wavesurfer.on('pause', () => !signal.aborted && setIsPlaying(false));
            wavesurfer.on('finish', () => {
              if (!signal.aborted) {
                setIsPlaying(false);
                setCurrentTime(0);
              }
            });

            // 오디오 파일 로드
            await wavesurfer.load(audioUrl);
          }
        } catch (error) {
          if (!signal.aborted) {
            console.error('Failed to initialize WaveSurfer:', error);
          }
        }
      };

      // WaveSurfer 초기화
      initWavesurfer();

      // cleanup 함수에서 AbortController를 통해 비동기 작업 취소
      return () => {
        controller.abort(); // 컴포넌트가 언마운트되면 AbortController 취소
        if (wavesurfer) {
          wavesurfer.unAll(); // 모든 이벤트 리스너 제거
          wavesurfer.destroy(); // WaveSurfer 인스턴스 제거
        }
        wavesurferRef.current = null;
      };
    }, [audioUrl]); // audioUrl이 변경될 때마다 재실행

    const handlePlayPause = () => {
      if (!wavesurferRef.current) return;

      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
    };

    const formatTime = (seconds: number): string => {
      if (!seconds) return '00:00';
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4 w-full bg-gray-50 rounded-lg px-4 py-6', className)}
      >
        <div className="flex items-center gap-4 shrink-0">
          <PlayButton isPlaying={isPlaying} onPlay={handlePlayPause} onPause={handlePlayPause} />
          <div className="text-sm text-black w-[45px]">{formatTime(currentTime)}</div>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <div ref={waveformRef} className="w-full h-[36px]" />
        </div>

        <div className="shrink-0">
          <div className="text-sm text-black w-[45px]">{formatTime(totalTime)}</div>
        </div>
      </div>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

export { AudioPlayer };
