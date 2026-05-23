import { useState, useCallback } from 'react';

const DANCE_MODES = ['dance', 'wiggle', 'bounce', 'spin'];

export function useAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [modeIndex, setModeIndex] = useState(0);
  const [notes, setNotes] = useState([]);
  const [stars, setStars] = useState([]);

  const currentMode = isPlaying ? DANCE_MODES[modeIndex] : null;

  const toggle = useCallback(() => {
    setIsPlaying(p => !p);
  }, []);

  const nextMode = useCallback(() => {
    setModeIndex(i => (i + 1) % DANCE_MODES.length);
  }, []);

  const spawnNote = useCallback((x, y) => {
    const id = Date.now() + Math.random();
    const noteChars = ['♪', '♫', '♬', '🎵', '🎶'];
    const char = noteChars[Math.floor(Math.random() * noteChars.length)];
    setNotes(n => [...n, { id, char, x, y }]);
    setTimeout(() => setNotes(n => n.filter(n => n.id !== id)), 1200);
  }, []);

  const spawnStars = useCallback((cx, cy) => {
    const newStars = Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return {
        id: Date.now() + i,
        char: ['⭐', '✨', '💫'][i % 3],
        x: cx,
        y: cy,
        tx: Math.round(Math.cos(angle) * 60) + 'px',
        ty: Math.round(Math.sin(angle) * 60) + 'px',
      };
    });
    setStars(s => [...s, ...newStars]);
    setTimeout(() => {
      const ids = newStars.map(s => s.id);
      setStars(s => s.filter(s => !ids.includes(s.id)));
    }, 1000);
  }, []);

  return {
    isPlaying,
    currentMode,
    modeName: DANCE_MODES[modeIndex],
    toggle,
    nextMode,
    notes,
    stars,
    spawnNote,
    spawnStars,
  };
}
