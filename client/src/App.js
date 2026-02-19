import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Approach from './components/Approach';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="app">
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Experience />
      <Certifications />
      <Approach />
      <Testimonials />
      <Booking />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
