import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FastForward } from 'lucide-react';

interface WaveformPlayerProps {
  audioUrl: string;
  title: string;
  subtitle: string;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ audioUrl, title, subtitle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleAudioEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleAudioEnded);

    audio.load();

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // HIGH FIDELITY LIQUID WAVEFORM VISUALIZATION (BEZIER-BASED)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    const height = (canvas.height = 90);

    const barCount = 70;
    const bars: { h: number; targetH: number; speed: number }[] = Array.from({ length: barCount }, () => {
      const h = Math.random() * 45 + 5;
      return {
        h,
        targetH: h,
        speed: Math.random() * 0.15 + 0.05
      };
    });

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const spacing = 3;
      const barWidth = (width - spacing * barCount) / barCount;
      const progressPercent = currentTime / (duration || 1);

      // Draw dual-sided bars (top & bottom reflection)
      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + spacing);
        const bar = bars[i];

        // Organic sin-wave motion if playing
        if (isPlaying) {
          bar.targetH = (Math.sin(i * 0.15 + time) * 20 + 25) + (Math.cos(i * 0.3 - time) * 10);
        } else {
          // Flatten slightly when paused
          bar.targetH = bar.h * 0.5;
        }

        // LERP height to smooth transition
        bar.h += (bar.targetH - bar.h) * 0.1;

        const isPlayed = (i / barCount) <= progressPercent;

        // Custom gradient for played section vs unplayed section
        const grad = ctx.createLinearGradient(x, (height - bar.h) / 2, x, (height + bar.h) / 2);
        if (isPlayed) {
          grad.addColorStop(0, '#66fcf1');
          grad.addColorStop(0.5, '#45f3ff');
          grad.addColorStop(1, '#00f2fe');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        }

        ctx.fillStyle = grad;

        // Draw symmetric rounded capsules
        ctx.beginPath();
        ctx.roundRect(x, (height - bar.h) / 2, barWidth, bar.h, barWidth / 2);
        ctx.fill();
      }

      time += 0.08;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log('Audio playback failed:', err));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const resetTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="glass-panel p-6 flex flex-col space-y-5 border border-white/5 bg-[#141829]/60 backdrop-blur-md relative overflow-hidden rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#66fcf1]/5 rounded-full blur-2xl pointer-events-none" />
      
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      {/* Track info Header */}
      <div className="space-y-1 text-left">
        <h4 className="text-sm font-bold text-white tracking-wide truncate">{title}</h4>
        <p className="text-[10px] text-text-secondary font-mono tracking-wider uppercase">{subtitle}</p>
      </div>

      {/* Fluid waveform */}
      <div className="w-full h-24 relative flex items-center justify-center bg-black/30 rounded-xl overflow-hidden px-4 border border-white/5">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Seeker Slider */}
      <div className="space-y-1.5">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#66fcf1] outline-none"
        />
        <div className="flex justify-between text-[10px] text-text-secondary font-mono tracking-widest">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Seeker Control row */}
      <div className="flex items-center justify-between pt-1">
        
        {/* Playback configuration */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetTrack}
            className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer transition-colors"
            title="Reset Track"
          >
            <RotateCcw size={14} />
          </button>
          
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-white/5 bg-white/5 text-[9px] font-bold font-mono tracking-wider cursor-pointer hover:bg-white/10 text-accent-cyan transition-colors"
            title="Playback Speed"
          >
            <FastForward size={10} /> {playbackRate}x
          </button>
        </div>

        {/* Circular custom Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#66fcf1] to-[#45f3ff] text-[#0b0c10] flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-105 transition-all active:scale-95"
        >
          {isPlaying ? <Pause size={16} fill="#0b0c10" /> : <Play size={16} fill="#0b0c10" className="ml-0.5" />}
        </button>

        {/* Volume controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="w-14 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#66fcf1] outline-none"
          />
        </div>
      </div>
    </div>
  );
};
