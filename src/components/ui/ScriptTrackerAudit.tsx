"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  EyeIcon,
  ServerIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";

interface ScriptTrackerAuditProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock third-party scripts data
const mockScripts = [
  {
    id: 1,
    name: "Google Analytics",
    type: "analytics",
    domain: "google-analytics.com",
    size: 17.8, // KB
    impact: "medium",
    gdprRisk: "high",
    cookiesSet: 3,
    description: "Web analytics service that tracks and reports website traffic"
  },
  {
    id: 2,
    name: "Facebook Pixel",
    type: "marketing",
    domain: "facebook.net",
    size: 32.6, // KB
    impact: "high",
    gdprRisk: "high",
    cookiesSet: 4,
    description: "Analytics tool that allows you to measure the effectiveness of your advertising"
  },
  {
    id: 3,
    name: "HotJar",
    type: "analytics",
    domain: "hotjar.com",
    size: 23.2, // KB
    impact: "medium",
    gdprRisk: "medium",
    cookiesSet: 2,
    description: "Behavior analytics and user feedback service"
  },
  {
    id: 4,
    name: "Intercom",
    type: "communication",
    domain: "intercom.io",
    size: 56.1, // KB
    impact: "high",
    gdprRisk: "medium",
    cookiesSet: 5,
    description: "Customer messaging platform for web and mobile apps"
  },
  {
    id: 5,
    name: "Google Tag Manager",
    type: "tag_manager",
    domain: "googletagmanager.com",
    size: 41.3, // KB
    impact: "high",
    gdprRisk: "medium",
    cookiesSet: 1,
    description: "Tag management system that allows you to update tags and code snippets"
  },
  {
    id: 6,
    name: "Stripe.js",
    type: "payment",
    domain: "stripe.com",
    size: 14.9, // KB
    impact: "low",
    gdprRisk: "low",
    cookiesSet: 2,
    description: "Payment processing platform for online businesses"
  }
];

export default function ScriptTrackerAudit({
  websiteUrl = "example.com",
  isLocked = false,
  isPremium = false,
  className = ""
}: ScriptTrackerAuditProps) {
  const [expandedScript, setExpandedScript] = useState<number | null>(null);
  
  // Toggle script details
  const toggleScript = (id: number) => {
    if (expandedScript === id) {
      setExpandedScript(null);
    } else {
      setExpandedScript(id);
    }
  };

  // Calculate overall impact metrics
  const totalSize = mockScripts.reduce((acc, script) => acc + script.size, 0);
  const totalCookies = mockScripts.reduce((acc, script) => acc + script.cookiesSet, 0);
  const highRiskCount = mockScripts.filter(script => script.gdprRisk === "high").length;
  
  // Get impact indicator color
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case "low": return "text-green-500";
      case "medium": return "text-amber-500";
      case "high": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  // Get impact badge style
  const getImpactBadge = (impact: string) => {
    switch(impact) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get risk badge style
  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get type badge style
  const getTypeBadge = (type: string) => {
    switch(type) {
      case "analytics": return "bg-blue-100 text-blue-800";
      case "marketing": return "bg-purple-100 text-purple-800";
      case "communication": return "bg-indigo-100 text-indigo-800";
      case "payment": return "bg-green-100 text-green-800";
      case "tag_manager": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get type display name
  const getTypeDisplay = (type: string) => {
    switch(type) {
      case "analytics": return "Analytics";
      case "marketing": return "Marketing";
      case "communication": return "Communication";
      case "payment": return "Payment";
      case "tag_manager": return "Tag Manager";
      default: return type;
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Script Tracker Audit</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock script tracking with our Pro plan</p>
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

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Script Tracker for {websiteUrl}</h2>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Scripts Detected</p>
                <p className="text-2xl font-semibold text-gray-900">{mockScripts.length}</p>
              </div>
              <ServerIcon className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">High GDPR Risk</p>
                <p className="text-2xl font-semibold text-red-600">{highRiskCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-10 w-10 text-red-400" />
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Cookies Set</p>
                <p className="text-2xl font-semibold text-blue-600">{totalCookies}</p>
              </div>
              <EyeIcon className="h-10 w-10 text-blue-400" />
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Size</p>
                <p className="text-2xl font-semibold text-amber-600">{totalSize.toFixed(1)} KB</p>
              </div>
              <ClockIcon className="h-10 w-10 text-amber-400" />
            </div>
          </div>
        </div>

        {/* GDPR Risk Alert */}
        {highRiskCount > 0 && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">GDPR Compliance Risk Detected</h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>
                    We detected {highRiskCount} script{highRiskCount > 1 ? 's' : ''} with high GDPR compliance risk. These scripts may collect personal data without proper consent mechanisms.
                  </p>
                  <p className="mt-2">
                    <strong>Recommendation:</strong> Implement a proper consent management platform and ensure all high-risk scripts only load after explicit consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scripts List */}
        <div className="space-y-4 mb-6">
          <h3 className="text-md font-medium text-gray-900">Detected Third-Party Scripts</h3>
          
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {mockScripts.map((script) => (
              <div key={script.id} className="bg-white">
                {/* Script Header */}
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleScript(script.id)}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${getImpactBadge(script.impact).split(' ')[0]} mr-3`}>
                      {script.impact === "high" ? (
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                      ) : script.impact === "medium" ? (
                        <ClockIcon className="h-5 w-5 text-amber-500" />
                      ) : (
                        <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900 mr-2">{script.name}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeBadge(script.type)}`}>
                          {getTypeDisplay(script.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{script.domain}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getImpactColor(script.impact)}`}>
                        {script.impact.charAt(0).toUpperCase() + script.impact.slice(1)} Impact
                      </p>
                      <p className="text-xs text-gray-500">Size: {script.size} KB</p>
                    </div>
                    {expandedScript === script.id ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedScript === script.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Performance Impact</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactBadge(script.impact)}`}>
                              {script.impact.charAt(0).toUpperCase() + script.impact.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">GDPR Risk</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(script.gdprRisk)}`}>
                              {script.gdprRisk.charAt(0).toUpperCase() + script.gdprRisk.slice(1)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Cookies Set</p>
                            <p className="text-sm font-medium text-gray-900">{script.cookiesSet}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
                          <p className="text-sm text-gray-700">{script.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-medium text-gray-500">Recommendation</p>
                            <p className="text-sm text-gray-700">
                              {script.gdprRisk === "high" 
                                ? "Load this script only after user consent" 
                                : script.impact === "high"
                                ? "Consider lazy-loading or removing if not critical"
                                : "No action needed"}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-md font-medium text-blue-900 mb-2">Performance Recommendations</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Implement a consent management platform to handle GDPR compliance</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Delay loading of non-critical scripts until after page load</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Consider consolidating analytics tools to reduce script overhead</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
              <span>Use Google Tag Manager to better control script loading behavior</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Check circle icon component
function CheckCircleIcon({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
} 