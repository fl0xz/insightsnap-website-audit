"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isAnnual: boolean;
  currency?: string;
  features: PricingFeature[];
  ctaText?: string;
  ctaLink?: string;
  isPrimary?: boolean;
  index?: number;
}

export default function PricingCard({
  title,
  description,
  monthlyPrice,
  yearlyPrice,
  isAnnual,
  currency = "$",
  features,
  ctaText = "Get Started",
  ctaLink = "#",
  isPrimary = false,
  index = 0
}: PricingCardProps) {
  // Calculate price based on billing period
  const price = isAnnual ? yearlyPrice : monthlyPrice;
  
  // Animation for staggered appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      className={`flex flex-col rounded-2xl shadow-lg overflow-hidden h-full transform transition-all duration-300 ${
        isPrimary 
          ? "border-2 border-purple-500 relative" 
          : "border border-gray-200"
      }`}
    >
      {/* Most Popular Tag */}
      {isPrimary && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            Most Popular
          </span>
        </div>
      )}
      
      <div className={`px-6 py-8 sm:p-10 ${isPrimary ? "bg-purple-50" : "bg-white"}`}>
        <div>
          <h3 
            className={`text-xl font-semibold ${
              isPrimary ? "text-purple-600" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6">
          <div className="flex items-baseline text-gray-900">
            <span className="text-3xl sm:text-4xl font-extrabold">{currency}{price}</span>
            <span className="ml-1 text-sm text-gray-500">
              /{isAnnual ? "year" : "month"}
            </span>
          </div>
          {isAnnual && (
            <p className="mt-1 text-xs text-green-600">
              Savings of {currency}{(monthlyPrice * 12) - yearlyPrice} per year
            </p>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`mt-6 w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm ${
            isPrimary 
              ? "bg-purple-600 hover:bg-purple-700 text-white" 
              : "bg-white hover:bg-gray-50 text-purple-600 border-purple-200 hover:border-purple-300"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          onClick={() => window.location.href = ctaLink}
        >
          {ctaText}
        </motion.button>
      </div>
      
      <div className="flex-1 px-6 pb-8 pt-4 sm:px-10 bg-white">
        <ul className="space-y-3">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <div className={`flex-shrink-0 ${feature.included ? "text-green-500" : "text-gray-300"}`}>
                <CheckIcon className="h-5 w-5" />
              </div>
              <p className={`ml-3 text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                {feature.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
} 