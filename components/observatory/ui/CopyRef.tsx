'use client';

import { useState } from 'react';

export function CopyRef({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy-ref"
      aria-label={`Copiar ${label} ${value}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        } catch {
          setCopied(false);
        }
      }}
    >
      {label} {value}
      <span className="s">{copied ? ' copiado' : ' copiar'}</span>
    </button>
  );
}
