import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientScripts from '@/components/ClientScripts';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Benefits from '@/components/sections/Benefits';
import Technologies from '@/components/sections/Technologies';
import Values from '@/components/sections/Values';
import Pricing from '@/components/sections/Pricing';
import ScienceBacked from '@/components/sections/ScienceBacked';
import Security from '@/components/sections/Security';
import AIExplained from '@/components/sections/AIExplained';
import Resources from '@/components/sections/Resources';
import ComingSoon from '@/components/sections/ComingSoon';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <Features />
        <Benefits />
        <ScienceBacked />
        <Technologies />
        <Values />
        <Pricing />
        <Security />
        <AIExplained />
        <Resources />
        <ComingSoon />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <ClientScripts />
      <CookieConsent />
      <AccessibilityPanel />
    </>
  );
}

