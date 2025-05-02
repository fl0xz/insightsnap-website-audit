"use client";

import React, { ReactNode, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface AnimatedFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  index?: number;
  children?: ReactNode;
}

/**
 * AnimatedFormField - A form field that animates into view with staggered delay
 * 
 * This component is used for form inputs with consistent animation and styling
 */
export default function AnimatedFormField({
  label,
  error,
  index = 0,
  id,
  children,
  ...inputProps
}: AnimatedFormFieldProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        delay: index * 0.1 
      }
    }
  };
  
  const Component = prefersReducedMotion ? "div" : motion.div;
  
  return (
    <Component
      className="mb-4"
      initial={prefersReducedMotion ? undefined : "hidden"}
      animate={prefersReducedMotion ? undefined : "visible"}
      variants={prefersReducedMotion ? undefined : variants}
    >
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      
      {children ? (
        children
      ) : (
        <input
          id={id}
          className={`w-full px-4 py-2 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-[#5D3FD3] focus:border-[#5D3FD3] transition`}
          {...inputProps}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </Component>
  );
} 