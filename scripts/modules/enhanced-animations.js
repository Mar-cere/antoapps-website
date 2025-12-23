/**
 * Enhanced Animations Module
 * Animaciones adicionales y efectos visuales avanzados
 */

/**
 * Floating animation for icons
 */
export function initFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.feature-icon, .security-icon, .resource-icon');
    
    floatingIcons.forEach((icon, index) => {
        const delay = index * 0.2;
        const duration = 3 + (index % 3) * 0.5; // Variación en duración
        
        icon.style.animation = `float ${duration}s ease-in-out infinite`;
        icon.style.animationDelay = `${delay}s`;
    });
}

/**
 * Gradient text animation
 */
export function initGradientText() {
    const gradientTexts = document.querySelectorAll('.hero-title, .section-title');
    
    gradientTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.backgroundPosition = '100% 50%';
        });
        
        text.addEventListener('mouseleave', () => {
            text.style.backgroundPosition = '0% 50%';
        });
    });
}

/**
 * Card tilt effect on mouse move
 */
export function initCardTilt() {
    const tiltCards = document.querySelectorAll('.feature-card, .security-card, .metric-card, .resource-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Pulse animation for important elements
 */
export function initPulseAnimation() {
    const pulseElements = document.querySelectorAll('.btn-primary, .metric-number');
    
    pulseElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.classList.add('pulse-animation');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

/**
 * Scroll-triggered scale animation
 */
export function initScaleOnScroll() {
    const scaleElements = document.querySelectorAll('.metric-card, .security-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    scaleElements.forEach((el, index) => {
        el.style.transform = 'scale(0.8)';
        el.style.opacity = '0.5';
        el.style.transition = `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Glow effect on hover
 */
export function initGlowEffect() {
    const glowElements = document.querySelectorAll('.btn-primary, .metric-number');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'drop-shadow(0 0 20px rgba(26, 221, 219, 0.6))';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'none';
        });
    });
}

/**
 * Text reveal with typewriter effect
 */
export function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !element.dataset.typed) {
                    element.dataset.typed = 'true';
                    let index = 0;
                    
                    const typeInterval = setInterval(() => {
                        if (index < text.length) {
                            element.textContent += text[index];
                            index++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

/**
 * Initialize all enhanced animations
 */
export function initEnhancedAnimations() {
    initFloatingIcons();
    initGradientText();
    initCardTilt();
    initPulseAnimation();
    initScaleOnScroll();
    initGlowEffect();
    initTypewriterEffect();
}

