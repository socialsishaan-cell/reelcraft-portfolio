'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  const containerRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeBtn = containerRef.current?.querySelector('.category-btn.active');
    if (activeBtn && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeCategory]);

  return (
    <div className="category-filter" ref={containerRef}>
      <motion.div
        className="category-pill-bg"
        animate={{
          left: pillStyle.left,
          width: pillStyle.width,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          height: '100%',
          top: 0,
          position: 'absolute',
        }}
      />
      {categories.map(cat => (
        <motion.button
          key={cat.value}
          className={`category-btn ${activeCategory === cat.value ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat.value)}
          id={`filter-${cat.value}`}
          whileTap={{ scale: 0.95 }}
        >
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
