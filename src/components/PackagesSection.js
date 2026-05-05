'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

/* ── SVG Icons (inline, no external deps) ── */
const IconFilm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 7h4"/><path d="M17 7h4"/><path d="M3 12h18"/><path d="M3 17h4"/><path d="M17 17h4"/></svg>
);

const IconImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);

const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const packages = [
  {
    name: 'Trail',
    tagline: 'Test the waters',
    popular: false,
    items: [
      { icon: <IconFilm />, text: '1 Reel' },
      { icon: <IconImage />, text: '1 Design Post' },
    ],
  },
  {
    name: 'Basic',
    tagline: 'Build your presence',
    popular: true,
    items: [
      { icon: <IconFilm />, text: '5 Reels' },
      { icon: <IconImage />, text: '4 Posts' },
      { icon: <IconUsers />, text: '1 Influencer Collaboration Reel' },
    ],
  },
  {
    name: 'Premium',
    tagline: 'Scale your brand',
    popular: false,
    items: [
      { icon: <IconCalendar />, text: '2 Reels per week (for a month)' },
      { icon: <IconCalendar />, text: '1 Post per week (for a month)' },
      { icon: <IconUsers />, text: '2 Influencer Collaboration Reels' },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function PackagesSection() {
  return (
    <section className="packages-section" id="packages">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="badge badge-accent">Packages</span>
            <h2 style={{ marginTop: '16px' }}>
              Packages &amp; <span className="gradient-text">Quotation</span>
            </h2>
            <p>
              Flexible packages tailored to your content needs. From a single
              reel to full-scale monthly content — let&apos;s find your perfect
              fit.
            </p>
          </div>
        </ScrollReveal>

        <div className="packages-grid">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              className={`package-card ${pkg.popular ? 'package-card--popular' : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              {/* Glow effect on hover (via CSS) */}
              <div className="package-card__glow" />

              {pkg.popular && (
                <div className="package-card__badge">Most Popular</div>
              )}

              <div className="package-card__header">
                <h3 className="package-card__name">{pkg.name}</h3>
                <p className="package-card__tagline">{pkg.tagline}</p>
              </div>

              <div className="package-card__divider" />

              <ul className="package-card__list" role="list">
                {pkg.items.map((item, idx) => (
                  <li key={idx} className="package-card__item">
                    <span className="package-card__icon">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'} package-card__cta`}
                aria-label={`Contact me about the ${pkg.name} package`}
              >
                Contact Me
                <IconArrowRight />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
