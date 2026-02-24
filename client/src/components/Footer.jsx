import React from 'react';
import { FiLinkedin, FiMail, FiPhone, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">MindCraft Counselling Services</h3>
            <p className="footer-tagline">
              Your partner in mental wellness — empowering individuals to lead
              healthier, more fulfilling lives through evidence-based therapy
              and compassionate care.
            </p>
          </div>

          <div className="footer-links-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Book Session</a></li>
            </ul>
          </div>

          <div className="footer-links-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Individual Counselling</a></li>
              <li><a href="#services">Couple Therapy</a></li>
              <li><a href="#services">Family Therapy</a></li>
              <li><a href="#services">Career Counselling</a></li>
            </ul>
          </div>

          <div className="footer-links-section">
            <h4>Connect</h4>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/surbhi-sharma-422264129" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="mailto:mindcraftjpr@gmail.com" aria-label="Email">
                <FiMail />
              </a>
              <a href="tel:+917877802279" aria-label="Phone">
                <FiPhone />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} MindCraft Counselling Services. All rights reserved. Made with{' '}
            <FiHeart className="heart-icon" /> for Mental Wellness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
