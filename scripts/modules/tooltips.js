/**
 * Tooltips Module
 * Handles tooltip functionality throughout the site
 */

export function initTooltips() {
    // Tooltips are handled via CSS data attributes
    // This module adds keyboard accessibility and mobile support
    
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        // Add keyboard support
        element.addEventListener('focus', () => {
            element.setAttribute('aria-describedby', 'tooltip-' + Math.random().toString(36).substr(2, 9));
        });
        
        // Add touch support for mobile
        if ('ontouchstart' in window) {
            let touchTimeout;
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                clearTimeout(touchTimeout);
                element.setAttribute('data-tooltip-visible', 'true');
                
                touchTimeout = setTimeout(() => {
                    element.removeAttribute('data-tooltip-visible');
                }, 3000);
            });
        }
    });
    
    // Close tooltips on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-tooltip]')) {
            tooltipElements.forEach(el => {
                el.removeAttribute('data-tooltip-visible');
            });
        }
    });
}

