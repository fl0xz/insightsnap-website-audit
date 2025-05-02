"use client";

import React, { ReactNode } from "react";
import AnimatedStaggerGroup, { AnimatedStaggerItem } from "./AnimatedStaggerGroup";

interface AnimatedHeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  ctaButton?: ReactNode;
  secondaryButton?: ReactNode;
  visual?: ReactNode;
  className?: string;
  backgroundClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  staggerDelay?: number;
}

/**
 * AnimatedHero - A reusable component for creating animated hero sections
 * 
 * Provides consistent staggered animations for hero sections across the site
 */
export default function AnimatedHero({
  title,
  subtitle,
  ctaButton,
  secondaryButton,
  visual,
  className = "",
  backgroundClassName = "",
  titleClassName = "text-4xl md:text-5xl font-bold mb-6",
  subtitleClassName = "text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto",
  staggerDelay = 0.15
}: AnimatedHeroProps) {
  return (
    <section className={`w-full ${backgroundClassName || "bg-gradient-to-br from-[#5D3FD3] to-[#4c34a9] text-white py-16 md:py-24 px-4"} ${className}`}>
      <div className="container mx-auto">
        <div className={`${visual ? 'grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : 'text-center max-w-4xl mx-auto'}`}>
          <div className={visual ? '' : 'mx-auto'}>
            <AnimatedStaggerGroup staggerDelay={staggerDelay}>
              <AnimatedStaggerItem>
                <h1 className={titleClassName}>
                  {title}
                </h1>
              </AnimatedStaggerItem>
              
              {subtitle && (
                <AnimatedStaggerItem>
                  <p className={subtitleClassName}>
                    {subtitle}
                  </p>
                </AnimatedStaggerItem>
              )}
              
              {(ctaButton || secondaryButton) && (
                <AnimatedStaggerItem>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {ctaButton}
                    {secondaryButton}
                  </div>
                </AnimatedStaggerItem>
              )}
            </AnimatedStaggerGroup>
          </div>
          
          {visual && (
            <div className="md:order-last">
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 