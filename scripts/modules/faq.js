/**
 * FAQ Module
 * Maneja el acordeón de preguntas frecuentes y categorías
 */

export function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryButtons = document.querySelectorAll('.faq-category-btn');

    // FAQ Accordion functionality
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
    
    // FAQ Categories functionality
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter FAQ items
                faqItems.forEach(item => {
                    const itemCategory = item.dataset.category;
                    
                    if (category === 'all' || itemCategory === category) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

