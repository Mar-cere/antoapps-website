import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaTrustStripProps = {
  copy: BienvenidaCopy['trustStrip'];
};

export default function BienvenidaTrustStrip({ copy }: BienvenidaTrustStripProps) {
  return (
    <div className="lad-trust-strip-wrap">
      <p className="lad-trust-strip" aria-label="Trust signals">
        <span>{copy.ratingOnAppStore}</span>
        <span className="lad-trust-strip-sep" aria-hidden="true">
          ·
        </span>
        <span>{copy.availableOn}</span>
      </p>
    </div>
  );
}
