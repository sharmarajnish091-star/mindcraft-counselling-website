import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiVideo, FiMapPin } from 'react-icons/fi';

const steps = [
  {
    icon: <FiCalendar />,
    title: 'Pick a Slot',
    description: 'Choose a date and time that works for you from the calendar below.',
  },
  {
    icon: <FiClock />,
    title: 'Confirm Booking',
    description: 'You\'ll receive a confirmation email with all session details.',
  },
  {
    icon: <FiVideo />,
    title: 'Attend Session',
    description: 'Join online via Google Meet or visit our clinic in Jaipur — your choice.',
  },
];

const Booking = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="booking" id="booking" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Schedule</span>
          <h2 className="section-title">Book Your Session</h2>
          <p className="section-subtitle">
            Booking is simple — pick a slot, get confirmed, and show up.
            We offer both in-person and online sessions.
          </p>
        </motion.div>

        <motion.div
          className="booking-steps"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {steps.map((step, i) => (
            <div className="booking-step" key={step.title}>
              <div className="booking-step-number">{i + 1}</div>
              <div className="booking-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="booking-calendar-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="booking-calendar-card">
            {/*
              Replace the src below with your actual Calendly / Cal.com URL
              Example: https://calendly.com/mindcraft-counselling/session
            */}
            <div className="booking-placeholder">
              <FiCalendar className="booking-placeholder-icon" />
              <h3>Online Scheduling Coming Soon</h3>
              <p>
                We're setting up our online booking calendar. In the meantime,
                you can book directly via WhatsApp or the contact form below.
              </p>
              <div className="booking-placeholder-actions">
                <a href="#contact" className="btn btn-primary">
                  <FiMapPin /> Book via Form
                </a>
                <a
                  href="https://wa.me/917877802279?text=Hi!%20I%27d%20like%20to%20book%20a%20session."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FiVideo /> Book via WhatsApp
                </a>
              </div>
            </div>
            {/*
              When ready, uncomment the iframe below and replace with your Calendly URL:
              <iframe
                src="https://calendly.com/mindcraft-counselling/session"
                width="100%"
                height="650"
                frameBorder="0"
                title="Book a Session"
                style={{ borderRadius: '12px' }}
              />
            */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;
