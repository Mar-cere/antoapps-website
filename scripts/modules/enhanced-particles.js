/**
 * Enhanced Particles Module
 * Partículas interactivas con efectos de cursor y backgrounds animados
 */

export function initEnhancedParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 80;
    const particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId;
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-enhanced';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(26, 221, 219, 0.8) 0%, rgba(26, 221, 219, 0) 70%);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            box-shadow: 0 0 ${size * 2}px rgba(26, 221, 219, 0.5);
            animation: floatEnhanced ${duration}s infinite ease-in-out;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
        
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: size
        });
    }
    
    // Tracking de posición del mouse (sin efectos visuales)
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animación de partículas
    function animateParticles() {
        particles.forEach(particle => {
            // Movimiento suave
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebote en bordes
            if (particle.x < 0 || particle.x > 100) particle.vx *= -1;
            if (particle.y < 0 || particle.y > 100) particle.vy *= -1;
            
            
            particle.element.style.left = particle.x + '%';
            particle.element.style.top = particle.y + '%';
        });
        
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    
    // Agregar estilos CSS
    if (!document.getElementById('enhanced-particles-styles')) {
        const style = document.createElement('style');
        style.id = 'enhanced-particles-styles';
        style.textContent = `
            @keyframes floatEnhanced {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(10px, -15px) scale(1.1);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(-10px, -30px) scale(0.9);
                    opacity: 0.8;
                }
                75% {
                    transform: translate(15px, -15px) scale(1.05);
                    opacity: 0.6;
                }
            }
            
            
            .particle-enhanced {
                will-change: transform, opacity;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Iniciar animación
    animateParticles();
    
    // Limpiar al desmontar
    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
}

