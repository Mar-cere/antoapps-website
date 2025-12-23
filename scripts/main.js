/**
 * Main JavaScript Entry Point
 * Inicializa todos los módulos de la aplicación
 */

// Import modules
import { initNavigation, initSmoothScroll } from './modules/navigation.js';
import { initTabs } from './modules/tabs.js';
import { initFAQ } from './modules/faq.js';
import { initScrollAnimations, initHeaderScroll } from './modules/animations.js';
import { initParticles } from './modules/particles.js';
import { initForms } from './modules/forms.js';
import { initLazyLoading } from './modules/lazy-loading.js';
import { initAnalytics } from './modules/analytics.js';
import { initCookieConsent } from './modules/cookie-consent.js';
import { initTracking } from './modules/tracking.js';
import { initAdvancedAnimations } from './modules/advanced-animations.js';
import { initEnhancedAnimations } from './modules/enhanced-animations.js';

/**
 * Initialize all modules when DOM is ready
 */
function init() {
    // Navigation
    initNavigation();
    initSmoothScroll();
    
    // Interactive components
    initTabs();
    initFAQ();
    
    // Animations
    initScrollAnimations();
    initHeaderScroll();
    initParticles();
    
    // Advanced animations
    initAdvancedAnimations();
    
    // Enhanced animations
    initEnhancedAnimations();
    
    // Forms
    initForms();
    
    // Performance
    initLazyLoading();
    
    // Analytics (solo si cookies aceptadas)
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        initAnalytics();
    }
    
    // Cookie Consent
    initCookieConsent();
    
    // Tracking (solo si cookies aceptadas)
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        initTracking();
    }
    
    // Console message
    console.log('%cAnto App', 'color: #1ADDDB; font-size: 24px; font-weight: bold;');
    console.log('%cMejorando la salud mental, una conversación a la vez.', 'color: #A3B8E8; font-size: 14px;');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
