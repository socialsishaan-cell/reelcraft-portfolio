'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="video-player-wrapper"
      onClick={togglePlay}
      whileHover={{ boxShadow: '0 0 80px rgba(155, 122, 240, 0.15), 0 16px 64px rgba(0,0,0,0.6)' }}
      transition={{ duration: 0.3 }}
      data-cursor="Play"
    >
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ cursor: 'none' }}
      >
        Your browser does not support the video tag.
      </video>
    </motion.div>
  );
}
