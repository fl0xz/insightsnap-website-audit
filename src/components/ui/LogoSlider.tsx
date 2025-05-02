"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LogoSliderProps {
  logos: {
    id: number;
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  title?: string;
  speed?: number;
  className?: string;
  grayscale?: boolean;
}

/**
 * LogoSlider - A component for displaying client or media logos
 * Features an infinite scrolling animation effect
 */
export default function LogoSlider({
  logos,
  title,
  speed = 25,
  className = "",
  grayscale = true
}: LogoSliderProps) {
  // Double the logos array for the infinite effect
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <div className={`overflow-hidden py-6 ${className}`}>
      {title && (
        <h3 className="text-center text-sm font-medium uppercase tracking-wider text-gray-500 mb-6">
          {title}
        </h3>
      )}
      
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
          style={{ width: `${duplicatedLogos.length * 150}px` }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="mx-8 flex items-center justify-center"
            >
              <div className="relative h-12 w-auto flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`
                    object-contain max-h-12
                    ${grayscale ? 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100' : ''}
                    transition-all duration-300
                  `}
                />
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient fade effect on edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </div>
  );
} 