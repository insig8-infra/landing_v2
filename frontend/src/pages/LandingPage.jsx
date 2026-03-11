import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navigation } from '../components/landing/Navigation';
import { HeroSection } from '../components/landing/HeroSection';
import { IntegrationsMarquee } from '../components/landing/IntegrationsMarquee';
import { ProblemSection } from '../components/landing/ProblemSection';
import { ReframeSection } from '../components/landing/ReframeSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { OutcomesSection } from '../components/landing/OutcomesSection';
import { StatsSection } from '../components/landing/StatsSection';
import { FounderNote } from '../components/landing/FounderNote';
import { CTASection } from '../components/landing/CTASection';
import { PricingSection } from '../components/landing/PricingSection';
import { FAQSection } from '../components/landing/FAQSection';
import { FooterSection } from '../components/landing/FooterSection';
import { EarlyAccessModal } from '../components/landing/EarlyAccessModal';

const Divider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navigation onOpenEarlyAccess={openModal} />
      <main>
        <HeroSection onOpenEarlyAccess={openModal} />
        <IntegrationsMarquee />
        <Divider />
        <ProblemSection />
        <ReframeSection />
        <Divider />
        <HowItWorksSection />
        <Divider />
        <OutcomesSection />
        <StatsSection />
        <Divider />
        <FounderNote />
        <CTASection onOpenEarlyAccess={openModal} />
        <Divider />
        <PricingSection onOpenEarlyAccess={openModal} />
        <Divider />
        <FAQSection />
      </main>
      <FooterSection />
      <EarlyAccessModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

export default LandingPage;
