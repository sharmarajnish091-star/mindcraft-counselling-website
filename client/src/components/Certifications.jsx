import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiZap, FiLayers, FiMessageCircle, FiShield, FiBook, FiCpu } from 'react-icons/fi';

const certs = [
  { icon: <FiZap />, name: 'Neuro-Linguistic Programming (NLP)' },
  { icon: <FiLayers />, name: 'Cognitive Behavioral Therapy (CBT)' },
  { icon: <FiMessageCircle />, name: 'Rational Emotive Behavior Therapy (REBT)' },
  { icon: <FiShield />, name: 'Member — Counsellors Council of India' },
  { icon: <FiBook />, name: 'Learning Disabilities Specialist' },
  { icon: <FiCpu />, name: 'Cognitive Drill Therapy (CDT)' },
];

const Certifications = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="certifications" id="certifications" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certifications & Training</h2>
        </motion.div>

        <div className="cert-grid">
          {certs.map((cert, i) => (
            <motion.div
              className="cert-card"
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-name">{cert.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
