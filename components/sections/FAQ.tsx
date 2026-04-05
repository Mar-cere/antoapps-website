'use client';

import React, { useState, useMemo } from 'react';
import { useFAQ } from '@/lib/hooks/useFAQ';
import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import FAQSearch, { useFAQHighlight } from '@/components/ui/FAQSearch';

const faqData = [
  {
    id: 1,
    question: '¿Mis conversaciones son realmente privadas?',
    answer:
      'Sí, absolutamente. Todas tus conversaciones están encriptadas de extremo a extremo (E2E) utilizando estándares de grado militar (AES-256). Esto significa que solo tú y el sistema pueden leer tus mensajes. Ni siquiera nuestros administradores pueden acceder al contenido de tus conversaciones. Nunca compartimos, vendemos o comercializamos tu información con terceros. Tu privacidad es nuestra máxima prioridad y cumplimos con todas las regulaciones internacionales de protección de datos, incluyendo GDPR y HIPAA.',
    category: 'privacidad',
  },
  {
    id: 2,
    question: '¿Cómo funciona el asistente AI?',
    answer:
      'El asistente usa NLP de última generación (OpenAI GPT-5 Mini) con enfoque de bienestar emocional y técnicas alineadas con evidencia (p. ej. enfoques tipo CBT cuando encajan). Por defecto el tono es profesional y práctico; no sustituye terapia presencial ni diagnóstico clínico. Incluye escalas validadas (PHQ-9, GAD-7), detección de distorsiones cognitivas y protocolos estructurados. Puedes ajustar preferencias de estilo de respuesta cuando la app lo ofrece (v1.2+). El sistema contextualiza tus mensajes y mejora la personalización con el uso; la app y el backend se actualizan según el diseño del producto y buenas prácticas de seguridad.',
    category: 'funcionalidad',
  },
  {
    id: 3,
    question: '¿Puedo usar Anto si ya tengo un terapeuta?',
    answer:
      'Por supuesto. Anto está diseñado específicamente para complementar, no reemplazar, la terapia tradicional. Muchos usuarios lo usan como apoyo entre sesiones, para hacer seguimiento diario de su estado emocional, o como herramienta adicional de bienestar. Algunos terapeutas incluso recomiendan Anto a sus pacientes como complemento. Puedes compartir tus reportes y análisis con tu terapeuta si lo deseas, lo que puede enriquecer vuestras sesiones.',
    category: 'funcionalidad',
  },
  {
    id: 4,
    question: '¿Qué pasa si el sistema detecta una crisis?',
    answer:
      'Nuestro sistema de detección de crisis utiliza algoritmos avanzados para identificar señales de riesgo. Si detectamos una situación de crisis, inmediatamente te ofrecemos recursos de apoyo, incluyendo líneas de ayuda 24/7, contactos de emergencia locales, y técnicas de estabilización. En casos graves donde detectamos riesgo inminente, podemos ayudarte a contactar servicios de emergencia. El sistema está diseñado para ser proactivo pero respetuoso, priorizando siempre tu seguridad y bienestar.',
    category: 'funcionalidad',
  },
  {
    id: 5,
    question: '¿Hay un período de prueba gratis?',
    answer:
      'Sí, ofrecemos 3 días completos de prueba gratis en el plan Premium. No se requiere tarjeta de crédito para comenzar, y puedes cancelar en cualquier momento sin compromiso. Durante la prueba tendrás acceso completo a todas las funciones Premium, incluyendo análisis emocional avanzado, detección de crisis proactiva, y todas las herramientas de bienestar. Si decides continuar después de la prueba, tu suscripción comenzará automáticamente.',
    category: 'precios',
  },
  {
    id: 6,
    question: '¿En qué dispositivos está disponible?',
    answer:
      'Anto está disponible actualmente para iOS (iPhone y iPad con iOS 13 o superior) y Android (versión 8.0 o superior). Estamos trabajando activamente en una versión web que estará disponible en los próximos meses. La aplicación está optimizada para funcionar en todos los tamaños de pantalla, desde teléfonos pequeños hasta tablets grandes. Todos tus datos se sincronizan automáticamente entre dispositivos de forma segura.',
    category: 'tecnica',
  },
  {
    id: 7,
    question: '¿Cuánto cuesta usar Anto?',
    answer:
      'Ofrecemos planes flexibles basados en duración: 1 Mes ($3.990 CLP), 3 Meses ($11.990 CLP), 6 Meses ($20.990 CLP), y 1 Año ($39.990 CLP). Todos los planes incluyen las mismas funcionalidades premium: acceso completo al asistente AI, análisis emocional avanzado, detección de crisis proactiva, herramientas de bienestar, y soporte 24/7. Los planes de mayor duración ofrecen ahorros significativos (hasta 17% de descuento).',
    category: 'precios',
  },
];

const faqMoreData = [
  {
    id: 8,
    question: '¿Necesito conexión a internet para usar Anto?',
    answer:
      'Sí, Anto requiere conexión a internet para la mayoría de las funciones, ya que el procesamiento del asistente AI y el análisis emocional se realizan en servidores seguros. Sin embargo, algunas funciones básicas como ejercicios de mindfulness y técnicas de relajación están disponibles offline. Estamos trabajando en una versión offline más completa que permitirá guardar conversaciones localmente y sincronizarlas cuando tengas conexión.',
    category: 'tecnica',
  },
  {
    id: 9,
    question: '¿Cómo funciona el análisis emocional?',
    answer:
      'El análisis emocional de Anto utiliza procesamiento de lenguaje natural y machine learning para analizar tus conversaciones, patrones de uso, y respuestas a cuestionarios. El sistema identifica emociones, detecta patrones a lo largo del tiempo, y te proporciona insights personalizados sobre tu bienestar mental. Recibirás gráficos visuales de tu estado emocional, alertas proactivas cuando detectemos cambios significativos, y reportes semanales y mensuales con recomendaciones personalizadas.',
    category: 'funcionalidad',
  },
  {
    id: 10,
    question: '¿Puedo exportar mis datos?',
    answer:
      'Sí, tienes control total sobre tus datos. Puedes exportar toda tu información en cualquier momento en formatos estándar (JSON, CSV, PDF). Esto incluye tus conversaciones, análisis emocionales, y reportes. También puedes solicitar la eliminación completa de tus datos en cualquier momento desde la configuración de la aplicación. Cumplimos con el derecho al olvido (GDPR) y eliminaremos permanentemente tu información dentro de 30 días tras tu solicitud.',
    category: 'privacidad',
  },
  {
    id: 11,
    question: '¿Anto puede diagnosticar condiciones de salud mental?',
    answer:
      'No, Anto no puede y no debe usarse para diagnosticar condiciones de salud mental. Anto es una herramienta de apoyo y bienestar, no un reemplazo para el diagnóstico profesional. Si tienes preocupaciones sobre tu salud mental, te recomendamos consultar con un profesional de salud mental licenciado. Anto puede ayudarte a identificar patrones y proporcionar apoyo, pero el diagnóstico debe ser realizado por un profesional cualificado.',
    category: 'funcionalidad',
  },
  {
    id: 12,
    question: '¿Cómo puedo cancelar mi suscripción?',
    answer:
      'Puedes cancelar tu suscripción en cualquier momento desde la configuración de la aplicación o contactándonos directamente. Si cancelas, seguirás teniendo acceso hasta el final del período de facturación actual. No hay penalizaciones ni cargos por cancelación. Si cancelas durante el período de prueba, no se te cobrará nada. Tu cuenta se convertirá automáticamente en una cuenta gratuita limitada, y podrás reactivar tu suscripción en cualquier momento.',
    category: 'precios',
  },
  {
    id: 13,
    question: '¿Anto es adecuado para adolescentes?',
        answer:
          'Anto está diseñado para usuarios de 18 años o más. Para menores de 18 años, recomendamos que usen la aplicación bajo la supervisión de un padre o tutor legal. Estamos desarrollando una versión específica para adolescentes (13-17 años) con contenido adaptado y controles parentales, que estará disponible próximamente. Si eres padre o tutor y tienes preguntas sobre el uso de Anto por parte de un menor, contáctanos en marcelo.ull@antoapps.com o a través de nuestro Telegram: t.me/marcere23.',
    category: 'funcionalidad',
  },
  {
    id: 14,
    question: '¿Qué tipo de ejercicios de bienestar incluye Anto?',
    answer:
      'Anto incluye una biblioteca completa de más de 100 ejercicios de bienestar, incluyendo meditaciones guiadas personalizadas, técnicas de respiración (4-7-8, respiración diafragmática), ejercicios de mindfulness, técnicas de relajación muscular progresiva, visualizaciones guiadas, ejercicios de gratitud, y técnicas de grounding. Todos los ejercicios están diseñados por profesionales de salud mental y se adaptan a tu estado emocional actual. Puedes acceder a ellos en cualquier momento, incluso offline.',
    category: 'funcionalidad',
  },
  {
    id: 15,
    question: '¿Cómo se compara Anto con otras apps de salud mental?',
    answer:
      'Anto se diferencia por su enfoque en privacidad (encriptación E2E), un asistente de bienestar emocional con IA que se adapta al contexto, detección de crisis proactiva y análisis emocional detallado. No vendemos datos de usuarios y priorizamos seguridad y transparencia. El modelo de precios es accesible y hay período de prueba de 3 días para explorar las funciones (según el flujo en la app).',
    category: 'funcionalidad',
  },
  {
    id: 16,
    question: '¿Puedo usar Anto en múltiples dispositivos?',
    answer:
      'Sí, puedes usar Anto en tantos dispositivos como quieras con una sola cuenta. Todos tus datos, conversaciones, y análisis se sincronizan automáticamente entre dispositivos de forma segura y encriptada. Puedes comenzar una conversación en tu iPhone y continuarla en tu iPad o Android sin problemas. La sincronización es instantánea y segura, utilizando encriptación de extremo a extremo para proteger tus datos durante la transferencia.',
    category: 'funcionalidad',
  },
  {
    id: 17,
    question: '¿Qué hago si tengo problemas técnicos?',
        answer:
          'Ofrecemos soporte técnico 24/7 a través de múltiples canales: email (marcelo.ull@antoapps.com), Telegram (t.me/marcere23), y LinkedIn. Nuestro equipo de soporte responde típicamente en menos de 2 horas. También tenemos una sección de ayuda dentro de la aplicación con guías paso a paso y solución de problemas comunes. Si encuentras un bug o problema, puedes reportarlo directamente desde la app y lo solucionaremos lo antes posible.',
    category: 'tecnica',
  },
];

export default function FAQ() {
  // Removido useFAQ() porque causa conflicto con el estado de React
  useScrollAnimations();
  const [showMore, setShowMore] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'privacidad', label: 'Privacidad' },
    { id: 'funcionalidad', label: 'Funcionalidad' },
    { id: 'precios', label: 'Precios' },
    { id: 'tecnica', label: 'Técnica' },
    { id: 'empresarial', label: 'Empresarial' },
  ];

  const allFAQs = showMore ? [...faqData, ...faqMoreData] : faqData;

  const displayedFAQs = useMemo(() => {
    return allFAQs.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allFAQs, searchQuery, selectedCategory]);

  const highlightText = useFAQHighlight(searchQuery);

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="faq" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Preguntas Frecuentes</h2>
        <p className="section-subtitle reveal-on-scroll">
          Encuentra respuestas a las preguntas más comunes sobre Anto
        </p>

        <div className="faq-search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
              aria-label="Buscar preguntas frecuentes"
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="search-results-count">
              {displayedFAQs.length} {displayedFAQs.length === 1 ? 'resultado' : 'resultados'} encontrado
              {displayedFAQs.length === 1 ? '' : 's'}
            </div>
          )}
        </div>

        <div className="faq-categories" data-stagger>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`faq-category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              data-category={cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {displayedFAQs.length === 0 && searchQuery && (
          <div className="no-results">
            <p>No se encontraron resultados para &quot;{searchQuery}&quot;</p>
            <button onClick={() => setSearchQuery('')} className="btn btn-secondary">
              Limpiar búsqueda
            </button>
          </div>
        )}

        <div className="faq-list" id="faqList">
          {displayedFAQs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item"
              data-stagger-item
              data-category={faq.category}
            >
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>{highlightText(faq.question)}</span>
                <span className="faq-icon">{activeFAQ === faq.id ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${activeFAQ === faq.id ? 'active' : ''}`}>
                <p>{highlightText(faq.answer)}</p>
              </div>
            </div>
          ))}
        </div>

        {!showMore && (
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowMore(true)}
              id="faqShowMore"
            >
              Ver todas las preguntas frecuentes →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
