"use client";

import React from "react";
import { motion } from "framer-motion";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: () => void;
  yearlyDiscount?: number; // Percentage discount for yearly plans
  className?: string;
}

export default function PricingToggle({
  isAnnual,
  onToggle,
  yearlyDiscount = 20,
  className = ""
}: PricingToggleProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center justify-center space-x-3 mb-3">
        <span 
          className={`text-sm font-medium transition-colors ${
            !isAnnual ? "text-gray-900" : "text-gray-500"
          }`}
        >
          Monthly
        </span>
        
        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={isAnnual}
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${
            isAnnual ? "bg-purple-600" : "bg-gray-200"
          }`}
        >
          <span className="sr-only">
            {isAnnual ? "Switch to monthly billing" : "Switch to yearly billing"}
          </span>
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 ${
              isAnnual ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        
        <span 
          className={`flex items-center text-sm font-medium transition-colors ${
            isAnnual ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <span>Yearly</span>
          {yearlyDiscount > 0 && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Save {yearlyDiscount}%
            </span>
          )}
        </span>
      </div>
      
      {isAnnual && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-gray-500"
        >
          Billed annually for lower rates
        </motion.p>
      )}
    </div>
  );
} 