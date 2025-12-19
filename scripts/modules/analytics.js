/**
 * Google Analytics Module
 * Maneja el tracking de Google Analytics
 */

// Google Analytics ID - Reemplazar con tu ID real
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID de Google Analytics

/**
 * Initialize Google Analytics
 */
export function initAnalytics() {
    // Solo cargar en producción
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Google Analytics deshabilitado en desarrollo');
        return;
    }

    // Cargar Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
    });

    // Hacer gtag disponible globalmente
    window.gtag = gtag;
}

/**
 * Track event
 * @param {string} action - Acción del evento
 * @param {string} category - Categoría del evento
 * @param {string} label - Etiqueta opcional
 * @param {number} value - Valor opcional
 */
export function trackEvent(action, category, label = '', value = 0) {
    if (window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

/**
 * Track page view
 * @param {string} pagePath - Ruta de la página
 */
export function trackPageView(pagePath) {
    if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: pagePath
        });
    }
}

/**
 * Track download button click
 * @param {string} platform - 'app-store' o 'google-play'
 */
export function trackDownload(platform) {
    trackEvent('download', 'engagement', platform, 1);
}

/**
 * Track CTA button click
 * @param {string} ctaText - Texto del CTA
 */
export function trackCTA(ctaText) {
    trackEvent('cta_click', 'engagement', ctaText, 1);
}

/**
 * Track form submission
 * @param {string} formType - Tipo de formulario
 */
export function trackFormSubmit(formType) {
    trackEvent('form_submit', 'engagement', formType, 1);
}

