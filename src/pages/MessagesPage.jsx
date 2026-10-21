import React from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireHeartConfetti } from '../utils/confetti';

export default function MessagesPage() {
  const handleSparkle = () => {
    soundEngine.playSparkleSound();
    fireHeartConfetti();
  };

  return (
    <div className="clean-page-card">
      <span className="clean-tag">From The Heart</span>
      <h1>Dear Smita 💌</h1>

      <div className="clean-letter-body">
        <p className="letter-p">
          Happy Birthday! 🎉
        </p>

        <p className="letter-p">
          I just wanted to take a moment to tell you how truly grateful I am to have you in my life. You are one of those rare people who bring genuine warmth, comfort, and so much laughter wherever you go.
        </p>

        <p className="letter-p">
          From our random gossip sessions to the quiet moments when we don't even have to say anything, thank you for being someone I can always count on. You have such a kind heart and a beautiful energy, and I hope you never forget how special you are.
        </p>

        <p className="letter-p">
          I wish you all the happiness, success, peace, and sweet adventures in this new year of your life. May all your dreams come true!
        </p>

        <div className="letter-sign">
          <p>Always cheering for you,</p>
          <h3>Honey ♡</h3>
        </div>

        <button className="heart-btn" onClick={handleSparkle}>
          💖 Send Love & Hugs
        </button>
      </div>

      <div className="next-nav-group">
        <Link to="/quiz" className="primary-btn next-step-btn">
          Next: Take the Bestie Quiz 🧠✨ →
        </Link>
        <Link to="/surprise" className="secondary-btn next-step-btn">
          🎁 Open Birthday Surprises →
        </Link>
      </div>
    </div>
  );
}
