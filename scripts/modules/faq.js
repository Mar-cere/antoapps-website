/**
 * FAQ Module
 * Maneja el acordeón de preguntas frecuentes
 */

export function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

