/**
 * Performance Optimization Module
 * Optimizaciones de rendimiento y carga
 */

// Preload recursos críticos
export function preloadCriticalResources() {
    const criticalResources = [
        { href: '/styles/main.css', as: 'style' },
        { href: '/scripts/main.js', as: 'script' },
        { href: '/assets/images/antoIcon.png', as: 'image' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
            link.onload = function() {
                this.rel = 'stylesheet';
            };
        }
        document.head.appendChild(link);
    });
}

// Prefetch recursos importantes
export function prefetchImportantResources() {
    const importantPages = [
        '/privacidad',
        '/contacto',
        '/terminos',
        '/sobre-nosotros'
    ];
    
    // Prefetch cuando el usuario está inactivo
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            importantPages.forEach(page => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
            });
        });
    }
}

// Lazy load imágenes mejorado
export function initAdvancedLazyLoading() {
    if (!('IntersectionObserver' in window)) {
        // Fallback para navegadores sin soporte
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Cargar imagen
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                // Cargar srcset si existe
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                
                // Remover atributos de carga diferida
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
                img.classList.add('loaded');
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Cargar 50px antes de que sea visible
    });
    
    // Observar todas las imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Defer carga de scripts no críticos
export function deferNonCriticalScripts() {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.async = true;
        script.parentNode.replaceChild(newScript, script);
    });
}

// Optimizar animaciones con will-change
export function optimizeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.reveal-on-scroll, [data-stagger-item], .animate-on-scroll'
    );
    
    animatedElements.forEach(el => {
        // Agregar will-change solo cuando sea necesario
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.willChange = 'transform, opacity';
                } else {
                    entry.target.style.willChange = 'auto';
                }
            });
        });
        
        observer.observe(el);
    });
}

// Medir y reportar performance
export function measurePerformance() {
    if ('PerformanceObserver' in window) {
        // Observar métricas de carga
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    console.log('Page Load Time:', entry.loadEventEnd - entry.fetchStart, 'ms');
                }
            }
        });
        
        perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
    }
    
    // Reportar Core Web Vitals
    if ('web-vital' in window) {
        // Se puede integrar con Google Analytics
    }
}

// Inicializar todas las optimizaciones
export function initPerformanceOptimizations() {
    preloadCriticalResources();
    prefetchImportantResources();
    initAdvancedLazyLoading();
    deferNonCriticalScripts();
    optimizeAnimations();
    measurePerformance();
}

