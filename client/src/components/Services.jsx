import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  FiHeart, FiUsers, FiTarget, FiBookOpen,
  FiBriefcase, FiStar, FiAward, FiFeather
} from 'react-icons/fi';

const services = [
  {
    icon: <FiHeart />,
    title: 'Individual Counselling',
    description:
      'One-on-one therapy sessions tailored to your personal challenges — anxiety, depression, stress management, self-esteem, and emotional wellbeing.',
  },
  {
    icon: <FiUsers />,
    title: 'Family Therapy',
    description:
      'Strengthen family bonds, improve communication, and resolve conflicts through structured therapeutic sessions for the whole family.',
  },
  {
    icon: <FiFeather />,
    title: 'Couple Therapy',
    description:
      'Rebuild trust, enhance communication, and navigate relationship challenges together through guided couples counselling in a safe, neutral space.',
  },
  {
    icon: <FiTarget />,
    title: 'Cognitive Behavioral Therapy',
    description:
      'Evidence-based CBT techniques to identify and change negative thought patterns, build coping strategies, and develop healthier behaviours.',
  },
  {
    icon: <FiBookOpen />,
    title: 'Career Counselling',
    description:
      'Comprehensive career guidance for students and professionals — aptitude assessments, career mapping, interview preparation, and goal setting.',
  },
  {
    icon: <FiBriefcase />,
    title: 'HR & Talent Acquisition',
    description:
      'Expert consultation for organizations — psychological assessments for hiring, employee wellness programs, and talent management strategies.',
  },
  {
    icon: <FiStar />,
    title: 'NLP & Personal Growth',
    description:
      'Neuro-Linguistic Programming based coaching for peak performance, overcoming limiting beliefs, and unlocking your true potential.',
  },
  {
    icon: <FiAward />,
    title: 'Internships & Certificate Courses',
    description:
      'Structured psychology internship programs and certified training courses for aspiring counsellors and psychology students looking to build practical skills.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            Comprehensive psychological services designed to support your mental health,
            personal growth, and professional development.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              className="service-card"
              key={i}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <a href="#contact" className="service-link">
                Book Now <span>&rarr;</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
