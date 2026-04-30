'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const testimonials = [
  {
    text: "Ishaan brought our vision to life. The edits were snappy, the colors were rich, and the turnaround time was incredible.",
    author: "Rohan K.",
    role: "Director, MCC Spectrum"
  },
  {
    text: "Working with ReelCraft elevated our corporate documentary. The storytelling through his cuts was deeply emotional and engaging.",
    author: "Dr. Ananya",
    role: "Head of Comms, Aurindam Hospital"
  },
  {
    text: "Absolutely stunning motion graphics and pacing. He knows exactly how to hook an audience from the first frame.",
    author: "Karan S.",
    role: "Content Creator"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonial-section section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-accent">Testimonials</span>
            <h2>Client <span className="gradient-text">Voices</span></h2>
          </div>
        </ScrollReveal>

        <div className="testimonial-container" style={{ position: 'relative', height: '250px', maxWidth: '800px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="testimonial-card glass-panel"
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
            >
              <div className="quote-icon" style={{ fontSize: '3rem', color: 'var(--accent-primary)', opacity: 0.3, marginBottom: '16px' }}>&quot;</div>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontStyle: 'italic', marginBottom: '24px', lineHeight: 1.6 }}>
                {testimonials[currentIndex].text}
              </p>
              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{testimonials[currentIndex].author}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === currentIndex ? 'var(--accent-primary)' : 'var(--border-light)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
