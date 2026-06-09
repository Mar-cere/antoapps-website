import type { PricingPlan, PricingPlanId } from '@/lib/i18n/copy/home/pricing-calculator';
import { PRICING_USD } from '@/lib/pricing/plans';

export function planMonths(planId: PricingPlanId): number {
  switch (planId) {
    case '1-month':
      return 1;
    case '3-months':
      return 3;
    case '6-months':
      return 6;
    case '1-year':
      return 12;
  }
}

export function monthlyEquivalentPrice(plan: PricingPlan): number {
  return plan.price / planMonths(plan.id);
}

export function calculateMonthlySavings(
  plan: PricingPlan,
  baseMonthlyPrice: number = PRICING_USD.month
): number | null {
  if (!plan.discount) return null;
  const savings = baseMonthlyPrice - monthlyEquivalentPrice(plan);
  return savings > 0 ? Math.round(savings * 100) / 100 : null;
}

export function calculateTotalSavings(
  plan: PricingPlan,
  baseMonthlyPrice: number = PRICING_USD.month
): number | null {
  if (!plan.discount) return null;
  const totalWithoutDiscount = baseMonthlyPrice * planMonths(plan.id);
  const savings = Math.round((totalWithoutDiscount - plan.price) * 100) / 100;
  return savings > 0 ? savings : null;
}
