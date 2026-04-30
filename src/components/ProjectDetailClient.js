'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="skeleton-pulse" style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-lg)' }} />
  )
});

const categoryLabels = {
  'commercial': 'Commercial',
  'music-video': 'Music Video',
  'short-film': 'Short Film',
  'corporate': 'Corporate',
  'social-media': 'Social Media',
  'event': 'Event',
};

export default function ProjectDetailClient({ project, prevProject, nextProject }) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="project-detail">
      <div className="container">
        <motion.div
          className="project-detail-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/portfolio" className="project-back-link" data-cursor="Back">
            ← Back to Portfolio
          </Link>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="badge badge-accent">
              {categoryLabels[project.category] || project.category}
            </span>
            {project.featured && <span className="badge">★ Featured</span>}
          </div>
          <h1>{project.title}</h1>
          <div className="project-detail-meta">
            <span>🏢 {project.client}</span>
            <span>📅 {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <VideoPlayer src={project.videoUrl} title={project.title} />
        </motion.div>

        <div className="project-detail-content">
          <ScrollReveal delay={0.1}>
            <div className="project-detail-description">
              <h2>About This Project</h2>
              <p>{project.longDescription}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="project-detail-sidebar">
              <div className="sidebar-card">
                <h3>Project Details</h3>
                <div className="sidebar-item">
                  <span className="label">Client</span>
                  <span className="value">{project.client}</span>
                </div>
                <div className="sidebar-item">
                  <span className="label">Category</span>
                  <span className="value">{categoryLabels[project.category]}</span>
                </div>
                <div className="sidebar-item">
                  <span className="label">Date</span>
                  <span className="value">
                    {new Date(project.date).toLocaleDateString('en-US', {
                      month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="project-tags" style={{ marginTop: '20px' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="project-nav" style={{ marginBottom: '80px' }}>
            {prevProject ? (
              <motion.div whileHover={{ x: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href={`/project/${prevProject.id}`} data-cursor="Previous">
                  <span className="nav-label">← Previous Project</span>
                  <span className="nav-title gradient-text">{prevProject.title}</span>
                </Link>
              </motion.div>
            ) : <div />}
            {nextProject ? (
              <motion.div whileHover={{ x: 8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href={`/project/${nextProject.id}`} style={{ textAlign: 'right' }} data-cursor="Next">
                  <span className="nav-label">Next Project →</span>
                  <span className="nav-title gradient-text">{nextProject.title}</span>
                </Link>
              </motion.div>
            ) : <div />}
          </div>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ y: -5, boxShadow: '0 0 20px rgba(155, 122, 240, 0.4)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            data-cursor="Top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
