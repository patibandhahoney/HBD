import React, { useState } from 'react';
import { soundEngine } from '../utils/audioEngine';
import { fireHeartConfetti } from '../utils/confetti';

const INITIAL_BALLOONS = [
  { id: 1, color: '#ff6b8b', label: '🎈', wish: '“You are genuinely one of the rarest, kindest souls on this planet. Never change!” 💖' },
  { id: 2, color: '#68d8d6', label: '🎈', wish: '“May this year bring you massive success, good food, and zero stress!” 🍕✨' },
  { id: 3, color: '#ffd166', label: '🎈', wish: '“Warning: Aging detected! But your cuteness just leveled up by 1000%!” 😂🎂' },
  { id: 4, color: '#b392ac', label: '🎈', wish: '“Thank you for being the person I can always laugh with until our stomachs hurt!” 👭🌸' },
  { id: 5, color: '#06d6a0', label: '🎈', wish: '“May all your secret wishes when you blow the candles come true this year!” 🕯️💫' },
  { id: 6, color: '#ff99c8', label: '🎈', wish: '“You deserve all the happiness, cute outfits, iced coffee, and love in the world!” ☕🎀' },
];

export default function BalloonPopWall() {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const [poppedIds, setPoppedIds] = useState(new Set());
  const [activeWish, setActiveWish] = useState(null);

  const handlePop = (balloon, e) => {
    if (poppedIds.has(balloon.id)) return;

    soundEngine.playPopSound();
    
    // Confetti at click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireHeartConfetti(x, y);

    setPoppedIds(prev => new Set([...prev, balloon.id]));
    setActiveWish(balloon.wish);
  };

  const resetBalloons = () => {
    soundEngine.playSparkleSound();
    setPoppedIds(new Set());
    setActiveWish(null);
  };

  const allPopped = poppedIds.size === balloons.length;

  return (
    <div className="balloon-wall-container">
      <div className="balloon-wall-header">
        <span className="scrapbook-tape left"></span>
        <span className="section-pill">Interactive Fun</span>
        <h3>Pop The Birthday Balloons! 🎈</h3>
        <p>Click or tap on any balloon to pop it and reveal a hidden bestie wish!</p>
        <span className="scrapbook-tape right"></span>
      </div>

      <div className="balloons-grid">
        {balloons.map((b, idx) => {
          const isPopped = poppedIds.has(b.id);
          return (
            <div 
              key={b.id} 
              className={`balloon-item ${isPopped ? 'popped' : 'floating'}`}
              style={{ animationDelay: `${idx * 0.35}s` }}
              onClick={(e) => handlePop(b, e)}
            >
              {!isPopped ? (
                <div className="balloon-body" style={{ backgroundColor: b.color, boxShadow: `0 12px 25px ${b.color}55` }}>
                  <span className="balloon-shine"></span>
                  <span className="balloon-number">#{idx + 1}</span>
                  <div className="balloon-knot" style={{ borderBottomColor: b.color }}></div>
                  <div className="balloon-string"></div>
                </div>
              ) : (
                <div className="popped-badge">
                  <span className="popped-sparkle">💥</span>
                  <span className="popped-text">Popped!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeWish && (
        <div className="revealed-wish-card">
          <div className="revealed-icon">💌 Secret Wish Unlocked:</div>
          <p className="revealed-text">{activeWish}</p>
        </div>
      )}

      {allPopped && (
        <div className="all-popped-banner">
          <span>🎉 Yay! You popped all the balloons! You are the champion! 🏆</span>
          <button className="reset-balloons-btn" onClick={resetBalloons}>
            🎈 Inflate More Balloons
          </button>
        </div>
      )}
    </div>
  );
}
