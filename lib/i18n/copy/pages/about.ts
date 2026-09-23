import type { Locale } from '@/lib/i18n/config';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

const EDITORIAL_WIDTH = 1536;
const EDITORIAL_HEIGHT = 1024;

export type AboutPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  lede: string;
  paragraphs: readonly [string, string, string];
  figure: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
  microcopy: string;
  storeBadge: string;
  disclaimer: string;
};

function buildAboutPageCopy(locale: Locale): AboutPageCopy {
  if (locale === 'en') {
    const lede = 'A companion for when everything costs a little more.';
    return {
      meta: {
        title: 'About Anto | What it is and is not',
        description: `${lede} It does not diagnose or replace therapy. Made in Chile.`,
      },
      h1: 'About Anto',
      lede,
      figure: {
        src: getEditorialImagePath('evening'),
        alt: 'Quiet evening light through a window, empty room at dusk',
        caption: 'Made in Chile, by one person.',
        width: EDITORIAL_WIDTH,
        height: EDITORIAL_HEIGHT,
      },
      paragraphs: [
        'Anto is an AI emotional companion. For the quiet hours, between the day and bed, or between sessions. You write what you feel. You leave with some clarity and a small next step.',
        'It does not diagnose or replace therapy. A human therapist or professional remains the stronger recommendation.',
        'Made in Chile, by one person. No ads with your story. The conversations stay yours.',
      ],
      microcopy: 'iPhone and Android · 1 day free · No card · Cancel anytime',
      storeBadge: '1 day free',
      disclaimer:
        'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
    };
  }

  const lede = 'Un acompañante para cuando todo cuesta un poco más.';
  return {
    meta: {
      title: 'Sobre Anto | Qué es y qué no es',
      description: `${lede} No diagnostica ni reemplaza terapia. Hecho en Chile.`,
    },
    h1: 'Sobre Anto',
    lede,
    figure: {
      src: getEditorialImagePath('evening'),
      alt: 'Luz de tarde en una habitación quieta, ventana al anochecer',
      caption: 'Hecho en Chile, por una persona.',
      width: EDITORIAL_WIDTH,
      height: EDITORIAL_HEIGHT,
    },
    paragraphs: [
      'Anto es una app de acompañamiento emocional con IA. Para las horas quietas, entre el día y la cama, o entre sesiones. Escribes lo que sientes. Sales con claridad y un paso concreto.',
      'No diagnostica ni reemplaza terapia. Un terapeuta o profesional humano sigue siendo lo más recomendable.',
      'Hecho en Chile, por una persona. Sin anuncios con tu historia. Las conversaciones son tuyas.',
    ],
    microcopy: 'iPhone y Android · 1 día gratis · Sin tarjeta · Cancela cuando quieras',
    storeBadge: '1 día gratis',
    disclaimer:
      'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
  };
}

export function getAboutPageCopy(locale: Locale): AboutPageCopy {
  return buildAboutPageCopy(locale);
}
