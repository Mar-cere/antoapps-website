'use client';

import { useEffect } from 'react';

export function useFAQ() {
  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question') as HTMLElement;
      const answer = item.querySelector('.faq-answer') as HTMLElement;

      if (question && answer) {
        question.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          // Cerrar todos los demás
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherAnswer = otherItem.querySelector('.faq-answer') as HTMLElement;
              if (otherAnswer) {
                otherAnswer.style.maxHeight = '0';
              }
            }
          });

          // Toggle actual
          if (isOpen) {
            item.classList.remove('active');
            answer.style.maxHeight = '0';
          } else {
            item.classList.add('active');
            answer.style.maxHeight = `${answer.scrollHeight}px`;
          }
        });
      }
    });
  }, []);
}

