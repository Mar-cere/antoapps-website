import Image from 'next/image';

export default function BienvenidaPhoneMockup() {
  return (
    <div className="lad-phone-mockup" aria-hidden="true">
      <Image
        src="/assets/images/hero/phone-in-hand-landing.webp"
        alt=""
        width={640}
        height={960}
        className="lad-phone-mockup-img"
        loading="lazy"
        sizes="(max-width: 480px) 85vw, 320px"
      />
    </div>
  );
}
