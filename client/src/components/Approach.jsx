import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description:
      'We begin with a confidential conversation to understand your concerns, history, and goals. This is a no-pressure, safe space to share.',
  },
  {
    number: '02',
    title: 'Assessment & Diagnosis',
    description:
      'Using validated psychometric tools and clinical interviews, we conduct thorough assessments to understand your unique psychological profile.',
  },
  {
    number: '03',
    title: 'Personalized Treatment Plan',
    description:
      'Together, we create a tailored therapy plan using evidence-based approaches — CBT, NLP, REBT, or Family Therapy based on your needs.',
  },
  {
    number: '04',
    title: 'Ongoing Therapy & Growth',
    description:
      'Through regular sessions, we work on building coping mechanisms, breaking negative patterns, and empowering you towards lasting change.',
  },
];

const Approach = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="approach" id="approach" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Our Therapeutic Approach</h2>
          <p className="section-subtitle">
            A structured yet flexible process designed to meet you exactly where you are.
          </p>
        </motion.div>

        <div className="approach-grid">
          {steps.map((step, i) => (
            <motion.div
              className="approach-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="approach-number">{step.number}</div>
              <h3 className="approach-title">{step.title}</h3>
              <p className="approach-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
