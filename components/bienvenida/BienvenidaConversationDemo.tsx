'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { prefersReducedMotion } from '@/lib/device/motion';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaConversationDemoProps = {
  copy: BienvenidaCopy['conversationDemo'];
};

const STEP_MS = 1400;
const PAUSE_MS = 2400;

export default function BienvenidaConversationDemo({ copy }: BienvenidaConversationDemoProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(true);
  const total = copy.messages.length;

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(total);
      return;
    }

    if (total <= 1) {
      setVisibleCount(total);
      return;
    }

    let visible = 1;
    let timer: ReturnType<typeof setTimeout>;
    setVisibleCount(1);

    const schedule = (delay: number) => {
      timer = setTimeout(tick, delay);
    };

    const tick = () => {
      if (visible < total) {
        visible += 1;
        setVisibleCount(visible);
        schedule(STEP_MS);
        return;
      }

      visible = 1;
      setVisibleCount(1);
      schedule(PAUSE_MS);
    };

    schedule(STEP_MS);

    return () => clearTimeout(timer);
  }, [total, reducedMotion]);

  const showTyping = !reducedMotion && visibleCount < total;

  return (
    <div className="lad-convo-demo" aria-label={copy.ariaLabel}>
      <p className="lad-convo-demo-label">{copy.label}</p>
      <div className="lad-app-screen lad-convo-demo-screen">
        <header className="lad-app-screen-header">
          <Image
            src="/assets/images/antoIcon.png"
            alt=""
            width={24}
            height={24}
            className="lad-app-screen-logo"
          />
          <span className="lad-app-screen-title">Anto</span>
        </header>
        <div className="lad-app-screen-body lad-convo-demo-body">
          {copy.messages.slice(0, visibleCount).map((message, index) => (
            <div
              key={`msg-${index}`}
              className={`lad-app-msg lad-app-msg--${message.role} lad-convo-demo-msg`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          {showTyping && (
            <div className="lad-convo-demo-typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
