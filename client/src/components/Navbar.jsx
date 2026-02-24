import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        <img src="/images/logo-horizontal.png" alt="MindCraft Counselling Services" className="nav-logo-img" />
        <span className="nav-logo-text">MindCraft</span>
      </a>

      <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={handleClick}>{item.label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className="nav-cta" onClick={handleClick}>Book Session</a>
        </li>
      </ul>

      <button
        className="hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;
