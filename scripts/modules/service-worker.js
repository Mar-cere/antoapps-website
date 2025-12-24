/**
 * Service Worker Registration
 * Registra el Service Worker para PWA y caché
 */

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration.scope);
                    
                    // Verificar actualizaciones cada hora
                    setInterval(() => {
                        registration.update();
                    }, 3600000);
                    
                    // Manejar actualizaciones
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // Nuevo Service Worker disponible
                                if (confirm('Nueva versión disponible. ¿Recargar?')) {
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Error registrando Service Worker:', error);
                });
        });
    }
}

// Instalar PWA
export function initPWAInstall() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Mostrar botón de instalación
        const installButton = document.getElementById('pwa-install-button');
        if (installButton) {
            installButton.style.display = 'block';
            installButton.addEventListener('click', async () => {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    console.log('Usuario aceptó instalar PWA');
                }
                
                deferredPrompt = null;
                installButton.style.display = 'none';
            });
        }
    });
    
    // Detectar si ya está instalado
    window.addEventListener('appinstalled', () => {
        console.log('PWA instalada');
        deferredPrompt = null;
    });
}

