"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface AuditScoreCardProps {
  title: string;
  score: number;
  previousScore?: number;
  description: string;
  icon: React.ReactNode;
  colorClass?: string;
  bgClass?: string;
}

/**
 * AuditScoreCard - A component for displaying audit scores with visual indicators
 * Used in the audit results and dashboard sections
 */
export default function AuditScoreCard({
  title,
  score,
  previousScore,
  description,
  icon,
  colorClass = "text-purple-700",
  bgClass = "bg-purple-50"
}: AuditScoreCardProps) {
  // Calculate improvement if previous score is provided
  const improvement = previousScore ? score - previousScore : null;
  const scoreColor = score >= 80 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-600";
  
  return (
    <AnimatedSection
      animationStyle="fadeInUp"
      className={`${bgClass} rounded-2xl p-6 shadow-md`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <span className={`${colorClass} mr-2`}>{icon}</span>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        
        {improvement !== null && (
          <div className={`flex items-center text-sm font-medium ${improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span>{improvement >= 0 ? '+' : ''}{improvement}</span>
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {improvement >= 0 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline mb-4">
        <span className={`text-3xl font-bold ${scoreColor}`}>{score}</span>
        <span className="text-sm text-gray-500 ml-1">/100</span>
      </div>
      
      <div className="mb-3 bg-gray-200 rounded-full h-2.5">
        <motion.div 
          className={`h-2.5 rounded-full ${
            score >= 80 
              ? 'bg-gradient-to-r from-green-400 to-green-600' 
              : score >= 60 
                ? 'bg-gradient-to-r from-amber-400 to-amber-600' 
                : 'bg-gradient-to-r from-red-400 to-red-600'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-sm text-gray-600">{description}</p>
    </AnimatedSection>
  );
} 