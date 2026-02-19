import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  FiPhone, FiMail, FiLinkedin, FiMapPin,
  FiSend, FiCheck, FiAlertCircle
} from 'react-icons/fi';

const serviceOptions = [
  'Individual Counselling',
  'Family Therapy',
  'Couple Therapy',
  'Cognitive Behavioral Therapy (CBT)',
  'Career Counselling',
  'HR & Talent Acquisition Consulting',
  'NLP & Personal Growth Coaching',
  'Internships & Certificate Courses',
  'Psychological Assessment',
  'Other',
];

const contactInfo = [
  { icon: <FiPhone />, label: 'Phone', value: '+91 78778 02279', href: 'tel:+917877802279' },
  { icon: <FiMail />, label: 'Email', value: 'mindcraftjpr@gmail.com', href: 'mailto:mindcraftjpr@gmail.com' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'Surbhi Sharma', href: 'https://www.linkedin.com/in/surbhi-sharma-422264129' },
  { icon: <FiMapPin />, label: 'Location', value: 'ABD Pristine, Jagdamba Nagar, Near Jagdamba Circle, Jaipur', href: 'https://www.google.com/maps/search/ABD+Pristine+Jagdamba+Nagar+Jagdamba+Circle+Jaipur+Rajasthan' },
];

const ContactForm = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        const errorMsg = data.errors
          ? data.errors.map((e) => e.msg).join(', ')
          : data.error;
        setStatus({ type: 'error', message: errorMsg });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again or call directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Book a Session</h2>
          <p className="section-subtitle">
            Ready to take the first step? Fill out the form below and we'll get back
            to you within 24 hours to schedule your session.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Required *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me briefly about what you're going through or what you'd like help with..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading">Sending...</span>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>
          </motion.form>

          {/* Contact Info Sidebar */}
          <motion.div
            className="contact-sidebar"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="sidebar-card">
              <h3>Contact Information</h3>
              <p>
                Feel free to reach out through any of these channels. We're here
                to help you on your journey to better mental health.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((item, i) => (
                  <div className="contact-info-item" key={i}>
                    <div className="contact-info-icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-label">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="contact-info-value"
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-info-value">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card trust-card">
              <h4>Your Privacy Matters</h4>
              <p>
                All conversations and information shared through this form are
                treated with the utmost confidentiality. Your data is secure
                and will only be used to respond to your inquiry.
              </p>
            </div>

            <div className="sidebar-card map-card">
              <h3>Find Us</h3>
              <div className="map-embed">
                <iframe
                  src="https://maps.google.com/maps?q=ABD+Pristine+Jagdamba+Nagar+Jagdamba+Circle+Jaipur+Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MindCraft Counselling Services — Jaipur"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
