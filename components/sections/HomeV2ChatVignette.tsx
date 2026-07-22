import HomeV2PanelShell from '@/components/sections/HomeV2PanelShell';
import type { Locale } from '@/lib/i18n/config';
import type { HomeV2ChatThread } from '@/lib/i18n/copy/home/home-v2';

type HomeV2ChatVignetteProps = {
  thread: HomeV2ChatThread;
  locale?: Locale;
  size?: 'hero' | 'moment';
  className?: string;
};

/** Viñeta de conversación — muestra el tono real del chat. */
export default function HomeV2ChatVignette({
  thread,
  locale = 'es',
  size = 'moment',
  className = '',
}: HomeV2ChatVignetteProps) {
  const antoLabel = 'Anto';
  const youLabel = locale === 'en' ? 'You' : 'Tú';

  return (
    <HomeV2PanelShell
      title="Anto"
      size={size}
      className={`home-v2-chat ${size === 'hero' ? 'home-v2-chat--live' : ''} ${className}`.trim()}
      ariaLabel={thread.ariaLabel}
    >
      <ul className="home-v2-chat__thread">
        {thread.messages.map((message, index) => {
          const isUser = message.role === 'user';
          return (
            <li
              key={`${message.role}-${index}`}
              className={`home-v2-chat__row ${isUser ? 'home-v2-chat__row--user' : 'home-v2-chat__row--anto'}`}
              style={{ '--home-v2-i': index } as React.CSSProperties}
            >
              <span className="home-v2-chat__who" aria-hidden="true">
                {isUser ? youLabel : antoLabel}
              </span>
              <p className="home-v2-chat__bubble">{message.text}</p>
            </li>
          );
        })}
      </ul>
    </HomeV2PanelShell>
  );
}
