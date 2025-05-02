"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface WeeklyScanToggleProps {
  initialEnabled?: boolean;
  onToggle?: (isEnabled: boolean) => void;
  className?: string;
}

/**
 * WeeklyScanToggle - A component for toggling weekly automated scans
 * Includes animation effects and visual feedback
 */
export default function WeeklyScanToggle({
  initialEnabled = false,
  onToggle,
  className = ""
}: WeeklyScanToggleProps) {
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggle = async () => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Toggle the state
    const newState = !isEnabled;
    setIsEnabled(newState);
    setIsLoading(false);
    
    // Call the onToggle callback if provided
    if (onToggle) {
      onToggle(newState);
    }
  };
  
  return (
    <div className={`rounded-xl bg-white shadow-md p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Weekly Automated Scans</h3>
          <p className="text-sm text-gray-600 mt-1">
            Automatically scan your website every week and receive email reports.
          </p>
        </div>
        
        <button 
          onClick={handleToggle}
          disabled={isLoading}
          className={`
            relative inline-flex flex-shrink-0 h-6 w-11 border-2 rounded-full cursor-pointer 
            transition-colors ease-in-out duration-300 focus:outline-none
            ${isEnabled ? 'bg-green-500 border-green-500' : 'bg-gray-200 border-gray-200'}
            ${isLoading ? 'opacity-50 cursor-wait' : ''}
          `}
          aria-pressed={isEnabled}
          aria-label="Toggle weekly scans"
        >
          <span className="sr-only">
            {isEnabled ? 'Disable weekly scans' : 'Enable weekly scans'}
          </span>
          
          <motion.span 
            className={`
              pointer-events-none inline-block h-5 w-5 rounded-full bg-white 
              shadow transform ring-0 transition ease-in-out duration-300
            `}
            animate={{ 
              x: isEnabled ? 20 : 0,
              backgroundColor: isEnabled ? '#ffffff' : '#ffffff'
            }}
          />
        </button>
      </div>
      
      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Next scan scheduled: </span>
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 