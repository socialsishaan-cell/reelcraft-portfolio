'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch('/api/photography');
        const data = await res.json();
        if (data.success) setPhotos(data.data);
      } catch (err) {
        console.error('Failed to fetch photos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox({ open: false, index: 0 });
    document.body.style.overflow = '';
  };

  const navigate = useCallback((dir) => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + dir + photos.length) % photos.length,
    }));
  }, [photos.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox.open, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: 'center', padding: '80px 0' }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          No photos found.
        </p>
      </motion.div>
    );
  }

  const current = photos[lightbox.index];

  return (
    <>
      <div className="photo-masonry-grid">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="photo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => openLightbox(i)}
            data-cursor="View"
          >
            <div className="photo-card-image">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="photo-card-overlay">
                <div className="photo-card-info">
                  <h4>{photo.title}</h4>
                  <p>{photo.description}</p>
                  <div className="photo-card-tags">
                    {photo.tags.map(tag => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="photo-expand-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && current && (
          <motion.div
            className="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="photo-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.imageUrl}
                alt={current.title}
                referrerPolicy="no-referrer"
              />
              <div className="photo-lightbox-info">
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <div className="photo-lightbox-counter">
                  {lightbox.index + 1} / {photos.length}
                </div>
              </div>
            </motion.div>

            <button
              className="photo-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              className="photo-lightbox-nav photo-lightbox-prev"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous photo"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="photo-lightbox-nav photo-lightbox-next"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next photo"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
