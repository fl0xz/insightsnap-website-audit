"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAnimationVariants } from "@/lib/hooks/useAnimationVariants";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import Button from "./Button";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  href?: string;
  bounceEffect?: boolean;
  skipAnimation?: boolean;
}

/**
 * AnimatedButton - A button component with hover and tap animations
 * 
 * This component extends the base Button component with animations.
 */
export default function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  fullWidth = false,
  href,
  bounceEffect = true,
  skipAnimation = false
}: AnimatedButtonProps) {
  const { buttonHover, buttonTap } = useAnimationVariants();
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animations if reduced motion is preferred or explicitly skipped
  if (prefersReducedMotion || skipAnimation || disabled) {
    return (
      <Button
        onClick={onClick}
        className={className}
        variant={variant}
        size={size}
        disabled={disabled}
        type={type}
        fullWidth={fullWidth}
        href={href}
      >
        {children}
      </Button>
    );
  }
  
  // Use more subtle animations if bounceEffect is false
  const hoverAnimation = bounceEffect 
    ? buttonHover 
    : { scale: 1.03, transition: { duration: 0.2 } };
  
  const tapAnimation = bounceEffect
    ? buttonTap
    : { scale: 0.98 };

  // Extract Button props
  const buttonProps = {
    onClick,
    className,
    variant,
    size,
    disabled,
    type,
    fullWidth,
    href
  };

  return (
    <motion.div
      whileHover={!disabled ? hoverAnimation : undefined}
      whileTap={!disabled ? tapAnimation : undefined}
      className="inline-block"
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      <Button {...buttonProps}>
        {children}
      </Button>
    </motion.div>
  );
} 