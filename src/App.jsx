import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BirthdayJourney from './components/BirthdayJourney';
import LibraryPage from './pages/LibraryPage';
import GalleryPage from './pages/GalleryPage';
import CakePage from './pages/CakePage';
import MessagesPage from './pages/MessagesPage';
import QuizPage from './pages/QuizPage';
import AboutPage from './pages/AboutPage';
import SurprisePage from './pages/SurprisePage';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<BirthdayJourney />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cake" element={<CakePage />} />
        <Route path="/message" element={<MessagesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/surprise" element={<SurprisePage />} />
        <Route path="*" element={<BirthdayJourney />} />
      </Routes>
    </div>
  );
}

