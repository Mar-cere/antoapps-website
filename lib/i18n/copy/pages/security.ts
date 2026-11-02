import { localePath, type Locale } from '@/lib/i18n/config';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

const CANONICAL_PATH = '/seguridad';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';
const SUPPORT_EMAIL = 'soporte@antoapps.com';
const EDITORIAL_WIDTH = 1536;
const EDITORIAL_HEIGHT = 1024;

export type SecurityTake = {
  title: string;
  body: string;
};

export type SecurityFigure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type SecurityPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  crumbAria: string;
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
  };
  hero: {
    title: string;
  };
  pullQuote: string;
  reading: {
    title: string;
    paragraphs: readonly string[];
  };
  figure: SecurityFigure;
  takes: {
    title: string;
    items: readonly SecurityTake[];
  };
  limits: {
    title: string;
    body: string;
  };
  contact: {
    title: string;
    securityLead: string;
    securityEmail: string;
    dataLead: string;
    dataEmail: string;
    privacyPrefix: string;
    privacyLabel: string;
    privacyHref: string;
  };
};

function buildSecurityPageCopy(locale: Locale): SecurityPageCopy {
  const privacyHref = localePath(locale, '/privacidad');
  const figureSrc = getEditorialImagePath('morningPause');

  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Security',
      },
      crumbAria: 'Breadcrumb',
      meta: {
        title: 'How we care for what you write | Encryption and limits - Anto',
        description:
          'Anto keeps the thread so you do not start over. Conversations travel encrypted between your phone and our servers. Only you can access your account. Anto and the model read the text. Not a substitute for therapy.',
        openGraphTitle: 'How we care for what you write - Anto',
        openGraphDescription:
          'Why the thread is read, how conversations travel encrypted to the servers, and who can access the account. Not a clinical service.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'How we care for what you write',
      },
      pullQuote:
        'Anto keeps the thread so you do not start from a blank page. That means reading what you write. It does not mean an audience.',
      reading: {
        title: 'Why it is read',
        paragraphs: [
          'To accompany you, Anto needs the words: to reply, remember what returns, and offer a next step. That is the promise of not starting over. Anto and the model read those words to provide the service.',
          'The thread is not sold. It is not used for ads.',
        ],
      },
      figure: {
        src: figureSrc,
        alt: 'Person seen from behind walking through a living room, phone in hand, window light',
        caption: 'The thread stays in your account. Not on a stage.',
        width: EDITORIAL_WIDTH,
        height: EDITORIAL_HEIGHT,
      },
      takes: {
        title: 'The path and the store',
        items: [
          {
            title: 'On the way',
            body: 'Traffic between your device and the servers goes over HTTPS (TLS). That protects the path. When it arrives, the service reads the text: this is not end-to-end encryption.',
          },
          {
            title: 'Stored',
            body: 'The thread is kept in your account, on our servers, so you do not start over. Only you can access that account.',
          },
          {
            title: 'Who reads',
            body: 'You, when you sign in. Anto and the model, to reply and remember. The model is an AI provider that processes the text.',
          },
          {
            title: 'Asking to delete',
            body: 'You can ask us to delete your account and your data. We do so according to our retention policies and legal requirements.',
          },
        ],
      },
      limits: {
        title: 'Limits',
        body: 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
      },
      contact: {
        title: 'Contact',
        securityLead: 'If you find a security issue, write to',
        securityEmail: DEVELOPER_EMAIL,
        dataLead: 'To access your data or ask for deletion, write to',
        dataEmail: SUPPORT_EMAIL,
        privacyPrefix: 'The legal detail is in the',
        privacyLabel: 'privacy policy',
        privacyHref,
      },
    };
  }

  if (locale === 'pt') {
    return {
      breadcrumbs: {
        homeLabel: 'Início',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Segurança',
      },
      crumbAria: 'Trilha de navegação',
      meta: {
        title: 'Como cuidamos do que você escreve | Criptografia e limites - Anto',
        description:
          'A Anto guarda o fio para você não começar do zero. As conversas viajam criptografadas entre seu celular e nossos servidores. Só você acessa sua conta. A Anto e o modelo leem o texto. Não substitui terapia.',
        openGraphTitle: 'Como cuidamos do que você escreve - Anto',
        openGraphDescription:
          'Por que o fio é lido, como as conversas viajam criptografadas até os servidores e quem acessa a conta. Não é um serviço clínico.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Como cuidamos do que você escreve',
      },
      pullQuote:
        'A Anto guarda o fio para você não recomeçar em branco. Isso pede ler o que você escreve. Não pede uma plateia.',
      reading: {
        title: 'Por que é lido',
        paragraphs: [
          'Para acompanhar você, a Anto precisa do texto: responder, lembrar o que volta, oferecer um passo concreto. Essa é a promessa de não começar do zero. A Anto e o modelo leem essas palavras para prestar o serviço.',
          'O fio não é vendido. Não é usado para anúncios.',
        ],
      },
      figure: {
        src: figureSrc,
        alt: 'Pessoa de costas caminha pela sala com o celular na mão, luz da janela',
        caption: 'O fio fica na sua conta. Não num palco.',
        width: EDITORIAL_WIDTH,
        height: EDITORIAL_HEIGHT,
      },
      takes: {
        title: 'O caminho e o arquivo',
        items: [
          {
            title: 'No caminho',
            body: 'O tráfego entre o seu dispositivo e os servidores vai por HTTPS (TLS). Isso protege o trajeto. Ao chegar, o serviço lê o texto: não é criptografia de ponta a ponta.',
          },
          {
            title: 'Guardado',
            body: 'O fio fica na sua conta, nos nossos servidores, para você não começar do zero. Só você acessa essa conta.',
          },
          {
            title: 'Quem lê',
            body: 'Você, ao entrar. A Anto e o modelo, para responder e lembrar. O modelo é um provedor de IA que processa o texto.',
          },
          {
            title: 'Pedir para apagar',
            body: 'Você pode pedir que a gente apague a sua conta e os seus dados. Fazemos isso segundo as políticas de retenção e as exigências legais.',
          },
        ],
      },
      limits: {
        title: 'Limites',
        body: 'A Anto não substitui terapia nem atendimento clínico profissional. Se você está em crise, procure ajuda de emergência no seu país.',
      },
      contact: {
        title: 'Contato',
        securityLead: 'Se você encontrar uma falha de segurança, escreva para',
        securityEmail: DEVELOPER_EMAIL,
        dataLead: 'Para acessar os seus dados ou pedir a exclusão, escreva para',
        dataEmail: SUPPORT_EMAIL,
        privacyPrefix: 'O detalhe legal está na',
        privacyLabel: 'política de privacidade',
        privacyHref,
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Seguridad',
    },
    crumbAria: 'Miga de pan',
    meta: {
      title: 'Cómo cuidamos lo que escribes | Cifrado y límites - Anto',
      description:
        'Anto guarda el hilo para no empezar de cero. Las conversaciones viajan cifradas entre tu teléfono y nuestros servidores. Solo tú accedes a tu cuenta. Anto y el modelo leen el texto. No sustituye terapia.',
      openGraphTitle: 'Cómo cuidamos lo que escribes - Anto',
      openGraphDescription:
        'Por qué se lee el hilo, cómo viajan cifradas las conversaciones hasta los servidores y quién accede a la cuenta. No es un servicio clínico.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Cómo cuidamos lo que escribes',
    },
    pullQuote:
      'Anto guarda el hilo para no volver a empezar en blanco. Eso pide leer lo que escribes. No pide una audiencia.',
    reading: {
      title: 'Por qué se lee',
      paragraphs: [
        'Para acompañarte, Anto necesita el texto: responder, recordar lo que vuelve, ofrecer un siguiente paso. Esa es la promesa de no empezar de cero. Anto y el modelo leen esas palabras para prestar el servicio.',
        'El hilo no se vende. No se usa para anuncios.',
      ],
    },
    figure: {
      src: figureSrc,
      alt: 'Persona de espaldas camina por el salón con el teléfono en la mano, luz de ventana',
      caption: 'El hilo se queda en tu cuenta. No en un escenario.',
      width: EDITORIAL_WIDTH,
      height: EDITORIAL_HEIGHT,
    },
    takes: {
      title: 'El camino y el archivo',
      items: [
        {
          title: 'En el camino',
          body: 'El tráfico entre tu dispositivo y los servidores va por HTTPS (TLS). Eso protege el trayecto. Al llegar, el servicio lee el texto: no es cifrado de extremo a extremo.',
        },
        {
          title: 'Guardado',
          body: 'El hilo se guarda en tu cuenta, en nuestros servidores, para no empezar de cero. Solo tú accedes a esa cuenta.',
        },
        {
          title: 'Quién lee',
          body: 'Tú, al iniciar sesión. Anto y el modelo, para responderte y recordar. El modelo es un proveedor de IA que procesa el texto.',
        },
        {
          title: 'Pedir que se borre',
          body: 'Puedes pedir que borremos tu cuenta y tus datos. Lo hacemos según nuestras políticas de retención y requisitos legales.',
        },
      ],
    },
    limits: {
      title: 'Límites',
      body: 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
    },
    contact: {
      title: 'Contacto',
      securityLead: 'Si encuentras un fallo de seguridad, escribe a',
      securityEmail: DEVELOPER_EMAIL,
      dataLead: 'Para acceder a tus datos o pedir que se borren, escribe a',
      dataEmail: SUPPORT_EMAIL,
      privacyPrefix: 'El detalle legal está en la',
      privacyLabel: 'política de privacidad',
      privacyHref,
    },
  };
}

export function getSecurityPageCopy(locale: Locale): SecurityPageCopy {
  return buildSecurityPageCopy(locale);
}
