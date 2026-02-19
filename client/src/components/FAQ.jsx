import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: 'What should I expect in my first session?',
    answer:
      'Your first session is a 45–60 minute consultation where we discuss your concerns, personal history, and therapy goals. It is completely confidential and designed to help us understand your needs so we can build a personalized treatment plan together.',
  },
  {
    question: 'What therapeutic approaches do you use?',
    answer:
      'We use evidence-based modalities including Cognitive Behavioral Therapy (CBT), Neuro-Linguistic Programming (NLP), Rational Emotive Behavior Therapy (REBT), Cognitive Drill Therapy, and Family Therapy. The approach is always tailored to what works best for you.',
  },
  {
    question: 'Is therapy only for people with serious mental health issues?',
    answer:
      'Not at all. Therapy is for anyone who wants to improve their mental wellbeing, manage stress, build better relationships, navigate career decisions, or simply have a safe space to reflect and grow. You don\'t need a diagnosis to benefit from counselling.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions varies depending on your goals and the nature of your concerns. Some clients benefit from 6–8 focused sessions, while others prefer ongoing support. We will regularly review your progress and adjust the plan together.',
  },
  {
    question: 'Do you offer online / virtual sessions?',
    answer:
      'Yes, we offer both in-person sessions at our Jaipur clinic and secure online video sessions for clients anywhere in India. Virtual therapy provides the same quality of care with the convenience of attending from your own space.',
  },
  {
    question: 'Is everything I share kept confidential?',
    answer:
      'Absolutely. Confidentiality is the cornerstone of our therapeutic relationship. Everything discussed in our sessions is strictly private, except in rare situations involving immediate risk to safety as required by professional ethics.',
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className={`faq-item ${isOpen ? 'active' : ''}`} onClick={onClick}>
    <div className="faq-question">
      <h3>{faq.question}</h3>
      <span className="faq-toggle">{isOpen ? <FiMinus /> : <FiPlus />}</span>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="faq-answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{faq.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="faq" id="faq" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Common Questions</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
