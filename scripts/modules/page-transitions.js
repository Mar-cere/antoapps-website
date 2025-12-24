/**
 * Page Transitions Module
 * Transiciones suaves entre páginas
 */

export function initPageTransitions() {
    // Prevenir transiciones en navegación externa
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Solo aplicar a links internos
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();
                
                // Mostrar loading
                showPageTransition();
                
                // Navegar después de la animación
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Animación de entrada
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
    });
}

function showPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    transition.innerHTML = `
        <div class="page-transition-content">
            <div class="loading-spinner"></div>
        </div>
    `;
    
    document.body.appendChild(transition);
    
    // Animar entrada
    requestAnimationFrame(() => {
        transition.classList.add('active');
    });
}

// Agregar estilos
if (!document.getElementById('page-transitions-styles')) {
    const style = document.createElement('style');
    style.id = 'page-transitions-styles';
    style.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(3, 10, 36, 0.95);
            backdrop-filter: blur(10px);
            z-index: 99999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .page-transition.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .page-transition-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        body.page-loaded {
            animation: fadeInPage 0.5s ease;
        }
        
        @keyframes fadeInPage {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

