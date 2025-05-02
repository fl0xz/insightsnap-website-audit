"use client";

import React, { ReactNode } from "react";
import AnimatedPageTransition from "./AnimatedPageTransition";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { motion } from "framer-motion";

interface GlobalAnimatedLayoutProps {
  children: ReactNode;
}

/**
 * GlobalAnimatedLayout - A wrapper component for consistent page animations
 * 
 * This component wraps all pages and provides:
 * 1. Page transition animations
 * 2. Reduced motion handling
 * 3. Consistent styling for all pages
 */
export default function GlobalAnimatedLayout({ children }: GlobalAnimatedLayoutProps) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* If reduced motion is preferred, skip animations */}
      {prefersReducedMotion ? (
        <div className="flex-grow">{children}</div>
      ) : (
        <AnimatedPageTransition>{children}</AnimatedPageTransition>
      )}
    </div>
  );
} 