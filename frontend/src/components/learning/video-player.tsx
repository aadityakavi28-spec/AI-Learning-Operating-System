'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipForward,
  SkipBack,
  PictureInPicture,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  title?: string;
  thumbnail?: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ title, thumbnail, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * duration;
      setProgress(value);
    }
  };

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden bg-slate-900 group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Placeholder/Thumbnail */}
      <div className="relative aspect-video bg-slate-800">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title || 'Video thumbnail'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        <motion.button
          onClick={handlePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
            isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
        </motion.button>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 transition-opacity duration-300',
        showControls ? 'opacity-100' : 'opacity-0'
      )}>
        {/* Progress Bar */}
        <div className="relative mb-3 group/progress">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
            className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:transition-opacity
              group-hover/progress:[&::-webkit-slider-thumb]:opacity-100"
            style={{
              background: `linear-gradient(to right, #06b6d4 ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Skip Back */}
            <button 
              onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Skip Forward */}
            <button 
              onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>

            {/* Volume */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>

            {/* Time */}
            <span className="text-sm text-white/80 font-medium">
              {formatTime(currentTime)} / {formatTime(duration || 45)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>

            {/* PiP */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <PictureInPicture className="w-5 h-5 text-white" />
            </button>

            {/* Fullscreen */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      {title && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-slate-900/80 to-transparent">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
      )}
    </div>
  );
}

