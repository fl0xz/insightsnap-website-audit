"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

interface AuditComparisonProps {
  websiteUrl?: string;
  isLocked?: boolean;
  className?: string;
}

// Mock comparison data
const mockComparisonData = {
  firstAudit: {
    date: "June 15, 2023",
    scores: {
      seo: 64,
      performance: 73,
      accessibility: 61,
      bestPractices: 77
    }
  },
  latestAudit: {
    date: "August 22, 2023",
    scores: {
      seo: 91,
      performance: 88,
      accessibility: 84,
      bestPractices: 93
    }
  },
  improvements: {
    pageLoadTime: {
      before: "4.8s",
      after: "1.9s",
      change: "-60%"
    },
    interactiveTime: {
      before: "7.2s",
      after: "3.1s",
      change: "-57%"
    },
    seoIssues: {
      before: 48,
      after: 7,
      change: "-85%"
    },
    accessibilityIssues: {
      before: 32,
      after: 4,
      change: "-88%"
    }
  },
  keyChanges: [
    {
      category: "SEO",
      changes: [
        "Added proper meta descriptions on all pages",
        "Fixed 27 broken links",
        "Implemented schema markup for rich snippets",
        "Optimized heading structure (H1, H2, etc.)",
        "Fixed canonical tags on duplicate content"
      ]
    },
    {
      category: "Performance",
      changes: [
        "Optimized image sizes and formats (WebP)",
        "Implemented browser caching",
        "Minified CSS and JavaScript files",
        "Removed render-blocking resources",
        "Added lazy loading for below-fold images"
      ]
    },
    {
      category: "Accessibility",
      changes: [
        "Added alt text to all images",
        "Fixed color contrast issues on text elements",
        "Improved keyboard navigation",
        "Added ARIA labels to interactive elements",
        "Fixed form field labeling issues"
      ]
    }
  ],
  results: [
    {
      metric: "Organic Traffic",
      before: "3,241",
      after: "8,765",
      change: "+170%",
      timeFrame: "90 days after changes"
    },
    {
      metric: "Conversion Rate",
      before: "1.8%",
      after: "3.2%",
      change: "+78%",
      timeFrame: "60 days after changes"
    },
    {
      metric: "Bounce Rate",
      before: "62%",
      after: "38%",
      change: "-39%",
      timeFrame: "30 days after changes"
    }
  ]
};

export default function AuditComparison({
  websiteUrl = "example.com",
  isLocked = false,
  className = ""
}: AuditComparisonProps) {
  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };
  
  // Get score background
  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 70) return "bg-amber-100";
    return "bg-red-100";
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Audit Comparison</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock audit comparisons with our Pro plan</p>
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
            <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Before & After: {websiteUrl}
            </h2>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Improvements from:</span> {mockComparisonData.firstAudit.date} to {mockComparisonData.latestAudit.date}
          </div>
        </div>

        {/* Score Comparison */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-4">Audit Score Improvements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* SEO Score */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">SEO Score</h4>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.firstAudit.scores.seo)} ${getScoreColor(mockComparisonData.firstAudit.scores.seo)}`}>
                    {mockComparisonData.firstAudit.scores.seo}
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.latestAudit.scores.seo)} ${getScoreColor(mockComparisonData.latestAudit.scores.seo)}`}>
                    {mockComparisonData.latestAudit.scores.seo}
                  </div>
                </div>
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +{mockComparisonData.latestAudit.scores.seo - mockComparisonData.firstAudit.scores.seo} pts
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-l-full" style={{ width: `${mockComparisonData.firstAudit.scores.seo}%` }}></div>
                <div className="bg-green-500 h-2 rounded-r-full" style={{ width: `${mockComparisonData.latestAudit.scores.seo - mockComparisonData.firstAudit.scores.seo}%`, marginLeft: `${mockComparisonData.firstAudit.scores.seo}%` }}></div>
              </div>
            </div>
            
            {/* Performance Score */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">Performance</h4>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.firstAudit.scores.performance)} ${getScoreColor(mockComparisonData.firstAudit.scores.performance)}`}>
                    {mockComparisonData.firstAudit.scores.performance}
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.latestAudit.scores.performance)} ${getScoreColor(mockComparisonData.latestAudit.scores.performance)}`}>
                    {mockComparisonData.latestAudit.scores.performance}
                  </div>
                </div>
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +{mockComparisonData.latestAudit.scores.performance - mockComparisonData.firstAudit.scores.performance} pts
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-l-full" style={{ width: `${mockComparisonData.firstAudit.scores.performance}%` }}></div>
                <div className="bg-green-500 h-2 rounded-r-full" style={{ width: `${mockComparisonData.latestAudit.scores.performance - mockComparisonData.firstAudit.scores.performance}%`, marginLeft: `${mockComparisonData.firstAudit.scores.performance}%` }}></div>
              </div>
            </div>
            
            {/* Accessibility Score */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">Accessibility</h4>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.firstAudit.scores.accessibility)} ${getScoreColor(mockComparisonData.firstAudit.scores.accessibility)}`}>
                    {mockComparisonData.firstAudit.scores.accessibility}
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.latestAudit.scores.accessibility)} ${getScoreColor(mockComparisonData.latestAudit.scores.accessibility)}`}>
                    {mockComparisonData.latestAudit.scores.accessibility}
                  </div>
                </div>
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +{mockComparisonData.latestAudit.scores.accessibility - mockComparisonData.firstAudit.scores.accessibility} pts
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-l-full" style={{ width: `${mockComparisonData.firstAudit.scores.accessibility}%` }}></div>
                <div className="bg-green-500 h-2 rounded-r-full" style={{ width: `${mockComparisonData.latestAudit.scores.accessibility - mockComparisonData.firstAudit.scores.accessibility}%`, marginLeft: `${mockComparisonData.firstAudit.scores.accessibility}%` }}></div>
              </div>
            </div>
            
            {/* Best Practices Score */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-700">Best Practices</h4>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.firstAudit.scores.bestPractices)} ${getScoreColor(mockComparisonData.firstAudit.scores.bestPractices)}`}>
                    {mockComparisonData.firstAudit.scores.bestPractices}
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getScoreBg(mockComparisonData.latestAudit.scores.bestPractices)} ${getScoreColor(mockComparisonData.latestAudit.scores.bestPractices)}`}>
                    {mockComparisonData.latestAudit.scores.bestPractices}
                  </div>
                </div>
                <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +{mockComparisonData.latestAudit.scores.bestPractices - mockComparisonData.firstAudit.scores.bestPractices} pts
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-l-full" style={{ width: `${mockComparisonData.firstAudit.scores.bestPractices}%` }}></div>
                <div className="bg-green-500 h-2 rounded-r-full" style={{ width: `${mockComparisonData.latestAudit.scores.bestPractices - mockComparisonData.firstAudit.scores.bestPractices}%`, marginLeft: `${mockComparisonData.firstAudit.scores.bestPractices}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Metrics Comparison */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-4">Key Metrics Improvement</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Page Load Time</h4>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-gray-900">{mockComparisonData.improvements.pageLoadTime.after}</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpIcon className="h-4 w-4 mr-1 transform rotate-180" />
                  {mockComparisonData.improvements.pageLoadTime.change}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Was: {mockComparisonData.improvements.pageLoadTime.before}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Time to Interactive</h4>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-gray-900">{mockComparisonData.improvements.interactiveTime.after}</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpIcon className="h-4 w-4 mr-1 transform rotate-180" />
                  {mockComparisonData.improvements.interactiveTime.change}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Was: {mockComparisonData.improvements.interactiveTime.before}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">SEO Issues</h4>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-gray-900">{mockComparisonData.improvements.seoIssues.after}</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpIcon className="h-4 w-4 mr-1 transform rotate-180" />
                  {mockComparisonData.improvements.seoIssues.change}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Was: {mockComparisonData.improvements.seoIssues.before}</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Accessibility Issues</h4>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-gray-900">{mockComparisonData.improvements.accessibilityIssues.after}</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUpIcon className="h-4 w-4 mr-1 transform rotate-180" />
                  {mockComparisonData.improvements.accessibilityIssues.change}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Was: {mockComparisonData.improvements.accessibilityIssues.before}</div>
            </div>
          </div>
        </div>
        
        {/* Key Changes */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-4">Key Changes Implemented</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockComparisonData.keyChanges.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-base font-medium text-gray-900 mb-3">{category.category} Improvements</h4>
                <ul className="space-y-2">
                  {category.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Business Results */}
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-md font-medium text-gray-900">Business Results</h3>
            <span className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
              After Implementing Changes
            </span>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockComparisonData.results.map((result, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">{result.metric}</h4>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-bold text-gray-900 mr-2">{result.after}</div>
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                      {result.change}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Was: {result.before}</span>
                    <span className="text-purple-600 font-medium">{result.timeFrame}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-purple-800 text-sm">
                These improvements resulted in an estimated <span className="font-bold">$154,300</span> additional annual revenue based on conversion increases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 