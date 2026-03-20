'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import VideoCard from '@/components/VideoCard';
import CategoryFilter from '@/components/CategoryFilter';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'commercial', label: 'Commercials' },
  { value: 'music-video', label: 'Music Videos' },
  { value: 'short-film', label: 'Short Films' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'social-media', label: 'Social Media' },
];

export default function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
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
  }, [activeCategory]);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
          </div>
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
