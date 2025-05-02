"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  bgGradient?: string;
  iconBgColor?: string;
  highlight?: boolean;
  index?: number;
}

/**
 * FeatureCard - A component to display platform features with icons
 * Used in feature showcase sections throughout the site
 */
export default function FeatureCard({
  title,
  description,
  icon,
  bgGradient = "bg-gradient-to-br from-white to-gray-50",
  iconBgColor = "bg-purple-100",
  highlight = false,
  index = 0
}: FeatureCardProps) {
  // Determine animation direction based on index
  const isEven = index % 2 === 0;
  const animationStyle = isEven ? "slideInLeft" : "slideInRight";
  
  return (
    <AnimatedSection 
      animationStyle={animationStyle}
      className={`
        ${bgGradient}
        ${highlight ? 'ring-2 ring-purple-500 shadow-xl' : 'shadow-md'}
        rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg
      `}
    >
      <div className="flex items-start">
        <div className={`${iconBgColor} p-3 rounded-xl text-purple-700 flex-shrink-0`}>
          {icon}
        </div>
        
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      
      {highlight && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="inline-flex items-center text-xs font-medium text-purple-700">
            <svg className="mr-1.5 h-2 w-2 text-purple-500" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            Premium Feature
          </span>
        </div>
      )}
    </AnimatedSection>
  );
} 