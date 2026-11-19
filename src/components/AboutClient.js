'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

/* Clean inline stroke icons (16-18px, 1.5 stroke) */
const IconFilm = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18M17 3v18M3 7h4M17 7h4M3 12h18M3 17h4M17 17h4"/>
  </svg>
);

const IconSliders = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h10M18 6h2M4 12h4M10 12h10M4 18h13M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="7" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>
  </svg>
);

const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);

const IconAudio = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12h2l2-7 3 14 3-10 2 5h2M19 12h2"/>
  </svg>
);

const IconSpark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
  </svg>
);

const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

export default function AboutClient() {
  const skills = [
    { Icon: IconFilm, title: 'Video Editing', desc: 'Narrative cutting, pacing, and assembly in Premiere Pro, DaVinci Resolve, and Final Cut Pro.' },
    { Icon: IconSliders, title: 'Color Grading', desc: 'Professional color correction and cinematic grading matching look bibles in DaVinci Resolve.' },
    { Icon: IconLayers, title: 'Motion Graphics', desc: 'Dynamic titles, lower thirds, and animated overlays crafted in After Effects.' },
    { Icon: IconAudio, title: 'Sound Design', desc: 'Audio mixing, dialogue cleanup, sound effects layering, and music synchronisation.' },
    { Icon: IconSpark, title: 'Visual Effects', desc: 'Compositing, screen replacement, rotoscoping, and cleanup in After Effects and Nuke.' },
    { Icon: IconGrid, title: 'Storyboarding', desc: 'Pacing consultation and pre-edit breakdown to ensure cohesive narrative flow.' },
  ];

  const tools = [
    { category: 'NLE', name: 'Premiere Pro' },
    { category: 'Color', name: 'DaVinci Resolve' },
    { category: 'Motion', name: 'After Effects' },
    { category: 'NLE', name: 'Final Cut Pro' },
    { category: 'VFX', name: 'Nuke' },
    { category: '3D', name: 'Cinema 4D' },
    { category: 'Audio', name: 'Audition' },
    { category: 'Design', name: 'Photoshop' },
    { category: 'Vector', name: 'Illustrator' },
    { category: 'Generative', name: 'TouchDesigner' },
  ];

  return (
    <div className="about-page">
      {/* HERO */}
      <div className="container">
        <div className="about-hero">
          <ScrollReveal>
            <div className="about-image profile-image-container">
              <Image
                src="/profile.jpeg"
                alt="Ishaan — Video Editor"
                fill
                style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                sizes="(max-width: 1024px) 400px, 50vw"
                priority
              />
            </div>
          </ScrollReveal>

          <div className="about-text">
            <ScrollReveal delay={0.1}>
              <span className="badge">About</span>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h1 style={{ marginTop: '16px' }}>
                I&apos;m a visual storyteller
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p>
                With over 3 years of focused cutting behind the timeline, I partner with
                directors, creators, and brands to turn raw footage into compelling visual narratives.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p>
                My approach combines technical precision with narrative intuition. Every cut,
                transition, and color grade serves the story. Whether it&apos;s a fast-paced
                social campaign or a long-form brand film, each project gets deliberate craft.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <p>
                Based in Mumbai, working with clients across India and internationally.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Link href="/portfolio" className="btn btn-primary">
                  View Work →
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Get in Touch
                </Link>
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
              <span className="badge">Expertise</span>
              <h2 style={{ marginTop: '16px' }}>
                Skills &amp; Capabilities
              </h2>
              <p>Practical post-production skills refined through client deliveries.</p>
            </div>
          </ScrollReveal>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <ScrollReveal key={skill.title} delay={i * 0.05}>
                <div className="skill-card">
                  <div className="skill-icon">
                    <skill.Icon />
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                </div>
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
              <span className="badge">Toolkit</span>
              <h2 style={{ marginTop: '16px' }}>
                Software &amp; Tools
              </h2>
              <p>Industry-standard suites for editing, color science, and motion.</p>
            </div>
          </ScrollReveal>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.name} delay={i * 0.04}>
                <div className="tool-item">
                  <span className="tool-category">{tool.category}</span>
                  <div className="tool-name">{tool.name}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 600, marginBottom: '16px' }}>
              Ready to start your next edit?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              Let&apos;s discuss your project timelines, deliverables, and vision.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get in Touch →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
