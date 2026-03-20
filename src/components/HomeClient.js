'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
import CountUp from '@/components/CountUp';
import MagneticButton from '@/components/MagneticButton';
import GradientBlobs from '@/components/GradientBlobs';
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

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <GradientBlobs />
        </div>
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
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="hero-stat">
                <h3 className="gradient-text">
                  <CountUp target={50} suffix="+" />
                </h3>
                <p>Projects Completed</p>
              </div>
              <div className="hero-stat">
                <h3 className="gradient-text">
                  <CountUp target={3} suffix="+" />
                </h3>
                <p>Years Experience</p>
              </div>
              <div className="hero-stat">
                <h3 className="gradient-text">
                  <CountUp target={10} suffix="+" />
                </h3>
                <p>Happy Clients</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
