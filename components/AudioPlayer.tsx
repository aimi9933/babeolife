import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Episode } from '../types';

interface AudioPlayerProps {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentEpisode, isPlaying, onPlayPause, onClose }) => {
  const [progress, setProgress] = useState(0);
  // In a real app, this would use an <audio> ref
  
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!currentEpisode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-babeo-sage shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-4 py-3 md:py-4 transition-all duration-300 transform translate-y-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 w-1/3 md:w-1/4">
          <img 
            src={currentEpisode.coverImage} 
            alt={currentEpisode.title} 
            className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-cover shadow-sm"
          />
          <div className="hidden sm:block overflow-hidden">
            <h4 className="font-display font-semibold text-babeo-stone truncate text-sm md:text-base">
              {currentEpisode.title}
            </h4>
            <p className="text-xs text-gray-500 truncate">{currentEpisode.duration} • {currentEpisode.category}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
          <div className="flex items-center gap-4 md:gap-6 mb-2">
            <button className="text-gray-400 hover:text-babeo-green transition-colors">
              <SkipBack size={20} />
            </button>
            <button 
              onClick={onPlayPause}
              className="w-10 h-10 md:w-12 md:h-12 bg-babeo-terracotta rounded-full flex items-center justify-center text-white shadow-md hover:bg-opacity-90 transition-all hover:scale-105"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-babeo-green transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
          
          {/* Progress Bar (Visual Only) */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-babeo-terracotta rounded-full transition-all duration-1000 linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center justify-end gap-3 w-1/3 md:w-1/4">
          <Volume2 size={20} className="text-gray-400 hidden md:block" />
          <div className="w-20 h-1 bg-gray-200 rounded-full hidden md:block">
            <div className="w-2/3 h-full bg-gray-400 rounded-full" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;