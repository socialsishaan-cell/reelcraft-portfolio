'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const MonsoonContext = createContext({
  timecode: '00:00:00:00',
  thunderActive: false,
});

export function MonsoonProvider({ children }) {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [thunderActive, setThunderActive] = useState(false);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const thunderTimerRef = useRef(null);

  // Live timecode — wall-clock frames at ~25fps display
  useEffect(() => {
    startRef.current = Date.now();

    function tick() {
      const elapsed = Date.now() - startRef.current;
      const totalFrames = Math.floor(elapsed / 40); // 25fps
      const frames = totalFrames % 25;
      const totalSecs = Math.floor(elapsed / 1000);
      const secs = totalSecs % 60;
      const mins = Math.floor(totalSecs / 60) % 60;
      const hrs = Math.floor(totalSecs / 3600) % 24;
      const pad = (n, d = 2) => String(n).padStart(d, '0');
      setTimecode(`${pad(hrs)}:${pad(mins)}:${pad(secs)}:${pad(frames)}`);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Thunder scheduler
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    function scheduleThunder() {
      const delay = 18000 + Math.random() * 20000; // 18–38 s
      thunderTimerRef.current = setTimeout(() => {
        setThunderActive(true);
        setTimeout(() => setThunderActive(false), 130); // < 150 ms
        scheduleThunder();
      }, delay);
    }

    scheduleThunder();
    return () => clearTimeout(thunderTimerRef.current);
  }, []);

  return (
    <MonsoonContext.Provider value={{ timecode, thunderActive }}>
      {children}
    </MonsoonContext.Provider>
  );
}

export function useMonsoon() {
  return useContext(MonsoonContext);
}
