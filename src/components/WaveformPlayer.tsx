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

  // Load audio and hook listeners
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

    // Initial load trigger
    audio.load();

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audioUrl]);

  // Handle speed and volume changes
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

  // Dynamic Waveform Drawing Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    const height = (canvas.height = 80);

    // Generate static bar heights
    const barCount = 60;
    const barHeights = Array.from({ length: barCount }, () => Math.random() * 50 + 10);
    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const spacing = 4;
      const barWidth = (width - spacing * barCount) / barCount;
      const progressPercent = currentTime / (duration || 1);

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + spacing);
        
        // Fluctuating height if playing
        let modifier = 1;
        if (isPlaying) {
          modifier = Math.sin(i * 0.25 + phase) * 0.25 + 0.75;
        }
        
        const h = barHeights[i] * modifier;
        const y = (height - h) / 2;

        // Colors: lit cyan if played, dark secondary if unplayed
        const isPlayed = (i / barCount) <= progressPercent;
        ctx.fillStyle = isPlayed ? '#66fcf1' : 'rgba(255, 255, 255, 0.15)';
        
        // Draw round bars
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, h, 2);
        ctx.fill();
      }

      if (isPlaying) {
        phase += 0.15;
      }
      
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
    <div className="glass-panel p-6 flex flex-col space-y-6 border border-white/5 relative overflow-hidden">
      {/* Underlying Audio Source */}
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      {/* Header Info */}
      <div className="space-y-1 text-center">
        <h4 className="text-base font-bold text-white tracking-wide">{title}</h4>
        <p className="text-xs text-text-secondary">{subtitle}</p>
      </div>

      {/* Waveform Canvas */}
      <div className="w-full h-20 relative flex items-center justify-center bg-black/10 rounded-xl overflow-hidden px-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Slider seeker */}
      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#66fcf1] outline-none"
        />
        <div className="flex justify-between text-xs text-text-secondary font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        
        {/* Quick buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetTrack}
            className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer transition-colors"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
          
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[10px] font-bold font-mono tracking-wider cursor-pointer hover:bg-white/10 text-accent-cyan"
            title="Playback Speed"
          >
            <FastForward size={11} /> {playbackRate}x
          </button>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#66fcf1] text-[#0b0c10] flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(102,252,241,0.4)] hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause size={20} fill="#0b0c10" /> : <Play size={20} fill="#0b0c10" className="ml-1" />}
        </button>

        {/* Volume tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
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
            className="w-16 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#66fcf1] outline-none"
          />
        </div>
      </div>
    </div>
  );
};
