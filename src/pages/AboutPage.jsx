import React from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireHeartConfetti } from '../utils/confetti';

const TRAITS = [
  { label: '💖 Pure Kindness & Empathy', value: '100%', color: '#ff758f' },
  { label: '😂 Chaotic Humor & Laughter', value: '98%', color: '#ffd166' },
  { label: '☕ Cafe & Aesthetic Appreciation', value: '100%', color: '#06d6a0' },
  { label: '🤫 Gossip Vault Security Level', value: '1000%', color: '#118ab2' },
  { label: '👑 Queen Energy & Main Character Vibes', value: '999%', color: '#a881ff' },
];

const GOLDEN_RULES = [
  { id: 1, icon: '🌟', text: 'Never compromises on good food, iced drinks, or cozy aesthetic vibes.' },
  { id: 2, icon: '👭', text: 'Will remember the smallest detail about you that you forgot you even mentioned.' },
  { id: 3, icon: '👑', text: 'Capable of turning any boring regular day into an unforgettable adventure.' },
  { id: 4, icon: '💌', text: 'Has an enormous heart and is always ready to cheer on everyone she loves.' },
];

export default function AboutPage() {
  const handleSpreadLove = () => {
    soundEngine.playHornSound();
    fireHeartConfetti();
  };

  return (
    <div className="about-page">
      <div className="about-header">
        <span className="scrapbook-tape left"></span>
        <span className="section-pill">Appreciation Scrapbook</span>
        <h1>All About Smita 🌸</h1>
        <p className="subtitle">
          A dedicated tribute to the kindest heart, brightest smile, and most wonderful human on Earth!
        </p>
        <span className="scrapbook-tape right"></span>
      </div>

      <div className="about-grid">
        {/* Left Column: ID Profile Scrap Card */}
        <div className="profile-scrap-card">
          <div className="washi-tape pink-tape"></div>

          <div className="profile-avatar-frame">
            <div className="avatar-art">
              <span className="avatar-crown">👑</span>
              <span className="avatar-emoji">👧🏻✨</span>
            </div>
            <div className="profile-badge">BIRTHDAY QUEEN 2026</div>
          </div>

          <h2 className="profile-name">Smita</h2>
          <p className="profile-bio">
            Professional heart-warmer, chief laugh officer, top-tier aesthetician, and the sweetest friend anyone could ever ask for.
          </p>

          <div className="personality-stats">
            <h3>📊 Verified Bestie Stats:</h3>
            {TRAITS.map((trait, idx) => (
              <div key={idx} className="stat-row">
                <div className="stat-label-wrap">
                  <span className="stat-name">{trait.label}</span>
                  <span className="stat-num">{trait.value}</span>
                </div>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{ width: '100%', backgroundColor: trait.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className="spread-love-btn" onClick={handleSpreadLove}>
            💖 Send Infinite Love & Blessings
          </button>
        </div>

        {/* Right Column: Golden Rules & Birthday Dedication */}
        <div className="about-details-column">
          <div className="scrap-box rules-box">
            <div className="box-pill">✨ Official Facts</div>
            <h3>The 4 Golden Rules of Being Smita:</h3>
            <div className="rules-list">
              {GOLDEN_RULES.map(rule => (
                <div key={rule.id} className="rule-item">
                  <span className="rule-icon">{rule.icon}</span>
                  <p className="rule-text">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scrap-box heartfelt-quote-box">
            <div className="quote-mark">“</div>
            <p className="quote-body">
              True friendship isn’t about being inseparable, it’s being separated and nothing changes. Smita, you make the world so much better just by existing. Never stop shining your bright light!
            </p>
            <span className="quote-author">— Forever in your corner ♡</span>
          </div>

          <div className="scrap-box journey-cta-box">
            <h3>Ready to Celebrate? 🎂</h3>
            <p>Make sure you’ve explored every single corner of this website made just for you!</p>

            <div className="journey-btn-group">
              <Link to="/quiz" className="mini-jump-btn">🧠 Bestie Quiz</Link>
              <Link to="/surprise" className="mini-jump-btn">🎁 Birthday Surprises</Link>
              <Link to="/cake" className="mini-jump-btn">🎂 Cut The Cake</Link>
              <Link to="/gallery" className="mini-jump-btn">📸 Flip Polaroids</Link>
              <Link to="/message" className="mini-jump-btn">💌 Secret Letter</Link>
              <a href="/library" target="_blank" rel="noopener noreferrer" className="mini-jump-btn">🌻 Sunflower Library ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
