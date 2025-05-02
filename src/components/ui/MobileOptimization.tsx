"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import CollapsibleSection from "./CollapsibleSection";
import { DevicePhoneMobileIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

interface MobileOptimizationProps {
  websiteUrl?: string;
  isLoading?: boolean;
  isLocked?: boolean;
  className?: string;
}

/**
 * MobileOptimization - Analyzes website mobile responsiveness and optimization
 * 
 * For premium users, provides detailed analysis of viewport settings,
 * responsive design, touch targets, and mobile performance.
 */
export default function MobileOptimization({
  websiteUrl = "example.com",
  isLoading = false,
  isLocked = false,
  className = "",
}: MobileOptimizationProps) {
  const [currentTab, setCurrentTab] = useState<'overview' | 'screenSizes' | 'improvements'>('overview');
  const [selectedScreenSize, setSelectedScreenSize] = useState<string>("iphone");

  // Mock mobile optimization data
  const mockMobileData = {
    overall_score: 68,
    is_mobile_friendly: true,
    viewport_configured: true,
    uses_responsive_design: true,
    primary_issues: [
      "Touch targets are too small on several pages",
      "Text is too small to read on mobile without zooming",
      "Content wider than screen requiring horizontal scrolling",
      "Load time on 4G exceeds 5 seconds",
      "Interstitial elements block page on initial load"
    ],
    screen_sizes: [
      {
        id: "iphone",
        name: "iPhone 12/13",
        width: 390,
        height: 844,
        issues: [
          "Products grid overflows container causing horizontal scroll",
          "Navigation menu doesn't collapse properly",
          "Font size on product pages is too small (10px)"
        ]
      },
      {
        id: "pixel",
        name: "Google Pixel 6",
        width: 412,
        height: 915,
        issues: [
          "Products grid overflows container causing horizontal scroll",
          "Hero image is cropped oddly"
        ]
      },
      {
        id: "galaxy",
        name: "Samsung Galaxy S21",
        width: 360,
        height: 800,
        issues: [
          "Navigation menu items overlap",
          "Product cards stack incorrectly",
          "Footer links are too small to tap accurately"
        ]
      },
      {
        id: "ipad",
        name: "iPad Mini",
        width: 768,
        height: 1024,
        issues: [
          "Tablet layout not optimized (uses mobile view with too much whitespace)",
          "Product imagery too small relative to screen size"
        ]
      }
    ],
    page_speed: {
      mobile_score: 54,
      desktop_score: 78,
      first_contentful_paint: 3.8, // seconds
      speed_index: 5.2, // seconds
      largest_contentful_paint: 6.1, // seconds
      time_to_interactive: 7.4, // seconds
      total_blocking_time: 550, // ms
      cumulative_layout_shift: 0.15 // unitless
    },
    recommendations: [
      {
        title: "Fix Touch Targets",
        description: "Increase the size of buttons and interactive elements to at least 44×44 pixels",
        difficulty: "medium",
        impact: "high"
      },
      {
        title: "Adjust Font Sizes",
        description: "Increase base font size to at least 16px and ensure proper scaling in the responsive design",
        difficulty: "easy",
        impact: "high"
      },
      {
        title: "Fix Viewport Width Issues",
        description: "Ensure all content containers respect the viewport width and prevent horizontal scrolling",
        difficulty: "medium",
        impact: "high"
      },
      {
        title: "Optimize Images for Mobile",
        description: "Serve appropriately sized images for mobile devices to reduce data usage and improve load time",
        difficulty: "medium",
        impact: "high"
      },
      {
        title: "Implement Mobile-First Navigation",
        description: "Redesign the navigation for mobile with a hamburger menu or tabs instead of the desktop dropdown",
        difficulty: "hard",
        impact: "medium"
      }
    ]
  };

  // Get current screen size data
  const currentScreenSize = mockMobileData.screen_sizes.find(size => size.id === selectedScreenSize);

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <DevicePhoneMobileIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Mobile Optimization</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock mobile optimization analysis with our Pro plan</p>
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
            <DevicePhoneMobileIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Mobile Optimization</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <ArrowPathIcon className="w-10 h-10 text-purple-500" />
            </motion.div>
            <p className="text-gray-600">Analyzing mobile optimization...</p>
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
            <DevicePhoneMobileIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Mobile Optimization</h2>
          </div>
        </div>

        {/* Score and Summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="relative w-16 h-16 mr-4">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
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
                      mockMobileData.overall_score >= 80 ? '#22c55e' : 
                      mockMobileData.overall_score >= 60 ? '#f59e0b' : 
                      '#ef4444'
                    }
                    strokeWidth="10" 
                    strokeDasharray={`${2 * Math.PI * 45 * mockMobileData.overall_score / 100} ${2 * Math.PI * 45 * (1 - mockMobileData.overall_score / 100)}`}
                    strokeLinecap="round"
                  />
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fill="#1f2937" fontWeight="bold" fontSize="24px">
                    {mockMobileData.overall_score}
                  </text>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Mobile-Friendly Score</h3>
                <p className="text-sm text-gray-600">
                  {mockMobileData.overall_score >= 80 ? 'Good' : 
                  mockMobileData.overall_score >= 60 ? 'Needs Improvement' : 
                  'Poor'}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${mockMobileData.is_mobile_friendly ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <p className="text-sm">Mobile-Friendly: {mockMobileData.is_mobile_friendly ? 'Yes' : 'No'}</p>
              </div>
              <div className="flex items-center mt-1">
                <div className={`w-3 h-3 rounded-full ${mockMobileData.viewport_configured ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <p className="text-sm">Viewport Configured: {mockMobileData.viewport_configured ? 'Yes' : 'No'}</p>
              </div>
              <div className="flex items-center mt-1">
                <div className={`w-3 h-3 rounded-full ${mockMobileData.uses_responsive_design ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <p className="text-sm">Responsive Design: {mockMobileData.uses_responsive_design ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Primary Issues</h3>
            <ul className="space-y-1">
              {mockMobileData.primary_issues.map((issue, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <XCircleIcon className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Mobile Page Speed</p>
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-900 mr-2">{mockMobileData.page_speed.mobile_score}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      mockMobileData.page_speed.mobile_score >= 80 ? 'bg-green-500' :
                      mockMobileData.page_speed.mobile_score >= 60 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} 
                    style={{ width: `${mockMobileData.page_speed.mobile_score}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Desktop Page Speed</p>
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-900 mr-2">{mockMobileData.page_speed.desktop_score}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      mockMobileData.page_speed.desktop_score >= 80 ? 'bg-green-500' :
                      mockMobileData.page_speed.desktop_score >= 60 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`} 
                    style={{ width: `${mockMobileData.page_speed.desktop_score}%` }}
                  ></div>
                </div>
              </div>
            </div>
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
              onClick={() => setCurrentTab('screenSizes')}
              className={`py-3 border-b-2 font-medium text-sm ${
                currentTab === 'screenSizes'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Screen Sizes
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
                  title="Page Speed Metrics"
                  initiallyExpanded={true}
                >
                  <div className="space-y-3 mt-2">
                    <div className="flex justify-between p-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">First Contentful Paint</span>
                      <span className={`text-sm font-medium ${
                        mockMobileData.page_speed.first_contentful_paint <= 2.5 ? 'text-green-600' : 
                        mockMobileData.page_speed.first_contentful_paint <= 4 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {mockMobileData.page_speed.first_contentful_paint}s
                      </span>
                    </div>
                    <div className="flex justify-between p-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Speed Index</span>
                      <span className={`text-sm font-medium ${
                        mockMobileData.page_speed.speed_index <= 3.4 ? 'text-green-600' : 
                        mockMobileData.page_speed.speed_index <= 5.8 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {mockMobileData.page_speed.speed_index}s
                      </span>
                    </div>
                    <div className="flex justify-between p-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Largest Contentful Paint</span>
                      <span className={`text-sm font-medium ${
                        mockMobileData.page_speed.largest_contentful_paint <= 2.5 ? 'text-green-600' : 
                        mockMobileData.page_speed.largest_contentful_paint <= 4 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {mockMobileData.page_speed.largest_contentful_paint}s
                      </span>
                    </div>
                    <div className="flex justify-between p-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Time to Interactive</span>
                      <span className={`text-sm font-medium ${
                        mockMobileData.page_speed.time_to_interactive <= 3.8 ? 'text-green-600' : 
                        mockMobileData.page_speed.time_to_interactive <= 7.3 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {mockMobileData.page_speed.time_to_interactive}s
                      </span>
                    </div>
                    <div className="flex justify-between p-2 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Total Blocking Time</span>
                      <span className={`text-sm font-medium ${
                        mockMobileData.page_speed.total_blocking_time <= 200 ? 'text-green-600' : 
                        mockMobileData.page_speed.total_blocking_time <= 600 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {mockMobileData.page_speed.total_blocking_time}ms
                      </span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span className="text-sm text-gray-700">Cumulative Layout Shift</span>
                      <span className={`text-sm font-medium ${
                        mockMobileData.page_speed.cumulative_layout_shift <= 0.1 ? 'text-green-600' : 
                        mockMobileData.page_speed.cumulative_layout_shift <= 0.25 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {mockMobileData.page_speed.cumulative_layout_shift}
                      </span>
                    </div>
                  </div>
                </CollapsibleSection>
                
                <CollapsibleSection
                  title="Mobile Usability"
                  initiallyExpanded={true}
                >
                  <div className="space-y-3 mt-2">
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Touch Targets Too Small</p>
                        <p className="text-xs text-gray-600">Mobile users may struggle to tap accurately on small buttons and links</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <XCircleIcon className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Text Too Small</p>
                        <p className="text-xs text-gray-600">Users need to zoom to read content, creating a poor experience</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">No Flash Content</p>
                        <p className="text-xs text-gray-600">Modern content that works on all mobile devices</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>
            )}

            {currentTab === 'screenSizes' && (
              <div>
                <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                  {mockMobileData.screen_sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedScreenSize(size.id)}
                      className={`flex-shrink-0 p-3 rounded-lg border ${
                        selectedScreenSize === size.id 
                          ? 'border-purple-300 bg-purple-50 text-purple-800' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <p className="text-sm font-medium">{size.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{size.width}×{size.height}</p>
                    </button>
                  ))}
                </div>

                {currentScreenSize && (
                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">{currentScreenSize.name} Issues</h3>
                        <span className="text-xs text-gray-500">{currentScreenSize.width}×{currentScreenSize.height}</span>
                      </div>
                      
                      <div className="relative border border-gray-300 rounded-lg overflow-hidden mb-4" style={{ maxWidth: '300px', margin: '0 auto' }}>
                        <div className="aspect-[9/16] bg-gradient-to-b from-purple-50 to-gray-50 flex items-center justify-center">
                          <div className="text-center p-4">
                            <DevicePhoneMobileIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Mobile preview would appear here</p>
                            <p className="text-xs text-gray-400 mt-1">Not available in demo</p>
                          </div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {currentScreenSize.issues.map((issue, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-700">
                            <XCircleIcon className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentTab === 'improvements' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recommended Improvements</h3>
                
                {mockMobileData.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{recommendation.title}</h4>
                      <div className="flex space-x-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          recommendation.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          recommendation.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {recommendation.difficulty}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          recommendation.impact === 'high' ? 'bg-blue-100 text-blue-800' :
                          recommendation.impact === 'medium' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {recommendation.impact} impact
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{recommendation.description}</p>
                  </div>
                ))}
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