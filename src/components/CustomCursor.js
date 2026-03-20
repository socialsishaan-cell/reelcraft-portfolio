'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  const onMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(true);
        const text = target.getAttribute('data-cursor') || '';
        setHoverText(text);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovering(false);
        setHoverText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile, onMouseMove]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
        }}
      />

      {/* Outer glow ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          borderColor: isHovering
            ? 'rgba(155, 122, 240, 0.6)'
            : 'rgba(155, 122, 240, 0.3)',
          boxShadow: isHovering
            ? '0 0 20px rgba(155, 122, 240, 0.3), inset 0 0 20px rgba(155, 122, 240, 0.1)'
            : '0 0 10px rgba(155, 122, 240, 0.1)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {hoverText && (
          <motion.span
            className="custom-cursor-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
