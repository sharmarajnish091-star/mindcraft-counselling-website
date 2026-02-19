import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const educationData = [
  {
    year: '2019 — 2022',
    degree: 'Bachelor of Education (B.Ed)',
    institution: 'University of Rajasthan, Jaipur',
  },
  {
    year: '2016 — 2018',
    degree: 'PG Diploma in Counselling & Family Therapy',
    institution: 'IGNOU',
  },
  {
    year: '2015 — 2017',
    degree: 'M.A. / M.Sc. Clinical Psychology',
    institution: 'University of Rajasthan, Jaipur',
  },
  {
    year: '2012 — 2015',
    degree: 'B.A. / B.Sc. Psychology (Hons.) & English Literature',
    institution: 'University of Rajasthan, Jaipur',
  },
];

const Education = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="education" id="education" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Academic Background</span>
          <h2 className="section-title">Education</h2>
        </motion.div>

        <div className="edu-grid">
          {educationData.map((edu, i) => (
            <motion.div
              className="edu-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="edu-year">{edu.year}</div>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
