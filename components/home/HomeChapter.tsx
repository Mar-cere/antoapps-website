import type { ReactNode } from 'react';
import '@/styles/components/home-chapters.css';

type HomeChapterVariant = 'default' | 'alt' | 'detail';

type HomeChapterProps = {
  chapterId: string;
  variant?: HomeChapterVariant;
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
};

export default function HomeChapter({
  chapterId,
  variant = 'default',
  eyebrow,
  title,
  lede,
  children,
}: HomeChapterProps) {
  const hasIntro = Boolean(eyebrow || title || lede);

  return (
    <div
      className={`home-chapter home-chapter--${variant}`}
      data-home-chapter={chapterId}
      aria-labelledby={hasIntro ? `home-chapter-${chapterId}` : undefined}
    >
      {hasIntro ? (
        <header className="home-chapter__intro container reveal-on-scroll">
          {eyebrow ? <p className="home-chapter__eyebrow">{eyebrow}</p> : null}
          {title ? (
            <h2 className="home-chapter__title" id={`home-chapter-${chapterId}`}>
              {title}
            </h2>
          ) : null}
          {lede ? <p className="home-chapter__lede">{lede}</p> : null}
        </header>
      ) : null}
      <div className="home-chapter__sections">{children}</div>
    </div>
  );
}
