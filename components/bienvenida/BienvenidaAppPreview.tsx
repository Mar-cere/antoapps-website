import Image from 'next/image';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaAppPreviewProps = {
  copy: BienvenidaCopy['appPreview'];
};

export default function BienvenidaAppPreview({ copy }: BienvenidaAppPreviewProps) {
  return (
    <div className="lad-app-preview" aria-label={copy.ariaLabel}>
      <div className="lad-app-screen">
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

        <div className="lad-app-screen-body">
          <div className="lad-app-msg lad-app-msg--user">
            <p>{copy.userMessage}</p>
          </div>
          <div className="lad-app-msg lad-app-msg--anto">
            <p>{copy.antoMessage}</p>
          </div>
        </div>

        <div className="lad-app-screen-input" aria-hidden="true">
          <span className="lad-app-screen-input-placeholder">{copy.inputPlaceholder}</span>
          <span className="lad-app-screen-input-send">↑</span>
        </div>
      </div>
    </div>
  );
}
