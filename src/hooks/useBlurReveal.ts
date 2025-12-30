import { useRef, useEffect, useState } from 'react';

interface UseBlurRevealOptions {
  threshold?: number;
  rootMargin?: string;
  maxBlur?: number;
  minBlur?: number;
}

export const useBlurReveal = <T extends HTMLElement = HTMLElement>({
  threshold = 0,
  rootMargin = '0px',
  maxBlur = 10,
  minBlur = 0,
}: UseBlurRevealOptions = {}) => {
  const elementRef = useRef<T>(null);
  const [blurAmount, setBlurAmount] = useState(maxBlur);
  const [opacity, setOpacity] = useState(0.3);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          // Calculate blur based on intersection ratio
          // When ratio is 0 (just entering), blur is max
          // When ratio is 1 (fully visible), blur is min
          const ratio = entry.intersectionRatio;
          const newBlur = maxBlur - (ratio * (maxBlur - minBlur));
          const newOpacity = 0.3 + (ratio * 0.7); // Start at 0.3 opacity, go to 1.0
          
          setBlurAmount(Math.max(minBlur, newBlur));
          setOpacity(Math.min(1, newOpacity));
        } else if (!hasStarted && entry.boundingClientRect.top > window.innerHeight) {
          // If element is below viewport and hasn't started, keep it blurred
          setBlurAmount(maxBlur);
          setOpacity(0.3);
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 steps
        rootMargin: rootMargin || '0px',
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, maxBlur, minBlur]);

  return {
    elementRef,
    style: {
      filter: `blur(${blurAmount}px)`,
      opacity: opacity,
      transition: 'filter 0.3s ease-out, opacity 0.3s ease-out',
    },
  };
};

