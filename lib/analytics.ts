// lib/analytics.ts

import Clarity from '@microsoft/clarity';

export const trackEvent = (event: string) => {
  Clarity.event(event);
};
