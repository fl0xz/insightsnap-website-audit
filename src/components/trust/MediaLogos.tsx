"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MediaLogosProps {
  title?: string;
  className?: string;
  dark?: boolean;
}

// Define media logos with paths
const mediaLogos = [
  {
    name: "Forbes",
    src: "/logos/forbes.svg",
    width: 140,
    height: 40,
  },
  {
    name: "Wired",
    src: "/logos/wired.svg",
    width: 120,
    height: 40,
  },
  {
    name: "TechCrunch",
    src: "/logos/techcrunch.svg",
    width: 150,
    height: 40,
  },
  {
    name: "Mashable",
    src: "/logos/mashable.svg",
    width: 160,
    height: 40,
  },
  {
    name: "Entrepreneur",
    src: "/logos/entrepreneur.svg",
    width: 140,
    height: 40,
  }
];

export default function MediaLogos({ 
  title = "As seen on", 
  className = "",
  dark = false
}: MediaLogosProps) {
  return (
    <div className={`py-8 ${dark ? 'bg-gray-900 text-white' : ''} ${className}`}>
      {title && (
        <h3 className={`text-center text-lg font-medium ${dark ? 'text-gray-200' : 'text-gray-500'} mb-8`}>
          {title}
        </h3>
      )}
      
      <div className="flex overflow-hidden relative">
        <motion.div
          className="flex space-x-12 md:space-x-16 items-center"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }
          }}
        >
          {/* First set of logos */}
          {mediaLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={logo.height}
                className={`h-8 md:h-10 w-auto ${dark ? 'brightness-200' : ''}`}
              />
            </div>
          ))}
          
          {/* Duplicate set for continuous loop */}
          {mediaLogos.map((logo, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={logo.height}
                className={`h-8 md:h-10 w-auto ${dark ? 'brightness-200' : ''}`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 