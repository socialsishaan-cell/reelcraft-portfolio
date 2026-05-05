'use client';

import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import VideoCard from '@/components/VideoCard';
import CountUp from '@/components/CountUp';
import MagneticButton from '@/components/MagneticButton';
import ClientMarquee from '@/components/ClientMarquee';
import ServicesBento from '@/components/ServicesBento';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import PackagesSection from '@/components/PackagesSection';
import ScrollReveal from '@/components/ScrollReveal';

const wordAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HomeClient({ featured }) {
  const heroLine1 = ['Crafting', 'Stories'];
  const heroLine2 = ['Frame', 'by', 'Frame'];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <motion.div
          className="hero-spotlight"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(155, 122, 240, 0.15),
                transparent 80%
              )
            `,
          }}
        />
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="dot" />
              Available for new projects
            </motion.div>

            <motion.h1
              variants={wordAnimation}
              initial="hidden"
              animate="visible"
            >
              {heroLine1.map((word, i) => (
                <motion.span key={i} className="hero-word" variants={singleWord}>
                  {word}
                </motion.span>
              ))}
              <br />
              {heroLine2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  className="hero-word shimmer-text"
                  variants={singleWord}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Creating content for you to make the impact on the audience not on your wallet. So let&apos;s start importing.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <MagneticButton>
                <Link href="/portfolio" className="btn btn-primary btn-lg" data-cursor="Explore">
                  View My Work →
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className="btn btn-outline btn-lg" data-cursor="Contact">
                  Get in Touch
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {[
                { count: 60, label: 'Projects Completed' },
                { count: 3, label: 'Years Experience' },
                { count: 15, label: 'Happy Clients' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="hero-stat-card glass-panel"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="gradient-text">
                    <CountUp target={stat.count} suffix="+" />
                  </h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ClientMarquee />

      {/* FEATURED PROJECTS */}
      <section className="featured-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-accent">Featured Work</span>
              <h2 style={{ marginTop: '16px' }}>Selected <span className="gradient-text">Projects</span></h2>
              <p>A curated selection of recent work across commercials, music videos, and cinematic storytelling.</p>
            </div>
          </ScrollReveal>
          <div className="projects-grid">
            {featured.map((project, i) => (
              <VideoCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <MagneticButton>
                <Link href="/portfolio" className="btn btn-outline btn-lg" data-cursor="All Work">
                  View All Projects →
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ServicesBento />
      
      <TestimonialCarousel />

      <PackagesSection />

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <div className="cta-wrapper">
              <span className="badge badge-accent">Let&apos;s Collaborate</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginTop: '16px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Have a project in mind?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 32px' }}>
                I&apos;m always open to discussing new projects, creative ideas, and opportunities to bring your vision to life.
              </p>
              <MagneticButton>
                <Link href="/contact" className="btn btn-primary btn-lg" data-cursor="Let's Talk">
                  Start a Conversation →
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
