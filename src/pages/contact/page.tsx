import { useState, useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import SocialConnect from './components/SocialConnect';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navbar />
      
      <ContactHero />
      
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <div className="space-y-8">
              <ContactInfo />
              <SocialConnect />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
