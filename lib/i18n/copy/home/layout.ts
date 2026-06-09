import type { Locale } from '@/lib/i18n/config';

export type SiteLayoutCopy = {
  header: {
    navAria: string;
    logoAria: string;
    menuToggleAria: string;
    downloadAria: string;
    download: string;
    links: { href: string; label: string }[];
  };
  stickyNav: {
    aria: string;
    items: { id: string; label: string; href: string }[];
  };
  footer: {
    tagline: string;
    product: string;
    company: string;
    legal: string;
    rights: string;
    productLinks: { href: string; label: string }[];
    companyLinks: { href: string; label: string }[];
    legalLinks: { href: string; label: string }[];
  };
  cookies: {
    title: string;
    compact: string;
    full: string;
    privacy: string;
    reject: string;
    accept: string;
  };
  ui: {
    scrollToTop: string;
    emailAria: string;
  };
};

const layoutCopy: Record<Locale, SiteLayoutCopy> = {
  es: {
    header: {
      navAria: 'Navegación principal',
      logoAria: 'Anto - Ir a inicio',
      menuToggleAria: 'Abrir o cerrar menú de navegación',
      downloadAria: 'Ir a opciones de descarga de Anto',
      download: 'Descargar',
      links: [
        { href: '/', label: 'Inicio' },
        { href: '/app', label: 'La App' },
        { href: '/#caracteristicas', label: 'Características' },
        { href: '/desarrollo', label: 'Desarrollo' },
        { href: '/contacto', label: 'Contacto' },
      ],
    },
    stickyNav: {
      aria: 'Navegación rápida',
      items: [
        { id: 'inicio', label: 'Inicio', href: '#inicio' },
        { id: 'la-app', label: 'La app', href: '#la-app' },
        { id: 'caracteristicas', label: 'Características', href: '#caracteristicas' },
        { id: 'precios', label: 'Precios', href: '#precios' },
        { id: 'faq', label: 'FAQ', href: '#faq' },
      ],
    },
    footer: {
      tagline: 'Mejorando la salud mental, una conversación a la vez.',
      product: 'Producto',
      company: 'Empresa',
      legal: 'Legal',
      rights: 'Todos los derechos reservados.',
      productLinks: [
        { href: '/app', label: 'La Aplicación' },
        { href: '/#caracteristicas', label: 'Características' },
        { href: '/#precios', label: 'Precios' },
        { href: '/#faq', label: 'FAQ' },
        { href: '/privacidad', label: 'Privacidad' },
      ],
      companyLinks: [
        { href: '/sobre-nosotros', label: 'Sobre Nosotros' },
        { href: '/contacto', label: 'Contacto' },
        { href: '/recursos', label: 'Recursos' },
        { href: '/desarrollo', label: 'Desarrollo' },
        { href: '/changelog', label: 'Control de Versiones' },
      ],
      legalLinks: [
        { href: '/privacidad', label: 'Política de Privacidad' },
        { href: '/terminos', label: 'Términos de Servicio' },
        { href: '/seguridad', label: 'Seguridad' },
      ],
    },
    cookies: {
      title: '🍪 Uso de Cookies',
      compact: 'Usamos cookies para analítica.',
      full:
        'Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. Al hacer clic en "Aceptar", consientes el uso de cookies según nuestra',
      privacy: 'Política de Privacidad',
      reject: 'Rechazar',
      accept: 'Aceptar',
    },
    ui: {
      scrollToTop: 'Volver arriba',
      emailAria: 'Email corporativo',
    },
  },
  en: {
    header: {
      navAria: 'Main navigation',
      logoAria: 'Anto - Go to home',
      menuToggleAria: 'Open or close navigation menu',
      downloadAria: 'Go to Anto download options',
      download: 'Download',
      links: [
        { href: '/en', label: 'Home' },
        { href: '/en/app', label: 'The App' },
        { href: '/en#caracteristicas', label: 'Features' },
        { href: '/en/desarrollo', label: 'Development' },
        { href: '/en/contacto', label: 'Contact' },
      ],
    },
    stickyNav: {
      aria: 'Quick navigation',
      items: [
        { id: 'inicio', label: 'Home', href: '#inicio' },
        { id: 'la-app', label: 'The app', href: '#la-app' },
        { id: 'caracteristicas', label: 'Features', href: '#caracteristicas' },
        { id: 'precios', label: 'Pricing', href: '#precios' },
        { id: 'faq', label: 'FAQ', href: '#faq' },
      ],
    },
    footer: {
      tagline: 'Improving mental health, one conversation at a time.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      rights: 'All rights reserved.',
      productLinks: [
        { href: '/en/app', label: 'The App' },
        { href: '/en#caracteristicas', label: 'Features' },
        { href: '/en#precios', label: 'Pricing' },
        { href: '/en#faq', label: 'FAQ' },
        { href: '/en/privacidad', label: 'Privacy' },
      ],
      companyLinks: [
        { href: '/en/sobre-nosotros', label: 'About Us' },
        { href: '/en/contacto', label: 'Contact' },
        { href: '/en/recursos', label: 'Resources' },
        { href: '/en/desarrollo', label: 'Development' },
        { href: '/en/changelog', label: 'Changelog' },
      ],
      legalLinks: [
        { href: '/en/privacidad', label: 'Privacy Policy' },
        { href: '/en/terminos', label: 'Terms of Service' },
        { href: '/en/seguridad', label: 'Security' },
      ],
    },
    cookies: {
      title: '🍪 Cookie Usage',
      compact: 'We use cookies for analytics.',
      full:
        'We use cookies to improve your experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to cookie use according to our',
      privacy: 'Privacy Policy',
      reject: 'Decline',
      accept: 'Accept',
    },
    ui: {
      scrollToTop: 'Back to top',
      emailAria: 'Corporate email',
    },
  },
};

export function getSiteLayoutCopy(locale: Locale): SiteLayoutCopy {
  return layoutCopy[locale];
}
