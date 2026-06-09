import type { Locale } from '../lib/i18n/config';
import { getPricingCalculatorCopy } from '../lib/i18n/copy/home';
import {
  calculateMonthlySavings,
  calculateTotalSavings,
  monthlyEquivalentPrice,
  planMonths,
} from '../lib/pricing/savings';
import { PRICING_USD } from '../lib/pricing/plans';

const LOCALES: readonly Locale[] = ['es', 'en'];

function assertPricingInvariants(): string[] {
  const errors: string[] = [];

  if (PRICING_USD.month <= 0) {
    errors.push('[pricing] monthly base price must be > 0');
  }

  for (const locale of LOCALES) {
    const copy = getPricingCalculatorCopy(locale);
    const tag = `[${locale}]`;
    const monthly = copy.plans.find((p) => p.id === '1-month');

    if (!monthly) {
      errors.push(`${tag} missing 1-month plan`);
      continue;
    }

    if (monthly.price !== PRICING_USD.month) {
      errors.push(
        `${tag} 1-month price (${monthly.price}) must match PRICING_USD.month (${PRICING_USD.month})`
      );
    }

    for (const plan of copy.plans) {
      if (plan.price <= 0) {
        errors.push(`${tag} plan ${plan.id} price must be > 0`);
      }

      if (plan.discount && calculateTotalSavings(plan) === null) {
        errors.push(
          `${tag} plan ${plan.id} claims ${plan.discount}% discount but total savings is not positive`
        );
      }

      if (!plan.discount && calculateTotalSavings(plan) !== null) {
        errors.push(`${tag} plan ${plan.id} has savings without discount flag`);
      }

      const months = planMonths(plan.id);
      const equivalent = monthlyEquivalentPrice(plan);
      if (equivalent <= 0 || !Number.isFinite(equivalent)) {
        errors.push(`${tag} plan ${plan.id} invalid monthly equivalent`);
      }

      if (plan.discount && equivalent >= monthly.price) {
        errors.push(
          `${tag} plan ${plan.id} claims discount but monthly equivalent (${equivalent}) is not below monthly plan (${monthly.price})`
        );
      }

      const monthlySavings = calculateMonthlySavings(plan);
      if (plan.discount && monthlySavings === null) {
        errors.push(`${tag} plan ${plan.id} discount label requires positive monthly savings`);
      }
    }

    if (copy.comparison.priceNote.toLowerCase().includes('clp')) {
      errors.push(`${tag} priceNote must not reference CLP (USD-only pricing)`);
    }
  }

  return errors;
}

const errors = assertPricingInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de pricing:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: invariantes de pricing (es + en).');
