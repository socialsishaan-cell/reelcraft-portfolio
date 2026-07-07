'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Proper SVG stroke icons — no emoji ── */
const IconFilmStrip = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9.5V19a1 1 0 001 1h16a1 1 0 001-1V9.5H3z"/>
    <path d="M3 9.5l1.5-4.5h4l-1.5 4.5M9 9.5l1.5-4.5h4l-1.5 4.5M15 9.5l1.5-4.5h3.5a1 1 0 011 1v3.5"/>
  </svg>
);

const IconColorSliders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h10M18 6h2M4 12h4M10 12h10M4 18h13M20 18h0"/>
    <circle cx="16" cy="6" r="2"/>
    <circle cx="7" cy="12" r="2"/>
    <circle cx="17" cy="18" r="2"/>
  </svg>
);

const IconMotionLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="9" height="9" rx="2"/>
    <rect x="12" y="12" width="9" height="9" rx="2"/>
    <path d="M12 7h5a2 2 0 012 2v5"/>
  </svg>
);

const IconWaveform = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12h2l2-7 3 14 3-10 2 5h2M19 12h2"/>
  </svg>
);

export default function ServicesBento() {
  const services = [
    {
      title: "Video Editing",
      description: "Seamless pacing and narrative assembly using Premiere Pro and Final Cut.",
      Icon: IconFilmStrip,
      background: "linear-gradient(135deg, rgba(31,110,99,0.35) 0%, rgba(20,33,58,0) 100%)",
    },
    {
      title: "Colour Grading",
      description: "Cinematic looks and mood setting with DaVinci Resolve.",
      Icon: IconColorSliders,
      background: "linear-gradient(135deg, rgba(79,216,196,0.12) 0%, rgba(20,33,58,0) 100%)",
    },
    {
      title: "Motion Graphics",
      description: "Dynamic titles and VFX crafted in After Effects.",
      Icon: IconMotionLayers,
      background: "linear-gradient(135deg, rgba(138,90,22,0.25) 0%, rgba(20,33,58,0) 100%)",
    },
    {
      title: "Sound Design",
      description: "Immersive audio mixing and foley that makes every cut land.",
      Icon: IconWaveform,
      background: "linear-gradient(135deg, rgba(30,58,138,0.3) 0%, rgba(20,33,58,0) 100%)",
    }
  ];

  return (
    <section className="bento-section" id="capabilities">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-accent">00:02 — Expertise</span>
            <h2 style={{ marginTop: '16px' }}>Capabilities</h2>
            <p>A tailored approach to every aspect of post-production.</p>
          </div>
        </ScrollReveal>

        <div className="bento-grid">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.1}>
              <motion.div
                className="bento-card glass-panel"
                style={{ background: svc.background }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bento-icon">
                  <svc.Icon />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
