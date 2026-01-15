'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  period: string;
  discount?: number;
  popular?: boolean;
}

const plans: Plan[] = [
  { id: '1-month', name: '1 Mes', duration: '1 mes', price: 3990, period: 'Plan mensual' },
  { id: '3-months', name: '3 Meses', duration: '3 meses', price: 11990, period: 'Ahorra 10%', discount: 10, popular: true },
  { id: '6-months', name: '6 Meses', duration: '6 meses', price: 20990, period: 'Ahorra 12%', discount: 12 },
  { id: '1-year', name: '1 Año', duration: '1 año', price: 39990, period: 'Ahorra 17%', discount: 17 },
];

export default function PricingCalculator() {
  const [selectedPlan, setSelectedPlan] = useState<string>('3-months');
  const [comparisonMode, setComparisonMode] = useState(false);

  const selectedPlanData = useMemo(() => plans.find((p) => p.id === selectedPlan), [selectedPlan]);

  const calculateSavings = (plan: Plan) => {
    if (!plan.discount) return null;
    const monthlyPrice = plan.price / (plan.id === '1-month' ? 1 : plan.id === '3-months' ? 3 : plan.id === '6-months' ? 6 : 12);
    const baseMonthlyPrice = plans.find((p) => p.id === '1-month')?.price || 3990;
    const savings = baseMonthlyPrice - monthlyPrice;
    return savings > 0 ? Math.round(savings) : 0;
  };

  const calculateTotalSavings = (plan: Plan) => {
    if (!plan.discount) return null;
    const monthlyPrice = plans.find((p) => p.id === '1-month')?.price || 3990;
    const months = plan.id === '1-month' ? 1 : plan.id === '3-months' ? 3 : plan.id === '6-months' ? 6 : 12;
    const totalWithoutDiscount = monthlyPrice * months;
    return Math.round(totalWithoutDiscount - plan.price);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="pricing-calculator">
      <div className="calculator-controls">
        <div className="calculator-toggle">
          <button
            className={`toggle-btn ${!comparisonMode ? 'active' : ''}`}
            onClick={() => setComparisonMode(false)}
          >
            Seleccionar Plan
          </button>
          <button
            className={`toggle-btn ${comparisonMode ? 'active' : ''}`}
            onClick={() => setComparisonMode(true)}
          >
            Comparar Planes
          </button>
        </div>
      </div>

      {!comparisonMode ? (
        <div className="calculator-selection">
          <div className="plan-selector">
            {plans.map((plan) => (
              <button
                key={plan.id}
                className={`plan-option ${selectedPlan === plan.id ? 'active' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="plan-option-header">
                  <span className="plan-name">{plan.name}</span>
                  {plan.popular && <span className="popular-badge">Popular</span>}
                </div>
                <div className="plan-price">{formatPrice(plan.price)}</div>
                <div className="plan-period">{plan.period}</div>
              </button>
            ))}
          </div>

          {selectedPlanData && (
            <div className="calculator-results">
              <div className="result-card">
                <h3>Resumen del Plan Seleccionado</h3>
                <div className="result-item">
                  <span className="result-label">Plan:</span>
                  <span className="result-value">{selectedPlanData.name}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Precio Total:</span>
                  <span className="result-value highlight">{formatPrice(selectedPlanData.price)}</span>
                </div>
                {selectedPlanData.discount && (
                  <>
                    <div className="result-item">
                      <span className="result-label">Descuento:</span>
                      <span className="result-value success">{selectedPlanData.discount}%</span>
                    </div>
                    {calculateTotalSavings(selectedPlanData) && (
                      <div className="result-item">
                        <span className="result-label">Ahorro Total:</span>
                        <span className="result-value success">
                          {formatPrice(calculateTotalSavings(selectedPlanData)!)}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div className="result-item">
                  <span className="result-label">Precio Mensual Promedio:</span>
                  <span className="result-value">
                    {formatPrice(
                      selectedPlanData.price /
                        (selectedPlanData.id === '1-month'
                          ? 1
                          : selectedPlanData.id === '3-months'
                            ? 3
                            : selectedPlanData.id === '6-months'
                              ? 6
                              : 12)
                    )}
                  </span>
                </div>
                <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
                  <Link href="#descargar" className="btn btn-primary btn-large">
                    Comenzar con {selectedPlanData.name}
                  </Link>
                  <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    Al suscribirte, aceptas nuestros{' '}
                    <Link href="/terminos" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                      Términos de Uso
                    </Link>{' '}
                    y{' '}
                    <Link href="/privacidad" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                      Política de Privacidad
                    </Link>
                    . Las suscripciones se renuevan automáticamente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-cell">Plan</div>
            <div className="comparison-cell">Duración</div>
            <div className="comparison-cell">Precio Total</div>
            <div className="comparison-cell">Precio/Mes</div>
            <div className="comparison-cell">Ahorro</div>
            <div className="comparison-cell">Descuento</div>
          </div>
          {plans.map((plan) => {
            const monthlyPrice = plan.price / (plan.id === '1-month' ? 1 : plan.id === '3-months' ? 3 : plan.id === '6-months' ? 6 : 12);
            const savings = calculateSavings(plan);
            return (
              <div key={plan.id} className={`comparison-row ${plan.popular ? 'highlighted' : ''}`}>
                <div className="comparison-cell">
                  <strong>{plan.name}</strong>
                  {plan.popular && <span className="popular-badge-small">Popular</span>}
                </div>
                <div className="comparison-cell">{plan.duration}</div>
                <div className="comparison-cell">{formatPrice(plan.price)}</div>
                <div className="comparison-cell">{formatPrice(Math.round(monthlyPrice))}</div>
                <div className="comparison-cell">
                  {savings !== null && savings > 0 ? (
                    <span className="savings-amount">{formatPrice(savings)}/mes</span>
                  ) : (
                    <span className="no-savings">-</span>
                  )}
                </div>
                <div className="comparison-cell">
                  {plan.discount ? (
                    <span className="discount-badge">{plan.discount}%</span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', padding: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            <p>
              Al suscribirte, aceptas nuestros{' '}
              <Link href="/terminos" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                Términos de Uso
              </Link>{' '}
              y{' '}
              <Link href="/privacidad" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                Política de Privacidad
              </Link>
              . Las suscripciones se renuevan automáticamente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

