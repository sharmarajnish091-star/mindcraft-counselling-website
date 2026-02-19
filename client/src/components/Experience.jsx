import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  FiShield, FiUsers, FiActivity, FiHome,
  FiTrendingUp, FiBookOpen
} from 'react-icons/fi';

const highlights = [
  {
    icon: <FiActivity />,
    title: 'Clinical Practice',
    description: 'Our founder started her career at Gautam Hospital & Research Centre of Psychiatry, managing clinical cases including OPD, IPD, MSE evaluations, and family therapy — building a strong clinical foundation.',
  },
  {
    icon: <FiBookOpen />,
    title: 'Educational Impact',
    description: 'Served as PGT Psychology across leading institutions, shaping curriculum, conducting assessments, and mentoring students while running career counselling programs.',
  },
  {
    icon: <FiUsers />,
    title: 'Leadership & Scale',
    description: 'Led counselling operations at Jaipur National University for 5 years — managing group/individual therapy, supervising teams, and building institutional counselling frameworks.',
  },
  {
    icon: <FiHome />,
    title: 'Diverse Settings',
    description: 'Practiced across hospitals, schools, universities, and corporate environments — adapting therapeutic approaches for each unique context and audience.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'HR & Recruitment',
    description: 'Bridged psychology with business by leading talent acquisition, psychometric hiring assessments, and employee wellness programs for organizations.',
  },
  {
    icon: <FiShield />,
    title: 'Trusted Credentials',
    description: 'Registered member of the Counsellors Council of India with 6 specialized certifications including CBT, NLP, REBT, and Cognitive Drill Therapy.',
  },
];

const workplaces = [
  'Jaipur National University',
  'Gautam Hospital & Research Centre',
  'TGES — Scoogle',
  'Med 365',
];

const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">9+ Years of Transforming Lives</h2>
          <p className="section-subtitle">
            From clinical psychiatry to university counselling, we bring deep expertise
            across multiple domains of psychology and human development.
          </p>
        </motion.div>

        <div className="exp-highlights-grid">
          {highlights.map((item, i) => (
            <motion.div
              className="exp-highlight-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="exp-highlight-icon">{item.icon}</div>
              <div className="exp-highlight-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="workplace-strip"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="workplace-label">Trusted by leading institutions</span>
          <div className="workplace-logos">
            {workplaces.map((name, i) => (
              <div className="workplace-item" key={i}>{name}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
