'use client';

import { useAccessibility } from '@/lib/hooks/useAccessibility';
import '@/styles/components/accessibility.css';

export default function AccessibilityPanel() {
  const {
    fontSize,
    highContrast,
    reducedMotion,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleReducedMotion,
  } = useAccessibility();

  return (
    <div className="accessibility-controls">
      <button
        className="accessibility-toggle"
        id="accessibility-toggle"
        aria-label="Abrir controles de accesibilidad"
      >
        ♿
      </button>
      <div className="accessibility-panel" id="accessibility-panel">
        <h3>Opciones de Accesibilidad</h3>

        <div className="accessibility-option">
          <label htmlFor="font-size-control">Tamaño de fuente</label>
          <div className="font-size-controls">
            <button
              className="font-size-btn"
              id="font-decrease"
              onClick={decreaseFontSize}
              aria-label="Disminuir tamaño de fuente"
            >
              A-
            </button>
            <span className="font-size-value" id="font-size-value">
              {Math.round(fontSize * 100)}%
            </span>
            <button
              className="font-size-btn"
              id="font-increase"
              onClick={increaseFontSize}
              aria-label="Aumentar tamaño de fuente"
            >
              A+
            </button>
            <button
              className="font-size-btn"
              id="font-reset"
              onClick={resetFontSize}
              aria-label="Restablecer tamaño de fuente"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="accessibility-option">
          <label>
            <input
              type="checkbox"
              id="high-contrast-toggle"
              checked={highContrast}
              onChange={toggleHighContrast}
            />
            Alto contraste
          </label>
        </div>

        <div className="accessibility-option">
          <label>
            <input
              type="checkbox"
              id="reduced-motion-toggle"
              checked={reducedMotion}
              onChange={toggleReducedMotion}
            />
            Reducir animaciones
          </label>
        </div>
      </div>
    </div>
  );
}

