"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  LockClosedIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

interface AccessibilityUXScoreProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isLoading?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock accessibility audit data
const mockAccessibilityData = {
  score: 74,
  issues: {
    critical: 3,
    serious: 5,
    moderate: 8,
    minor: 6
  },
  passedChecks: 42,
  categories: [
    {
      name: "Perceivable",
      score: 82,
      description: "Information and user interface components must be presentable to users in ways they can perceive."
    },
    {
      name: "Operable",
      score: 68,
      description: "User interface components and navigation must be operable."
    },
    {
      name: "Understandable",
      score: 93,
      description: "Information and the operation of user interface must be understandable."
    },
    {
      name: "Robust",
      score: 61,
      description: "Content must be robust enough to be interpreted by a wide variety of user agents."
    }
  ],
  issues: [
    {
      id: 1,
      severity: "critical",
      wcag: "1.1.1",
      description: "Images lack alt text",
      elements: 5,
      impact: "Screen readers cannot interpret images without text alternatives"
    },
    {
      id: 2,
      severity: "critical",
      wcag: "2.1.1",
      description: "Keyboard navigation not fully supported",
      elements: 3,
      impact: "Users who rely on keyboard can't access all features"
    },
    {
      id: 3,
      severity: "critical",
      wcag: "1.4.3",
      description: "Insufficient color contrast",
      elements: 8,
      impact: "Text difficult to read for users with low vision"
    },
    {
      id: 4,
      severity: "serious",
      wcag: "3.3.2",
      description: "Form fields missing labels",
      elements: 4,
      impact: "Screen reader users can't identify form purpose"
    },
    {
      id: 5,
      severity: "serious",
      wcag: "4.1.2",
      description: "ARIA attributes incorrect usage",
      elements: 3,
      impact: "Assistive technologies receive incorrect information"
    }
  ]
};

export default function AccessibilityUXScore({
  websiteUrl = "example.com",
  isLocked = false,
  isLoading = false,
  isPremium = false,
  className = ""
}: AccessibilityUXScoreProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "recommendations">("overview");
  
  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };
  
  // Get score ring color based on value
  const getScoreRingColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };
  
  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical": return "text-red-600";
      case "serious": return "text-orange-600";
      case "moderate": return "text-amber-600";
      case "minor": return "text-blue-600";
      default: return "text-gray-600";
    }
  };
  
  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "serious": return "bg-orange-100 text-orange-800";
      case "moderate": return "bg-amber-100 text-amber-800";
      case "minor": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Accessibility UX Score</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock accessibility auditing with our Pro plan</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => window.location.href = "/pricing"}
                >
                  Upgrade Now
                </motion.button>
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
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Accessibility UX Score for {websiteUrl}</h2>
          </div>
          
          <div className="text-center py-10">
            <ArrowPathIcon className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Accessibility</h3>
            <p className="text-gray-600">
              We're scanning your website for accessibility issues. This might take a minute...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Accessibility Score for {websiteUrl}</h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "issues" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("issues")}
            >
              Issues ({mockAccessibilityData.issues.critical + mockAccessibilityData.issues.serious})
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "recommendations" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("recommendations")}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Score Circle */}
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32">
                    <circle 
                      className="text-gray-200" 
                      strokeWidth="8" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="56" 
                      cx="64" 
                      cy="64"
                    />
                    <circle 
                      className={getScoreRingColor(mockAccessibilityData.score)} 
                      strokeWidth="8" 
                      strokeDasharray={`${mockAccessibilityData.score * 3.51}, 351`}
                      strokeLinecap="round" 
                      stroke="currentColor" 
                      fill="transparent" 
                      r="56" 
                      cx="64" 
                      cy="64"
                    />
                  </svg>
                  <span className={`absolute text-3xl font-bold ${getScoreColor(mockAccessibilityData.score)}`}>
                    {mockAccessibilityData.score}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Accessibility Score: {mockAccessibilityData.score}/100</h3>
                <p className="text-gray-600 mb-4">
                  Your website needs some improvements to be fully accessible to all users.
                  {mockAccessibilityData.score >= 90 
                    ? " Great job maintaining accessibility standards!"
                    : mockAccessibilityData.score >= 70
                    ? " Address the critical issues to improve user experience."
                    : " Multiple critical issues need immediate attention."}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center p-1 bg-red-100 text-red-700 rounded-full h-7 w-7 mr-2">
                      {mockAccessibilityData.issues.critical}
                    </span>
                    <span className="text-sm text-gray-700">Critical Issues</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center p-1 bg-orange-100 text-orange-700 rounded-full h-7 w-7 mr-2">
                      {mockAccessibilityData.issues.serious}
                    </span>
                    <span className="text-sm text-gray-700">Serious Issues</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center p-1 bg-amber-100 text-amber-700 rounded-full h-7 w-7 mr-2">
                      {mockAccessibilityData.issues.moderate}
                    </span>
                    <span className="text-sm text-gray-700">Moderate Issues</span>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center p-1 bg-green-100 text-green-700 rounded-full h-7 w-7 mr-2">
                      {mockAccessibilityData.passedChecks}
                    </span>
                    <span className="text-sm text-gray-700">Passed Checks</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* WCAG Categories */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">WCAG Principles Performance</h3>
              <div className="space-y-4">
                {mockAccessibilityData.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="font-medium text-sm text-gray-800">{category.name}</span>
                        <span className={`ml-2 text-sm ${getScoreColor(category.score)}`}>
                          {category.score}/100
                        </span>
                      </div>
                      <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          category.score >= 90 ? "bg-green-500" : 
                          category.score >= 70 ? "bg-amber-500" : 
                          "bg-red-500"
                        }`}
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Wins */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-blue-900 mb-3">Quick Wins</h3>
              <ul className="space-y-2">
                {mockAccessibilityData.issues.slice(0, 3).map((issue) => (
                  <li key={issue.id} className="flex items-start">
                    <ExclamationCircleIcon className={`h-5 w-5 mr-2 flex-shrink-0 ${getSeverityColor(issue.severity)}`} />
                    <span className="text-sm text-gray-800">{issue.description} <span className="text-gray-500">({issue.elements} elements)</span></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Issues Tab */}
        {activeTab === "issues" && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                We found several accessibility issues that should be addressed. Critical and serious issues are shown below.
              </p>
            </div>
            
            <div className="space-y-4">
              {mockAccessibilityData.issues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-full ${getSeverityBadge(issue.severity).split(' ')[0]} mr-3`}>
                        <ExclamationCircleIcon className={`h-4 w-4 ${getSeverityColor(issue.severity)}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{issue.description}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                            WCAG {issue.wcag}
                          </span>
                          <span className="ml-2">
                            {issue.elements} {issue.elements === 1 ? 'element' : 'elements'} affected
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                    </span>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700">Impact</h5>
                      <p className="text-sm text-gray-600">{issue.impact}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">How to fix</h5>
                      <p className="text-sm text-gray-600">
                        {issue.severity === "critical" && issue.description.includes("alt text") && 
                          "Add descriptive alt text to all images that convey information. Use empty alt attributes for decorative images."}
                        {issue.severity === "critical" && issue.description.includes("Keyboard") && 
                          "Ensure all interactive elements can be accessed and operated using keyboard navigation alone."}
                        {issue.severity === "critical" && issue.description.includes("contrast") && 
                          "Increase the contrast ratio between text and background to at least 4.5:1 for normal text and 3:1 for large text."}
                        {issue.severity === "serious" && issue.description.includes("form") && 
                          "Associate labels with form controls using 'for' attribute or nesting the control within the label element."}
                        {issue.severity === "serious" && issue.description.includes("ARIA") && 
                          "Review and correct ARIA attributes according to WAI-ARIA specifications and best practices."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Based on our accessibility audit, here are the key recommendations to improve your website's accessibility.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-md mb-6">
                <div className="flex">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Priority Actions</h3>
                    <div className="mt-1 text-sm text-green-700">
                      Addressing these issues will have the biggest impact on improving your accessibility score.
                    </div>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-6">
                <li className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900 mb-2">1. Add Alternative Text to Images</h4>
                  <p className="text-gray-600 mb-3">
                    All images that convey information should have descriptive alt text. Decorative images should have empty alt attributes.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    <p className="font-medium text-gray-800 mb-1">Code Example:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
                      {'<img src="logo.png" alt="Company Name Logo">'}
                    </pre>
                  </div>
                </li>
                <li className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900 mb-2">2. Improve Color Contrast</h4>
                  <p className="text-gray-600 mb-3">
                    Ensure text has sufficient contrast against its background. Minimum ratio should be 4.5:1 for normal text and 3:1 for large text.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-100 p-3 rounded border border-red-200">
                      <p className="font-medium text-red-800 mb-1">Poor Contrast:</p>
                      <div className="bg-gray-200 p-2 rounded">
                        <span className="text-gray-400">Low contrast text</span>
                      </div>
                    </div>
                    <div className="bg-green-100 p-3 rounded border border-green-200">
                      <p className="font-medium text-green-800 mb-1">Good Contrast:</p>
                      <div className="bg-gray-200 p-2 rounded">
                        <span className="text-gray-800">High contrast text</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900 mb-2">3. Ensure Keyboard Accessibility</h4>
                  <p className="text-gray-600 mb-3">
                    All interactive elements should be operable via keyboard. Focus indicators should be visible.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    <p className="font-medium text-gray-800 mb-1">Test Method:</p>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                      <li>Unplug your mouse</li>
                      <li>Navigate your website using only Tab, Shift+Tab, and Enter</li>
                      <li>Ensure all interactive elements can be accessed and operated</li>
                    </ol>
                  </div>
                </li>
                <li className="bg-white rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900 mb-2">4. Add Labels to Form Fields</h4>
                  <p className="text-gray-600 mb-3">
                    All form fields should have associated labels. This helps screen reader users understand the purpose of each field.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    <p className="font-medium text-gray-800 mb-1">Code Example:</p>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
                      {'<label for="name">Full Name</label>\n<input type="text" id="name" name="name">'}
                    </pre>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                View Full Accessibility Report
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 