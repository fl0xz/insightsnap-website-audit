"use client";

import React, { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";
import AnimatedButton from "./AnimatedButton";

interface AnimatedCTAProps {
  title: ReactNode;
  description?: ReactNode;
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "outline" | "text";
  onButtonClick?: () => void;
  buttonHref?: string;
  className?: string;
  backgroundClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  animationStyle?: "scaleUp" | "fadeInUp";
}

/**
 * AnimatedCTA - A reusable animated call-to-action component
 * 
 * This component creates animated CTA sections with consistent styling
 */
export default function AnimatedCTA({
  title,
  description,
  buttonText,
  buttonVariant = "primary",
  onButtonClick,
  buttonHref,
  className = "",
  backgroundClassName = "py-16 px-4 bg-gray-50",
  titleClassName = "text-2xl md:text-3xl font-bold mb-6 text-gray-900",
  descriptionClassName = "text-lg text-gray-600 mb-8",
  animationStyle = "scaleUp"
}: AnimatedCTAProps) {
  return (
    <AnimatedSection 
      className={`${backgroundClassName} w-full`}
      animationStyle={animationStyle}
    >
      <div className={`max-w-3xl mx-auto text-center ${className}`}>
        <h2 className={titleClassName}>{title}</h2>
        
        {description && (
          <p className={descriptionClassName}>
            {description}
          </p>
        )}
        
        <AnimatedButton 
          onClick={onButtonClick} 
          variant={buttonVariant} 
          size="lg" 
          className="font-semibold"
          href={buttonHref}
          bounceEffect={true}
        >
          {buttonText}
        </AnimatedButton>
      </div>
    </AnimatedSection>
  );
} 