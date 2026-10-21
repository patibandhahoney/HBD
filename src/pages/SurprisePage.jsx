import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';

const SURPRISES = [
  {
    id: 1,
    title: '☕ Chai & Gossip Pass',
    desc: 'Valid for: 1x Late-night Chai & 2-Hour non-stop gossip session on me!',
    icon: '☕',
    color: '#ffe0e9',
  },
  {
    id: 2,
    title: '🍦 Free Treat / Dessert',
    desc: 'Valid for: 1x Free dessert or meal at your favorite cafe anytime you want!',
    icon: '🍰',
    color: '#fff3c9',
  },
  {
    id: 3,
    title: '💖 Bestie For Life Pass',
    desc: 'Valid for: Unlimited friendship, laughter, support, and forever!',
    icon: '👑',
    color: '#dff8ef',
  },
];

export default function SurprisePage() {
  const [revealed, setRevealed] = useState({});

  const handleReveal = (id) => {
    soundEngine.playHornSound();
    fireHeartConfetti();
    setRevealed(prev => ({ ...prev, [id]: true }));
  };

  const handleCelebration = () => {
    soundEngine.playHornSound();
    fireBirthdayConfetti();
  };

  return (
    <div className="clean-page-card">
      <span className="clean-tag">Birthday Treats</span>
      <h1>Your Surprises 🎁</h1>
      <p className="page-desc">
        Tap on each coupon card to open your birthday surprise!
      </p>

      <div className="clean-surprises-grid">
        {SURPRISES.map((item) => {
          const isOpened = revealed[item.id];
          return (
            <div 
              key={item.id} 
              className={`surprise-card ${isOpened ? 'opened' : ''}`}
              style={{ background: item.color }}
              onClick={() => handleReveal(item.id)}
            >
              <span className="surprise-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              {isOpened ? (
                <p className="surprise-desc">{item.desc}</p>
              ) : (
                <button className="reveal-btn">Tap to Open ♡</button>
              )}
            </div>
          );
        })}
      </div>

      <div className="celebrate-btn-wrap">
        <button className="primary-btn" onClick={handleCelebration}>
          🎉 Blast More Birthday Confetti!
        </button>
      </div>

      <div className="next-nav-group">
        <Link to="/about" className="primary-btn next-step-btn">
          Next: All About Smita 🌸 →
        </Link>
        <Link to="/quiz" className="secondary-btn next-step-btn">
          🧠 Take Trivia Quiz
        </Link>
        <a href="/library" target="_blank" rel="noopener noreferrer" className="secondary-btn next-step-btn sf-portal-tag">
          🌻 Open Sunflower Library ↗
        </a>
      </div>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link to="/" className="text-link">← Return to Birthday Journey 🏠</Link>
      </div>
    </div>
  );
}
