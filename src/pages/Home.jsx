import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';

export default function Home() {
  const [candles, setCandles] = useState([true, true, true, true, true]);

  const toggleCandle = (idx) => {
    const next = [...candles];
    next[idx] = !next[idx];
    setCandles(next);
    if (!next[idx]) {
      soundEngine.playBlowSound();
      fireHeartConfetti();
    } else {
      soundEngine.playIgniteSound();
    }

    if (next.every(c => !c)) {
      soundEngine.playHornSound();
      fireBirthdayConfetti();
    }
  };

  const allBlown = candles.every(c => !c);

  return (
    <div className="clean-home">
      {/* Hero Section */}
      <section className="clean-hero">
        <div className="hero-text">
          <span className="eyebrow">To someone truly special...</span>
          <h1>Smita <span className="heart">♡</span></h1>
          <h2>Happy Birthday! 🎂</h2>
          <p>
            Wishing you a day as wonderful, sweet, and bright as you are. Thank you for being such an amazing friend and bringing so much joy into everyone’s life.
          </p>
          <div className="hero-btn-row">
            <Link to="/cake" className="primary-btn">Let's Celebrate 🍰</Link>
            <Link to="/message" className="secondary-btn">Read Letter 💌</Link>
          </div>
        </div>

        {/* Clean Interactive Cake */}
        <div className="hero-cake-card">
          <div className="hero-candles-row">
            {candles.map((isLit, i) => (
              <div
                key={i}
                className={`clean-candle ${isLit ? 'lit' : 'blown'}`}
                onClick={() => toggleCandle(i)}
                title="Tap to blow out"
              >
                {isLit ? <span className="flame">🔥</span> : <span className="smoke">💨</span>}
                <div className="candle-bar"></div>
              </div>
            ))}
          </div>

          <div className="clean-cake-shape">
            <div className="cake-frosting">🍓 🍰 🍓</div>
            <strong className="cake-title">Happy Birthday Smita</strong>
            <span className="cake-sub">Make a wish & tap candles!</span>
          </div>

          {allBlown && (
            <p className="blown-wish-text">🎉 Yay! All candles blown! May your wish come true! ✨</p>
          )}
        </div>
      </section>

      {/* 3 Clean Quick Links */}
      <section className="clean-card-grid">
        <Link to="/cake" className="clean-card pink">
          <span className="card-emoji">🎂</span>
          <h3>Cake & Candles</h3>
          <p>Light candles, blow them out, and cut the birthday cake!</p>
          <span className="card-link">Celebrate →</span>
        </Link>

        <Link to="/gallery" className="clean-card blue">
          <span className="card-emoji">📸</span>
          <h3>Photo Memories</h3>
          <p>Cute polaroids and sweet moments together.</p>
          <span className="card-link">See Photos →</span>
        </Link>

        <Link to="/message" className="clean-card yellow">
          <span className="card-emoji">💌</span>
          <h3>Special Letter</h3>
          <p>A heartfelt message written just for you.</p>
          <span className="card-link">Read Message →</span>
        </Link>
      </section>
    </div>
  );
}
