/**
 * Tracking Module
 * Maneja el tracking de eventos en botones y enlaces
 */

import { trackDownload, trackCTA } from './analytics.js';

export function initTracking() {
    // Track download badges
    const downloadBadges = document.querySelectorAll('.badge[aria-label*="Descargar"]');
    downloadBadges.forEach(badge => {
        badge.addEventListener('click', (e) => {
            const platform = badge.getAttribute('aria-label').includes('App Store') ? 'app-store' : 'google-play';
            trackDownload(platform);
        });
    });
    
    // Track CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        if (button.textContent.trim()) {
            button.addEventListener('click', () => {
                trackCTA(button.textContent.trim());
            });
        }
    });
    
    // Track download section buttons
    const downloadButtons = document.querySelectorAll('a[href="#descargar"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackCTA('Descargar App');
        });
    });
}

