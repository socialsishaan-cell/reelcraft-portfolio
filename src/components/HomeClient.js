'use client';

import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ClientMarquee from '@/components/ClientMarquee';
import VideoCard from '@/components/VideoCard';
import ServicesBento from '@/components/ServicesBento';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import PackagesSection from '@/components/PackagesSection';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

export default function HomeClient({ featured = [] }) {
  // Show up to 6 curated featured projects on homepage
  const displayedProjects = featured.slice(0, 6);

  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── CLIENT MARQUEE ── */}
      <ClientMarquee />

      {/* ── FEATURED PROJECTS ── */}
      <section className="featured-section" id="work">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="badge badge-accent">Featured Work</span>
              <h2 style={{ marginTop: '16px' }}>
                Selected Projects
              </h2>
              <p>
                A curated selection of recent work across commercials, music videos,
                brand stories, and social media reels.
              </p>
            </div>
          </ScrollReveal>

          <div className="projects-grid">
            {displayedProjects.map((project, i) => (
              <VideoCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <MagneticButton>
                <Link href="/portfolio" className="btn btn-outline btn-lg">
                  View All Projects ({featured.length > 0 ? `${featured.length}+` : 'Explore'}) →
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <ServicesBento />

      {/* ── TESTIMONIALS ── */}
      <TestimonialCarousel />

      {/* ── PACKAGES & PRICING ── */}
      <PackagesSection />

      {/* ── CALL TO ACTION ── */}
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto 32px' }}>
                I&apos;m always open to discussing new projects, creative ideas, and opportunities to bring your vision to life.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <MagneticButton>
                  <Link href="/contact" className="btn btn-primary btn-lg">
                    Start a Conversation →
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/portfolio" className="btn btn-outline btn-lg">
                    Browse Portfolio
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
