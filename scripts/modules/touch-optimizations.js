/**
 * Touch Optimizations Module
 * Optimizaciones táctiles, gestos y feedback háptico
 */

export function initTouchOptimizations() {
    // Detectar dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) return;
    
    // Aumentar áreas táctiles
    const touchTargets = document.querySelectorAll(
        'button, a, input, select, textarea, [role="button"], [tabindex="0"]'
    );
    
    touchTargets.forEach(target => {
        const rect = target.getBoundingClientRect();
        const minSize = 44; // Tamaño mínimo recomendado por Apple/Google
        
        if (rect.width < minSize || rect.height < minSize) {
            target.style.minWidth = minSize + 'px';
            target.style.minHeight = minSize + 'px';
            target.style.padding = '12px';
        }
    });
    
    // Gestos swipe
    initSwipeGestures();
    
    // Feedback háptico (si está disponible)
    initHapticFeedback();
    
    // Optimizar scroll táctil
    optimizeTouchScroll();
}

function initSwipeGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const minSwipeDistance = 50;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Swipe horizontal
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right
                    triggerSwipeEvent('swiperight');
                } else {
                    // Swipe left
                    triggerSwipeEvent('swipeleft');
                }
            }
        } else {
            // Swipe vertical
            if (Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    // Swipe down
                    triggerSwipeEvent('swipedown');
                } else {
                    // Swipe up
                    triggerSwipeEvent('swipeup');
                }
            }
        }
    }
    
    function triggerSwipeEvent(direction) {
        const event = new CustomEvent('swipe', {
            detail: { direction }
        });
        document.dispatchEvent(event);
    }
    
    // Ejemplo: Cerrar menú móvil con swipe
    document.addEventListener('swipe', (e) => {
        if (e.detail.direction === 'swipeleft' || e.detail.direction === 'swiperight') {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
}

function initHapticFeedback() {
    // Vibrar en acciones importantes (si está disponible)
    const hapticButtons = document.querySelectorAll('[data-haptic]');
    
    hapticButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (navigator.vibrate) {
                const pattern = button.dataset.haptic === 'strong' ? [50, 30, 50] : [10];
                navigator.vibrate(pattern);
            }
        });
    });
}

function optimizeTouchScroll() {
    // Mejorar scroll táctil
    const scrollableElements = document.querySelectorAll(
        '.comparison-table-wrapper, .privacy-table-wrapper, [data-scrollable]'
    );
    
    scrollableElements.forEach(element => {
        element.style.webkitOverflowScrolling = 'touch';
        element.style.overflowScrolling = 'touch';
        
        // Prevenir scroll accidental en elementos pequeños
        let touchStartY = 0;
        
        element.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        element.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchY - touchStartY;
            
            // Si el elemento es pequeño y el scroll es vertical, permitir scroll
            if (element.scrollHeight > element.clientHeight) {
                const isScrolling = Math.abs(deltaY) > 10;
                if (isScrolling) {
                    element.classList.add('scrolling');
                }
            }
        }, { passive: true });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.classList.remove('scrolling');
            }, 150);
        });
    });
}

// Agregar estilos
if (!document.getElementById('touch-optimizations-styles')) {
    const style = document.createElement('style');
    style.id = 'touch-optimizations-styles';
    style.textContent = `
        @media (hover: none) and (pointer: coarse) {
            button, a, [role="button"] {
                -webkit-tap-highlight-color: rgba(26, 221, 219, 0.2);
                tap-highlight-color: rgba(26, 221, 219, 0.2);
            }
            
            .scrolling {
                -webkit-overflow-scrolling: touch;
            }
        }
    `;
    document.head.appendChild(style);
}

