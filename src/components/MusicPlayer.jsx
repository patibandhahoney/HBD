import React, { useState } from 'react';
import { soundEngine } from '../utils/audioEngine';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      soundEngine.stopTrack();
      setIsPlaying(false);
    } else {
      soundEngine.startTrack(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="simple-music-dock">
      <button 
        className={`simple-music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'Pause Music' : 'Play Birthday Song'}
      >
        <span className="music-icon">{isPlaying ? '🎵' : '🎶'}</span>
        <span className="music-text">{isPlaying ? 'Birthday Song Playing...' : 'Play Birthday Song 🎂'}</span>
      </button>
    </div>
  );
}
