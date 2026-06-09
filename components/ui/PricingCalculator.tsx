'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getPricingCalculatorCopy } from '@/lib/i18n/copy/home';
import { formatUsdPrice, PRICING_USD } from '@/lib/pricing/plans';

type PricingCalculatorProps = {
  locale?: Locale;
};

export default function PricingCalculator({ locale = 'es' }: PricingCalculatorProps) {
  const copy = getPricingCalculatorCopy(locale);
  const [selectedPlan, setSelectedPlan] = useState<string>('3-months');
  const [comparisonMode, setComparisonMode] = useState(false);

  const selectedPlanData = useMemo(
    () => copy.plans.find((p) => p.id === selectedPlan),
    [copy.plans, selectedPlan]
  );

  const calculateSavings = (plan: (typeof copy.plans)[number]) => {
    if (!plan.discount) return null;
    const monthlyPrice =
      plan.price /
      (plan.id === '1-month' ? 1 : plan.id === '3-months' ? 3 : plan.id === '6-months' ? 6 : 12);
    const baseMonthlyPrice = copy.plans.find((p) => p.id === '1-month')?.price || PRICING_USD.month;
    const savings = baseMonthlyPrice - monthlyPrice;
    return savings > 0 ? Math.round(savings * 100) / 100 : 0;
  };

  const calculateTotalSavings = (plan: (typeof copy.plans)[number]) => {
    if (!plan.discount) return null;
    const monthlyPrice = copy.plans.find((p) => p.id === '1-month')?.price || PRICING_USD.month;
    const months =
      plan.id === '1-month' ? 1 : plan.id === '3-months' ? 3 : plan.id === '6-months' ? 6 : 12;
    const totalWithoutDiscount = monthlyPrice * months;
    const savings = Math.round((totalWithoutDiscount - plan.price) * 100) / 100;
    return savings > 0 ? savings : null;
  };

  const formatPrice = (price: number) => formatUsdPrice(price, locale);

  const downloadHref = locale === 'en' ? '/en/bienvenida' : '/bienvenida';
  const termsHref = localePath(locale, '/terminos');
  const privacyHref = localePath(locale, '/privacidad');

  return (
    <div className="pricing-calculator">
      <div className="calculator-controls">
        <div className="calculator-toggle">
          <button
            className={`toggle-btn ${!comparisonMode ? 'active' : ''}`}
            onClick={() => setComparisonMode(false)}
          >
            {copy.toggle.selectPlan}
          </button>
          <button
            className={`toggle-btn ${comparisonMode ? 'active' : ''}`}
            onClick={() => setComparisonMode(true)}
          >
            {copy.toggle.comparePlans}
          </button>
        </div>
      </div>

      {!comparisonMode ? (
        <div className="calculator-selection">
          <div className="plan-selector">
            {copy.plans.map((plan) => (
              <button
                key={plan.id}
                className={`plan-option ${selectedPlan === plan.id ? 'active' : ''} ${plan.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="plan-option-header">
                  <span className="plan-name">{plan.name}</span>
                  {plan.popular && <span className="popular-badge">{copy.popularBadge}</span>}
                </div>
                <div className="plan-price">{formatPrice(plan.price)}</div>
                <div className="plan-period">{plan.period}</div>
              </button>
            ))}
          </div>

          {selectedPlanData && (
            <div className="calculator-results">
              <div className="result-card">
                <h3>{copy.summary.title}</h3>
                <div className="result-item">
                  <span className="result-label">{copy.summary.planLabel}</span>
                  <span className="result-value">{selectedPlanData.name}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">{copy.summary.totalPriceLabel}</span>
                  <span className="result-value highlight">{formatPrice(selectedPlanData.price)}</span>
                </div>
                {selectedPlanData.discount && (
                  <>
                    <div className="result-item">
                      <span className="result-label">{copy.summary.discountLabel}</span>
                      <span className="result-value success">{selectedPlanData.discount}%</span>
                    </div>
                    {calculateTotalSavings(selectedPlanData) !== null && (
                      <div className="result-item">
                        <span className="result-label">{copy.summary.totalSavingsLabel}</span>
                        <span className="result-value success">
                          {formatPrice(calculateTotalSavings(selectedPlanData)!)}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div className="result-item">
                  <span className="result-label">{copy.summary.averageMonthlyLabel}</span>
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
                <div className="calculator-cta">
                  <Link href={downloadHref} className="btn btn-primary btn-large">
                    {copy.summary.startWith(selectedPlanData.name)}
                  </Link>
                  <p className="calculator-legal">
                    {copy.legal.subscribePrefix}{' '}
                    <Link href={termsHref}>{copy.legal.termsOfUse}</Link>{' '}
                    {copy.legal.and}{' '}
                    <Link href={privacyHref}>{copy.legal.privacyPolicy}</Link>
                    . {copy.legal.autoRenewal}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-cell">{copy.comparison.headers.plan}</div>
            <div className="comparison-cell">{copy.comparison.headers.duration}</div>
            <div className="comparison-cell">{copy.comparison.headers.totalPrice}</div>
            <div className="comparison-cell">{copy.comparison.headers.pricePerMonth}</div>
            <div className="comparison-cell">{copy.comparison.headers.savings}</div>
            <div className="comparison-cell">{copy.comparison.headers.discount}</div>
          </div>
          {copy.plans.map((plan) => {
            const monthlyPrice =
              plan.price /
              (plan.id === '1-month' ? 1 : plan.id === '3-months' ? 3 : plan.id === '6-months' ? 6 : 12);
            const savings = calculateSavings(plan);
            return (
              <div key={plan.id} className={`comparison-row ${plan.popular ? 'highlighted' : ''}`}>
                <div className="comparison-cell">
                  <strong>{plan.name}</strong>
                  {plan.popular && <span className="popular-badge-small">{copy.popularBadge}</span>}
                </div>
                <div className="comparison-cell">{plan.duration}</div>
                <div className="comparison-cell">{formatPrice(plan.price)}</div>
                <div className="comparison-cell">{formatPrice(Math.round(monthlyPrice * 100) / 100)}</div>
                <div className="comparison-cell">
                  {savings !== null && savings > 0 ? (
                    <span className="savings-amount">
                      {formatPrice(savings)}
                      {copy.comparison.savingsPerMonth}
                    </span>
                  ) : (
                    <span className="no-savings">{copy.comparison.noSavings}</span>
                  )}
                </div>
                <div className="comparison-cell">
                  {plan.discount ? (
                    <span className="discount-badge">{plan.discount}%</span>
                  ) : (
                    <span>{copy.comparison.noSavings}</span>
                  )}
                </div>
              </div>
            );
          })}
          <div className="comparison-footnote">
            <p>{copy.comparison.priceNote}</p>
            <p className="calculator-legal">
              {copy.legal.subscribePrefix}{' '}
              <Link href={termsHref}>{copy.legal.termsOfUse}</Link>{' '}
              {copy.legal.and}{' '}
              <Link href={privacyHref}>{copy.legal.privacyPolicy}</Link>
              . {copy.legal.autoRenewal}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
