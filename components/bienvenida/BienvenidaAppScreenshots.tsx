import Image from 'next/image';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type BienvenidaAppScreenshotsProps = {
  copy: BienvenidaCopy['screenshots'];
};

export default function BienvenidaAppScreenshots({ copy }: BienvenidaAppScreenshotsProps) {
  return (
    <div className="lad-screenshots" aria-labelledby="lad-screenshots-title">
      <h3 id="lad-screenshots-title" className="lad-screenshots-title">
        {copy.sectionTitle}
      </h3>
      <div className="lad-screenshots-grid">
        {copy.images.map((image) => (
          <figure key={image.src} className="lad-screenshot-card">
            <Image
              src={image.src}
              alt={image.alt}
              width={428}
              height={673}
              className="lad-screenshot-image"
              quality={90}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
