import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const plans = [
  {
    name: 'Single Session',
    price: '1,500',
    duration: 'per session',
    description: 'Ideal for a first-time consultation or one-off guidance session.',
    features: [
      '50-minute session',
      'Individual or couple',
      'Personalised assessment',
      'Action plan & takeaways',
      'Follow-up notes via email',
    ],
    highlight: false,
  },
  {
    name: 'Growth Package',
    price: '5,000',
    duration: '4 sessions',
    description: 'Structured short-term therapy for focused goals and measurable progress.',
    features: [
      'Four 50-minute sessions',
      'Customised therapy plan',
      'CBT / NLP techniques',
      'Progress tracking',
      'WhatsApp support between sessions',
      'Session summary reports',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Transformation Plan',
    price: '11,000',
    duration: '10 sessions',
    description: 'Comprehensive deep-work therapy for lasting change and personal growth.',
    features: [
      'Ten 50-minute sessions',
      'In-depth psychological assessment',
      'Multi-modality approach',
      'Weekly progress reviews',
      'Priority WhatsApp support',
      'Worksheets & exercises',
      'Certificate of completion',
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Investment in You</span>
          <h2 className="section-title">Session Packages</h2>
          <p className="section-subtitle">
            Transparent pricing with no hidden fees. Every journey is unique —
            choose the plan that fits your needs, or contact us for a custom arrangement.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.highlight ? 'pricing-featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
            >
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
              <h3 className="pricing-name">{plan.name}</h3>
              <div className="pricing-price">
                <span className="pricing-currency">₹</span>
                <span className="pricing-amount">{plan.price}</span>
                <span className="pricing-duration">/ {plan.duration}</span>
              </div>
              <p className="pricing-desc">{plan.description}</p>

              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <FiCheck className="pricing-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'} pricing-cta`}
              >
                Get Started <FiArrowRight />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="pricing-note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          All prices are in INR. Couple &amp; family therapy sessions may vary.
          Contact us for corporate or institutional packages.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
