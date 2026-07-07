'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import FilmGrainOverlay from '@/components/FilmGrainOverlay';
import { MonsoonProvider } from '@/components/MonsoonContext';

export default function ClientLayout({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <MonsoonProvider>
      <CustomCursor />
      <FilmGrainOverlay />
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />
      {children}
    </MonsoonProvider>
  );
}
