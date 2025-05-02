import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook for detecting when an element enters or exits the viewport
 * Can be used as a fallback for animations when Framer Motion is not available
 * 
 * @param options - Intersection observer options
 * @returns The ref to attach to the element and whether it's visible
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  once = true
}: UseIntersectionObserverOptions = {}): [RefObject<HTMLDivElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // If once is true, disconnect after becoming visible
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, once]);
  
  return [ref, isVisible];
}

/**
 * Example usage:
 * 
 * ```jsx
 * const MyComponent = () => {
 *   const [ref, isVisible] = useIntersectionObserver();
 *   
 *   return (
 *     <div
 *       ref={ref}
 *       className={`transition-all duration-700 transform ${
 *         isVisible
 *           ? 'opacity-100 translate-y-0'
 *           : 'opacity-0 translate-y-20'
 *       }`}
 *     >
 *       This content will animate when it enters the viewport
 *     </div>
 *   );
 * };
 * ```
 */ 