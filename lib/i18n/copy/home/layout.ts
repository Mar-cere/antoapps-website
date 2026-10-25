import type { Locale } from '@/lib/i18n/config';

export type SiteLayoutCopy = {
  header: {
    navAria: string;
    logoAria: string;
    menuToggleAria: string;
    downloadAria: string;
    download: string;
    appStore: string;
    googlePlay: string;
    appStoreAria: string;
    googlePlayAria: string;
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
      downloadAria: 'Elegir tienda para descargar Anto',
      download: 'Descargar',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      appStoreAria: 'Descargar Anto en App Store',
      googlePlayAria: 'Descargar Anto en Google Play',
      links: [
        { href: '/', label: 'Inicio' },
        { href: '/app', label: 'La App' },
        { href: '/#home-feat-product', label: 'La app' },
        { href: '/desarrollo', label: 'Desarrollo' },
        { href: '/contacto', label: 'Contacto' },
      ],
    },
    stickyNav: {
      aria: 'Navegación rápida',
      items: [
        { id: 'inicio', label: 'Inicio', href: '#inicio' },
        { id: 'home-feat-product', label: 'La app', href: '#home-feat-product' },
        { id: 'precios', label: 'Precios', href: '#precios' },
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
        { href: '/#home-feat-product', label: 'La app' },
        { href: '/#precios', label: 'Precios' },
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
      downloadAria: 'Choose a store to download Anto',
      download: 'Download',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      appStoreAria: 'Download Anto on the App Store',
      googlePlayAria: 'Download Anto on Google Play',
      links: [
        { href: '/en', label: 'Home' },
        { href: '/en/app', label: 'The App' },
        { href: '/en#home-feat-product', label: 'The app' },
        { href: '/en/desarrollo', label: 'Development' },
        { href: '/en/contacto', label: 'Contact' },
      ],
    },
    stickyNav: {
      aria: 'Quick navigation',
      items: [
        { id: 'inicio', label: 'Home', href: '#inicio' },
        { id: 'home-feat-product', label: 'The app', href: '#home-feat-product' },
        { id: 'precios', label: 'Pricing', href: '#precios' },
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
        { href: '/en#home-feat-product', label: 'The app' },
        { href: '/en#precios', label: 'Pricing' },
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
  pt: {
    header: {
      navAria: 'Navegação principal',
      logoAria: 'Anto - Ir para o início',
      menuToggleAria: 'Abrir ou fechar o menu de navegação',
      downloadAria: 'Escolher a loja para baixar a Anto',
      download: 'Baixar',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      appStoreAria: 'Baixar a Anto na App Store',
      googlePlayAria: 'Baixar a Anto no Google Play',
      links: [
        { href: '/pt', label: 'Início' },
        { href: '/pt/app', label: 'O App' },
        { href: '/pt#home-feat-product', label: 'O app' },
        { href: '/pt/desarrollo', label: 'Desenvolvimento' },
        { href: '/pt/contacto', label: 'Contato' },
      ],
    },
    stickyNav: {
      aria: 'Navegação rápida',
      items: [
        { id: 'inicio', label: 'Início', href: '#inicio' },
        { id: 'home-feat-product', label: 'O app', href: '#home-feat-product' },
        { id: 'precios', label: 'Preços', href: '#precios' },
      ],
    },
    footer: {
      tagline: 'Melhorando a saúde mental, uma conversa de cada vez.',
      product: 'Produto',
      company: 'Empresa',
      legal: 'Legal',
      rights: 'Todos os direitos reservados.',
      productLinks: [
        { href: '/pt/app', label: 'O Aplicativo' },
        { href: '/pt#home-feat-product', label: 'O app' },
        { href: '/pt#precios', label: 'Preços' },
        { href: '/pt/privacidad', label: 'Privacidade' },
      ],
      companyLinks: [
        { href: '/pt/sobre-nosotros', label: 'Sobre Nós' },
        { href: '/pt/contacto', label: 'Contato' },
        { href: '/pt/recursos', label: 'Recursos' },
        { href: '/pt/desarrollo', label: 'Desenvolvimento' },
        { href: '/pt/changelog', label: 'Controle de Versões' },
      ],
      legalLinks: [
        { href: '/pt/privacidad', label: 'Política de Privacidade' },
        { href: '/pt/terminos', label: 'Termos de Serviço' },
        { href: '/pt/seguridad', label: 'Segurança' },
      ],
    },
    cookies: {
      title: '🍪 Uso de cookies',
      compact: 'Usamos cookies para análise.',
      full:
        'Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar o conteúdo. Ao clicar em "Aceitar", você concorda com o uso de cookies de acordo com nossa',
      privacy: 'Política de Privacidade',
      reject: 'Recusar',
      accept: 'Aceitar',
    },
    ui: {
      scrollToTop: 'Voltar ao topo',
      emailAria: 'E-mail corporativo',
    },
  },
};

export function getSiteLayoutCopy(locale: Locale): SiteLayoutCopy {
  return layoutCopy[locale];
}
