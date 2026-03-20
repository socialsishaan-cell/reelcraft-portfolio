'use client';

import { motion } from 'framer-motion';

export default function VideoPlayer({ src, title }) {
  // Google Drive URLs use iframe embed
  const isDriveUrl = src && src.includes('drive.google.com');

  if (isDriveUrl) {
    return (
      <motion.div
        className="video-player-wrapper"
        whileHover={{ boxShadow: '0 0 80px rgba(155, 122, 240, 0.15), 0 16px 64px rgba(0,0,0,0.6)' }}
        transition={{ duration: 0.3 }}
      >
        <iframe
          src={src}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
          style={{
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </motion.div>
    );
  }

  // Fallback for local video files
  return (
    <motion.div
      className="video-player-wrapper"
      whileHover={{ boxShadow: '0 0 80px rgba(155, 122, 240, 0.15), 0 16px 64px rgba(0,0,0,0.6)' }}
      transition={{ duration: 0.3 }}
      data-cursor="Play"
    >
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        style={{ cursor: 'none' }}
      >
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}
