"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import CollapsibleSection from "./CollapsibleSection";
import { LightBulbIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface AILandingPageAnalysisProps {
  websiteUrl?: string;
  isLoading?: boolean;
  isLocked?: boolean;
  className?: string;
}

/**
 * AILandingPageAnalysis - Displays AI-generated insights about landing page clarity
 * 
 * For premium users, provides detailed analysis of landing page messaging, CTA clarity,
 * visual hierarchy, and overall message effectiveness.
 */
export default function AILandingPageAnalysis({
  websiteUrl = "example.com",
  isLoading = false,
  isLocked = false,
  className = "",
}: AILandingPageAnalysisProps) {
  const [regenerating, setRegenerating] = useState(false);

  // Mock AI analysis data
  const mockAnalysis = {
    clarity_score: 78,
    value_proposition: {
      text: "Website audit tool with AI-powered insights",
      strength: "moderate",
      recommendation: "Consider leading with a benefit-focused statement rather than a feature description. For example: 'Boost conversion rates with AI-powered website insights'."
    },
    messaging_issues: [
      {
        element: "Hero headline",
        issue: "Somewhat technical language may confuse non-technical visitors",
        recommendation: "Simplify the headline to focus on business outcomes, not technology"
      },
      {
        element: "CTA button",
        issue: "Generic 'Learn More' doesn't clearly indicate next steps",
        recommendation: "Replace with action-oriented text like 'Get Your Free Audit' or 'See Your Score'"
      },
      {
        element: "Feature descriptions",
        issue: "Too focused on features rather than benefits",
        recommendation: "Restructure to lead with customer outcomes for each feature"
      }
    ],
    strengths: [
      "Clear visual hierarchy draws attention to key elements",
      "Good use of whitespace improves readability",
      "Testimonials effectively build credibility"
    ],
    gpt_summary: "Your landing page effectively communicates what your service is, but could more clearly articulate why visitors should care. The value proposition is product-focused rather than outcome-focused. The hero section doesn't immediately answer 'what's in it for me?' from the visitor's perspective. Consider restructuring the page to lead with customer pain points and how your solution specifically addresses them. CTAs should be more action-oriented and create a sense of urgency or clear next steps."
  };

  // Handle regenerate action (would connect to API in production)
  const handleRegenerate = () => {
    setRegenerating(true);
    // Simulate API call
    setTimeout(() => {
      setRegenerating(false);
    }, 2000);
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <LightBulbIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Landing Page Analysis</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock AI-powered landing page analysis with our Pro plan</p>
                <AnimatedButton variant="primary" size="md" href="/pricing">
                  Upgrade Now
                </AnimatedButton>
              </div>
            </div>
            
            {/* Blurred preview content */}
            <div className="h-48 w-full rounded-lg bg-gradient-to-r from-purple-100 to-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <LightBulbIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Landing Page Analysis</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <ArrowPathIcon className="w-10 h-10 text-purple-500" />
            </motion.div>
            <p className="text-gray-600">Analyzing your landing page with AI...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a minute</p>
          </div>
        </div>
      </div>
    );
  }

  // Main component with analysis results
  return (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <LightBulbIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Landing Page Analysis</h2>
          </div>
          
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="text-sm text-purple-600 hover:text-purple-800 flex items-center disabled:opacity-50"
          >
            {regenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-1"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </motion.div>
                Regenerating...
              </>
            ) : (
              <>
                <ArrowPathIcon className="w-4 h-4 mr-1" />
                Regenerate
              </>
            )}
          </button>
        </div>
        
        {/* Clarity Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Landing Page Clarity Score</h3>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
              mockAnalysis.clarity_score >= 80 ? 'bg-green-100 text-green-800' :
              mockAnalysis.clarity_score >= 60 ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {mockAnalysis.clarity_score}/100
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                mockAnalysis.clarity_score >= 80 ? 'bg-green-600' :
                mockAnalysis.clarity_score >= 60 ? 'bg-amber-500' :
                'bg-red-600'
              }`} 
              style={{ width: `${mockAnalysis.clarity_score}%` }}
            ></div>
          </div>
        </div>
        
        {/* Value Proposition Analysis */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Value Proposition Analysis</h3>
          <p className="text-gray-800 mb-3">"{mockAnalysis.value_proposition.text}"</p>
          <div className="flex items-center mb-2">
            <span className="text-xs font-medium mr-2">Strength:</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              mockAnalysis.value_proposition.strength === 'strong' ? 'bg-green-100 text-green-800' :
              mockAnalysis.value_proposition.strength === 'moderate' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {mockAnalysis.value_proposition.strength}
            </span>
          </div>
          <p className="text-sm text-gray-600">{mockAnalysis.value_proposition.recommendation}</p>
        </div>
        
        {/* Issues */}
        <CollapsibleSection 
          title="Messaging Issues" 
          initiallyExpanded={true}
          className="mb-6"
        >
          <div className="space-y-4 mt-2">
            {mockAnalysis.messaging_issues.map((issue, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900">{issue.element}</h4>
                <p className="text-sm text-red-700 mt-1">{issue.issue}</p>
                <div className="flex items-start mt-2">
                  <ArrowPathIcon className="w-4 h-4 text-gray-500 mr-1 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{issue.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
        
        {/* Strengths */}
        <CollapsibleSection 
          title="What's Working Well" 
          initiallyExpanded={true}
          className="mb-6"
        >
          <div className="space-y-2 mt-2">
            {mockAnalysis.strengths.map((strength, index) => (
              <div key={index} className="flex items-start p-2">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">{strength}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
        
        {/* AI Summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">AI-Generated Summary</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              {mockAnalysis.gpt_summary}
            </p>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <AnimatedButton
            variant="primary"
            size="md"
            href="#fix-issues"
          >
            Fix These Issues
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

// Lock icon for the premium feature version
function LockIcon({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
} 