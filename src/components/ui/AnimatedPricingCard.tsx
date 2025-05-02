"use client";

import React, { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";
import AnimatedButton from "./AnimatedButton";

interface AnimatedPricingCardProps {
  title: string;
  price: string | ReactNode;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "primary" | "secondary" | "outline" | "text";
  recommended?: boolean;
  index?: number;
  onButtonClick?: () => void;
  className?: string;
  buttonHref?: string;
}

/**
 * AnimatedPricingCard - A reusable animated pricing card component
 * 
 * This component animates pricing cards with a scale-up effect 
 * and provides consistent styling
 */
export default function AnimatedPricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "primary",
  recommended = false,
  index = 0,
  onButtonClick,
  className = "",
  buttonHref
}: AnimatedPricingCardProps) {
  // Calculate delay based on index for staggered appearance
  const delay = index * 0.15;
  
  return (
    <AnimatedSection 
      className={`${className} rounded-xl p-8 ${recommended 
        ? 'bg-[#5D3FD3] shadow-xl border border-[#5D3FD3]/20' 
        : 'bg-white shadow-md border border-gray-100'
      }`}
      animationStyle="scaleUp"
      delay={delay}
    >
      {recommended && (
        <div className="inline-block bg-[#00BFA6]/20 text-[#00BFA6] px-4 py-1 rounded-full text-sm font-medium mb-6">
          RECOMMENDED
        </div>
      )}
      
      <h3 className={`text-2xl font-semibold mb-3 ${recommended ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      
      <div className={`text-4xl font-bold mb-4 ${recommended ? 'text-white' : 'text-gray-900'}`}>
        {price}
      </div>
      
      <p className={`text-lg mb-6 ${recommended ? 'text-white opacity-90' : 'text-gray-600 opacity-80'}`}>
        {description}
      </p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 mr-2 ${recommended ? 'text-white' : 'text-[#00BFA6]'}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className={recommended ? "text-white" : "text-gray-700"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      <AnimatedButton 
        onClick={onButtonClick} 
        variant={buttonVariant} 
        size="lg" 
        className="w-full font-semibold"
        href={buttonHref}
      >
        {buttonText}
      </AnimatedButton>
    </AnimatedSection>
  );
} 