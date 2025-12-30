'use client';

import { useEffect, useRef } from 'react';

export function useParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 50;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      element: HTMLDivElement;
    }> = [];

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(26, 221, 219, 0.5);
        border-radius: 50%;
        pointer-events: none;
      `;
      
      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      const size = Math.random() * 2 + 1;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      container.appendChild(particle);

      particles.push({
        x,
        y,
        vx,
        vy,
        size,
        element: particle,
      });
    }

    // Animar partículas
    let animationId: number;
    const animate = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > container.offsetWidth) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > container.offsetHeight) {
          particle.vy *= -1;
        }

        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      particles.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return containerRef;
}

