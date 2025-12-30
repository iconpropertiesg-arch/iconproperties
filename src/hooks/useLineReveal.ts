import { useState, useEffect, useRef } from 'react';

interface UseLineRevealOptions {
  delay?: number; // Delay between each line (ms)
  duration?: number; // Animation duration for each line (ms)
  initialDelay?: number; // Initial delay before starting (ms)
}

export const useLineReveal = ({
  delay = 200,
  duration = 600,
  initialDelay = 300,
}: UseLineRevealOptions = {}) => {
  const [visibleLines, setVisibleLines] = useState<Set<number>>(new Set());
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || isStarted) return;

    const timer = setTimeout(() => {
      setIsStarted(true);
      
      // Get all direct text children (lines)
      const lines: Node[] = [];
      const walker = document.createTreeWalker(
        containerRef.current!,
        NodeFilter.SHOW_TEXT,
        null
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.textContent?.trim()) {
          lines.push(node);
        }
      }

      // If no text nodes found, try getting direct children
      if (lines.length === 0) {
        const children = Array.from(containerRef.current!.childNodes);
        lines.push(...children);
      }

      // Reveal each line with delay
      lines.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLines(prev => new Set([...prev, index]));
        }, initialDelay + (index * delay));
      });
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [delay, duration, initialDelay, isStarted]);

  return {
    containerRef,
    visibleLines,
    isStarted,
  };
};

