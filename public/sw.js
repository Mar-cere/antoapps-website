/**
 * Service Worker para Anto
 * Maneja caché, offline y performance
 */

const CACHE_NAME = 'anto-v1.0.0';
const RUNTIME_CACHE = 'anto-runtime-v1.0.0';

// Recursos críticos para cachear inmediatamente
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/main.js',
    '/assets/images/antoIcon.png',
    '/manifest.json'
];

// Recursos para cachear bajo demanda
const CACHEABLE_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    /\.(?:css|js)$/,
    /\.(?:woff|woff2|ttf|eot)$/
];

// Estrategia: Cache First para assets estáticos
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        // Si falla y hay caché, devolver caché aunque sea viejo
        const cached = await cache.match(request);
        if (cached) return cached;
        throw error;
    }
}

// Estrategia: Network First para HTML
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    
    try {
        const response = await fetch(request);
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        throw error;
    }
}

// Install: Cachear recursos críticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CRITICAL_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: Limpiar caches viejos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                    .map(name => caches.delete(name))
            );
        })
    );
    return self.clients.claim();
});

// Fetch: Aplicar estrategias de caché
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Solo cachear requests GET
    if (request.method !== 'GET') {
        return;
    }
    
    // No cachear requests a APIs externas
    if (url.origin !== self.location.origin && !url.hostname.includes('fonts.googleapis.com')) {
        return;
    }
    
    // HTML: Network First
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Assets estáticos: Cache First
    if (CACHEABLE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Por defecto: Network First
    event.respondWith(networkFirst(request));
});

// Background Sync (para formularios offline)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncForms());
    }
});

async function syncForms() {
    // Implementar sincronización de formularios pendientes
    // Esto se puede expandir según necesidades
}

