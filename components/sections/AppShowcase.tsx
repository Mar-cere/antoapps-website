'use client';

import Image from 'next/image';

export default function AppShowcase() {
  return (
    <section className="app-showcase" data-fade-section>
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-text">
            <h2 className="section-title reveal-on-scroll">Diseñado para Ti</h2>
            <p className="section-subtitle reveal-on-scroll">
              Una interfaz intuitiva y elegante que te permite enfocarte en lo que realmente importa: tu bienestar mental.
            </p>
            <p className="showcase-description reveal-on-scroll">
              Anto combina diseño minimalista con funcionalidad poderosa. Cada elemento está pensado para brindarte una experiencia fluida y accesible, sin importar tu nivel de experiencia con tecnología.
            </p>
          </div>
          <div className="showcase-image-wrapper">
            <div className="phone-mockup-container float-enhanced">
              <Image
                src="/assets/images/hero/phone-mockup.png"
                alt="Anto App - Interfaz principal de la aplicación"
                className="phone-mockup-image"
                width={856}
                height={1346}
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

