import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';

export default function CakePage() {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isSliced, setIsSliced] = useState(false);

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

  const blowAll = () => {
    soundEngine.playBlowSound();
    soundEngine.playHornSound();
    fireBirthdayConfetti();
    setCandles([false, false, false, false, false]);
  };

  const relight = () => {
    soundEngine.playIgniteSound();
    setCandles([true, true, true, true, true]);
  };

  const cutCake = () => {
    soundEngine.playSliceSound();
    fireBirthdayConfetti();
    setIsSliced(true);
  };

  const allBlown = candles.every(c => !c);

  return (
    <div className="clean-page-card">
      <span className="clean-tag">Birthday Celebration</span>
      <h1>Smita's Birthday Cake 🎂</h1>
      <p className="page-desc">
        Make a wish, blow out the candles, and cut the first slice!
      </p>

      <div className="clean-cake-stage">
        {/* Candles */}
        <div className="cake-candles-row">
          {candles.map((isLit, i) => (
            <div
              key={i}
              className={`stage-candle ${isLit ? 'lit' : 'blown'}`}
              onClick={() => toggleCandle(i)}
              title="Click to blow out"
            >
              {isLit ? <span className="flame-glow">🔥</span> : <span className="smoke-puff">💨</span>}
              <div className="candle-stick-body"></div>
            </div>
          ))}
        </div>

        {/* Cake Tier */}
        <div className="cake-center-box">
          <div className="cake-icing">🍓 🌸 🍓 🌸 🍓</div>
          <h2>Happy Birthday Smita ♡</h2>
          <span className="cake-subtext">May all your dreams come true ✨</span>
        </div>

        {/* Buttons */}
        <div className="cake-actions-row">
          {!allBlown ? (
            <button className="primary-btn" onClick={blowAll}>
              💨 Blow Out Candles
            </button>
          ) : (
            <button className="secondary-btn" onClick={relight}>
              ✨ Light Candles Again
            </button>
          )}

          {!isSliced ? (
            <button className="cut-cake-btn" onClick={cutCake}>
              🔪 Cut Birthday Cake
            </button>
          ) : (
            <button className="secondary-btn" onClick={() => setIsSliced(false)}>
              🍰 Cake Sliced! Cut Again
            </button>
          )}
        </div>

        {isSliced && (
          <div className="slice-note-card">
            <span className="slice-icon">🍰</span>
            <p>“Here is the first sweet bite for the birthday queen! Have a wonderful year ahead!” 💖</p>
          </div>
        )}
      </div>

      <div className="next-nav-group">
        <Link to="/gallery" className="primary-btn next-step-btn">
          Next: Look at our memories 📸 →
        </Link>
        <Link to="/quiz" className="secondary-btn next-step-btn">
          🧠 Bestie Quiz
        </Link>
        <Link to="/surprise" className="secondary-btn next-step-btn">
          🎁 Surprises
        </Link>
      </div>
    </div>
  );
}
