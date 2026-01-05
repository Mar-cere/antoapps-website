import { Suspense, lazy } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientScripts from '@/components/ClientScripts';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import AppShowcase from '@/components/sections/AppShowcase';
import Benefits from '@/components/sections/Benefits';
import Technologies from '@/components/sections/Technologies';
import TechMetrics from '@/components/sections/TechMetrics';
import TechChallenges from '@/components/sections/TechChallenges';
import ThinkingProcess from '@/components/sections/ThinkingProcess';
import CodeQuality from '@/components/sections/CodeQuality';
import RealImpact from '@/components/sections/RealImpact';
import Skeleton from '@/components/ui/Skeleton';

// Lazy load secciones no críticas para mejorar FCP
const Values = lazy(() => import('@/components/sections/Values'));
const Pricing = lazy(() => import('@/components/sections/Pricing'));
const ScienceBacked = lazy(() => import('@/components/sections/ScienceBacked'));
const Security = lazy(() => import('@/components/sections/Security'));
const AIExplained = lazy(() => import('@/components/sections/AIExplained'));
const ComingSoon = lazy(() => import('@/components/sections/ComingSoon'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));
const CTA = lazy(() => import('@/components/sections/CTA'));

// Componente de fallback para secciones lazy
function SectionSkeleton() {
  return (
    <div style={{ padding: 'var(--spacing-xl) 0', minHeight: '400px' }}>
      <div className="container">
        <div className="reveal-on-scroll">
          <Skeleton variant="text" width="60%" height="2.5rem" lines={1} />
        </div>
        <div className="reveal-on-scroll" style={{ marginTop: '1rem' }}>
          <Skeleton variant="text" width="80%" height="1.25rem" lines={1} />
        </div>
        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card reveal-on-scroll">
              <Skeleton variant="rectangular" width="100%" height="200px" />
              <div style={{ padding: '1rem' }}>
                <Skeleton variant="text" width="60%" height="1.5rem" lines={1} />
                <Skeleton variant="text" width="100%" height="1rem" lines={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <Features />
        <AppShowcase />
        <Benefits />
        <Suspense fallback={<SectionSkeleton />}>
          <ScienceBacked />
        </Suspense>
        <Technologies />
        <TechMetrics />
        <Suspense fallback={<SectionSkeleton />}>
          <ThinkingProcess />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TechChallenges />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CodeQuality />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <RealImpact />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Values />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Security />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <AIExplained />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </main>
      <Footer />
      <ClientScripts />
      <CookieConsent />
      <AccessibilityPanel />
    </>
  );
}

