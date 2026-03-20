import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'ReelCraft | Video Editor Portfolio',
  description: 'Premium video editing portfolio showcasing commercial spots, music videos, short films, and creative content. Crafting compelling visual stories.',
  keywords: 'video editor, portfolio, video editing, color grading, motion graphics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
