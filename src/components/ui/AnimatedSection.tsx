"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimationVariants } from "@/lib/hooks/useAnimationVariants";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type AnimationStyle = 
  | "fadeInUp" 
  | "fadeIn" 
  | "slideInLeft" 
  | "slideInRight" 
  | "scaleUp";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationStyle?: AnimationStyle;
  delay?: number;
  once?: boolean;
  margin?: string;
  as?: React.ElementType;
  skipAnimation?: boolean;
}

/**
 * AnimatedSection - A reusable component for animated sections
 * 
 * @param children - The content to be rendered inside the section
 * @param className - Additional CSS classes
 * @param animationStyle - The animation style to use
 * @param delay - Optional delay before animation starts
 * @param once - Whether to animate only once when scrolled into view
 * @param margin - Viewport margin for triggering animation
 * @param as - The element type to render (default: div)
 * @param skipAnimation - Skip animation entirely (for nested animations or reduced motion)
 */
export default function AnimatedSection({
  children,
  className = "",
  animationStyle = "fadeInUp",
  delay = 0,
  once = true,
  margin = "0px",
  as: Component = "div",
  skipAnimation = false
}: AnimatedSectionProps) {
  const animations = useAnimationVariants();
  const prefersReducedMotion = useReducedMotion();
  
  // Return children without animation if reduced motion is preferred or skipAnimation is true
  if (prefersReducedMotion || skipAnimation) {
    return <div className={className}>{children}</div>;
  }
  
  // Get the correct animation variant based on animationStyle
  const getVariant = () => {
    switch(animationStyle) {
      case "fadeInUp": return animations.fadeInUp;
      case "fadeIn": return animations.fadeIn;
      case "slideInLeft": return animations.slideInLeft;
      case "slideInRight": return animations.slideInRight;
      case "scaleUp": return animations.scaleUp;
      default: return animations.fadeInUp;
    }
  };

  const variant = getVariant();
  
  // Add delay to the transition if specified
  const variantWithDelay = delay 
    ? {
        ...variant,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible.transition,
            delay
          }
        }
      }
    : variant;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variantWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
} 