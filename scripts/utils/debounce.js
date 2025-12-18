/**
 * Utility: Debounce function
 * Retrasa la ejecución de una función hasta que pase un tiempo determinado
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

