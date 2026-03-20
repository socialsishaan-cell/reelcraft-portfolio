'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactClient() {
  const contactDetails = [
    { icon: '📧', title: 'Email', value: 'socialsishaan@gmail.com' },
    { icon: '📱', title: 'Phone', value: '+91 98199 81441' },
    { icon: '📍', title: 'Location', value: 'Mumbai, India' },
    { icon: '⏰', title: 'Response Time', value: 'Within 24 hours' },
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <ScrollReveal>
              <span className="badge badge-accent">Get in Touch</span>
              <h1 style={{ marginTop: '16px' }}>
                Let&apos;s Create <span className="gradient-text">Together</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                Have a project in mind? I&apos;d love to hear about it. Whether you need a
                commercial edited, a music video crafted, or a brand film produced,
                let&apos;s discuss how we can bring your vision to life.
              </p>
            </ScrollReveal>

            <div className="contact-details">
              {contactDetails.map((detail, i) => (
                <ScrollReveal key={detail.title} delay={0.15 + i * 0.08}>
                  <motion.div
                    className="contact-detail-item"
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      boxShadow: '0 0 30px rgba(155, 122, 240, 0.15)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="contact-detail-icon"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {detail.icon}
                    </motion.div>
                    <div className="contact-detail-text">
                      <h3>{detail.title}</h3>
                      <p>{detail.value}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
