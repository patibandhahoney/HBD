import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireBirthdayConfetti, fireSideCannons, fireHeartConfetti, fireSunflowerConfetti } from '../utils/confetti';
import '../styles/library.css';

const BALLOONS = [
  { id: 1, letter: 'H', color: '#ff6b8b', left: '10%' },
  { id: 2, letter: 'A', color: '#ffd166', left: '22%' },
  { id: 3, letter: 'P', color: '#06d6a0', left: '34%' },
  { id: 4, letter: 'P', color: '#118ab2', left: '46%' },
  { id: 5, letter: 'Y', color: '#7209b7', left: '58%' },
  { id: 6, letter: '★', color: '#ff99c8', left: '70%' },
  { id: 7, letter: 'B', color: '#f72585', left: '15%' },
  { id: 8, letter: 'D', color: '#4cc9f0', left: '30%' },
  { id: 9, letter: 'A', color: '#ffd166', left: '45%' },
  { id: 10, letter: 'Y', color: '#06d6a0', left: '60%' },
  { id: 11, letter: '♡', color: '#ff758f', left: '75%' },
];

const STORY_MESSAGES = [
  "Today is a very special day... ✨",
  "A day when the universe was blessed with someone extraordinary.",
  "Dearest Smita ♡",
  "You bring so much laughter, warmth, and genuine kindness into this world.",
  "Thank you for being the kind of friend who makes every ordinary day unforgettable.",
  "May your life be filled with endless smiles, dreams fulfilled, and sweet adventures.",
  "Never stop shining your bright, beautiful light.",
  "Happy Birthday, Bestie! Forever grateful for you! 🎂💖✨"
];

const DEFAULT_PHOTOS = [
  { id: 1, title: 'Queen of Smiles 🌸', text: 'That laughter that makes everyone happy!', defaultImg: '/images/photo1.jpg', fallbackImg: '/photo1.jpg' },
  { id: 2, title: 'Coffee & Gossip ☕', text: 'Endless talks and inside jokes.', defaultImg: '/images/photo2.jpg', fallbackImg: '/photo2.jpg' },
  { id: 3, title: 'Best Friends Forever 👭', text: 'Not just a friend, but true family.', defaultImg: '/images/photo3.jpg', fallbackImg: '/photo3.jpg' },
  { id: 4, title: 'Unplanned Adventures 🚗', text: 'The random moments we will never forget.', defaultImg: '/images/photo4.jpg', fallbackImg: '/photo4.jpg' },
  { id: 5, title: 'Drama Queen Moments 👑', text: 'Best facial expressions in the world!', defaultImg: '/images/photo5.jpg', fallbackImg: '/photo5.jpg' },
  { id: 6, title: 'Soul Sister Always 💖', text: 'Thank you for always being there.', defaultImg: '/images/photo6.jpg', fallbackImg: '/photo6.jpg' },
];

export default function BirthdayJourney() {
  // Stage 0: Dark room (Turn on lights)
  // Stage 1: Lights on (Play music)
  // Stage 2: Music on (Let's decorate)
  // Stage 3: Bunting banner on (Fly balloons)
  // Stage 4: Balloons flying (Delicious cake)
  // Stage 5: Cake appears (Light candle)
  // Stage 6: Candle lit (Happy birthday celebration)
  // Stage 7: Confetti celebration (A message for you)
  // Stage 8: Story message reader
  // Stage 9: Memories / Photo showcase
  const [stage, setStage] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('Smita_photos');
    if (saved) {
      try { return JSON.parse(saved); } catch { }
    }
    return DEFAULT_PHOTOS;
  });

  const handleNextStep = () => {
    if (stage === 0) {
      // Turn on lights
      soundEngine.playSparkleSound();
      setStage(1);
    } else if (stage === 1) {
      // Play music
      soundEngine.startTrack(0);
      setStage(2);
    } else if (stage === 2) {
      // Let's decorate (banner)
      soundEngine.playSparkleSound();
      setStage(3);
    } else if (stage === 3) {
      // Fly with balloons
      soundEngine.playPopSound();
      setStage(4);
    } else if (stage === 4) {
      // Cake appears
      soundEngine.playSparkleSound();
      setStage(5);
    } else if (stage === 5) {
      // Light candle
      soundEngine.playIgniteSound();
      setStage(6);
    } else if (stage === 6) {
      // Happy Birthday! Confetti & Horns
      soundEngine.playHornSound();
      fireBirthdayConfetti();
      fireSideCannons();
      setStage(7);
    } else if (stage === 7) {
      // Open messages
      soundEngine.playSparkleSound();
      setMessageIdx(0);
      setStage(8);
    }
  };

  const handleNextMessage = () => {
    soundEngine.playSparkleSound();
    fireHeartConfetti();
    if (messageIdx < STORY_MESSAGES.length - 1) {
      setMessageIdx(i => i + 1);
    } else {
      setStage(9); // Go to photo memories
    }
  };

  const handlePhotoUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      soundEngine.playSparkleSound();
      fireHeartConfetti();
      const updated = photos.map(p => p.id === id ? { ...p, customImg: reader.result } : p);
      setPhotos(updated);
      try {
        localStorage.setItem('Smita_photos', JSON.stringify(updated));
      } catch { }
    };
    reader.readAsDataURL(file);
  };

  const restartJourney = () => {
    soundEngine.playSparkleSound();
    setStage(0);
    setMessageIdx(0);
  };

  return (
    <div className={`shizuka-experience ${stage >= 1 ? 'lights-on' : 'lights-off'}`}>

      {/* Hanging Decorative Light Bulbs */}
      {stage >= 1 && (
        <div className="hanging-bulbs-bar">
          <span className="bulb b1">💡</span>
          <span className="bulb b2">💡</span>
          <span className="bulb b3">💡</span>
          <span className="bulb b4">💡</span>
          <span className="bulb b5">💡</span>
          <span className="bulb b6">💡</span>
          <span className="bulb b7">💡</span>
        </div>
      )}

      {/* Hanging Bunting Banner */}
      {stage >= 3 && (
        <div className="bunting-banner-container">
          <div className="banner-string"></div>
          <div className="banner-flags">
            {'HAPPY BIRTHDAY Smita'.split('').map((char, i) => (
              <span key={i} className={`flag flag-${i % 5} ${char === ' ' ? 'space' : ''}`}>
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Floating Animated Balloons */}
      {stage >= 4 && (
        <div className="floating-balloons-layer">
          {BALLOONS.map((b) => (
            <div
              key={b.id}
              className="floating-balloon"
              style={{ left: b.left, backgroundColor: b.color, animationDelay: `${b.id * 0.4}s` }}
            >
              <span className="balloon-letter">{b.letter}</span>
              <div className="b-knot" style={{ borderBottomColor: b.color }}></div>
              <div className="b-string"></div>
            </div>
          ))}
        </div>
      )}

      {/* Main Center Stage */}
      <div className="center-stage-wrapper">
        {/* Stage 0 to 4: Welcome Hint */}
        {stage < 5 && (
          <div className="stage-hint-card">
            {stage === 0 && <h2>It's dark in here... 🌑</h2>}
            {stage === 1 && <h2>Much better! Now we need some tunes... 🎵</h2>}
            {stage === 2 && <h2>Let's make the room beautiful! 🎀</h2>}
            {stage === 3 && <h2>Time for the birthday balloons! 🎈</h2>}
            {stage === 4 && <h2>Now the best part... The Cake! 🎂</h2>}
          </div>
        )}

        {/* Stage 5 & 6 & 7: The Iconic 3D Cake & Candle */}
        {stage >= 5 && stage <= 7 && (
          <div className="classic-cake-container">
            {/* Candle */}
            <div className="cake-candle-setup">
              {stage >= 6 ? (
                <div className="cake-fire">
                  <span className="fire-glow">🔥</span>
                </div>
              ) : (
                <div className="candle-wick-only"></div>
              )}
              <div className="cake-candle-tube"></div>
            </div>

            {/* Cake Layers */}
            <div className="classic-cake-body">
              <div className="cake-frosting-stripes">
                <span>🍓</span><span>🌸</span><span>🍓</span><span>🌸</span><span>🍓</span>
              </div>
              <div className="cake-plate-base">
                <strong>Smita</strong>
                <span>Happy Birthday ♡</span>
              </div>
            </div>

            {stage === 7 && (
              <div className="celebration-headline">
                <h1>🎉 HAPPY BIRTHDAY Smita! 🎉</h1>
                <p>May your day be filled with endless magic, sweet treats, and love!</p>
              </div>
            )}
          </div>
        )}

        {/* Stage 8: Heartfelt Story Message Sequence */}
        {stage === 8 && (
          <div className="story-message-card">
            <span className="envelope-badge">💌 Special Birthday Message</span>
            <div className="message-content-box">
              <p className="story-text-line" key={messageIdx}>
                “{STORY_MESSAGES[messageIdx]}”
              </p>
            </div>

            <div className="message-progress">
              <span>{messageIdx + 1} of {STORY_MESSAGES.length}</span>
            </div>

            <button className="next-message-btn" onClick={handleNextMessage}>
              {messageIdx < STORY_MESSAGES.length - 1 ? 'Next Line →' : '📸 See Photo Memories →'}
            </button>
          </div>
        )}

        {/* Stage 9: Photo Memories Scrapbook */}
        {stage === 9 && (
          <div className="memories-finale-card">
            <span className="memories-badge">📸 Beautiful Memories</span>
            <h2>Moments We Cherish ♡</h2>
            <p className="memories-sub">Click on any card to add/change real photos!</p>

            <div className="memories-showcase-grid">
              {photos.map((p) => {
                const imgSource = p.customImg || p.defaultImg;
                return (
                  <div key={p.id} className="shizuka-polaroid">
                    <label className="photo-picker-label" title="Click to upload or replace photo">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(p.id, e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      <div className="polaroid-image-area">
                        {imgSource ? (
                          <img
                            src={imgSource}
                            alt={p.title}
                            onError={(e) => {
                              // If /images/photoX.jpg is not found, try fallback /photoX.jpg or hide
                              if (p.fallbackImg && e.target.src.indexOf(p.fallbackImg) === -1) {
                                e.target.src = p.fallbackImg;
                              } else {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) {
                                  e.target.nextSibling.style.display = 'flex';
                                }
                              }
                            }}
                          />
                        ) : null}
                        <div
                          className="photo-empty-box"
                          style={{ display: imgSource ? 'none' : 'flex' }}
                        >
                          <span className="empty-icon">📷</span>
                          <span className="empty-txt">Photo {p.id}</span>
                          <span className="empty-hint">Drop photo{p.id}.jpg in public/images/ or click here</span>
                        </div>
                      </div>
                    </label>
                    <div className="polaroid-text-area">
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="finale-buttons">
              <button className="celebrate-more-btn" onClick={() => { soundEngine.playHornSound(); fireSideCannons(); }}>
                🎉 Blast Confetti!
              </button>
              <button className="restart-btn" onClick={restartJourney}>
                🔄 Experience Again
              </button>
            </div>

            {/* Special Sunflower Library Portal (Opens in a new tab) */}
            <div className="sunflower-library-portal-card">
              <span className="portal-glow-sunflower">🌻</span>
              <br />
              <h3>Step Into Smita’s Sunflower Library 📖</h3>
              <a
                href="/library"
                target="_blank"
                rel="noopener noreferrer"
                className="sunflower-portal-btn"
                onClick={() => {
                  soundEngine.playSparkleSound();
                  fireSunflowerConfetti(0.5, 0.5);
                }}
              >
                <span>🌻</span> Open Sunflower Library<span>↗</span>
              </a>
              <span className="portal-hint-tab">Opens in a new tab so your birthday celebration stays right here ♡</span>
            </div>

            {/* Explore More Birthday Fun Grid */}
            <div className="journey-extra-features">
              <span className="extra-badge">🎁 More Birthday Magic</span>
              <h3>Special Treats Made For Smita! ✨</h3>
              <div className="features-grid">
                <Link to="/quiz" className="feature-card quiz-theme">
                  <span className="card-icon">🧠✨</span>
                  <h4>Bestie Trivia Quiz</h4>
                  <p>How well do you really know Smita? Take the quiz & claim your award certificate!</p>
                  <span className="card-action">Play Quiz →</span>
                </Link>

                <Link to="/surprise" className="feature-card surprise-theme">
                  <span className="card-icon">🎁💖</span>
                  <h4>Birthday Surprises</h4>
                  <p>Open mystery coupons for late-night chai, cafe treats & bestie passes!</p>
                  <span className="card-action">Open Surprises →</span>
                </Link>

                <Link to="/about" className="feature-card about-theme">
                  <span className="card-icon">🌸👑</span>
                  <h4>All About Smita</h4>
                  <p>Verified bestie personality stats, superpowers, and 4 golden rules!</p>
                  <span className="card-action">Discover More →</span>
                </Link>

                <Link to="/cake" className="feature-card cake-theme">
                  <span className="card-icon">🎂🕯️</span>
                  <h4>Cake & Candles</h4>
                  <p>Blow out candles, make a wish, and cut the first birthday slice!</p>
                  <span className="card-action">Celebrate →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* The Famous Single Bottom Control Button */}
      {stage < 8 && (
        <div className="bottom-action-dock">
          {stage === 0 && (
            <button className="magic-action-btn btn-lights" onClick={handleNextStep}>
              💡 Turn on Lights
            </button>
          )}
          {stage === 1 && (
            <button className="magic-action-btn btn-music" onClick={handleNextStep}>
              🎵 Play Music
            </button>
          )}
          {stage === 2 && (
            <button className="magic-action-btn btn-decorate" onClick={handleNextStep}>
              🎀 Let's Decorate
            </button>
          )}
          {stage === 3 && (
            <button className="magic-action-btn btn-balloons" onClick={handleNextStep}>
              🎈 Fly with Balloons
            </button>
          )}
          {stage === 4 && (
            <button className="magic-action-btn btn-cake" onClick={handleNextStep}>
              🎂 Delicious Cake
            </button>
          )}
          {stage === 5 && (
            <button className="magic-action-btn btn-candle" onClick={handleNextStep}>
              🕯️ Light Candle
            </button>
          )}
          {stage === 6 && (
            <button className="magic-action-btn btn-happy" onClick={handleNextStep}>
              🎉 Happy Birthday!
            </button>
          )}
          {stage === 7 && (
            <button className="magic-action-btn btn-message" onClick={handleNextStep}>
              💌 A Message for You
            </button>
          )}
        </div>
      )}
    </div>
  );
}
