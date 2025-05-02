"use client";

import React, { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";

interface AnimatedFeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  index?: number; // Used to alternate animation direction
  className?: string;
  iconContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

/**
 * AnimatedFeatureCard - A reusable animated feature card component
 * 
 * This component animates feature cards with alternating left/right animations
 * based on the provided index (even/odd)
 */
export default function AnimatedFeatureCard({
  title,
  description,
  icon,
  index = 0,
  className = "bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100",
  iconContainerClassName = "flex-shrink-0 bg-[#5D3FD3]/10 p-3 rounded-lg text-[#5D3FD3]",
  titleClassName = "text-xl font-semibold text-gray-900 mb-2",
  descriptionClassName = "text-gray-600"
}: AnimatedFeatureCardProps) {
  // Use alternating slide-in animations based on index
  const isEven = index % 2 === 0;
  const animationStyle = isEven ? "slideInLeft" : "slideInRight";
  
  return (
    <AnimatedSection 
      className={className}
      animationStyle={animationStyle}
      margin="-50px"
    >
      <div className="flex items-start">
        {icon && (
          <div className={iconContainerClassName}>
            {icon}
          </div>
        )}
        <div className={icon ? "ml-5" : ""}>
          <h3 className={titleClassName}>{title}</h3>
          <p className={descriptionClassName}>{description}</p>
        </div>
      </div>
    </AnimatedSection>
  );
} 