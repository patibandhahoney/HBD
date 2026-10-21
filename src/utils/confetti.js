import confetti from 'canvas-confetti';

export function fireBirthdayConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff719a', '#ffe17d', '#ff9472']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#a881ff', '#70e2d2', '#ff6b8b']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffd166', '#06d6a0', '#118ab2', '#ef476f']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['star', 'circle'],
    colors: ['#ffe600', '#ff0077', '#00e5ff']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9']
  });
}

export function fireHeartConfetti(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { x, y },
    colors: ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#ffd166'],
    shapes: ['circle'],
    scalar: 1.2
  });
}

export function fireSideCannons() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#bb0000', '#ffffff', '#ff69b4', '#ffd700', '#7b2cbf'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

export function fireSunflowerConfetti(x = 0.5, y = 0.6) {
  confetti({
    particleCount: 60,
    spread: 80,
    origin: { x, y },
    colors: ['#ffb703', '#fb8500', '#ffd166', '#ffc300', '#588157', '#fff3b0'],
    shapes: ['circle', 'star'],
    scalar: 1.3
  });
}

