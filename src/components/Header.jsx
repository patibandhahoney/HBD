import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home 🏠', end: true },
  { to: '/cake', label: 'Cake 🎂' },
  { to: '/gallery', label: 'Memories 📸' },
  { to: '/message', label: 'Letter 💌' },
  { to: '/quiz', label: 'Bestie Quiz 🧠✨' },
  { to: '/surprise', label: 'Surprises 🎁' },
  { to: '/about', label: 'About Smita 🌸' },
  { to: '/library', label: 'Library 🌻📚', externalTab: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Sunflower Library has its own dedicated topbar
  if (location.pathname === '/library') {
    return null;
  }

  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-heart">♡</span> Happy Birthday Smita
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => item.externalTab ? (
          <a
            key={item.to}
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link external-tab-link"
          >
            {item.label} ↗
          </a>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

