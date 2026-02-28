import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Approach from './components/Approach';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Blog from './components/Blog';
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
      <Approach />
      <Testimonials />
      <Blog />
      <Booking />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
