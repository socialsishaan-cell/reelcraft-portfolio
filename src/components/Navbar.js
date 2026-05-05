'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/#packages', label: 'Packages' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo" data-cursor="Home" style={{ whiteSpace: 'nowrap' }}>
            <span className="gradient-text">REEL</span>CRAFT
          </Link>

          <ul className="navbar-links">
            {links.map(link => (
              <li key={link.href}>
                <MagneticButton strength={0.15}>
                  <Link
                    href={link.href}
                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                    data-cursor=""
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.div
                        className="nav-link-underline"
                        layoutId="nav-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </MagneticButton>
              </li>
            ))}
          </ul>

          <MagneticButton strength={0.2}>
            <Link href="/contact" className="btn btn-primary navbar-cta navbar-cta-desktop hire-me-btn" data-cursor="Let's Talk">
              Hire Me
            </Link>
          </MagneticButton>

          <button
            className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link href={link.href}>{link.label}</Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: links.length * 0.05, duration: 0.3 }}
            >
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: '16px', width: '100%' }}>
                Hire Me
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
