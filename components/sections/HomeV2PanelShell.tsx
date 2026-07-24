type HomeV2PanelShellProps = {
  title: string;
  size?: 'hero' | 'moment' | 'ads';
  className?: string;
  ariaLabel: string;
  children: React.ReactNode;
};

/** Marco compartido para viñetas de producto (home y landings de ads). */
export default function HomeV2PanelShell({
  title,
  size = 'moment',
  className = '',
  ariaLabel,
  children,
}: HomeV2PanelShellProps) {
  return (
    <figure
      className={`home-v2-panel home-v2-panel--${size} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="home-v2-panel__chrome" aria-hidden="true">
        <span className="home-v2-panel__title">{title}</span>
      </div>
      {children}
    </figure>
  );
}
