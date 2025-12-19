/**
 * Apple-Style Animations Module
 * Animaciones avanzadas inspiradas en el estilo de Apple
 */

/**
 * Smooth reveal animations on scroll (Apple-style)
 */
export function initSmoothReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animación más rápida, menos delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 50); // Staggered animation reducido
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05, // Activar antes
        rootMargin: '0px 0px -50px 0px' // Menos margen
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Parallax scrolling effect (Apple-style)
 */
export function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const rect = el.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * speed;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.transform = `translateY(${rate}px)`;
            }
        });
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Text reveal animation (Apple-style typewriter/reveal)
 */
export function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(el => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hacer visible inmediatamente, luego animar texto
                    entry.target.style.opacity = '1';
                    revealText(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(el);
    });
}

function revealText(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.textContent = '';
    element.style.opacity = '1';

    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        span.style.transform = 'translateY(10px)'; // Reducido
        span.style.transition = `opacity 0.4s ease ${index * 0.03}s, transform 0.4s ease ${index * 0.03}s`; // Más rápido
        element.appendChild(span);

        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 30); // Menos delay
    });
}

/**
 * Scale on scroll (Apple-style zoom effect)
 */
export function initScaleOnScroll() {
    const scaleElements = document.querySelectorAll('[data-scale-on-scroll]');
    
    if (scaleElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const maxScale = parseFloat(element.dataset.scaleOnScroll) || 1.1;
                
                window.addEventListener('scroll', () => {
                    const rect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const elementTop = rect.top;
                    const elementHeight = rect.height;
                    
                    // Calculate scroll progress
                    const scrollProgress = Math.max(0, Math.min(1, 
                        (windowHeight - elementTop) / (windowHeight + elementHeight)
                    ));
                    
                    // Scale based on scroll position
                    const scale = 1 + (maxScale - 1) * scrollProgress;
                    element.style.transform = `scale(${scale})`;
                }, { passive: true });
            }
        });
    }, { threshold: 0 });

    scaleElements.forEach(el => observer.observe(el));
}

/**
 * Blur on scroll (Apple-style depth effect)
 */
export function initBlurOnScroll() {
    const blurElements = document.querySelectorAll('[data-blur-on-scroll]');
    
    if (blurElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const maxBlur = parseFloat(element.dataset.blurOnScroll) || 10;
                
                window.addEventListener('scroll', () => {
                    const rect = element.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const elementCenter = rect.top + rect.height / 2;
                    const viewportCenter = windowHeight / 2;
                    
                    const distance = Math.abs(elementCenter - viewportCenter);
                    const blurAmount = Math.min(maxBlur, distance / 50);
                    
                    element.style.filter = `blur(${blurAmount}px)`;
                    element.style.opacity = 1 - (blurAmount / maxBlur) * 0.5;
                }, { passive: true });
            }
        });
    }, { threshold: 0 });

    blurElements.forEach(el => observer.observe(el));
}

/**
 * Magnetic cursor effect (Apple-style hover)
 */
export function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = parseFloat(element.dataset.magnetic) || 0.3;
            
            element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Smooth number counter (Apple-style)
 */
export function initSmoothCounter() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    animateCounter(entry.target);
                    entry.target.dataset.counted = 'true';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.counter) || 0;
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startValue + (target - startValue) * easeOut);
        
        element.textContent = prefix + formatNumber(current) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + formatNumber(target) + suffix;
        }
    }

    requestAnimationFrame(updateCounter);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('es-ES');
}

/**
 * Scroll-triggered animations with stagger
 */
export function initStaggeredAnimations() {
    const containers = document.querySelectorAll('[data-stagger]');
    
    containers.forEach(container => {
        const children = container.querySelectorAll('[data-stagger-item]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('stagger-animated');
                        }, index * 50); // Delay reducido
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Activar antes

        observer.observe(container);
    });
}

/**
 * Smooth scroll with easing (Apple-style)
 */
export function initSmoothScrollEasing() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                smoothScrollTo(offsetPosition, 1000);
            }
        });
    });
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

/**
 * Image reveal on scroll (Apple-style)
 */
export function initImageReveal() {
    const images = document.querySelectorAll('img[data-reveal]');
    
    images.forEach(img => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('image-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(img);
    });
}

/**
 * Section fade in (Apple-style)
 */
export function initSectionFade() {
    const sections = document.querySelectorAll('section[data-fade-section]');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                } else {
                    entry.target.classList.remove('section-visible');
                }
            });
        }, { threshold: 0.2 });

        observer.observe(section);
    });
}

/**
 * Initialize all Apple-style animations
 */
export function initAppleAnimations() {
    initSmoothReveal();
    initParallax();
    initTextReveal();
    initScaleOnScroll();
    initBlurOnScroll();
    initMagneticEffect();
    initSmoothCounter();
    initStaggeredAnimations();
    initSmoothScrollEasing();
    initImageReveal();
    initSectionFade();
}

