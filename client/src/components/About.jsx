import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiBook, FiUsers } from 'react-icons/fi';

/* ── Animated Counter Hook ── */
const useCounter = (end, duration = 2000, start = 0, shouldStart = false) => {
  const [count, setCount] = useState(start);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;
    const numericEnd = parseInt(end, 10);
    if (isNaN(numericEnd)) { setCount(end); return; }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (numericEnd - start) + start));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [shouldStart, end, duration, start]);

  return count;
};

const AnimatedStat = ({ icon, number, label, inView, delay }) => {
  const numericPart = parseInt(number, 10);
  const suffix = number.replace(/\d/g, '');
  const animatedValue = useCounter(numericPart, 2000, 0, inView);

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">
        {inView ? `${animatedValue}${suffix}` : '0'}
      </div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
};

const stats = [
  { icon: <FiBriefcase />, number: '9+', label: 'Years Experience' },
  { icon: <FiUsers />, number: '1000+', label: 'Clients Helped' },
  { icon: <FiAward />, number: '6', label: 'Certifications' },
  { icon: <FiBook />, number: '4', label: 'Degrees' },
];

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">About MindCraft</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-photo-wrapper">
              <img
                src="/images/surbhi-sharma.jpg"
                alt="Surbhi Sharma — Founder, MindCraft Counselling Services"
                className="about-photo"
              />
            </div>
            <div className="floating-badge badge-1">Clinical Psych</div>
            <div className="floating-badge badge-2">M.A. / B.Ed</div>
            <div className="floating-badge badge-3">CBT / NLP</div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3>Empowering Minds, Transforming Lives</h3>
            <p>
              MindCraft Counselling Services was founded by Surbhi Sharma — a dedicated
              Psychologist specializing in Clinical & Counselling Psychology with a deep
              passion for helping individuals navigate life's challenges. With over 9 years
              of hands-on experience across hospitals, schools, universities, and private
              practice, we bring a holistic and empathetic approach to mental healthcare.
            </p>
            <p>
              Our practice is rooted in evidence-based modalities including Cognitive Behavioral
              Therapy (CBT), Neuro-Linguistic Programming (NLP), REBT, and Family Therapy. We
              believe every individual deserves a safe, non-judgemental space to heal, grow,
              and discover their full potential.
            </p>
            <p>
              Beyond therapy, we offer Human Resource consulting, talent acquisition,
              career counselling, and certified training programs — making MindCraft a
              comprehensive partner for personal and professional wellbeing.
            </p>
          </motion.div>
        </div>

        <div className="stats-row">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={i}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
              inView={inView}
              delay={0.5 + i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
