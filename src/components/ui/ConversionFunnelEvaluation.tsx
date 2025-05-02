"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChartBarIcon,
  LockClosedIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

interface ConversionFunnelEvaluationProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isLoading?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock funnel data
const mockFunnelData = {
  totalVisitors: 15243,
  conversionRate: 2.8,
  stages: [
    {
      id: 1,
      name: "Homepage Visit",
      visitors: 15243,
      dropOffRate: 37,
      dropOffReason: "No clear value proposition or call-to-action"
    },
    {
      id: 2,
      name: "Product/Service Page",
      visitors: 9603,
      dropOffRate: 48,
      dropOffReason: "Insufficient product information or benefits"
    },
    {
      id: 3,
      name: "Add to Cart / Sign Up Form",
      visitors: 4993,
      dropOffRate: 62,
      dropOffReason: "Form is too long or requires too much information"
    },
    {
      id: 4,
      name: "Checkout / Form Submission",
      visitors: 1897,
      dropOffRate: 71,
      dropOffReason: "Payment issues or concerns about security"
    },
    {
      id: 5,
      name: "Conversion / Thank You",
      visitors: 550,
      dropOffRate: 0,
      dropOffReason: ""
    }
  ],
  issues: [
    {
      id: 1,
      severity: "high",
      stage: 3,
      title: "High form abandonment rate",
      description: "62% of users abandon the sign-up form before completion",
      recommendation: "Reduce form fields to essential information only"
    },
    {
      id: 2,
      severity: "high",
      stage: 4,
      title: "Checkout abandonment",
      description: "71% of users leave during the checkout process",
      recommendation: "Implement guest checkout and simplify payment process"
    },
    {
      id: 3,
      severity: "medium",
      stage: 2,
      title: "High bounce rate on product pages",
      description: "48% of users leave product pages without taking action",
      recommendation: "Improve product descriptions and add social proof"
    },
    {
      id: 4,
      severity: "medium",
      stage: 1,
      title: "High homepage bounce rate",
      description: "37% of visitors leave without clicking through",
      recommendation: "Add clearer CTAs and value proposition above the fold"
    }
  ],
  benchmarks: {
    industry: "SaaS / Technology",
    averageConversionRate: 3.2,
    topPerformersRate: 5.8
  }
};

export default function ConversionFunnelEvaluation({
  websiteUrl = "example.com",
  isLocked = false,
  isLoading = false,
  isPremium = false,
  className = ""
}: ConversionFunnelEvaluationProps) {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  
  // Toggle stage expansion
  const toggleStage = (stageId: number) => {
    if (expandedStage === stageId) {
      setExpandedStage(null);
    } else {
      setExpandedStage(stageId);
    }
  };
  
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

  // Calculate stage conversion rate
  const getStageConversionRate = (currentStage: number, nextStage: number) => {
    if (nextStage === 0) return 100;
    return Math.round((nextStage / currentStage) * 100);
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel Evaluation</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock conversion funnel analysis with our Pro plan</p>
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
            <ChartBarIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel for {websiteUrl}</h2>
          </div>
          
          <div className="text-center py-10">
            <ArrowPathIcon className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Conversion Funnel</h3>
            <p className="text-gray-600">
              We're evaluating your conversion funnel stages. This might take a minute...
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
            <ChartBarIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel for {websiteUrl}</h2>
          </div>
        </div>

        {/* Conversion Overview */}
        <div className="mb-8">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Total Visitors</p>
                <p className="text-2xl font-semibold text-gray-900">{mockFunnelData.totalVisitors.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                <div className="flex items-center justify-center">
                  <p className={`text-2xl font-semibold ${
                    mockFunnelData.conversionRate > mockFunnelData.benchmarks.averageConversionRate
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {mockFunnelData.conversionRate}%
                  </p>
                  {mockFunnelData.conversionRate > mockFunnelData.benchmarks.averageConversionRate ? (
                    <ArrowUpIcon className="h-5 w-5 text-green-500 ml-2" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5 text-red-500 ml-2" />
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Industry Average</p>
                <p className="text-2xl font-semibold text-gray-900">{mockFunnelData.benchmarks.averageConversionRate}%</p>
              </div>
            </div>
          </div>
          
          {/* Industry Comparison */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Industry Benchmark</h3>
            <p className="text-sm text-blue-800 mb-3">
              Your conversion rate of {mockFunnelData.conversionRate}% is {
                mockFunnelData.conversionRate > mockFunnelData.benchmarks.averageConversionRate
                  ? "above"
                  : "below"
              } the {mockFunnelData.benchmarks.industry} industry average of {mockFunnelData.benchmarks.averageConversionRate}%.
              Top performers achieve {mockFunnelData.benchmarks.topPerformersRate}%.
            </p>
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-800">
                    Your Website
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                <div style={{ width: `${(mockFunnelData.conversionRate / mockFunnelData.benchmarks.topPerformersRate) * 100}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600">
                </div>
                <div style={{ width: `${(mockFunnelData.benchmarks.averageConversionRate / mockFunnelData.benchmarks.topPerformersRate) * 100 - (mockFunnelData.conversionRate / mockFunnelData.benchmarks.topPerformersRate) * 100}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400">
                </div>
              </div>
              <div className="flex text-xs text-blue-800 mt-1 justify-between">
                <span>0%</span>
                <span className="relative" style={{ left: `${(mockFunnelData.benchmarks.averageConversionRate / mockFunnelData.benchmarks.topPerformersRate) * 100 - 10}%` }}>
                  Industry Avg
                </span>
                <span>Top Performers ({mockFunnelData.benchmarks.topPerformersRate}%)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Funnel Visualization */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-4">Conversion Funnel</h3>
          
          <div className="space-y-1">
            {mockFunnelData.stages.map((stage, index) => {
              const nextStage = mockFunnelData.stages[index + 1];
              const conversionRate = nextStage 
                ? getStageConversionRate(stage.visitors, nextStage.visitors) 
                : 100;
              const stageWidth = `${Math.max((stage.visitors / mockFunnelData.totalVisitors) * 100, 5)}%`;
              const issuesForStage = mockFunnelData.issues.filter(issue => issue.stage === stage.id);
              
              return (
                <div key={stage.id} className="mb-6">
                  <div 
                    className={`cursor-pointer ${expandedStage === stage.id ? "mb-4" : ""}`}
                    onClick={() => toggleStage(stage.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-100 text-purple-800 text-xs mr-2">
                          {stage.id}
                        </span>
                        <h4 className="text-sm font-medium text-gray-900">{stage.name}</h4>
                        {issuesForStage.length > 0 && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            {issuesForStage.length} {issuesForStage.length === 1 ? 'issue' : 'issues'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">
                          {stage.visitors.toLocaleString()}
                        </span>
                        {stage.dropOffRate > 0 && (
                          <span className="text-xs text-red-600 mr-2">
                            -{stage.dropOffRate}%
                          </span>
                        )}
                        {expandedStage === stage.id ? (
                          <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-6 mb-1 overflow-hidden">
                      <div 
                        className="h-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-start pl-3" 
                        style={{ width: stageWidth }}
                      >
                        <span className="text-xs font-medium text-white truncate">
                          {Math.round((stage.visitors / mockFunnelData.totalVisitors) * 100)}%
                        </span>
                      </div>
                    </div>
                    
                    {nextStage && (
                      <div className="relative h-8">
                        <div className="absolute inset-x-0 flex justify-center">
                          <ArrowDownIcon className={`h-8 w-8 ${
                            conversionRate < 50 ? "text-red-400" : 
                            conversionRate < 70 ? "text-amber-400" : 
                            "text-green-400"
                          }`} />
                          <span className="absolute top-2 ml-7 text-xs font-medium">
                            {conversionRate}% continue
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {expandedStage === stage.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Stage Details</h5>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-gray-500">Visitors:</span>
                              <span className="ml-2 text-sm text-gray-900">{stage.visitors.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Percentage of Total:</span>
                              <span className="ml-2 text-sm text-gray-900">
                                {Math.round((stage.visitors / mockFunnelData.totalVisitors) * 100)}%
                              </span>
                            </div>
                            {nextStage && (
                              <div>
                                <span className="text-xs text-gray-500">Proceed to Next Stage:</span>
                                <span className="ml-2 text-sm text-gray-900">{conversionRate}%</span>
                              </div>
                            )}
                            {stage.dropOffRate > 0 && (
                              <div>
                                <span className="text-xs text-gray-500">Drop-off Rate:</span>
                                <span className="ml-2 text-sm text-red-600">{stage.dropOffRate}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          {stage.dropOffRate > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Primary Drop-off Reason</h5>
                              <div className="flex items-start">
                                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{stage.dropOffReason}</p>
                              </div>
                            </div>
                          )}
                          
                          {issuesForStage.length > 0 && (
                            <div className="mt-4">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">Issues</h5>
                              <ul className="space-y-2">
                                {issuesForStage.map(issue => (
                                  <li key={issue.id} className="flex items-start">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(issue.severity)} mr-2`}>
                                      {issue.severity}
                                    </span>
                                    <span className="text-sm text-gray-700">{issue.title}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Key Issues */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Key Conversion Issues</h3>
          
          <div className="space-y-4">
            {mockFunnelData.issues.map(issue => (
              <div key={issue.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <div className={`p-1.5 rounded-full ${getSeverityBadge(issue.severity).split(' ')[0]} mr-3 flex-shrink-0`}>
                    <ExclamationTriangleIcon className={`h-4 w-4 ${getSeverityColor(issue.severity)}`} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900 mr-2">{issue.title}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(issue.severity)}`}>
                        {issue.severity} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                    <div className="mt-2 bg-blue-50 p-2 rounded-md">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Recommendation: </span>
                        {issue.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Export Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Fix Conversion Issues
          </motion.button>
        </div>
      </div>
    </div>
  );
} 