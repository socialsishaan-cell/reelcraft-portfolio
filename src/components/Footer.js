'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

/* ── Proper SVG stroke social icons — no character hacks ── */
const IconYouTube = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const socialIcons = [
  // TODO: replace href="#" with real profile URLs before launch
  { label: 'YouTube',   Icon: IconYouTube,   href: '#' },
  { label: 'Instagram', Icon: IconInstagram, href: '#' },
  { label: 'X',         Icon: IconX,         href: '#' },
  { label: 'LinkedIn',  Icon: IconLinkedIn,  href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-divider-animated" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <ScrollReveal delay={0.1}>
            <div className="footer-brand">
              <h3><span className="gradient-text">REEL</span>CRAFT</h3>
              <p>
                Crafting compelling visual stories through expert video editing,
                colour grading, and motion design. Let&apos;s bring your vision to life.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="footer-col">
              <h4>Navigation</h4>
              <Link href="/">Home</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="footer-col">
              <h4>Categories</h4>
              <Link href="/portfolio?category=commercial">Commercial</Link>
              <Link href="/portfolio?category=music-video">Music Videos</Link>
              <Link href="/portfolio?category=corporate">Corporate</Link>
              <Link href="/portfolio?category=event">Events</Link>
              <Link href="/portfolio?category=photography">Photography</Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="mailto:socialsishaan@gmail.com">socialsishaan@gmail.com</a>
              <a href="tel:+919819981441">+91 98199 81441</a>
              <span style={{ fontSize: '.9rem', color: 'var(--text-secondary)' }}>Mumbai, India</span>
            </div>
          </ScrollReveal>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ReelCraft. All rights reserved.</p>
          <div className="footer-socials">
            {socialIcons.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                data-cursor={social.label}
                whileHover={{
                  scale: 1.2,
                  y: -3,
                  boxShadow: '0 0 20px rgba(79,216,196,0.4)',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="footer-social-icon"
              >
                <social.Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
