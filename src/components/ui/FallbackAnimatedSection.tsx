"use client";

import React, { ReactNode } from "react";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

type AnimationStyle = 
  | "fadeInUp" 
  | "fadeIn" 
  | "slideInLeft" 
  | "slideInRight" 
  | "scaleUp";

interface FallbackAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationStyle?: AnimationStyle;
  once?: boolean;
  rootMargin?: string;
  duration?: number;
}

/**
 * FallbackAnimatedSection - A CSS-only animation component for when Framer Motion is not available
 * 
 * This component uses Intersection Observer and CSS transitions to create animations
 * without requiring the Framer Motion library.
 * 
 * @param children - The content to be rendered inside the section
 * @param className - Additional CSS classes
 * @param animationStyle - The animation style to use
 * @param once - Whether to animate only once when scrolled into view
 * @param rootMargin - Viewport margin for triggering animation
 * @param duration - Animation duration in milliseconds
 */
export default function FallbackAnimatedSection({
  children,
  className = "",
  animationStyle = "fadeInUp",
  once = true,
  rootMargin = "0px",
  duration = 700
}: FallbackAnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver({ 
    once, 
    rootMargin 
  });
  
  // Get the appropriate CSS classes based on the animation style
  const getAnimationClasses = (style: AnimationStyle, isVisible: boolean) => {
    const durationClass = `duration-${duration}`;
    
    switch(style) {
      case "fadeInUp":
        return `transition-all transform ${durationClass} ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        }`;
      
      case "fadeIn":
        return `transition-opacity ${durationClass} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`;
      
      case "slideInLeft":
        return `transition-all transform ${durationClass} ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-12"
        }`;
      
      case "slideInRight":
        return `transition-all transform ${durationClass} ${
          isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-12"
        }`;
      
      case "scaleUp":
        return `transition-all transform ${durationClass} ${
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95"
        }`;
      
      default:
        return `transition-opacity ${durationClass} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`;
    }
  };
  
  const animationClasses = getAnimationClasses(animationStyle, isVisible);
  
  return (
    <div
      ref={ref}
      className={`${className} ${animationClasses}`}
    >
      {children}
    </div>
  );
}

/**
 * Example usage:
 * 
 * ```jsx
 * <FallbackAnimatedSection 
 *   animationStyle="fadeInUp"
 *   className="p-4 bg-white"
 * >
 *   <h2>This content will animate when scrolled into view</h2>
 * </FallbackAnimatedSection>
 * ```
 */ 