'use client';

import { throttle } from 'lodash';
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
      const controller = new AbortController();
      const { signal } = controller;

      let wavesurfer: WaveSurfer | null = null;

      const initWavesurfer = async () => {
        if (!waveformRef.current || signal.aborted) return;

        const options: WaveSurferOptions = {
          container: waveformRef.current,
          waveColor: '#c2d4ff',
          progressColor: '#356ae7',
          cursorColor: 'transparent',
          barWidth: 2,
          barGap: 3,
          height: 36,
          normalize: true,
          interact: true,
          minPxPerSec: 30,
          fillParent: true,
        };

        try {
          wavesurfer = WaveSurfer.create(options);
          wavesurferRef.current = wavesurfer;

          if (!signal.aborted) {
            wavesurfer.on('ready', () => {
              if (!signal.aborted) {
                const duration = wavesurfer?.getDuration() || 0;
                setTotalTime(duration);
              }
            });

            const handleAudioProcess = throttle((time: number) => {
              if (!signal.aborted) {
                setCurrentTime(time);
              }
            }, 250);

            wavesurfer.on('audioprocess', handleAudioProcess);

            wavesurfer.on('play', () => !signal.aborted && setIsPlaying(true));
            wavesurfer.on('pause', () => !signal.aborted && setIsPlaying(false));
            wavesurfer.on('finish', () => {
              if (!signal.aborted) {
                setIsPlaying(false);
                setCurrentTime(0);
              }
            });

            await wavesurfer.load(audioUrl);
          }
        } catch (error) {
          if (!signal.aborted) {
            console.error('Failed to initialize WaveSurfer:', error);
          }
        }
      };

      initWavesurfer();

      return () => {
        controller.abort();
        if (wavesurfer) {
          wavesurfer.unAll();
          wavesurfer.destroy();
        }
        wavesurferRef.current = null;
      };
    }, [audioUrl]);

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
