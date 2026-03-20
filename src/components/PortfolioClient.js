'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import PortfolioContent from '@/components/PortfolioContent';

export default function PortfolioClient() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge badge-accent">Portfolio</span>
          </motion.div>
          <motion.h1
            style={{ marginTop: '16px' }}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            My <span className="gradient-text">Work</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse through my collection of video editing projects across various categories and styles.
          </motion.p>
        </div>
      </div>

      <Suspense fallback={
        <div className="loading-container">
          <div className="spinner" />
        </div>
      }>
        <PortfolioContent />
      </Suspense>
    </>
  );
}
