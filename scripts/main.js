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
import { initTooltips } from './modules/tooltips.js';
import { initMicrointeractions } from './modules/microinteractions.js';
import { registerServiceWorker, initPWAInstall } from './modules/service-worker.js';
import { initPerformanceOptimizations } from './modules/performance.js';
import { initEnhancedParticles } from './modules/enhanced-particles.js';
import { initPageTransitions } from './modules/page-transitions.js';
import { init3DEffects } from './modules/3d-effects.js';
import { initTouchOptimizations } from './modules/touch-optimizations.js';
import { initEnhancedScrollAnimations } from './modules/enhanced-scroll-animations.js';
import { initMonitoring } from './modules/monitoring.js';
import { initDeviceDetection } from './modules/device-detection.js';
import { initI18n } from './modules/i18n.js';
import { initAccessibility } from './modules/accessibility.js';

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
    
    // Microinteractions
    initMicrointeractions();
    initTooltips();
    
    // Forms
    initForms();
    
    // Performance
    initLazyLoading();
    initPerformanceOptimizations();
    
    // Service Worker & PWA
    registerServiceWorker();
    initPWAInstall();
    
    // Enhanced animations
    initEnhancedParticles();
    initEnhancedScrollAnimations();
    init3DEffects();
    initPageTransitions();
    
    // Touch optimizations
    initTouchOptimizations();
    
    // Device detection
    initDeviceDetection();
    
    // Monitoring and observability
    initMonitoring();
    
    // Internationalization
    initI18n();
    
    // Accessibility
    initAccessibility();
    
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
