'use client';

import { windowReading, type WeekStory } from '@/lib/observatory/copy/weekReading';

export function WeekReadingNote({ stories }: { stories: WeekStory[] }) {
  const reading = windowReading(stories);
  return (
    <p className="week-reading" data-note={reading.note}>
      {reading.line}
    </p>
  );
}
