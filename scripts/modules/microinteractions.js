/**
 * Microinteractions Module
 * Handles advanced microinteractions and animations
 */

export function initMicrointeractions() {
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn, button, [data-ripple]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('ripple') || this.hasAttribute('data-ripple')) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
    
    // Confetti effect for success actions
    window.showConfetti = function(element) {
        if (!element) return;
        
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = '🎉';
        
        element.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    };
    
    // Success checkmark animation
    window.showSuccessCheck = function(element) {
        if (!element) return;
        
        const check = document.createElement('span');
        check.className = 'success-check';
        element.appendChild(check);
        
        setTimeout(() => {
            check.remove();
        }, 2000);
    };
    
    // Toast notifications
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    };
    
    // Scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
    
    // Loading states for forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('btn-loading');
                this.classList.add('form-loading');
            }
        });
    });
}

