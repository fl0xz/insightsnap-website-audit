"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  initiallyExpanded?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  onChange?: (isExpanded: boolean) => void;
}

/**
 * CollapsibleSection - A component for displaying content in expandable/collapsible sections
 * Used for organizing detailed information in audit reports
 */
export default function CollapsibleSection({
  title,
  children,
  icon,
  initiallyExpanded = false,
  className = "",
  titleClassName = "",
  contentClassName = "",
  onChange
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  const toggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (onChange) {
      onChange(newState);
    }
  };
  
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={toggleExpand}
        className={`
          w-full flex items-center justify-between p-4 text-left
          bg-white hover:bg-gray-50 transition-colors
          ${isExpanded ? 'border-b border-gray-200' : ''}
          ${titleClassName}
        `}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center">
          {icon && (
            <span className="mr-3 text-purple-600">{icon}</span>
          )}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`p-4 bg-white ${contentClassName}`}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 