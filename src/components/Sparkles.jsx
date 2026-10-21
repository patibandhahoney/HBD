import React, { useState } from 'react';

export default function Sparkles() {
  const [dots] = useState(() => Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${2 + Math.random() * 3}s`,
    size: `${3 + Math.random() * 5}px`,
    color: ['#ffe8a7', '#ffb5d5', '#c8b6ff', '#b8f2e6', '#ffd6a5'][i % 5],
  })));

  return (
    <div className="sparkle-layer" aria-hidden="true">
      {dots.map(dot => (
        <span
          key={dot.id}
          className="sparkle"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            boxShadow: `0 0 10px 2px ${dot.color}88`,
            animationDelay: dot.delay,
            animationDuration: dot.duration
          }}
        />
      ))}
    </div>
  );
}
