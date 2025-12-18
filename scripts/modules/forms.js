/**
 * Forms Module
 * Maneja formularios y validación
 */

export function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                message: document.getElementById('message')?.value || ''
            };

            console.log('Formulario enviado:', formData);
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando Fetch API o un servicio de backend
            
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
        });
    }
}

