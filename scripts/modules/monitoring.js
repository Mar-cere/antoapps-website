/**
 * Monitoring and Observability Module
 * Error tracking, RUM (Real User Monitoring), and dashboards
 */

// Error Tracking Configuration
const MONITORING_CONFIG = {
    enabled: true,
    errorTracking: true,
    performanceMonitoring: true,
    userMonitoring: true,
    consoleErrors: true,
    apiErrors: true,
    // Sentry DSN (configurar con tu DSN real)
    sentryDSN: '', // 'https://your-sentry-dsn@sentry.io/project-id'
};

// Error Storage (para dashboard local)
let errorLog = [];
let performanceMetrics = [];
let userMetrics = [];

/**
 * Initialize monitoring
 */
export function initMonitoring() {
    if (!MONITORING_CONFIG.enabled) return;
    
    // Error tracking
    if (MONITORING_CONFIG.errorTracking) {
        initErrorTracking();
    }
    
    // Performance monitoring
    if (MONITORING_CONFIG.performanceMonitoring) {
        initPerformanceMonitoring();
    }
    
    // User monitoring (RUM)
    if (MONITORING_CONFIG.userMonitoring) {
        initUserMonitoring();
    }
    
    // Console monitoring
    if (MONITORING_CONFIG.consoleErrors) {
        initConsoleMonitoring();
    }
    
    // API error monitoring
    if (MONITORING_CONFIG.apiErrors) {
        initAPIErrorMonitoring();
    }
    
    // Initialize dashboard
    initMonitoringDashboard();
}

/**
 * Error Tracking
 */
function initErrorTracking() {
    // Global error handler
    window.addEventListener('error', (event) => {
        const errorData = {
            type: 'JavaScript Error',
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
        };
        
        logError(errorData);
        sendToSentry(errorData);
    });
    
    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', (event) => {
        const errorData = {
            type: 'Unhandled Promise Rejection',
            message: event.reason?.message || String(event.reason),
            stack: event.reason?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
        };
        
        logError(errorData);
        sendToSentry(errorData);
    });
}

/**
 * Performance Monitoring (RUM)
 */
function initPerformanceMonitoring() {
    // Wait for page load
    if (document.readyState === 'complete') {
        collectPerformanceMetrics();
    } else {
        window.addEventListener('load', collectPerformanceMetrics);
    }
    
    // Monitor navigation timing
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                logPerformanceMetric('LCP', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP observer not supported');
        }
        
        // First Input Delay (FID)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    logPerformanceMetric('FID', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.warn('FID observer not supported');
        }
        
        // Cumulative Layout Shift (CLS)
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                logPerformanceMetric('CLS', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.warn('CLS observer not supported');
        }
    }
}

/**
 * Collect Core Web Vitals
 */
function collectPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        // Navigation Timing
        dns: navigation.dnsEnd - navigation.dnsStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ssl: navigation.secureConnectionStart ? navigation.connectEnd - navigation.secureConnectionStart : 0,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domProcessing: navigation.domComplete - navigation.domLoading,
        // Paint Timing
        fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        // Resource Timing
        resources: performance.getEntriesByType('resource').map(r => ({
            name: r.name,
            duration: r.duration,
            size: r.transferSize || 0,
        })),
    };
    
    performanceMetrics.push(metrics);
    logPerformanceMetric('Page Load', metrics.domProcessing);
    
    // Send to analytics
    if (window.gtag) {
        window.gtag('event', 'page_performance', {
            dns_time: metrics.dns,
            tcp_time: metrics.tcp,
            ttfb: metrics.ttfb,
            download_time: metrics.download,
            dom_processing: metrics.domProcessing,
            fcp: metrics.fcp,
        });
    }
}

/**
 * User Monitoring (RUM)
 */
function initUserMonitoring() {
    // Track user interactions
    document.addEventListener('click', (event) => {
        logUserInteraction('click', {
            target: event.target.tagName,
            id: event.target.id,
            class: event.target.className,
            text: event.target.textContent?.substring(0, 50),
        });
    }, { passive: true });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            logUserInteraction('scroll', { depth: scrollPercent });
        }
    }, { passive: true });
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        logUserInteraction('page_exit', { timeOnPage });
    });
    
    // Track form interactions
    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', () => {
            logUserInteraction('form_submit', {
                formId: form.id,
                formAction: form.action,
            });
        });
    });
}

/**
 * Console Monitoring
 */
function initConsoleMonitoring() {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = function(...args) {
        logError({
            type: 'Console Error',
            message: args.join(' '),
            timestamp: new Date().toISOString(),
        });
        originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
        logError({
            type: 'Console Warning',
            message: args.join(' '),
            timestamp: new Date().toISOString(),
            severity: 'warning',
        });
        originalWarn.apply(console, args);
    };
}

/**
 * API Error Monitoring
 */
function initAPIErrorMonitoring() {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const startTime = Date.now();
        try {
            const response = await originalFetch.apply(this, args);
            const duration = Date.now() - startTime;
            
            if (!response.ok) {
                logError({
                    type: 'API Error',
                    url: args[0],
                    status: response.status,
                    statusText: response.statusText,
                    duration,
                    timestamp: new Date().toISOString(),
                });
            }
            
            return response;
        } catch (error) {
            logError({
                type: 'API Request Failed',
                url: args[0],
                message: error.message,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString(),
            });
            throw error;
        }
    };
}

/**
 * Log error
 */
function logError(errorData) {
    errorLog.push(errorData);
    
    // Keep only last 100 errors
    if (errorLog.length > 100) {
        errorLog.shift();
    }
    
    // Update dashboard
    updateErrorDashboard();
    
    // Log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error('Error logged:', errorData);
    }
}

/**
 * Log performance metric
 */
function logPerformanceMetric(name, value) {
    performanceMetrics.push({
        name,
        value,
        timestamp: new Date().toISOString(),
    });
    
    // Keep only last 50 metrics
    if (performanceMetrics.length > 50) {
        performanceMetrics.shift();
    }
}

/**
 * Log user interaction
 */
function logUserInteraction(type, data) {
    userMetrics.push({
        type,
        data,
        timestamp: new Date().toISOString(),
    });
    
    // Keep only last 200 interactions
    if (userMetrics.length > 200) {
        userMetrics.shift();
    }
}

/**
 * Send to Sentry (if configured)
 */
function sendToSentry(errorData) {
    if (!MONITORING_CONFIG.sentryDSN) return;
    
    // Aquí integrarías Sentry SDK
    // Ejemplo: Sentry.captureException(new Error(errorData.message), { extra: errorData });
}

/**
 * Initialize Monitoring Dashboard
 */
function initMonitoringDashboard() {
    // Create dashboard button (solo en desarrollo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        createDashboardButton();
    }
}

/**
 * Create dashboard button
 */
function createDashboardButton() {
    const button = document.createElement('button');
    button.id = 'monitoring-dashboard-btn';
    button.innerHTML = '📊';
    button.title = 'Monitoring Dashboard';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1ADDDB;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    button.addEventListener('click', showDashboard);
    document.body.appendChild(button);
}

/**
 * Show monitoring dashboard
 */
function showDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'monitoring-dashboard';
    dashboard.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10001; overflow-y: auto; padding: 20px;">
            <div style="max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2>📊 Monitoring Dashboard</h2>
                    <button id="close-dashboard" style="background: #ff4444; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Cerrar</button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                        <h3>Errores (${errorLog.length})</h3>
                        <div id="error-stats"></div>
                    </div>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                        <h3>Métricas de Performance</h3>
                        <div id="performance-stats"></div>
                    </div>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                        <h3>Interacciones de Usuario (${userMetrics.length})</h3>
                        <div id="user-stats"></div>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <h3>Últimos Errores</h3>
                    <div id="error-list" style="max-height: 400px; overflow-y: auto;"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(dashboard);
    
    updateErrorDashboard();
    updatePerformanceDashboard();
    updateUserDashboard();
    
    document.getElementById('close-dashboard').addEventListener('click', () => {
        dashboard.remove();
    });
}

/**
 * Update error dashboard
 */
function updateErrorDashboard() {
    const errorStats = document.getElementById('error-stats');
    const errorList = document.getElementById('error-list');
    
    if (!errorStats || !errorList) return;
    
    const errorCounts = {};
    errorLog.forEach(err => {
        errorCounts[err.type] = (errorCounts[err.type] || 0) + 1;
    });
    
    errorStats.innerHTML = Object.entries(errorCounts)
        .map(([type, count]) => `<div>${type}: ${count}</div>`)
        .join('');
    
    errorList.innerHTML = errorLog.slice(-10).reverse().map(err => `
        <div style="padding: 10px; margin: 5px 0; background: #fff; border-left: 3px solid #ff4444; border-radius: 4px;">
            <strong>${err.type}</strong><br>
            <small>${err.message}</small><br>
            <small style="color: #666;">${new Date(err.timestamp).toLocaleString()}</small>
        </div>
    `).join('');
}

/**
 * Update performance dashboard
 */
function updatePerformanceDashboard() {
    const perfStats = document.getElementById('performance-stats');
    if (!perfStats) return;
    
    const latest = performanceMetrics[performanceMetrics.length - 1];
    if (latest && latest.name === 'Page Load') {
        perfStats.innerHTML = `
            <div>Page Load: ${latest.value.toFixed(2)}ms</div>
        `;
    }
}

/**
 * Update user dashboard
 */
function updateUserDashboard() {
    const userStats = document.getElementById('user-stats');
    if (!userStats) return;
    
    const clickCount = userMetrics.filter(m => m.type === 'click').length;
    const scrollMax = Math.max(...userMetrics.filter(m => m.type === 'scroll').map(m => m.data.depth || 0));
    
    userStats.innerHTML = `
        <div>Clicks: ${clickCount}</div>
        <div>Scroll máximo: ${scrollMax}%</div>
    `;
}

/**
 * Get error log (for external use)
 */
export function getErrorLog() {
    return errorLog;
}

/**
 * Get performance metrics (for external use)
 */
export function getPerformanceMetrics() {
    return performanceMetrics;
}

/**
 * Get user metrics (for external use)
 */
export function getUserMetrics() {
    return userMetrics;
}

/**
 * Clear all logs
 */
export function clearMonitoringLogs() {
    errorLog = [];
    performanceMetrics = [];
    userMetrics = [];
}

