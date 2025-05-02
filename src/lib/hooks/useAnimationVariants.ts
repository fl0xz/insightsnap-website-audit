/**
 * Custom hook to provide reusable animation variants for the website
 * These animations are used across multiple pages to ensure consistent animation behavior
 */

export function useAnimationVariants() {
  // Fade in from bottom animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Fade in animation
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Staggered children container
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Slide in from left
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Slide in from right
  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Scale up animation
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // For items that should animate with delay based on index
  const staggeredItem = (delayFactor = 0.1) => ({
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: custom * delayFactor, 
        ease: "easeOut" 
      }
    })
  });

  // Button hover animation
  const buttonHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  // Button tap animation
  const buttonTap = {
    scale: 0.95
  };

  return {
    fadeInUp,
    fadeIn,
    staggerContainer,
    slideInLeft,
    slideInRight,
    scaleUp,
    staggeredItem,
    buttonHover,
    buttonTap
  };
} 