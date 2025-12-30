/**
 * Performance utilities
 */

export function measurePerformance(name: string, fn: () => void) {
  if (typeof window === 'undefined' || !window.performance) {
    fn();
    return;
  }

  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;

  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);

  // Enviar a analytics si está disponible
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'performance', {
      event_category: 'Performance',
      event_label: name,
      value: Math.round(duration),
    });
  }

  return duration;
}

export async function measureAsyncPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  if (typeof window === 'undefined' || !window.performance) {
    return fn();
  }

  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;

  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'performance', {
      event_category: 'Performance',
      event_label: name,
      value: Math.round(duration),
    });
  }

  return result;
}

