/**
 * Accessibility Module
 * High contrast mode, font size adjustment, and other accessibility features
 */

const ACCESSIBILITY_CONFIG = {
    fontSize: {
        min: 0.875, // 14px
        max: 1.5,   // 24px
        default: 1, // 16px
        step: 0.125, // 2px increments
    },
    highContrast: false,
    reducedMotion: false,
};

/**
 * Initialize accessibility features
 */
export function initAccessibility() {
    // Load saved preferences
    loadAccessibilityPreferences();
    
    // Create accessibility controls
    createAccessibilityControls();
    
    // Apply preferences
    applyAccessibilityPreferences();
    
    // Listen for system preferences
    listenToSystemPreferences();
}

/**
 * Load saved preferences
 */
function loadAccessibilityPreferences() {
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion');
    
    if (savedFontSize) {
        ACCESSIBILITY_CONFIG.fontSize.current = parseFloat(savedFontSize);
    } else {
        ACCESSIBILITY_CONFIG.fontSize.current = ACCESSIBILITY_CONFIG.fontSize.default;
    }
    
    if (savedHighContrast) {
        ACCESSIBILITY_CONFIG.highContrast = savedHighContrast === 'true';
    }
    
    if (savedReducedMotion) {
        ACCESSIBILITY_CONFIG.reducedMotion = savedReducedMotion === 'true';
    }
}

/**
 * Create accessibility controls
 */
function createAccessibilityControls() {
    // Check if controls already exist
    if (document.getElementById('accessibility-controls')) return;
    
    const controls = document.createElement('div');
    controls.id = 'accessibility-controls';
    controls.className = 'accessibility-controls';
    controls.innerHTML = `
        <button class="accessibility-toggle" id="accessibility-toggle" aria-label="Abrir controles de accesibilidad">
            ♿
        </button>
        <div class="accessibility-panel" id="accessibility-panel">
            <h3>Opciones de Accesibilidad</h3>
            
            <div class="accessibility-option">
                <label for="font-size-control">Tamaño de fuente</label>
                <div class="font-size-controls">
                    <button class="font-size-btn" id="font-decrease" aria-label="Disminuir tamaño de fuente">A-</button>
                    <span class="font-size-value" id="font-size-value">100%</span>
                    <button class="font-size-btn" id="font-increase" aria-label="Aumentar tamaño de fuente">A+</button>
                    <button class="font-size-btn" id="font-reset" aria-label="Restablecer tamaño de fuente">Reset</button>
                </div>
            </div>
            
            <div class="accessibility-option">
                <label>
                    <input type="checkbox" id="high-contrast-toggle">
                    Alto contraste
                </label>
            </div>
            
            <div class="accessibility-option">
                <label>
                    <input type="checkbox" id="reduced-motion-toggle">
                    Reducir animaciones
                </label>
            </div>
            
            <button class="accessibility-reset" id="accessibility-reset">Restablecer todo</button>
        </div>
    `;
    
    document.body.appendChild(controls);
    
    // Event listeners
    setupAccessibilityEventListeners();
}

/**
 * Setup event listeners
 */
function setupAccessibilityEventListeners() {
    const toggle = document.getElementById('accessibility-toggle');
    const panel = document.getElementById('accessibility-panel');
    const fontDecrease = document.getElementById('font-decrease');
    const fontIncrease = document.getElementById('font-increase');
    const fontReset = document.getElementById('font-reset');
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    const reducedMotionToggle = document.getElementById('reduced-motion-toggle');
    const resetBtn = document.getElementById('accessibility-reset');
    
    // Toggle panel
    toggle.addEventListener('click', () => {
        panel.classList.toggle('active');
        toggle.setAttribute('aria-expanded', panel.classList.contains('active'));
    });
    
    // Font size controls
    fontDecrease.addEventListener('click', () => decreaseFontSize());
    fontIncrease.addEventListener('click', () => increaseFontSize());
    fontReset.addEventListener('click', () => resetFontSize());
    
    // High contrast toggle
    if (highContrastToggle) {
        highContrastToggle.checked = ACCESSIBILITY_CONFIG.highContrast;
        highContrastToggle.addEventListener('change', (e) => {
            toggleHighContrast(e.target.checked);
        });
    }
    
    // Reduced motion toggle
    if (reducedMotionToggle) {
        reducedMotionToggle.checked = ACCESSIBILITY_CONFIG.reducedMotion;
        reducedMotionToggle.addEventListener('change', (e) => {
            toggleReducedMotion(e.target.checked);
        });
    }
    
    // Reset all
    resetBtn.addEventListener('click', () => {
        resetAllAccessibility();
    });
    
    // Close panel on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#accessibility-controls')) {
            panel.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Increase font size
 */
function increaseFontSize() {
    const current = ACCESSIBILITY_CONFIG.fontSize.current;
    const max = ACCESSIBILITY_CONFIG.fontSize.max;
    const step = ACCESSIBILITY_CONFIG.fontSize.step;
    
    if (current < max) {
        ACCESSIBILITY_CONFIG.fontSize.current = Math.min(current + step, max);
        applyFontSize();
    }
}

/**
 * Decrease font size
 */
function decreaseFontSize() {
    const current = ACCESSIBILITY_CONFIG.fontSize.current;
    const min = ACCESSIBILITY_CONFIG.fontSize.min;
    const step = ACCESSIBILITY_CONFIG.fontSize.step;
    
    if (current > min) {
        ACCESSIBILITY_CONFIG.fontSize.current = Math.max(current - step, min);
        applyFontSize();
    }
}

/**
 * Reset font size
 */
function resetFontSize() {
    ACCESSIBILITY_CONFIG.fontSize.current = ACCESSIBILITY_CONFIG.fontSize.default;
    applyFontSize();
}

/**
 * Apply font size
 */
function applyFontSize() {
    const fontSize = ACCESSIBILITY_CONFIG.fontSize.current;
    document.documentElement.style.fontSize = `${fontSize * 16}px`;
    
    // Update display
    const valueDisplay = document.getElementById('font-size-value');
    if (valueDisplay) {
        valueDisplay.textContent = `${Math.round(fontSize * 100)}%`;
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility-font-size', fontSize.toString());
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('accessibility-change', {
        detail: { fontSize }
    }));
}

/**
 * Toggle high contrast
 */
function toggleHighContrast(enabled) {
    ACCESSIBILITY_CONFIG.highContrast = enabled;
    
    if (enabled) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    
    localStorage.setItem('accessibility-high-contrast', enabled.toString());
    
    window.dispatchEvent(new CustomEvent('accessibility-change', {
        detail: { highContrast: enabled }
    }));
}

/**
 * Toggle reduced motion
 */
function toggleReducedMotion(enabled) {
    ACCESSIBILITY_CONFIG.reducedMotion = enabled;
    
    if (enabled) {
        document.body.classList.add('reduced-motion');
    } else {
        document.body.classList.remove('reduced-motion');
    }
    
    localStorage.setItem('accessibility-reduced-motion', enabled.toString());
    
    window.dispatchEvent(new CustomEvent('accessibility-change', {
        detail: { reducedMotion: enabled }
    }));
}

/**
 * Apply all accessibility preferences
 */
function applyAccessibilityPreferences() {
    applyFontSize();
    
    if (ACCESSIBILITY_CONFIG.highContrast) {
        document.body.classList.add('high-contrast');
    }
    
    if (ACCESSIBILITY_CONFIG.reducedMotion) {
        document.body.classList.add('reduced-motion');
    }
}

/**
 * Reset all accessibility settings
 */
function resetAllAccessibility() {
    ACCESSIBILITY_CONFIG.fontSize.current = ACCESSIBILITY_CONFIG.fontSize.default;
    ACCESSIBILITY_CONFIG.highContrast = false;
    ACCESSIBILITY_CONFIG.reducedMotion = false;
    
    applyAccessibilityPreferences();
    
    // Update UI
    const highContrastToggle = document.getElementById('high-contrast-toggle');
    const reducedMotionToggle = document.getElementById('reduced-motion-toggle');
    
    if (highContrastToggle) highContrastToggle.checked = false;
    if (reducedMotionToggle) reducedMotionToggle.checked = false;
}

/**
 * Listen to system preferences
 */
function listenToSystemPreferences() {
    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches && !localStorage.getItem('accessibility-reduced-motion')) {
        toggleReducedMotion(true);
        const toggle = document.getElementById('reduced-motion-toggle');
        if (toggle) toggle.checked = true;
    }
    
    prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches && !localStorage.getItem('accessibility-reduced-motion')) {
            toggleReducedMotion(true);
        }
    });
    
    // High contrast preference
    const prefersContrast = window.matchMedia('(prefers-contrast: high)');
    
    if (prefersContrast.matches && !localStorage.getItem('accessibility-high-contrast')) {
        toggleHighContrast(true);
        const toggle = document.getElementById('high-contrast-toggle');
        if (toggle) toggle.checked = true;
    }
    
    prefersContrast.addEventListener('change', (e) => {
        if (e.matches && !localStorage.getItem('accessibility-high-contrast')) {
            toggleHighContrast(true);
        }
    });
}

/**
 * Get accessibility config
 */
export function getAccessibilityConfig() {
    return { ...ACCESSIBILITY_CONFIG };
}

