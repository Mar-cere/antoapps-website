import Link from 'next/link';
import type { ReactNode } from 'react';

type FaqItem = {
  question: string;
  answer: ReactNode;
};

const faqItems: FaqItem[] = [
  {
    question: '¿Es lo mismo que terapia?',
    answer:
      'No. Anto es apoyo emocional con IA para ordenar lo que sientes y avanzar con micro-pasos. No diagnostica ni sustituye atención clínica. Si necesitas tratamiento, un profesional es la vía indicada.',
  },
  {
    question: '¿Cuánto cuesta después del trial?',
    answer:
      'Descargas gratis y pruebas 3 días sin costo. Después, el plan mensual parte desde $3.990 CLP. Puedes cancelar cuando quieras desde tu App Store, sin trámites extra.',
  },
  {
    question: '¿Quién ve lo que escribo?',
    answer: (
      <>
        Tus conversaciones son privadas. No vendemos tus datos ni los usamos para publicidad.
        Revisa el detalle en nuestra{' '}
        <Link href="/privacidad">Política de Privacidad</Link>.
      </>
    ),
  },
];

export default function BienvenidaFaq() {
  return (
    <section className="lad-faq lad-section--anchor" id="preguntas" aria-labelledby="lad-faq-title">
      <h2 id="lad-faq-title" className="lad-faq-title">
        Preguntas frecuentes
      </h2>
      <div className="lad-faq-list">
        {faqItems.map((item) => (
          <details key={item.question} className="lad-faq-item">
            <summary className="lad-faq-question">{item.question}</summary>
            <div className="lad-faq-answer">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
