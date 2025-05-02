"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DevicePhoneMobileIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

interface MobileOptimizationProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isLoading?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock mobile audit data
const mockMobileData = {
  score: 68,
  speedIndex: 4.2, // seconds
  hasViewportTag: true,
  hasValidMediaQueries: true,
  isMobileFriendly: true,
  usesResponsiveImages: false,
  hasTapTargetIssues: true,
  pageSize: 2.4, // MB
  issues: [
    {
      id: 1,
      severity: "high",
      title: "Tap targets are too small",
      description: "Several tap targets are smaller than 48px, making them difficult to press on mobile devices.",
      elements: 12,
      impact: "Users may struggle to tap buttons and links accurately."
    },
    {
      id: 2,
      severity: "high",
      title: "Images not optimized for mobile",
      description: "Images are not properly sized or compressed for mobile devices.",
      elements: 8,
      impact: "Larger images consume more data and slow down page loading."
    },
    {
      id: 3,
      severity: "medium",
      title: "Render-blocking resources",
      description: "CSS and JavaScript files are blocking the first paint of your page.",
      elements: 4,
      impact: "Increases time to first contentful paint."
    },
    {
      id: 4,
      severity: "medium",
      title: "Text too small to read",
      description: "Some text elements are below 12px and may be difficult to read on mobile.",
      elements: 6,
      impact: "Users may struggle to read content without zooming."
    },
    {
      id: 5,
      severity: "low",
      title: "Content wider than screen",
      description: "Some elements extend beyond the viewport width, causing horizontal scrolling.",
      elements: 2,
      impact: "Forces users to scroll horizontally, creating a poor user experience."
    }
  ],
  deviceEmulation: {
    screenshots: [
      {
        device: "iPhone 12",
        imageUrl: "/screenshots/iphone12.png",
        width: 390,
        height: 844
      },
      {
        device: "Samsung Galaxy S21",
        imageUrl: "/screenshots/galaxys21.png",
        width: 360,
        height: 800
      }
    ]
  }
};

export default function MobileOptimization({
  websiteUrl = "example.com",
  isLocked = false,
  isLoading = false,
  isPremium = false,
  className = ""
}: MobileOptimizationProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "emulation">("overview");
  
  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "high": return "text-red-600";
      case "medium": return "text-amber-600";
      case "low": return "text-blue-600";
      default: return "text-gray-600";
    }
  };
  
  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <DevicePhoneMobileIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Mobile Optimization</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock mobile optimization with our Pro plan</p>
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
            <DevicePhoneMobileIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Mobile Optimization for {websiteUrl}</h2>
          </div>
          
          <div className="text-center py-10">
            <ArrowPathIcon className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Mobile Experience</h3>
            <p className="text-gray-600">
              We're testing how your website performs on mobile devices. This might take a minute...
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
            <DevicePhoneMobileIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Mobile Optimization for {websiteUrl}</h2>
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
              Issues ({mockMobileData.issues.length})
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "emulation" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("emulation")}
            >
              Device Emulation
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Score and Mobile Friendly Check */}
            <div className="flex flex-col md:flex-row items-start mb-8">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 text-center">
                <div className="inline-flex flex-col items-center">
                  <div className={`text-5xl font-bold mb-2 ${getScoreColor(mockMobileData.score)}`}>
                    {mockMobileData.score}
                  </div>
                  <div className="text-sm text-gray-500">Mobile Score</div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="flex items-start">
                    {mockMobileData.isMobileFriendly ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="text-md font-medium text-gray-900">
                        {mockMobileData.isMobileFriendly 
                          ? "Your site is mobile-friendly" 
                          : "Your site is not mobile-friendly"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {mockMobileData.isMobileFriendly 
                          ? "The page is mobile-friendly, but still has some issues that should be addressed." 
                          : "The page has significant mobile usability issues that need to be addressed."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Speed Index</h4>
                    <div className="flex items-center">
                      <span className={`text-xl font-semibold ${
                        mockMobileData.speedIndex < 3 
                          ? "text-green-600" 
                          : mockMobileData.speedIndex < 5 
                          ? "text-amber-600" 
                          : "text-red-600"
                      }`}>
                        {mockMobileData.speedIndex}s
                      </span>
                      {mockMobileData.speedIndex < 3 ? (
                        <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-5 w-5 text-amber-500 ml-2" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {mockMobileData.speedIndex < 3 
                        ? "Good - Page loads quickly on mobile" 
                        : mockMobileData.speedIndex < 5 
                        ? "Average - Page could load faster" 
                        : "Poor - Page loads slowly on mobile"}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Page Size</h4>
                    <div className="flex items-center">
                      <span className={`text-xl font-semibold ${
                        mockMobileData.pageSize < 1 
                          ? "text-green-600" 
                          : mockMobileData.pageSize < 3 
                          ? "text-amber-600" 
                          : "text-red-600"
                      }`}>
                        {mockMobileData.pageSize} MB
                      </span>
                      {mockMobileData.pageSize < 1 ? (
                        <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-5 w-5 text-amber-500 ml-2" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {mockMobileData.pageSize < 1 
                        ? "Good - Low data usage" 
                        : mockMobileData.pageSize < 3 
                        ? "Average - Consider optimizing" 
                        : "Poor - May use excessive data"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Requirements Check */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">Mobile Requirements</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="py-2 flex items-center justify-between">
                    <span className="text-sm text-gray-700">Viewport meta tag</span>
                    {mockMobileData.hasViewportTag ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="text-sm text-gray-700">Valid media queries</span>
                    {mockMobileData.hasValidMediaQueries ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="text-sm text-gray-700">Responsive images</span>
                    {mockMobileData.usesResponsiveImages ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </li>
                  <li className="py-2 flex items-center justify-between">
                    <span className="text-sm text-gray-700">Adequate tap targets</span>
                    {!mockMobileData.hasTapTargetIssues ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Quick Wins */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-md font-medium text-blue-900 mb-3">Quick Wins</h3>
              <ul className="space-y-2">
                {mockMobileData.issues.slice(0, 3).map((issue) => (
                  <li key={issue.id} className="flex items-start">
                    <ExclamationTriangleIcon className={`h-5 w-5 mr-2 flex-shrink-0 ${getSeverityColor(issue.severity)}`} />
                    <span className="text-sm text-gray-800">{issue.title} <span className="text-gray-500">({issue.elements} elements)</span></span>
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
                We found {mockMobileData.issues.length} mobile usability issues that should be addressed for a better mobile experience.
              </p>
            </div>
            
            <div className="space-y-4">
              {mockMobileData.issues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-full ${getSeverityBadge(issue.severity).split(' ')[0]} mr-3`}>
                        <ExclamationTriangleIcon className={`h-4 w-4 ${getSeverityColor(issue.severity)}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{issue.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {issue.elements} {issue.elements === 1 ? 'element' : 'elements'} affected
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                    </span>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700">Description</h5>
                      <p className="text-sm text-gray-600">{issue.description}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700">Impact</h5>
                      <p className="text-sm text-gray-600">{issue.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Emulation Tab */}
        {activeTab === "emulation" && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Here's how your website appears on different mobile devices.
                (Note: For demonstration purposes, placeholder images are shown)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockMobileData.deviceEmulation.screenshots.map((screenshot, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">{screenshot.device}</h4>
                    <p className="text-xs text-gray-500">
                      {screenshot.width}x{screenshot.height}px
                    </p>
                  </div>
                  <div className="p-4 flex justify-center">
                    <div 
                      className="border-8 border-gray-800 rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center"
                      style={{ 
                        width: `${screenshot.width / 4}px`, 
                        height: `${screenshot.height / 4}px`,
                        maxWidth: '100%'
                      }}
                    >
                      {/* This would be the actual screenshot in a real implementation */}
                      <div className="text-center p-4">
                        <DevicePhoneMobileIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">{screenshot.device} Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Test on More Devices
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 