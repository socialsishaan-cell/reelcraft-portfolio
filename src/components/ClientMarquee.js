'use client';

import { motion } from 'framer-motion';

const clients = [
  "MCC Spectrum",
  "Aurindam Hospital",
  "EduContent",
  "Nexus Tech",
  "Creative Studios",
  "Visionary Brands",
  "Global Media",
  "Waffle Forever",
  "Reliserve Solutions",
  "Daisy Legacy",
  "RCC Tailors",
  "LODHA Group",
  "Irani Deli & Co.",
  "Classy Fashion",
];

export default function ClientMarquee() {
  // Duplicate for seamless infinite loop
  const doubled = [...clients, ...clients];

  return (
    <div className="client-marquee-container">
      <p className="marquee-credits-label">— in collaboration with —</p>

      <div className="marquee-fade-left" aria-hidden="true" />
      <div className="marquee-fade-right" aria-hidden="true" />

      <motion.div
        className="client-marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 40,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((client, index) => (
          <div key={`${client}-${index}`} className="marquee-item">
            {client}
            <span className="marquee-sep">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
