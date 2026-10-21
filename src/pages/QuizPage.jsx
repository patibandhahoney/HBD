import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireBirthdayConfetti, fireSideCannons } from '../utils/confetti';

const QUESTIONS = [
  {
    id: 1,
    question: '1. What is Smita’s undisputed superpower?',
    options: [
      { text: 'Talking about 15 different topics in a single sentence without breathing 😂', isCorrect: true },
      { text: 'Finding the cutest aesthetic cafes & food in town 🍰', isCorrect: true },
      { text: 'Giving the warmest hugs & sweetest advice 💕', isCorrect: true },
      { text: 'All of the above! (She is a multi-talented legend) 👑', isCorrect: true },
    ],
    feedback: 'Correct! Smita is the definition of a multi-talented superhero!',
  },
  {
    id: 2,
    question: '2. What happens when Smita says “I will be ready in 5 minutes”?',
    options: [
      { text: 'She is already waiting at the door with sunglasses on 🕶️', isCorrect: false },
      { text: 'She just started picking an outfit and you have 40 solid minutes to relax 👗✨', isCorrect: true },
      { text: 'Nobody knows, it is one of the universe’s greatest mysteries 🔮', isCorrect: true },
    ],
    feedback: 'Classic Smita timing! Beauty takes time and she is always worth the wait!',
  },
  {
    id: 3,
    question: '3. What is the essential fuel that keeps Smita running?',
    options: [
      { text: 'Hot Tea, sweet treats, and good food ☕🍫', isCorrect: true },
      { text: 'Top-tier drama & about man gossip sessions 🤫💅', isCorrect: true },
      { text: 'Listening to favorite playlists on repeat 🎧🎶', isCorrect: true },
      { text: 'All 3 combined in a chaotic mix of perfection! 🌟', isCorrect: true },
    ],
    feedback: 'Spot on! The ultimate combination of comfort and fun!',
  },
  {
    id: 4,
    question: '4. What is the official scientific verdict on Smita as a friend?',
    options: [
      { text: '10 / 10 Standard Great Friend', isCorrect: false },
      { text: '100 / 10 Excellent Human Being', isCorrect: false },
      { text: 'Infinite / 10: Irreplaceable Soul Sister For Life! 💖👭', isCorrect: true },
    ],
    feedback: '1000% FACTS! You are truly one in eight billion!',
  },
];

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx, opt) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    soundEngine.playSparkleSound();
    if (opt.isCorrect) {
      setScore(s => s + 25);
    }
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      soundEngine.playHornSound();
      fireBirthdayConfetti();
      fireSideCannons();
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  const qData = QUESTIONS[currentQ];

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <span className="scrapbook-tape left"></span>
        <span className="section-pill">Bestie Trivia</span>
        <h1>How Well Do We Know Smita? 🧠✨</h1>
        <p className="subtitle">
          A totally serious, 100% scientifically accurate quiz about our favorite birthday girl!
        </p>
        <span className="scrapbook-tape right"></span>
      </div>

      <div className="quiz-container-card">
        {!isFinished ? (
          <div className="quiz-inner-card">
            <div className="quiz-progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <div className="quiz-question-header">
              <span className="question-counter">Question {currentQ + 1} of {QUESTIONS.length}</span>
              <h2 className="quiz-question-title">{qData.question}</h2>
            </div>

            <div className="quiz-options-list">
              {qData.options.map((opt, idx) => {
                let statusClass = '';
                if (selectedOpt !== null) {
                  if (idx === selectedOpt) {
                    statusClass = opt.isCorrect ? 'correct' : 'wrong';
                  } else if (opt.isCorrect && selectedOpt !== null) {
                    statusClass = 'also-correct';
                  }
                }

                return (
                  <button
                    key={idx}
                    className={`quiz-opt-btn ${statusClass}`}
                    onClick={() => handleSelect(idx, opt)}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <span className="opt-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <div className="quiz-feedback-box">
                <p className="feedback-text">{qData.feedback}</p>
                <button className="primary-btn next-q-btn" onClick={handleNext}>
                  {currentQ < QUESTIONS.length - 1 ? 'Next Question →' : '🏆 See Final Result!'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quiz-certificate-card">
            <div className="cert-border">
              <div className="cert-header">
                <span className="cert-badge">🏅 OFFICIAL RECOGNITION 🏅</span>
                <h2>CERTIFICATE OF AWESOMENESS</h2>
              </div>

              <div className="cert-name-box">
                <h1 className="cert-name">✨ Sweetuuu ✨</h1>
              </div>

              <div className="cert-body">
                <p>
                  For scoring a perfect <strong>100% on the Awesomeness Index</strong>, having the purest heart, spreading unconditional joy, and being the world’s most incredible bestie!
                </p>
              </div>

              <div className="cert-signatures">
                <div className="sig-item">
                  <span className="sig-line">Official Bestie Seal</span>
                  <span className="sig-stamp">💖 VERIFIED 💖</span>
                </div>
                <div className="sig-item">
                  <span className="sig-line">Date Issued</span>
                  <span className="sig-text">Today & Forever 🗓️</span>
                </div>
              </div>

              <div className="cert-actions">
                <button className="reset-quiz-btn" onClick={resetQuiz}>
                  🔄 Retake Quiz
                </button>
                <Link to="/surprise" className="primary-btn">
                  🎁 Open Birthday Surprises →
                </Link>
                <Link to="/about" className="secondary-btn">
                  🌸 Read About Yourself →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
