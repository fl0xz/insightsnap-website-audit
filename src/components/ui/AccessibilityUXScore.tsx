"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import CollapsibleSection from "./CollapsibleSection";
import { EyeIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface AccessibilityUXScoreProps {
  websiteUrl?: string;
  isLoading?: boolean;
  isLocked?: boolean;
  className?: string;
}

/**
 * AccessibilityUXScore - Analyzes website accessibility and user experience
 * 
 * For premium users, provides detailed analysis of WCAG compliance, form labels,
 * alt text presence, color contrast, and more.
 */
export default function AccessibilityUXScore({
  websiteUrl = "example.com",
  isLoading = false,
  isLocked = false,
  className = "",
}: AccessibilityUXScoreProps) {
  const [currentTab, setCurrentTab] = useState<'overview' | 'issues' | 'improvements'>('overview');

  // Mock accessibility and UX data
  const mockA11yData = {
    overall_score: 72,
    wcag_compliance: "AA (Partial)",
    critical_issues: 3,
    serious_issues: 5,
    moderate_issues: 8,
    summary: "Your website has several accessibility issues that may make it difficult for users with disabilities to navigate and interact with your content. The most pressing concerns are missing form labels, low color contrast, and improper heading structure.",
    category_scores: [
      { name: "Perceivable", score: 68, description: "Content must be presentable to users in ways they can perceive" },
      { name: "Operable", score: 81, description: "User interface components must be operable" },
      { name: "Understandable", score: 76, description: "Information and operation must be understandable" },
      { name: "Robust", score: 65, description: "Content must be robust enough to work with assistive technologies" },
    ],
    issues: [
      {
        id: "a11y-1",
        severity: "critical",
        wcag: "1.3.1",
        title: "Missing Form Labels",
        description: "6 form fields have no associated label, making them unusable for screen reader users",
        recommendation: "Add proper label elements associated with each input using the 'for' attribute or wrap inputs with label elements",
        impact: "Screen reader users cannot identify the purpose of form fields"
      },
      {
        id: "a11y-2", 
        severity: "serious",
        wcag: "1.4.3",
        title: "Insufficient Color Contrast",
        description: "Text on several pages has contrast ratios below 4.5:1, particularly on the light gray backgrounds",
        recommendation: "Increase contrast between text and background colors to meet WCAG AA standard (4.5:1 for normal text, 3:1 for large text)",
        impact: "Users with low vision or color blindness may have difficulty reading content"
      },
      {
        id: "a11y-3",
        severity: "critical",
        wcag: "1.1.1",
        title: "Images Missing Alt Text",
        description: "23 informative images have no alternative text descriptions",
        recommendation: "Add descriptive alt text to all images that convey information. Use empty alt attributes for decorative images",
        impact: "Screen reader users miss important visual information"
      },
      {
        id: "a11y-4",
        severity: "serious",
        wcag: "2.4.1",
        title: "No Skip Navigation Link",
        description: "No method to bypass repeated navigation elements",
        recommendation: "Add a 'Skip to main content' link at the beginning of the page",
        impact: "Keyboard users have to tab through all navigation links on every page"
      },
      {
        id: "a11y-5",
        severity: "moderate",
        wcag: "2.4.6",
        title: "Ambiguous Link Text",
        description: "Multiple links with generic text like 'Learn More' or 'Click Here'",
        recommendation: "Use descriptive link text that makes sense out of context",
        impact: "Screen reader users may not understand where links will take them"
      }
    ],
    ux_issues: [
      {
        id: "ux-1",
        type: "ux",
        severity: "serious",
        title: "Form Field Validation Timing",
        description: "Validation errors are only displayed after form submission, not during input",
        recommendation: "Implement inline validation that provides feedback as users complete each field",
        impact: "Users must submit the entire form to discover errors, leading to frustration"
      },
      {
        id: "ux-2",
        type: "ux",
        severity: "moderate",
        title: "Small Touch Targets",
        description: "Several clickable elements are smaller than 44x44 pixels",
        recommendation: "Increase the size of buttons, links, and other interactive elements to at least 44x44 pixels",
        impact: "Mobile users may have difficulty accurately tapping elements"
      },
      {
        id: "ux-3",
        type: "ux",
        severity: "serious",
        title: "Required Field Indicators Missing",
        description: "Required and optional form fields are not clearly distinguished",
        recommendation: "Clearly indicate required fields with both visual indicators (like asterisks) and ARIA attributes",
        impact: "Users may skip required fields and encounter errors upon submission"
      }
    ]
  };

  // Combine all issues for the issues tab
  const allIssues = [...mockA11yData.issues, ...mockA11yData.ux_issues].sort((a, b) => {
    const severityOrder = { critical: 0, serious: 1, moderate: 2 };
    return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
  });

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <EyeIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Accessibility & UX Score</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock accessibility analysis with our Pro plan</p>
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
            <EyeIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Accessibility & UX Score</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <ArrowPathIcon className="w-10 h-10 text-purple-500" />
            </motion.div>
            <p className="text-gray-600">Analyzing accessibility and user experience...</p>
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
            <EyeIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Accessibility & UX Score</h2>
          </div>
        </div>

        {/* Score and Summary */}
        <div className="mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  strokeWidth="10" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={
                    mockA11yData.overall_score >= 80 ? '#22c55e' : 
                    mockA11yData.overall_score >= 60 ? '#f59e0b' : 
                    '#ef4444'
                  }
                  strokeWidth="10" 
                  strokeDasharray={`${2 * Math.PI * 45 * mockA11yData.overall_score / 100} ${2 * Math.PI * 45 * (1 - mockA11yData.overall_score / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-900">
                {mockA11yData.overall_score}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">WCAG Compliance: {mockA11yData.wcag_compliance}</p>
              <div className="flex items-center justify-center mt-2 space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>{mockA11yData.critical_issues} Critical</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                  <span>{mockA11yData.serious_issues} Serious</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>{mockA11yData.moderate_issues} Moderate</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mb-4">{mockA11yData.summary}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mockA11yData.category_scores.map((category, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-medium text-gray-700">{category.name}</h4>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                    category.score >= 80 ? 'bg-green-100 text-green-800' :
                    category.score >= 60 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {category.score}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      category.score >= 80 ? 'bg-green-500' :
                      category.score >= 60 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} 
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
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
              Overview
            </button>
            <button
              onClick={() => setCurrentTab('issues')}
              className={`py-3 border-b-2 font-medium text-sm ${
                currentTab === 'issues'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Issues
            </button>
            <button
              onClick={() => setCurrentTab('improvements')}
              className={`py-3 border-b-2 font-medium text-sm ${
                currentTab === 'improvements'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Improvements
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
              <div className="space-y-6">
                <CollapsibleSection
                  title="Common Accessibility Failures"
                  initiallyExpanded={true}
                >
                  <div className="space-y-3 mt-2">
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Missing Form Labels</p>
                        <p className="text-xs text-gray-600">Makes forms inaccessible to screen reader users</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Images Missing Alt Text</p>
                        <p className="text-xs text-gray-600">Screen reader users miss important visual information</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Insufficient Color Contrast</p>
                        <p className="text-xs text-gray-600">Makes content difficult to read for users with low vision</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
                
                <CollapsibleSection
                  title="User Experience Issues"
                  initiallyExpanded={true}
                >
                  <div className="space-y-3 mt-2">
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Poor Form Validation Feedback</p>
                        <p className="text-xs text-gray-600">Users must submit the form to see errors</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mobile Touch Targets Too Small</p>
                        <p className="text-xs text-gray-600">Difficult for users to tap accurately on mobile devices</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>

                <CollapsibleSection
                  title="What's Working Well"
                  initiallyExpanded={true}
                >
                  <div className="space-y-3 mt-2">
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Proper Heading Structure</p>
                        <p className="text-xs text-gray-600">Most pages have proper heading hierarchy (h1, h2, etc.)</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Keyboard Navigation</p>
                        <p className="text-xs text-gray-600">Most interactive elements are keyboard accessible</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>
            )}

            {currentTab === 'issues' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">All Issues ({allIssues.length})</h3>
                
                {allIssues.map((issue, index) => (
                  <div 
                    key={issue.id} 
                    className={`p-4 rounded-lg border ${
                      issue.severity === 'critical' ? 'border-red-200 bg-red-50' :
                      issue.severity === 'serious' ? 'border-amber-200 bg-amber-50' :
                      'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-1 rounded-full flex-shrink-0 mr-3 mt-0.5 ${
                        issue.severity === 'critical' ? 'bg-red-100' :
                        issue.severity === 'serious' ? 'bg-amber-100' :
                        'bg-blue-100'
                      }`}>
                        <ExclamationTriangleIcon className={`w-4 h-4 ${
                          issue.severity === 'critical' ? 'text-red-700' :
                          issue.severity === 'serious' ? 'text-amber-700' :
                          'text-blue-700'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900 mr-2">{issue.title}</h4>
                          {'wcag' in issue && (
                            <span className="px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                              WCAG {issue.wcag}
                            </span>
                          )}
                          {'type' in issue && issue.type === 'ux' && (
                            <span className="px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                              UX Issue
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                        <div>
                          <p className="text-xs font-medium text-gray-900 mb-1">Recommendation:</p>
                          <p className="text-xs text-gray-700">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentTab === 'improvements' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recommended Improvements</h3>
                
                <CollapsibleSection
                  title="Form Accessibility"
                  initiallyExpanded={true}
                  className="mb-4"
                >
                  <div className="space-y-2 mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Add Labels to All Form Fields</h4>
                      <p className="text-xs text-gray-700 mb-2">Form inputs need explicit label elements to be accessible to screen readers.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 rounded border border-red-100">
                          <p className="text-xs font-medium text-red-800 mb-1">Current Implementation</p>
                          <pre className="text-xs text-red-700 overflow-x-auto">
                            {'<input type="text" placeholder="Name" />'}
                          </pre>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-xs font-medium text-green-800 mb-1">Recommended Implementation</p>
                          <pre className="text-xs text-green-700 overflow-x-auto">
                            {'<label for="name">Name</label>\n<input type="text" id="name" />'}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Improve Form Validation</h4>
                      <p className="text-xs text-gray-700 mb-2">Provide clear, immediate validation feedback for form fields.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 rounded border border-red-100">
                          <p className="text-xs font-medium text-red-800 mb-1">Current Implementation</p>
                          <p className="text-xs text-red-700">Only shows errors after form submission</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-xs font-medium text-green-800 mb-1">Recommended Implementation</p>
                          <p className="text-xs text-green-700">Add inline validation as users complete each field</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
                
                <CollapsibleSection
                  title="Image Accessibility"
                  initiallyExpanded={true}
                  className="mb-4"
                >
                  <div className="space-y-2 mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Add Alt Text to All Images</h4>
                      <p className="text-xs text-gray-700 mb-2">Screen readers rely on alt text to describe images to users who can't see them.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 rounded border border-red-100">
                          <p className="text-xs font-medium text-red-800 mb-1">Current Implementation</p>
                          <pre className="text-xs text-red-700 overflow-x-auto">
                            {'<img src="product.jpg" />'}
                          </pre>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-xs font-medium text-green-800 mb-1">Recommended Implementation</p>
                          <pre className="text-xs text-green-700 overflow-x-auto">
                            {'<img src="product.jpg" alt="Blue t-shirt with logo" />'}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
                
                <CollapsibleSection
                  title="Color Contrast"
                  initiallyExpanded={true}
                >
                  <div className="space-y-2 mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Improve Text Contrast</h4>
                      <p className="text-xs text-gray-700 mb-2">Text should have sufficient contrast against its background.</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-50 rounded border border-red-100">
                          <p className="text-xs font-medium text-red-800 mb-1">Current Implementation</p>
                          <div className="p-2 rounded bg-gray-200">
                            <p className="text-xs text-gray-400">Light gray text on light background (2.5:1)</p>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <p className="text-xs font-medium text-green-800 mb-1">Recommended Implementation</p>
                          <div className="p-2 rounded bg-gray-200">
                            <p className="text-xs text-gray-800">Darker text on light background (7:1)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
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