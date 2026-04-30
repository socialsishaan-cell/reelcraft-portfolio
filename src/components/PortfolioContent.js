'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
import CategoryFilter from '@/components/CategoryFilter';
import PhotoGallery from '@/components/PhotoGallery';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'commercial', label: 'Commercials' },
  { value: 'music-video', label: 'Music Videos' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'event', label: 'Events' },
  { value: 'photography', label: 'Photography' },
];

export default function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isPhotography = activeCategory === 'photography';

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    if (isPhotography) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'all'
          ? '/api/projects'
          : `/api/projects?category=${activeCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeCategory, isPhotography]);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {isPhotography ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="photography"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PhotoGallery />
            </motion.div>
          </AnimatePresence>
        ) : loading ? (
          <motion.div
            key="skeleton"
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="video-card skeleton-card">
                <div className="video-thumbnail skeleton-pulse" />
                <div className="video-info">
                  <div className="skeleton-text skeleton-pulse" style={{ width: '60%' }} />
                  <div className="skeleton-text skeleton-pulse" style={{ width: '40%', marginTop: '8px' }} />
                </div>
              </div>
            ))}
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 0' }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
              No projects found in this category.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {projects.map((project, i) => (
                <VideoCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
