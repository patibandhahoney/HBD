import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireHeartConfetti, fireSunflowerConfetti } from '../utils/confetti';
import '../styles/library.css';

const DEFAULT_MEMORIES = [
  {
    id: 1,
    title: 'That Beautiful Smile 🌸',
    text: 'Always lighting up the room with pure joy and laughter.',
    defaultImg: '/images/photo1.jpg',
    bg: 'linear-gradient(135deg, #ffd6e0, #ffefef)',
    icon: '✨',
  },
  {
    id: 2,
    title: 'Coffee & Endless Talks ☕',
    text: 'Our 20-minute coffee plans that always turned into hours of gossiping.',
    defaultImg: '/images/photo2.jpg',
    bg: 'linear-gradient(135deg, #d8e2dc, #f4eeed)',
    icon: '☕',
  },
  {
    id: 3,
    title: 'Unplanned Fun 🚗',
    text: 'The best memories are always the random adventures we never planned.',
    defaultImg: '/images/photo3.jpg',
    bg: 'linear-gradient(135deg, #faedcd, #fefae0)',
    icon: '🌈',
  },
  {
    id: 4,
    title: 'Drama Queen Moments 👑',
    text: 'Certified best reactions and the funniest facial expressions.',
    defaultImg: '/images/photo4.jpg',
    bg: 'linear-gradient(135deg, #e8e8e4, #f8edeb)',
    icon: '💖',
  },
  {
    id: 5,
    title: 'Heart to Heart 🌙',
    text: 'Late night talks where we can share anything without judgment.',
    defaultImg: '/images/photo5.jpg',
    bg: 'linear-gradient(135deg, #d8b4e2, #f3e8ff)',
    icon: '🧸',
  },
  {
    id: 6,
    title: 'Best Friends Forever 👭',
    text: 'Not just a friend, but someone who truly feels like family.',
    defaultImg: '/images/photo6.jpg',
    bg: 'linear-gradient(135deg, #ffccd5, #fff0f3)',
    icon: '🎀',
  },
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('smita_photos') || localStorage.getItem('vaishnavi_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MEMORIES;
      }
    }
    return DEFAULT_MEMORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('smita_photos', JSON.stringify(photos));
    } catch {
      // Handle quota if user uploads huge images
    }
  }, [photos]);


  const handleCardImageUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      soundEngine.playSparkleSound();
      fireHeartConfetti();
      setPhotos(prev => prev.map(p => p.id === id ? { ...p, customImg: reader.result } : p));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (id, e) => {
    e.stopPropagation();
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, customImg: null } : p));
  };

  return (
    <div className="clean-page-card">
      <span className="clean-tag">Photo Scrapbook</span>
      <h1>Memories & Smiles 📸</h1>
      <p className="page-desc">
        Click on any photo frame below to <strong>upload your real pictures</strong> directly from your computer or phone!
      </p>

      <div className="clean-gallery-grid">
        {photos.map((item) => {
          const displayImage = item.customImg || item.imgUrl;
          return (
            <div key={item.id} className="clean-polaroid">
              <label className="polaroid-pic-upload" title="Click to choose a photo for this card">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCardImageUpload(item.id, e.target.files[0])}
                  style={{ display: 'none' }}
                />

                <div className="polaroid-pic" style={{ background: item.bg }}>
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={item.title}
                      onError={(e) => {
                        // If default image path not found, fallback to placeholder
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  <div
                    className="pic-placeholder"
                    style={{ display: displayImage ? 'none' : 'flex' }}
                  >
                    <span className="pic-icon">{item.icon}</span>
                    <span className="pic-note">📷 Tap to add photo</span>
                  </div>
                </div>
              </label>

              <div className="polaroid-info">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {displayImage && (
                  <button className="remove-photo-btn" onClick={(e) => handleRemovePhoto(item.id, e)}>
                    ✕ Remove / Change
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Sunflower Library Portal (Opens in a new tab) */}
      <div className="sunflower-library-portal-card" style={{ margin: '40px auto 20px' }}>
        <span className="portal-glow-sunflower">🌻</span>
        <br />
        <span className="portal-badge">✨ Next Magical Chapter</span>
        <h3>Smita’s Secret Sunflower Library 📖</h3>
        <p>
          Step into a golden haven of fictional stories, heartwarming non-fiction wisdom, cozy reading corners, and blooming sunflowers!
        </p>
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
          <span>🌻</span> Open Sunflower Library (New Tab) <span>↗</span>
        </a>
        <span className="portal-hint-tab">Opens in a new tab so your photo scrapbook stays open ♡</span>
      </div>

      <div className="next-nav-group">
        <Link to="/message" className="primary-btn next-step-btn">
          Next: Read your special letter 💌 →
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


