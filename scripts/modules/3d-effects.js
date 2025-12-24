/**
 * 3D Effects Module
 * Efectos 3D para cards y elementos
 */

export function init3DEffects() {
    // Cards con perspectiva 3D
    const cards3D = document.querySelectorAll('[data-3d]');
    
    cards3D.forEach(card => {
        let isHovering = false;
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Scroll parallax 3D
    const parallax3D = document.querySelectorAll('[data-parallax-3d]');
    
    if (parallax3D.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const speed = parseFloat(element.dataset.parallax3d) || 0.5;
                    
                    window.addEventListener('scroll', () => {
                        const scrolled = window.pageYOffset;
                        const rect = element.getBoundingClientRect();
                        const elementTop = rect.top + scrolled;
                        const windowHeight = window.innerHeight;
                        
                        if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
                            const yPos = -(scrolled - elementTop) * speed;
                            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                        }
                    }, { passive: true });
                    
                    observer.unobserve(element);
                }
            });
        });
        
        parallax3D.forEach(el => observer.observe(el));
    }
}

// Agregar estilos CSS
if (!document.getElementById('3d-effects-styles')) {
    const style = document.createElement('style');
    style.id = '3d-effects-styles';
    style.textContent = `
        [data-3d] {
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
        }
        
        [data-3d]:hover {
            transform-style: preserve-3d;
        }
        
        [data-parallax-3d] {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
}

