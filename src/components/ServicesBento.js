'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

export default function ServicesBento() {
  const services = [
    {
      title: "Video Editing",
      description: "Seamless pacing and narrative assembly using Premiere Pro and Final Cut.",
      icon: "🎬",
      span: "col-span-1 md:col-span-2 row-span-1",
      background: "linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, #000 100%)",
    },
    {
      title: "Color Grading",
      description: "Cinematic looks and mood setting with DaVinci Resolve.",
      icon: "🎨",
      span: "col-span-1 md:col-span-1 row-span-1",
      background: "linear-gradient(135deg, rgba(6, 78, 59, 0.3) 0%, #000 100%)",
    },
    {
      title: "Motion Graphics",
      description: "Dynamic titles and VFX crafted in After Effects.",
      icon: "✨",
      span: "col-span-1 md:col-span-1 row-span-1",
      background: "linear-gradient(135deg, rgba(131, 24, 67, 0.3) 0%, #000 100%)",
    },
    {
      title: "Sound Design",
      description: "Immersive audio mixing and foley.",
      icon: "🔊",
      span: "col-span-1 md:col-span-2 row-span-1",
      background: "linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, #000 100%)",
    }
  ];

  return (
    <section className="bento-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-accent">Expertise</span>
            <h2>Capabilities</h2>
            <p>A tailored approach to every aspect of post-production.</p>
          </div>
        </ScrollReveal>
        
        <div className="bento-grid">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.1}>
              <motion.div 
                className={`bento-card glass-panel ${svc.span}`}
                style={{ background: svc.background }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bento-icon">{svc.icon}</div>
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
