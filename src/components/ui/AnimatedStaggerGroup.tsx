"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimationVariants } from "@/lib/hooks/useAnimationVariants";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface AnimatedStaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
  delayStart?: number;
  skipAnimation?: boolean;
}

/**
 * AnimatedStaggerGroup - A container component for staggered animations
 * 
 * @param children - The content to be rendered with staggered animations
 * @param className - Additional CSS classes
 * @param staggerDelay - The delay between each child animation
 * @param once - Whether to animate only once when scrolled into view
 * @param margin - Viewport margin for triggering animation
 * @param delayStart - Initial delay before the first animation starts
 * @param skipAnimation - Skip animation entirely (for reduced motion)
 */
export default function AnimatedStaggerGroup({
  children,
  className = "",
  staggerDelay = 0.2,
  once = true,
  margin = "0px",
  delayStart = 0,
  skipAnimation = false
}: AnimatedStaggerGroupProps) {
  const { staggerContainer } = useAnimationVariants();
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animations if reduced motion is preferred or explicitly skipped
  if (prefersReducedMotion || skipAnimation) {
    return <div className={className}>{children}</div>;
  }
  
  const containerVariants = {
    ...staggerContainer,
    visible: {
      ...staggerContainer.visible,
      transition: {
        ...staggerContainer.visible.transition,
        staggerChildren: staggerDelay,
        delayChildren: delayStart
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  custom?: number;
  skipAnimation?: boolean;
}

/**
 * AnimatedStaggerItem - A child component to be used within AnimatedStaggerGroup
 */
export function AnimatedStaggerItem({
  children,
  className = "",
  custom = 0,
  skipAnimation = false
}: AnimatedStaggerItemProps) {
  const { staggeredItem } = useAnimationVariants();
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animation if reduced motion is preferred
  if (prefersReducedMotion || skipAnimation) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      variants={staggeredItem()}
      custom={custom}
    >
      {children}
    </motion.div>
  );
} 