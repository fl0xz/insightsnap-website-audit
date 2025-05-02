"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ClientLogosProps {
  title?: string;
  className?: string;
}

// Define client logos with paths
const clientLogos = [
  {
    name: "Microsoft",
    src: "/logos/microsoft.svg",
    width: 140,
    height: 40,
  },
  {
    name: "Shopify",
    src: "/logos/shopify.svg",
    width: 120,
    height: 40,
  },
  {
    name: "Webflow",
    src: "/logos/webflow.svg",
    width: 140,
    height: 40,
  },
  {
    name: "Airbnb",
    src: "/logos/airbnb.svg",
    width: 120,
    height: 40,
  },
  {
    name: "Slack",
    src: "/logos/slack.svg",
    width: 130,
    height: 40,
  },
  {
    name: "Atlassian",
    src: "/logos/atlassian.svg",
    width: 160,
    height: 40,
  }
];

export default function ClientLogos({ title = "Trusted by innovative companies", className = "" }: ClientLogosProps) {
  return (
    <div className={`py-8 ${className}`}>
      {title && (
        <h3 className="text-center text-lg font-medium text-gray-500 mb-8">
          {title}
        </h3>
      )}
      
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {clientLogos.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ filter: "grayscale(100%)", opacity: 0.6 }}
            whileHover={{ filter: "grayscale(0%)", opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              className="h-8 md:h-10 w-auto"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 