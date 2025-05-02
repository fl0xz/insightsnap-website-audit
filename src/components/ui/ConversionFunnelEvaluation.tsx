"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import { ArrowPathIcon, ArrowUpIcon, ArrowDownIcon, CursorArrowRaysIcon, CheckCircleIcon, XCircleIcon, ShieldExclamationIcon, CursorArrowRippleIcon } from "@heroicons/react/24/outline";

interface ConversionFunnelEvaluationProps {
  websiteUrl?: string;
  isLoading?: boolean;
  isLocked?: boolean;
  className?: string;
}

/**
 * ConversionFunnelEvaluation - Evaluates website conversion path clarity
 * 
 * For premium users, provides analysis of CTA effectiveness, form field usability,
 * and overall conversion funnel clarity.
 */
export default function ConversionFunnelEvaluation({
  websiteUrl = "example.com",
  isLoading = false,
  isLocked = false,
  className = "",
}: ConversionFunnelEvaluationProps) {
  const [currentTab, setCurrentTab] = useState<'overview' | 'cta' | 'forms'>('overview');

  // Mock funnel data
  const mockFunnelData = {
    score: 67,
    summary: "Your conversion funnel has several friction points that may be causing visitor drop-off. The primary issues include unclear call-to-action buttons, too many form fields, and distracting elements above the fold.",
    journey_steps: [
      {
        name: "Homepage",
        conversion_rate: 34,
        change: -2.3,
        issues: [
          "Primary CTA is below the fold",
          "Multiple competing actions create decision paralysis"
        ]
      },
      {
        name: "Features Page",
        conversion_rate: 28,
        change: 1.5,
        issues: [
          "No clear next steps at end of page",
          "Benefit statements are feature-focused"
        ]
      },
      {
        name: "Pricing Page",
        conversion_rate: 15,
        change: -4.8,
        issues: [
          "Pricing comparison is confusing",
          "Value proposition not reinforced"
        ]
      },
      {
        name: "Signup Form",
        conversion_rate: 45,
        change: -6.2,
        issues: [
          "8 form fields create high friction",
          "No social proof near conversion point",
          "Security reassurance missing"
        ]
      }
    ],
    cta_analysis: [
      {
        location: "Homepage hero",
        text: "Learn More",
        color: "#336699",
        contrast_ratio: 2.8,
        is_above_fold: true,
        issues: [
          "Generic text does not create urgency",
          "Contrast ratio fails accessibility standards (2.8:1, should be 4.5:1)",
          "Button appears to be a link, not a primary action"
        ],
        recommendations: [
          "Change text to action-oriented language (e.g., 'Start Your Free Audit')",
          "Increase contrast ratio by using darker blue or white text on current blue",
          "Add visual weight to make it stand out as primary action"
        ]
      },
      {
        location: "Features section",
        text: "Get Started",
        color: "#00BFA6",
        contrast_ratio: 4.2,
        is_above_fold: false,
        issues: [
          "Not visible without scrolling",
          "Contrast ratio is borderline accessible (4.2:1)",
          "Competes with other CTAs"
        ],
        recommendations: [
          "Move a version of this CTA above the fold",
          "Slightly darken the button color to improve contrast",
          "Establish clearer visual hierarchy between primary/secondary actions"
        ]
      },
    ],
    form_analysis: {
      signup_form: {
        fields: 8,
        required_fields: 6,
        completion_time: "84 seconds",
        abandonment_rate: "62%",
        issues: [
          "Too many fields for initial signup (8 fields)",
          "Phone number field is unnecessarily required",
          "No clear indication of data privacy"
        ],
        recommendations: [
          "Reduce to maximum 4 fields for initial signup",
          "Make phone number optional",
          "Add a clear privacy statement explaining data usage"
        ]
      },
      contact_form: {
        fields: 6,
        required_fields: 4,
        completion_time: "62 seconds",
        abandonment_rate: "48%",
        issues: [
          "Form requires too much information before contact",
          "Error messages are technical and unclear",
          "No acknowledgment of message receipt after submission"
        ],
        recommendations: [
          "Simplify to name, email, and message",
          "Improve error messaging with clear, friendly language",
          "Add a thank you page with clear next steps"
        ]
      }
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <CursorArrowRaysIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel Evaluation</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock conversion funnel analysis with our Pro plan</p>
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
            <CursorArrowRaysIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel Evaluation</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <ArrowPathIcon className="w-10 h-10 text-purple-500" />
            </motion.div>
            <p className="text-gray-600">Analyzing your conversion funnel...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a minute</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CursorArrowRaysIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel Evaluation</h2>
          </div>
        </div>

        {/* Score and Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Conversion Funnel Score</h3>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
              mockFunnelData.score >= 80 ? 'bg-green-100 text-green-800' :
              mockFunnelData.score >= 60 ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {mockFunnelData.score}/100
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className={`h-2.5 rounded-full ${
                mockFunnelData.score >= 80 ? 'bg-green-600' :
                mockFunnelData.score >= 60 ? 'bg-amber-500' :
                'bg-red-600'
              }`} 
              style={{ width: `${mockFunnelData.score}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-700">{mockFunnelData.summary}</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setCurrentTab('overview')}
              className={`py-3 border-b-2 font-medium text-sm ${
                currentTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Journey Overview
            </button>
            <button
              onClick={() => setCurrentTab('cta')}
              className={`py-3 border-b-2 font-medium text-sm ${
                currentTab === 'cta'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              CTA Analysis
            </button>
            <button
              onClick={() => setCurrentTab('forms')}
              className={`py-3 border-b-2 font-medium text-sm ${
                currentTab === 'forms'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Form UX
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'overview' && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Conversion Journey Overview</h3>
                <div className="space-y-4">
                  {mockFunnelData.journey_steps.map((step, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{step.name}</h4>
                        <div className="flex items-center">
                          <span className="text-gray-700 mr-2">{step.conversion_rate}%</span>
                          <span className={`flex items-center text-xs ${
                            step.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {step.change > 0 ? (
                              <ArrowUpIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDownIcon className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(step.change).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                        <div 
                          className={`h-1.5 rounded-full ${
                            step.conversion_rate >= 40 ? 'bg-green-500' :
                            step.conversion_rate >= 20 ? 'bg-amber-500' :
                            'bg-red-500'
                          }`} 
                          style={{ width: `${step.conversion_rate}%` }}
                        ></div>
                      </div>
                      <div className="space-y-1">
                        {step.issues.map((issue, issueIndex) => (
                          <div key={issueIndex} className="flex items-start">
                            <XCircleIcon className="w-4 h-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-700">{issue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'cta' && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Call-to-Action Analysis</h3>
                <div className="space-y-6">
                  {mockFunnelData.cta_analysis.map((cta, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900">{cta.location}</h4>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            cta.is_above_fold ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {cta.is_above_fold ? 'Above Fold' : 'Below Fold'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-24 h-9 rounded flex items-center justify-center text-white text-sm"
                          style={{ backgroundColor: cta.color }}
                        >
                          {cta.text}
                        </div>
                        <div className="ml-4">
                          <p className="text-xs text-gray-600">Contrast Ratio</p>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900 mr-2">{cta.contrast_ratio}:1</span>
                            {cta.contrast_ratio >= 4.5 ? (
                              <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircleIcon className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Issues</h5>
                        <div className="space-y-1">
                          {cta.issues.map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-start">
                              <XCircleIcon className="w-4 h-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-700">{issue}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Recommendations</h5>
                        <div className="space-y-1">
                          {cta.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-start">
                              <ArrowPathIcon className="w-4 h-4 text-purple-500 mr-1.5 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-700">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'forms' && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Form UX Analysis</h3>
                <div className="space-y-6">
                  {Object.entries(mockFunnelData.form_analysis).map(([formName, formData], index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900">{formName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-3 rounded border border-gray-100">
                          <p className="text-xs text-gray-600 mb-1">Total Fields</p>
                          <p className="text-lg font-medium text-gray-900">{formData.fields}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-100">
                          <p className="text-xs text-gray-600 mb-1">Completion Time</p>
                          <p className="text-lg font-medium text-gray-900">{formData.completion_time}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-100">
                          <p className="text-xs text-gray-600 mb-1">Required Fields</p>
                          <p className="text-lg font-medium text-gray-900">{formData.required_fields}</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-100">
                          <p className="text-xs text-gray-600 mb-1">Abandonment Rate</p>
                          <p className={`text-lg font-medium ${
                            parseInt(formData.abandonment_rate) < 30 ? 'text-green-600' :
                            parseInt(formData.abandonment_rate) < 50 ? 'text-amber-600' :
                            'text-red-600'
                          }`}>{formData.abandonment_rate}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Issues</h5>
                        <div className="space-y-1">
                          {formData.issues.map((issue, issueIndex) => (
                            <div key={issueIndex} className="flex items-start">
                              <XCircleIcon className="w-4 h-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-700">{issue}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-gray-700 mb-1">Recommendations</h5>
                        <div className="space-y-1">
                          {formData.recommendations.map((rec, recIndex) => (
                            <div key={recIndex} className="flex items-start">
                              <ArrowPathIcon className="w-4 h-4 text-purple-500 mr-1.5 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-gray-700">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
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