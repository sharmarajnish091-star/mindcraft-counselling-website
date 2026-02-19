import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Priya M.',
    role: 'Individual Therapy Client',
    rating: 5,
    text: 'Surbhi ma\'am created a truly safe space where I felt comfortable opening up about my anxiety. Her CBT techniques were practical and easy to apply in daily life. After 3 months, I feel like a different person — more confident and at peace.',
    initials: 'PM',
  },
  {
    name: 'Rakesh & Anita S.',
    role: 'Couple Therapy Clients',
    rating: 5,
    text: 'We were on the verge of separation when we started therapy at MindCraft. The sessions helped us understand each other\'s perspectives and rebuild trust. We are genuinely grateful for the compassionate guidance we received.',
    initials: 'RA',
  },
  {
    name: 'Deepak K.',
    role: 'Career Counselling Client',
    rating: 5,
    text: 'I was stuck in a career rut and felt completely lost. The career counselling sessions helped me identify my strengths and align them with the right opportunities. I\'ve since transitioned into a role I truly enjoy. Highly recommend!',
    initials: 'DK',
  },
  {
    name: 'Sneha T.',
    role: 'Family Therapy Client',
    rating: 5,
    text: 'Our family dynamics had become very stressful with constant conflicts. The family therapy sessions taught us better communication and how to respect each other\'s boundaries. Things have improved significantly at home.',
    initials: 'ST',
  },
  {
    name: 'Manish R.',
    role: 'NLP Coaching Client',
    rating: 5,
    text: 'The NLP sessions with Surbhi were eye-opening. I learned how to reframe negative thought patterns and develop healthier habits. Her approach is very professional yet warm — you feel genuinely cared for.',
    initials: 'MR',
  },
  {
    name: 'Kavita J.',
    role: 'Internship Program Student',
    rating: 5,
    text: 'I completed the psychology internship program at MindCraft and it was the best learning experience. The hands-on exposure, case discussions, and mentorship from Surbhi ma\'am prepared me well for my career in counselling.',
    initials: 'KJ',
  },
];

const Stars = ({ count }) => (
  <div className="testimonial-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={i < count ? 'star-filled' : 'star-empty'}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;
  const maxIndex = testimonials.length - visibleCount;

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Client Stories</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real experiences from real people who found healing, clarity, and
            growth through our services.
          </p>
        </motion.div>

        <motion.div
          className="testimonials-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="testimonials-grid">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t) => (
                <motion.div
                  key={t.name}
                  className="testimonial-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                >
                  <Stars count={t.rating} />
                  <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.initials}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="testimonials-nav">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="testimonial-nav-btn"
              aria-label="Previous testimonials"
            >
              <FiChevronLeft />
            </button>
            <div className="testimonial-dots">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="testimonial-nav-btn"
              aria-label="Next testimonials"
            >
              <FiChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
