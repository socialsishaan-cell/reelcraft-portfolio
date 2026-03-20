'use client';

import CustomCursor from '@/components/CustomCursor';
import FilmGrainOverlay from '@/components/FilmGrainOverlay';

export default function ClientLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <FilmGrainOverlay />
      {children}
    </>
  );
}
