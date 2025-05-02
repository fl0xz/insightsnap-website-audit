"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface AnimatedPageTransitionProps {
  children: ReactNode;
}

/**
 * AnimatedPageTransition - Provides smooth page transitions
 * 
 * This component wraps page content and adds entrance/exit animations
 * when navigating between pages
 */
export default function AnimatedPageTransition({ children }: AnimatedPageTransitionProps) {
  const pathname = usePathname();
  
  // Animation variants for page transitions
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut" 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 