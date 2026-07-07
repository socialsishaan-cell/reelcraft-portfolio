import { Inter, Outfit, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import WhatsAppButton from '@/components/WhatsAppButton';
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

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'REELCRAFT — Video Editor Portfolio, Mumbai',
  description: 'Premium video editing, colour grading, motion graphics, and sound design by Ishaan — crafting compelling visual stories, frame by frame.',
  keywords: 'video editor, Mumbai, portfolio, video editing, colour grading, motion graphics, sound design, Ishaan',
  openGraph: {
    title: 'REELCRAFT — Video Editor Portfolio',
    description: 'Premium video editing, colour grading, motion graphics, and sound design by Ishaan — crafting compelling visual stories, frame by frame.',
    url: 'https://reelcraft-portfolio.vercel.app',
    siteName: 'ReelCraft',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REELCRAFT — Video Editor Portfolio, Mumbai',
    description: 'Premium video editing, colour grading, motion graphics, and sound design by Ishaan.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${bricolage.variable}`}>
      <body>
        <ClientLayout>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}

