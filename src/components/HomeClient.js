'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import ClientMarquee from '@/components/ClientMarquee';
import ServicesBento from '@/components/ServicesBento';
import PackagesSection from '@/components/PackagesSection';
import ScrollReveal from '@/components/ScrollReveal';
import MonsoonHero from '@/components/MonsoonHero';
import WorkContactSheet from '@/components/WorkContactSheet';

export default function HomeClient({ featured }) {
  return (
    <>
      {/* ── HERO — Monsoon Cut ── */}
      <MonsoonHero />

      {/* ── CLIENT MARQUEE — film credits style ── */}
      <ClientMarquee />

      {/* ── FEATURED WORK — contact sheet grid ── */}
      <WorkContactSheet featured={featured} />

      {/* ── CAPABILITIES — proper SVG icons ── */}
      <ServicesBento />

      {/* ── PACKAGES ── */}
      <PackagesSection />

      {/* ── CTA ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <div className="cta-wrapper">
              <span className="badge badge-accent">Let&apos;s Collaborate</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginTop: '16px',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}>
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
