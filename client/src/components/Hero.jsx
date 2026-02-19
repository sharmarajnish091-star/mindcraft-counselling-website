import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="dot" /> Accepting New Clients
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="gradient-text">MindCraft</span><br />
          Counselling Services
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A safe, nurturing space for mental wellness — led by Surbhi Sharma,
          a Clinical & Counselling Psychologist with 9+ years of experience.
          Evidence-based therapy tailored to your journey of healing and growth.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#contact" className="btn btn-primary">Book a Session</a>
          <a href="#services" className="btn btn-outline">Explore Services</a>
        </motion.div>

        <motion.div
          className="hero-trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Trusted by 1000+ clients</span>
          <span className="trust-dot" />
          <span>9+ years of practice</span>
          <span className="trust-dot" />
          <span>Evidence-based care</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
