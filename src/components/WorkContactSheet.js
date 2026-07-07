'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const TILTS = [-1.1, 0.7, -0.5, 0.9, -0.8, 0.5];

/* ─── Timeline ruler ─── */
function TimelineRuler() {
  const ticks = Array.from({ length: 24 });
  return (
    <div className="monsoon-ruler" aria-hidden="true">
      <div className="monsoon-ruler-ticks">
        {ticks.map((_, i) => <span key={i} />)}
      </div>
      <div className="monsoon-ruler-labels">
        <span>00:00</span>
        <span>00:06</span>
        <span>00:12</span>
        <span>00:18</span>
        <span>00:24</span>
      </div>
    </div>
  );
}

/* ─── Single work card ─── */
function WorkCard({ project, tilt, isAarpar }) {
  const thumbRef = useRef(null);
  const cardRef = useRef(null);

  // Colour-bloom reveal: desaturated → full colour on first viewport entry
  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            el.style.filter = 'grayscale(0) brightness(1)';
          } else {
            el.style.transition = 'filter 900ms cubic-bezier(.22,.9,.32,1)';
            el.style.filter = 'grayscale(0) brightness(1)';
          }
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Contact-sheet tilt — only apply after card enters view (so it doesn't fight reveal)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = `rotate(${tilt}deg)`;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [tilt]);

  const date = project.date
    ? new Date(project.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    : '';

  const categoryLabel = {
    'social-media': 'Social',
    'music-video': 'Music Video',
    'commercial': 'Commercial',
    'corporate': 'Corporate',
    'event': 'Event',
  }[project.category] || project.category;

  return (
    <article
      ref={cardRef}
      className="monsoon-work-card"
      style={{ '--card-tilt': `${tilt}deg` }}
    >
      <div
        ref={thumbRef}
        className="monsoon-work-thumb"
        style={{
          backgroundImage: project.thumbnailUrl && !project.thumbnailUrl.includes('placeholder')
            ? `url(${project.thumbnailUrl})`
            : undefined,
          filter: 'grayscale(0.9) brightness(0.7)',
        }}
      >
        <span className="monsoon-work-meta">
          {categoryLabel} · {date}
        </span>
        {/* Play icon overlay */}
        <svg className="monsoon-play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      <span className="monsoon-work-client">{project.client}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {/* Rohan K. testimonial — only on the Aarpar card */}
      {isAarpar && (
        <blockquote className="monsoon-work-quote">
          &ldquo;Snappy edits, rich colors, incredible turnaround.&rdquo;
          <cite> — Rohan K., Director, MCC Spectrum</cite>
        </blockquote>
      )}

      <Link href={`/project/${project.id}`} className="monsoon-card-link" aria-label={`View ${project.title}`}>
        View Project →
      </Link>
    </article>
  );
}

/* ─── Main grid ─── */
export default function WorkContactSheet({ featured }) {
  // Show up to 6 featured projects
  const cards = featured.slice(0, 6);

  return (
    <section className="monsoon-work-section" id="work">
      <div className="container">
        <div className="monsoon-section-head">
          <p className="monsoon-eyebrow">00:01 — Featured Work</p>
          <h2>A few frames from recent projects</h2>
        </div>

        <TimelineRuler />

        <div className="monsoon-work-grid">
          {cards.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              tilt={TILTS[i % TILTS.length]}
              isAarpar={project.id === '1'}
            />
          ))}
        </div>

        <div className="monsoon-work-footer">
          <Link href="/portfolio" className="monsoon-btn monsoon-btn-ghost">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
