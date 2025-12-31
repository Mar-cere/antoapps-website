'use client';

import { useEffect, useRef, useState, RefCallback } from 'react';

interface UseCounterOptions {
  duration?: number;
  startValue?: number;
  suffix?: string;
  decimals?: number;
}

export function useCounter(
  target: number,
  options: UseCounterOptions = {}
): [number, RefCallback<HTMLDivElement>] {
  const { duration = 2000, startValue = 0, decimals = 0 } = options;
  const [count, setCount] = useState(startValue);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  const setRef: RefCallback<HTMLDivElement> = (node) => {
    elementRef.current = node;
  };

  useEffect(() => {
    if (!elementRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const start = startValue;
    const end = target;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = start + (end - start) * easeOut;
      const rounded = decimals > 0 
        ? Math.round(current * Math.pow(10, decimals)) / Math.pow(10, decimals)
        : Math.floor(current);
      setCount(rounded);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, target, duration, startValue]);

  return [count, setRef];
}

