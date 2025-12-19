/**
 * Cookie Consent Module
 * Maneja el banner de consentimiento de cookies (GDPR compliant)
 */

export function initCookieConsent() {
    // Verificar si ya se aceptó/rechazó
    const consent = localStorage.getItem('cookieConsent');
    
    if (consent) {
        // Si ya hay consentimiento, no mostrar banner
        if (consent === 'accepted') {
            // Cargar analytics si está disponible
            import('./analytics.js').then(({ initAnalytics }) => {
                initAnalytics();
            });
        }
        return;
    }

    // Crear banner de cookies
    const banner = document.createElement('div');
    banner.id = 'cookieConsent';
    banner.className = 'cookie-consent';
    banner.innerHTML = `
        <div class="cookie-consent-content">
            <div class="cookie-consent-text">
                <h4>🍪 Uso de Cookies</h4>
                <p>Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido. Al hacer clic en "Aceptar", consientes el uso de cookies según nuestra <a href="/privacidad" target="_blank">Política de Privacidad</a>.</p>
            </div>
            <div class="cookie-consent-actions">
                <button class="btn btn-secondary" id="cookieReject">Rechazar</button>
                <button class="btn btn-primary" id="cookieAccept">Aceptar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Animar entrada
    setTimeout(() => {
        banner.classList.add('show');
    }, 500);
    
    // Event listeners
    document.getElementById('cookieAccept').addEventListener('click', () => {
        handleConsent('accepted');
    });
    
    document.getElementById('cookieReject').addEventListener('click', () => {
        handleConsent('rejected');
    });
}

function handleConsent(choice) {
    localStorage.setItem('cookieConsent', choice);
    const banner = document.getElementById('cookieConsent');
    
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }
    
    if (choice === 'accepted') {
        // Cargar analytics
        import('./analytics.js').then(({ initAnalytics }) => {
            initAnalytics();
        });
    }
}

