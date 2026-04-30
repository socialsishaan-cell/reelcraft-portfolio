'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const socialIcons = [
  { label: 'YouTube', icon: '▶', href: '#' },
  { label: 'Instagram', icon: '✦', href: '#' },
  { label: 'Twitter', icon: '𝕏', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
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
                color grading, and motion design. Let&apos;s bring your vision to life.
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
              <a href="#">Mumbai, India</a>
            </div>
          </ScrollReveal>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ReelCraft. All rights reserved.</p>
          <div className="footer-socials">
            {socialIcons.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                data-cursor={social.label}
                whileHover={{
                  scale: 1.2,
                  y: -3,
                  boxShadow: '0 0 20px rgba(155, 122, 240, 0.4)',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
