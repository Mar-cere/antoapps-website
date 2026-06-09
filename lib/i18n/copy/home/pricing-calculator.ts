import type { Locale } from '@/lib/i18n/config';
import { PRICING_USD } from '@/lib/pricing/plans';

export type PricingPlanId = '1-month' | '3-months' | '6-months' | '1-year';

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  duration: string;
  price: number;
  period: string;
  discount?: number;
  popular?: boolean;
};

export type PricingCalculatorCopy = {
  toggle: {
    selectPlan: string;
    comparePlans: string;
  };
  popularBadge: string;
  summary: {
    title: string;
    planLabel: string;
    totalPriceLabel: string;
    discountLabel: string;
    totalSavingsLabel: string;
    averageMonthlyLabel: string;
    startWith: (planName: string) => string;
  };
  comparison: {
    headers: {
      plan: string;
      duration: string;
      totalPrice: string;
      pricePerMonth: string;
      savings: string;
      discount: string;
    };
    savingsPerMonth: string;
    noSavings: string;
    priceNote: string;
  };
  legal: {
    subscribePrefix: string;
    termsOfUse: string;
    and: string;
    privacyPolicy: string;
    autoRenewal: string;
  };
  plans: PricingPlan[];
};

const pricingCalculatorCopy: Record<Locale, PricingCalculatorCopy> = {
  es: {
    toggle: {
      selectPlan: 'Seleccionar Plan',
      comparePlans: 'Comparar Planes',
    },
    popularBadge: 'Popular',
    summary: {
      title: 'Resumen del Plan Seleccionado',
      planLabel: 'Plan:',
      totalPriceLabel: 'Precio Total:',
      discountLabel: 'Descuento:',
      totalSavingsLabel: 'Ahorro Total:',
      averageMonthlyLabel: 'Precio Mensual Promedio:',
      startWith: (planName) => `Comenzar con ${planName}`,
    },
    comparison: {
      headers: {
        plan: 'Plan',
        duration: 'Duración',
        totalPrice: 'Precio Total',
        pricePerMonth: 'Precio/Mes',
        savings: 'Ahorro',
        discount: 'Descuento',
      },
      savingsPerMonth: '/mes',
      noSavings: '-',
      priceNote: 'Precios en dólares estadounidenses (USD). La suscripción se gestiona desde la App Store.',
    },
    legal: {
      subscribePrefix: 'Al suscribirte, aceptas nuestros',
      termsOfUse: 'Términos de Uso',
      and: 'y',
      privacyPolicy: 'Política de Privacidad',
      autoRenewal: 'Las suscripciones se renuevan automáticamente.',
    },
    plans: [
      { id: '1-month', name: '1 Mes', duration: '1 mes', price: PRICING_USD.month, period: 'Plan mensual' },
      {
        id: '3-months',
        name: '3 Meses',
        duration: '3 meses',
        price: PRICING_USD.threeMonths,
        period: 'Plan trimestral',
        popular: true,
      },
      {
        id: '6-months',
        name: '6 Meses',
        duration: '6 meses',
        price: PRICING_USD.sixMonths,
        period: 'Ahorra 12%',
        discount: 12,
      },
      { id: '1-year', name: '1 Año', duration: '1 año', price: PRICING_USD.year, period: 'Ahorra 17%', discount: 17 },
    ],
  },
  en: {
    toggle: {
      selectPlan: 'Select Plan',
      comparePlans: 'Compare Plans',
    },
    popularBadge: 'Popular',
    summary: {
      title: 'Selected Plan Summary',
      planLabel: 'Plan:',
      totalPriceLabel: 'Total Price:',
      discountLabel: 'Discount:',
      totalSavingsLabel: 'Total Savings:',
      averageMonthlyLabel: 'Average Monthly Price:',
      startWith: (planName) => `Get started with ${planName}`,
    },
    comparison: {
      headers: {
        plan: 'Plan',
        duration: 'Duration',
        totalPrice: 'Total Price',
        pricePerMonth: 'Price/Month',
        savings: 'Savings',
        discount: 'Discount',
      },
      savingsPerMonth: '/month',
      noSavings: '-',
      priceNote: 'Prices in US dollars (USD). Subscriptions are managed through the App Store.',
    },
    legal: {
      subscribePrefix: 'By subscribing, you agree to our',
      termsOfUse: 'Terms of Use',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      autoRenewal: 'Subscriptions renew automatically.',
    },
    plans: [
      { id: '1-month', name: '1 Month', duration: '1 month', price: PRICING_USD.month, period: 'Monthly plan' },
      {
        id: '3-months',
        name: '3 Months',
        duration: '3 months',
        price: PRICING_USD.threeMonths,
        period: 'Quarterly plan',
        popular: true,
      },
      {
        id: '6-months',
        name: '6 Months',
        duration: '6 months',
        price: PRICING_USD.sixMonths,
        period: 'Save 12%',
        discount: 12,
      },
      { id: '1-year', name: '1 Year', duration: '1 year', price: PRICING_USD.year, period: 'Save 17%', discount: 17 },
    ],
  },
};

export function getPricingCalculatorCopy(locale: Locale): PricingCalculatorCopy {
  return pricingCalculatorCopy[locale];
}
