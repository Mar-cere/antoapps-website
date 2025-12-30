'use client';

import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import PricingCalculator from '@/components/ui/PricingCalculator';

export default function Pricing() {
  useScrollAnimations();
  return (
    <section id="precios" className="pricing" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Planes y Precios</h2>
        <p className="section-subtitle reveal-on-scroll">
          Elige la duración que mejor se adapte a tus necesidades. Todos los planes incluyen todas las
          funcionalidades: asistente AI, análisis emocional, detección de crisis, herramientas de bienestar
          y soporte 24/7.
        </p>

        <PricingCalculator />
      </div>
    </section>
  );
}
