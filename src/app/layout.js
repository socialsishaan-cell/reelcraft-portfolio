import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'ReelCraft | Video Editor Portfolio',
  description: 'Premium video editing portfolio showcasing commercial spots, music videos, short films, and creative content. Crafting compelling visual stories.',
  keywords: 'video editor, portfolio, video editing, color grading, motion graphics, visual storyteller',
  openGraph: {
    title: 'ReelCraft | Video Editor Portfolio',
    description: 'Premium video editing portfolio by Ishaan. Crafting compelling visual stories frame by frame.',
    url: 'https://reelcraft-portfolio.vercel.app',
    siteName: 'ReelCraft',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReelCraft | Video Editor',
    description: 'Premium video editing portfolio. Crafting compelling visual stories frame by frame.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <ClientLayout>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
