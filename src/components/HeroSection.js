'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import CountUp from '@/components/CountUp';
import MagneticButton from '@/components/MagneticButton';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const wordAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HeroSection() {
  const line1 = ['Crafting', 'Stories,'];
  const line2 = ['Frame', 'by', 'Frame.'];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightBg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(155, 122, 240, 0.12), transparent 80%)`;

  return (
    <section className="hero" id="top">
      {/* Interactive mouse spotlight */}
      <motion.div
        className="hero-spotlight"
        style={{ background: spotlightBg }}
        aria-hidden="true"
      />

      {/* Ambient background glows */}
      <div className="hero-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-glow hero-glow-2" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">
          {/* Availability badge */}
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="dot" />
            Available for new projects
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={wordAnimation}
            initial="hidden"
            animate="visible"
          >
            {line1.map((word, i) => (
              <motion.span key={i} className="hero-word" variants={singleWord}>
                {word}{' '}
              </motion.span>
            ))}
            <br />
            {line2.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                className="hero-word shimmer-text"
                variants={singleWord}
              >
                {word}{' '}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            High-impact video editing, cinematic colour grading, and motion graphics
            tailored to connect with your audience — not your wallet.
            Based in Mumbai, available worldwide.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <MagneticButton>
              <Link href="/portfolio" className="btn btn-primary btn-lg">
                View My Work →
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact" className="btn btn-outline btn-lg">
                Get in Touch
              </Link>
            </MagneticButton>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Ishaan! I'm interested in working with you on a video project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-lg hero-whatsapp-link"
              aria-label="Direct chat on WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {[
              { count: 16, suffix: '+', label: 'Featured Reels' },
              { count: 3, suffix: '+', label: 'Years Behind Timeline' },
              { count: 15, suffix: '+', label: 'Clients & Brands' }
            ].map((stat) => (
              <div key={stat.label} className="hero-stat-card glass-panel">
                <h3 className="gradient-text">
                  <CountUp target={stat.count} suffix={stat.suffix} />
                </h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginTop: '6px' }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
