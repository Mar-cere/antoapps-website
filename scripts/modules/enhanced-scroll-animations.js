/**
 * Enhanced Scroll Animations Module
 * Animaciones de scroll más avanzadas y sofisticadas
 */

export function initEnhancedScrollAnimations() {
    // Sticky elements
    initStickyElements();
    
    // Parallax mejorado
    initEnhancedParallax();
    
    // Reveal animations sofisticadas
    initSophisticatedReveals();
    
    // Scroll progress indicator
}

function initStickyElements() {
    const stickyElements = document.querySelectorAll('[data-sticky]');
    
    if (stickyElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sticky-active');
            } else {
                entry.target.classList.remove('sticky-active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    stickyElements.forEach(el => {
        const offset = el.dataset.stickyOffset || '0';
        el.style.top = offset;
        el.style.position = 'sticky';
        observer.observe(el);
    });
}

function initEnhancedParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax-enhanced]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const speed = parseFloat(element.dataset.parallaxEnhanced) || 0.5;
            const direction = element.dataset.parallaxDirection || 'vertical';
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrolled = window.pageYOffset;
                const elementTop = rect.top + scrolled;
                const windowHeight = window.innerHeight;
                
                const progress = (scrolled + windowHeight - elementTop) / (windowHeight + rect.height);
                const translate = (progress - 0.5) * 100 * speed;
                
                if (direction === 'vertical') {
                    element.style.transform = `translateY(${translate}px)`;
                } else if (direction === 'horizontal') {
                    element.style.transform = `translateX(${translate}px)`;
                }
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

function initSophisticatedReveals() {
    const revealElements = document.querySelectorAll('[data-reveal-sophisticated]');
    
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const type = element.dataset.revealType || 'fade';
                const delay = parseFloat(element.dataset.revealDelay) || 0;
                
                setTimeout(() => {
                    element.classList.add('revealed', `reveal-${type}`);
                }, delay * 1000);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}


// Agregar estilos
if (!document.getElementById('enhanced-scroll-styles')) {
    const style = document.createElement('style');
    style.id = 'enhanced-scroll-styles';
    style.textContent = `
        [data-sticky] {
            z-index: 100;
            transition: all 0.3s ease;
        }
        
        [data-parallax-enhanced] {
            will-change: transform;
        }
        
        [data-reveal-sophisticated] {
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        [data-reveal-sophisticated].revealed {
            opacity: 1;
        }
        
        [data-reveal-sophisticated].reveal-fade {
            transform: translateY(0);
        }
        
        [data-reveal-sophisticated].reveal-slide {
            transform: translateX(0) translateY(0);
        }
        
        [data-reveal-sophisticated].reveal-scale {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
}

