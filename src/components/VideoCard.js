'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function VideoCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const categoryLabels = {
    'commercial': 'Commercial',
    'music-video': 'Music Video',
    'short-film': 'Short Film',
    'corporate': 'Corporate',
    'social-media': 'Social Media',
  };

  const isDriveUrl = project.videoUrl && project.videoUrl.includes('drive.google.com');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = (e) => {
    setTilt({ rotateX: 0, rotateY: 0 });
    if (!isDriveUrl) {
      const video = e.currentTarget.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleMouseEnter = (e) => {
    if (!isDriveUrl) {
      const video = e.currentTarget.querySelector('video');
      if (video) video.play().catch(() => {});
    }
  };

  // Convert Drive preview URL to embeddable thumbnail
  const getDriveThumbnail = (url) => {
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w640`;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/project/${project.id}`} className="video-card" id={`video-card-${project.id}`}>
        <motion.div
          ref={cardRef}
          className="video-card-inner"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          animate={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          data-cursor="View"
        >
          <div className="video-card-thumbnail">
            {isDriveUrl ? (
              <img
                src={getDriveThumbnail(project.videoUrl)}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <video
                src={project.videoUrl}
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}
            <div className="video-card-overlay">
              <div className="play-icon" />
            </div>
            <div className="video-card-category">
              <span className="badge badge-accent">
                {categoryLabels[project.category] || project.category}
              </span>
            </div>
          </div>
          <div className="video-card-body">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="video-card-meta">
              <span>{project.client}</span>
              <span>{new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
