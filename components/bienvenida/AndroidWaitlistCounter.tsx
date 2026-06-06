'use client';

import { useEffect, useState } from 'react';
import { getAndroidWaitlistDisplayFloor } from '@/lib/android-waitlist-display';
import type { Locale } from '@/lib/i18n/config';

type AndroidWaitlistCounterProps = {
  locale: Locale;
  labelTemplate: string;
};

function formatCount(template: string, count: number, locale: Locale): string {
  const localeTag = locale === 'en' ? 'en-US' : 'es-CL';
  return template.replace('{count}', count.toLocaleString(localeTag));
}

export default function AndroidWaitlistCounter({
  locale,
  labelTemplate,
}: AndroidWaitlistCounterProps) {
  const floor = getAndroidWaitlistDisplayFloor();
  const [count, setCount] = useState(floor);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/android-early-access/stats')
      .then((res) => {
        if (!res.ok) throw new Error('stats unavailable');
        return res.json();
      })
      .then((data: { count?: number }) => {
        if (!cancelled && typeof data.count === 'number' && data.count > 0) {
          setCount(data.count);
        }
      })
      .catch(() => {
        if (!cancelled) setCount(floor);
      });

    return () => {
      cancelled = true;
    };
  }, [floor]);

  return (
    <p className="lad-android-waitlist-counter" aria-live="polite">
      {formatCount(labelTemplate, count, locale)}
    </p>
  );
}
