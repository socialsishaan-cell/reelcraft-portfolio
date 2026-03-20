'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

export default function AboutClient() {
  const skills = [
    { icon: '✂️', title: 'Video Editing', desc: 'Expert cutting, pacing, and narrative assembly in Premiere Pro, DaVinci Resolve, and Final Cut Pro.' },
    { icon: '🎨', title: 'Color Grading', desc: 'Professional color correction and cinematic grading using DaVinci Resolve and custom LUTs.' },
    { icon: '✨', title: 'Motion Graphics', desc: 'Dynamic titles, lower thirds, and animated elements crafted in After Effects.' },
    { icon: '🔊', title: 'Sound Design', desc: 'Audio mixing, sound effects layering, and music synchronization for immersive experiences.' },
    { icon: '🎭', title: 'Visual Effects', desc: 'Compositing, rotoscoping, and visual effects using Nuke and After Effects.' },
    { icon: '📐', title: 'Storyboarding', desc: 'Pre-visualization and story planning to ensure efficient shoots and cohesive narratives.' },
  ];

  const tools = [
    { icon: '🎬', name: 'Premiere Pro' },
    { icon: '🎨', name: 'DaVinci Resolve' },
    { icon: '✨', name: 'After Effects' },
    { icon: '🖥️', name: 'Final Cut Pro' },
    { icon: '💎', name: 'Nuke' },
    { icon: '🔮', name: 'Cinema 4D' },
    { icon: '🎵', name: 'Audition' },
    { icon: '📸', name: 'Photoshop' },
    { icon: '🖌️', name: 'Illustrator' },
    { icon: '📊', name: 'TouchDesigner' },
  ];

  return (
    <div className="about-page">
      {/* HERO */}
      <div className="container">
        <div className="about-hero">
          <ScrollReveal>
            <div className="about-image">
              <div className="about-image-placeholder">🎬</div>
            </div>
          </ScrollReveal>
          <div className="about-text">
            <ScrollReveal delay={0.1}>
              <span className="badge badge-accent">About Me</span>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h1 style={{ marginTop: '16px' }}>
                I&apos;m a <span className="gradient-text">Visual Storyteller</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p>
                With over 3 years of experience in video editing, I&apos;ve worked with
                creators, brands, and businesses to bring their stories to life through compelling visuals.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p>
                My approach combines technical precision with artistic intuition. Every cut,
                transition, and color choice serves the story. Whether it&apos;s a 15-second
                social reel or a full brand film, I believe in giving each project
                the meticulous attention it deserves.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <p>
                I work with clients across India and beyond — helping them create content
                that makes an impact on the audience, not on their wallet.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <MagneticButton>
                  <Link href="/portfolio" className="btn btn-primary" data-cursor="Explore">
                    View My Work →
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact" className="btn btn-outline" data-cursor="Contact">
                    Let&apos;s Talk
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <section className="about-skills">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-accent">Expertise</span>
              <h2 style={{ marginTop: '16px' }}>
                Skills & <span className="gradient-text">Capabilities</span>
              </h2>
              <p>A comprehensive skill set honed over years of diverse projects and continuous learning.</p>
            </div>
          </ScrollReveal>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.title} delay={i * 0.08}>
                <motion.div
                  className="skill-card"
                  whileHover={{ y: -4, boxShadow: '0 0 40px rgba(155, 122, 240, 0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="about-tools">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-accent">Toolkit</span>
              <h2 style={{ marginTop: '16px' }}>
                Software & <span className="gradient-text">Tools</span>
              </h2>
              <p>The industry-leading tools I use to deliver professional results on every project.</p>
            </div>
          </ScrollReveal>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.name} delay={i * 0.05}>
                <motion.div
                  className="tool-item"
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="tool-icon">{tool.icon}</div>
                  <div className="tool-name">{tool.name}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '16px' }}>
              Ready to create something <span className="gradient-text">amazing</span>?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              Let&apos;s discuss your project and see how we can bring your vision to life together.
            </p>
            <MagneticButton>
              <Link href="/contact" className="btn btn-primary btn-lg" data-cursor="Let's Talk">
                Get In Touch →
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
