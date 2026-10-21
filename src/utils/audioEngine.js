// High quality Web Audio API Synthesizer & Sound Effects Engine
// 100% Client-side, zero external MP3 dependencies, reliable on all browsers!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrack = 0;
    this.volume = 0.5;
    this.isMuted = false;
    this.timerId = null;
    this.masterGain = null;

    this.tracks = [
      { id: 0, title: '🎂 Happy Birthday Music Box', desc: 'Sweet chiming acoustic bell melody' },
      { id: 1, title: '🌸 Bestie Lofi Sunset Chills', desc: 'Dreamy cozy friendship chords' },
      { id: 2, title: '🎉 Joyful Party Celebration', desc: 'Upbeat festive sparkle groove' },
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Play a soft bell/kalimba note
  playBellNote(freq, time, duration = 0.8, type = 'sine', gainMult = 0.3) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      // Add harmonic sparkle
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(gainMult * (this.volume || 0.5), time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc2.start(time);
      osc.stop(time + duration);
      osc2.stop(time + duration);
    } catch {
      // AudioContext lifecycle handle
    }
  }

  // Frequency lookup
  noteToFreq(noteName) {
    const notes = {
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
      'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
      'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
      'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
      'A5': 880.00, 'B5': 987.77, 'C6': 1046.50
    };
    return notes[noteName] || 440;
  }

  startTrack(trackId = 0) {
    this.init();
    this.stopTrack();
    this.isPlaying = true;
    this.currentTrack = trackId;

    if (trackId === 0) {
      this.playHappyBirthdayLoop();
    } else if (trackId === 1) {
      this.playLofiLoop();
    } else {
      this.playCelebrationLoop();
    }
  }

  stopTrack() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // Track 0: Happy Birthday chime
  playHappyBirthdayLoop() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime + 0.1;

    // Melody: Happy Birthday in F/G major
    const melody = [
      { note: 'G4', dur: 0.35, delay: 0.0 },
      { note: 'G4', dur: 0.25, delay: 0.4 },
      { note: 'A4', dur: 0.6,  delay: 0.7 },
      { note: 'G4', dur: 0.6,  delay: 1.4 },
      { note: 'C5', dur: 0.6,  delay: 2.1 },
      { note: 'B4', dur: 1.1,  delay: 2.8 },

      { note: 'G4', dur: 0.35, delay: 4.2 },
      { note: 'G4', dur: 0.25, delay: 4.6 },
      { note: 'A4', dur: 0.6,  delay: 4.9 },
      { note: 'G4', dur: 0.6,  delay: 5.6 },
      { note: 'D5', dur: 0.6,  delay: 6.3 },
      { note: 'C5', dur: 1.1,  delay: 7.0 },

      { note: 'G4', dur: 0.35, delay: 8.4 },
      { note: 'G4', dur: 0.25, delay: 8.8 },
      { note: 'G5', dur: 0.6,  delay: 9.1 },
      { note: 'E5', dur: 0.6,  delay: 9.8 },
      { note: 'C5', dur: 0.6,  delay: 10.5 },
      { note: 'B4', dur: 0.6,  delay: 11.2 },
      { note: 'A4', dur: 1.0,  delay: 11.9 },

      { note: 'F5', dur: 0.35, delay: 13.2 },
      { note: 'F5', dur: 0.25, delay: 13.6 },
      { note: 'E5', dur: 0.6,  delay: 13.9 },
      { note: 'C5', dur: 0.6,  delay: 14.6 },
      { note: 'D5', dur: 0.6,  delay: 15.3 },
      { note: 'C5', dur: 1.6,  delay: 16.0 },
    ];

    // Chords accompaniment (Music box style arpeggios)
    const chords = [
      { notes: ['C4', 'E4', 'G4'], time: 0 },
      { notes: ['G4', 'B4', 'D5'], time: 2.8 },
      { notes: ['G4', 'B4', 'D5'], time: 4.2 },
      { notes: ['C4', 'E4', 'G4'], time: 7.0 },
      { notes: ['C4', 'E4', 'G4'], time: 8.4 },
      { notes: ['F4', 'A4', 'C5'], time: 11.9 },
      { notes: ['C4', 'E4', 'G4'], time: 13.9 },
      { notes: ['G4', 'B4', 'D5'], time: 15.3 },
      { notes: ['C4', 'E4', 'G4', 'C5'], time: 16.0 }
    ];

    melody.forEach(item => {
      this.playBellNote(this.noteToFreq(item.note), now + item.delay, item.dur * 1.5, 'sine', 0.28);
    });

    chords.forEach(ch => {
      ch.notes.forEach((n, idx) => {
        this.playBellNote(this.noteToFreq(n), now + ch.time + idx * 0.12, 1.4, 'triangle', 0.15);
      });
    });

    const loopLengthMs = 18500;
    this.timerId = setTimeout(() => {
      if (this.isPlaying && this.currentTrack === 0) {
        this.playHappyBirthdayLoop();
      }
    }, loopLengthMs);
  }

  // Track 1: Lofi friendship chords
  playLofiLoop() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime + 0.1;

    const progression = [
      ['F4', 'A4', 'C5', 'E5'],
      ['E4', 'G4', 'B4', 'D5'],
      ['D4', 'F4', 'A4', 'C5'],
      ['C4', 'E4', 'G4', 'B4'],
    ];

    progression.forEach((chord, i) => {
      const timeOffset = i * 2.5;
      chord.forEach((note, nIdx) => {
        this.playBellNote(this.noteToFreq(note), now + timeOffset + (nIdx * 0.08), 2.2, 'sine', 0.22);
      });
      // Sweet high sparkle melody
      const sparkleNotes = ['C5', 'E5', 'G5', 'A5'];
      this.playBellNote(this.noteToFreq(sparkleNotes[i % 4]), now + timeOffset + 1.2, 0.9, 'triangle', 0.18);
    });

    this.timerId = setTimeout(() => {
      if (this.isPlaying && this.currentTrack === 1) {
        this.playLofiLoop();
      }
    }, 10000);
  }

  // Track 2: Joyful Celebration Pop
  playCelebrationLoop() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime + 0.1;

    const notes = ['C5', 'E5', 'G5', 'A5', 'G5', 'E5', 'C5', 'D5', 'E5', 'G5', 'C6', 'G5'];
    notes.forEach((note, i) => {
      this.playBellNote(this.noteToFreq(note), now + i * 0.45, 0.5, 'sine', 0.25);
    });

    this.timerId = setTimeout(() => {
      if (this.isPlaying && this.currentTrack === 2) {
        this.playCelebrationLoop();
      }
    }, 6000);
  }

  // SOUND EFFECTS

  // Balloon Pop Sound
  playPopSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

      gain.gain.setValueAtTime(0.4 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.09);

      // Noise click for the rubber pop
      this.playNoisePuff(now, 0.05, 0.25);
    } catch {}
  }

  // Candle Blow Sound (Air Whoosh)
  playBlowSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(200, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
    } catch {}
  }

  // Spark / Candle Lighting sound
  playIgniteSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      this.playBellNote(1200, now, 0.15, 'sine', 0.2);
      this.playBellNote(1600, now + 0.06, 0.2, 'sine', 0.25);
    } catch {}
  }

  // Cake Slicing Sound
  playSliceSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        this.playBellNote(f, now + i * 0.06, 0.4, 'sine', 0.25);
      });
    } catch {}
  }

  // Party Fanfare & Horn
  playHornSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((f) => {
        this.playBellNote(f, now, 1.2, 'sawtooth', 0.15);
      });
      // Arpeggio glissando up
      [783.99, 880, 987.77, 1046.5, 1318.5].forEach((f, i) => {
        this.playBellNote(f, now + 0.2 + i * 0.07, 0.6, 'sine', 0.2);
      });
    } catch {}
  }

  // Sparkle / Envelope Rustle Chime
  playSparkleSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      [880, 1046.5, 1318.5, 1567.98, 2093].forEach((f, i) => {
        this.playBellNote(f, now + i * 0.05, 0.5, 'sine', 0.2);
      });
    } catch {}
  }

  playNoisePuff(time, duration = 0.05, vol = 0.2) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol * this.volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    noise.connect(gain);
    gain.connect(this.masterGain);
    noise.start(time);
  }
}

export const soundEngine = new SoundEngine();
