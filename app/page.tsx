'use client';

import HeroSection from './components/HeroSection';
import ExtractForm from './components/ExtractForm';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

export default function Home() {
  function scrollToExtract() {
    document.getElementById('extract')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0c0a0a', color: '#f4efec' }}>
      <HeroSection onExtractClick={scrollToExtract} />
      <ExtractForm />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
