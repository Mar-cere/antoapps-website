/**
 * Animations Module
 * Maneja animaciones al hacer scroll y efectos visuales
 */

export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Si es una tarjeta de estadísticas, iniciar contador
                if (entry.target.classList.contains('stat-card')) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.dataset.animated) {
                        animateCounter(statNumber);
                        statNumber.dataset.animated = 'true';
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation (excluyendo FAQ items para evitar problemas de visibilidad)
    const animatedElements = document.querySelectorAll(
        '.feature-card, .step, .value-card, .pricing-card, .benefit-item, .testimonial-card, .feature-detail-card, .animate-on-scroll'
    );

    animatedElements.forEach((el, index) => {
        if (!el.classList.contains('animate-on-scroll') && !el.classList.contains('reveal-on-scroll')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
            el.style.minHeight = 'fit-content';
        }
        observer.observe(el);
    });
}

/**
 * Animate counter numbers
 */
function animateCounter(element) {
    const target = parseInt(element.dataset.target) || 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('es-ES');
    }
    return num.toString();
}

export function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(3, 10, 36, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(3, 10, 36, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

