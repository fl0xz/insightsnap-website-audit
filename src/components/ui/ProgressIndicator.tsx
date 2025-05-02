"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  currentValue: number;
  previousValue?: number;
  label: string;
  maxValue?: number;
  colorScheme?: "purple" | "green" | "blue" | "amber" | "red";
  showChange?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * ProgressIndicator - A component for showing performance improvements and progress
 * Displays current value, previous value, and the difference between them
 */
export default function ProgressIndicator({
  currentValue,
  previousValue,
  label,
  maxValue = 100,
  colorScheme = "purple",
  showChange = true,
  className = "",
  size = "md"
}: ProgressIndicatorProps) {
  // Calculate the percentage for the progress bar
  const percentage = Math.min(Math.max((currentValue / maxValue) * 100, 0), 100);
  
  // Calculate the change if previous value exists
  const change = previousValue !== undefined ? currentValue - previousValue : null;
  const percentChange = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : null;
  
  // Determine color classes based on colorScheme
  const getColorClasses = () => {
    switch (colorScheme) {
      case "green":
        return {
          bar: "from-green-400 to-green-600",
          text: "text-green-600",
          light: "bg-green-100"
        };
      case "blue":
        return {
          bar: "from-blue-400 to-blue-600",
          text: "text-blue-600",
          light: "bg-blue-100"
        };
      case "amber":
        return {
          bar: "from-amber-400 to-amber-600",
          text: "text-amber-600",
          light: "bg-amber-100"
        };
      case "red":
        return {
          bar: "from-red-400 to-red-600",
          text: "text-red-600",
          light: "bg-red-100"
        };
      case "purple":
      default:
        return {
          bar: "from-purple-400 to-purple-600",
          text: "text-purple-600",
          light: "bg-purple-100"
        };
    }
  };
  
  const colors = getColorClasses();
  
  // Determine size classes
  const sizeClasses = {
    sm: {
      height: "h-1.5",
      fontSize: "text-xs",
      changeSize: "text-xs",
      padding: "py-1"
    },
    md: {
      height: "h-2.5",
      fontSize: "text-sm",
      changeSize: "text-sm",
      padding: "py-2"
    },
    lg: {
      height: "h-4",
      fontSize: "text-base",
      changeSize: "text-base",
      padding: "py-3"
    }
  }[size];
  
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="font-medium text-gray-700 flex items-center">
          <span className={sizeClasses.fontSize}>{label}</span>
          
          {/* Show change indicator if available */}
          {showChange && change !== null && (
            <div className={`ml-2 flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'} ${sizeClasses.changeSize}`}>
              <span>{change > 0 ? '+' : ''}{change.toFixed(1)}</span>
              {percentChange !== null && percentChange !== Infinity && (
                <span className="ml-1 text-gray-500">
                  ({percentChange > 0 ? '+' : ''}{percentChange.toFixed(1)}%)
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={`font-semibold ${colors.text} ${sizeClasses.fontSize}`}>
          {currentValue.toFixed(1)}
        </div>
      </div>
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses.height}`}>
        <motion.div
          className={`bg-gradient-to-r ${colors.bar} rounded-full ${sizeClasses.height}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
} 