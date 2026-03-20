'use client';

export default function FilmGrainOverlay() {
  return (
    <div className="film-grain-overlay" aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
    </div>
  );
}
