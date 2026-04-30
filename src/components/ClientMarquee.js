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
];

export default function ClientMarquee() {
  return (
    <div className="client-marquee-container">
      <div className="marquee-fade-left"></div>
      <div className="marquee-fade-right"></div>
      
      <motion.div
        className="client-marquee-track"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Render the array twice to ensure seamless looping */}
        {[...clients, ...clients].map((client, index) => (
          <div key={`${client}-${index}`} className="marquee-item">
            {client}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
