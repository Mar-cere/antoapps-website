/**
 * Internationalization (i18n) Module
 * Handles translations, RTL support, and language switching
 */

// Translations
const translations = {
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.features': 'Características',
        'nav.pricing': 'Precios',
        'nav.resources': 'Recursos',
        'nav.contact': 'Contacto',
        'nav.download': 'Descargar App',
        
        // Common
        'common.loading': 'Cargando...',
        'common.error': 'Error',
        'common.success': 'Éxito',
        'common.close': 'Cerrar',
        'common.save': 'Guardar',
        'common.cancel': 'Cancelar',
        
        // Buttons
        'btn.download': 'Descargar',
        'btn.learn-more': 'Saber más',
        'btn.get-started': 'Comenzar',
        
        // Footer
        'footer.rights': 'Todos los derechos reservados',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.pricing': 'Pricing',
        'nav.resources': 'Resources',
        'nav.contact': 'Contact',
        'nav.download': 'Download App',
        
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.close': 'Close',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        
        // Buttons
        'btn.download': 'Download',
        'btn.learn-more': 'Learn More',
        'btn.get-started': 'Get Started',
        
        // Footer
        'footer.rights': 'All rights reserved',
    },
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.features': 'المميزات',
        'nav.pricing': 'الأسعار',
        'nav.resources': 'الموارد',
        'nav.contact': 'اتصل بنا',
        'nav.download': 'تحميل التطبيق',
        
        // Common
        'common.loading': 'جاري التحميل...',
        'common.error': 'خطأ',
        'common.success': 'نجح',
        'common.close': 'إغلاق',
        'common.save': 'حفظ',
        'common.cancel': 'إلغاء',
        
        // Buttons
        'btn.download': 'تحميل',
        'btn.learn-more': 'معرفة المزيد',
        'btn.get-started': 'ابدأ',
        
        // Footer
        'footer.rights': 'جميع الحقوق محفوظة',
    },
};

// RTL languages
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

// Current language
let currentLanguage = 'es';
let currentDirection = 'ltr';

/**
 * Initialize i18n
 */
export function initI18n() {
    // Detect language from browser or localStorage
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];
    
    currentLanguage = savedLanguage || browserLanguage || 'es';
    
    // Check if language is supported
    if (!translations[currentLanguage]) {
        currentLanguage = 'es';
    }
    
    // Set direction
    currentDirection = rtlLanguages.includes(currentLanguage) ? 'rtl' : 'ltr';
    
    // Apply language
    applyLanguage(currentLanguage);
    
    // Create language selector
    createLanguageSelector();
}

/**
 * Apply language to page
 */
function applyLanguage(lang) {
    currentLanguage = lang;
    currentDirection = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = currentDirection;
    document.body.setAttribute('data-lang', lang);
    document.body.setAttribute('data-dir', currentDirection);
    
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Translate elements with data-i18n-html (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        const translation = getTranslation(key);
        if (translation) {
            element.innerHTML = translation;
        }
    });
    
    // Save to localStorage
    localStorage.setItem('language', lang);
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('languagechange', {
        detail: { language: lang, direction: currentDirection }
    }));
}

/**
 * Get translation
 */
export function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            // Fallback to Spanish
            value = translations.es;
            for (const k2 of keys) {
                if (value && value[k2]) {
                    value = value[k2];
                } else {
                    return key; // Return key if translation not found
                }
            }
            break;
        }
    }
    
    return value || key;
}

/**
 * Translate function (for use in JavaScript)
 */
export function t(key) {
    return getTranslation(key);
}

/**
 * Create language selector
 */
function createLanguageSelector() {
    // Check if selector already exists
    if (document.getElementById('language-selector')) return;
    
    const selector = document.createElement('div');
    selector.id = 'language-selector';
    selector.className = 'language-selector';
    selector.innerHTML = `
        <button class="language-selector-btn" id="language-btn" aria-label="Select language">
            <span class="language-flag">${getLanguageFlag(currentLanguage)}</span>
            <span class="language-code">${currentLanguage.toUpperCase()}</span>
            <span class="language-arrow">▼</span>
        </button>
        <div class="language-dropdown" id="language-dropdown">
            <button class="language-option" data-lang="es">
                <span class="language-flag">🇪🇸</span>
                <span>Español</span>
            </button>
            <button class="language-option" data-lang="en">
                <span class="language-flag">🇺🇸</span>
                <span>English</span>
            </button>
            <button class="language-option" data-lang="ar">
                <span class="language-flag">🇸🇦</span>
                <span>العربية</span>
            </button>
        </div>
    `;
    
    // Add to header
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.insertBefore(selector, navActions.firstChild);
    } else {
        document.body.appendChild(selector);
    }
    
    // Event listeners
    const btn = document.getElementById('language-btn');
    const dropdown = document.getElementById('language-dropdown');
    const options = document.querySelectorAll('.language-option');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            applyLanguage(lang);
            dropdown.classList.remove('active');
            updateLanguageSelector();
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!selector.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

/**
 * Update language selector
 */
function updateLanguageSelector() {
    const flag = document.querySelector('#language-btn .language-flag');
    const code = document.querySelector('#language-btn .language-code');
    
    if (flag) flag.textContent = getLanguageFlag(currentLanguage);
    if (code) code.textContent = currentLanguage.toUpperCase();
}

/**
 * Get language flag emoji
 */
function getLanguageFlag(lang) {
    const flags = {
        es: '🇪🇸',
        en: '🇺🇸',
        ar: '🇸🇦',
    };
    return flags[lang] || '🌐';
}

/**
 * Get current language
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Get current direction
 */
export function getCurrentDirection() {
    return currentDirection;
}

/**
 * Check if RTL
 */
export function isRTL() {
    return currentDirection === 'rtl';
}

/**
 * Auto-translate content (basic implementation)
 * Note: For production, use a proper translation API
 */
export function autoTranslate(text, targetLang) {
    // This is a placeholder - in production, integrate with Google Translate API or similar
    console.warn('Auto-translate not implemented. Use proper translation service.');
    return text;
}

