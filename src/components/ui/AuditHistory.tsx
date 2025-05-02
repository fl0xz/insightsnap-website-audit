"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentChartBarIcon,
  LockClosedIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon
} from "@heroicons/react/24/outline";

interface AuditHistoryProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isLoading?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock audit history data
const mockAuditHistoryData = {
  audits: [
    {
      id: 1,
      date: "2023-06-12T14:35:00",
      scores: {
        seo: 76,
        performance: 82,
        accessibility: 69,
        bestPractices: 88
      },
      improvements: [
        "Fixed meta descriptions",
        "Optimized image sizes",
        "Added alt tags to images"
      ]
    },
    {
      id: 2,
      date: "2023-07-05T09:22:00",
      scores: {
        seo: 83,
        performance: 87,
        accessibility: 74,
        bestPractices: 90
      },
      improvements: [
        "Added schema markup",
        "Improved heading structure",
        "Fixed button contrast issues"
      ]
    },
    {
      id: 3,
      date: "2023-07-28T16:11:00",
      scores: {
        seo: 87,
        performance: 85,
        accessibility: 79,
        bestPractices: 92
      },
      improvements: [
        "Fixed broken links",
        "Added ARIA labels",
        "Optimized JavaScript loading"
      ]
    },
    {
      id: 4,
      date: "2023-08-15T11:48:00",
      scores: {
        seo: 92,
        performance: 89,
        accessibility: 85,
        bestPractices: 95
      },
      improvements: [
        "Implemented lazy loading",
        "Improved keyboard navigation",
        "Added structured data"
      ]
    }
  ],
  comparisons: [
    {
      categoryName: "SEO",
      firstAudit: 76,
      latestAudit: 92,
      improvement: "+16 points",
      improvementPercentage: 21
    },
    {
      categoryName: "Performance",
      firstAudit: 82,
      latestAudit: 89,
      improvement: "+7 points",
      improvementPercentage: 9
    },
    {
      categoryName: "Accessibility",
      firstAudit: 69,
      latestAudit: 85,
      improvement: "+16 points",
      improvementPercentage: 23
    },
    {
      categoryName: "Best Practices",
      firstAudit: 88,
      latestAudit: 95,
      improvement: "+7 points",
      improvementPercentage: 8
    }
  ]
};

export default function AuditHistory({
  websiteUrl = "example.com",
  isLocked = false,
  isLoading = false,
  isPremium = false,
  className = ""
}: AuditHistoryProps) {
  const [selectedAudits, setSelectedAudits] = useState<number[]>([1, 4]); // Default to first and last
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Toggle audit selection
  const toggleAuditSelection = (auditId: number) => {
    if (selectedAudits.includes(auditId)) {
      if (selectedAudits.length > 1) {
        setSelectedAudits(selectedAudits.filter(id => id !== auditId));
      }
    } else {
      if (selectedAudits.length < 2) {
        setSelectedAudits([...selectedAudits, auditId]);
      } else {
        setSelectedAudits([selectedAudits[1], auditId]);
      }
    }
  };
  
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
            <ClockIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Audit History</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock audit history with our Pro plan</p>
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
            <ClockIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Audit History for {websiteUrl}</h2>
          </div>
          
          <div className="text-center py-10">
            <ArrowPathIcon className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Audit History</h3>
            <p className="text-gray-600">
              We're retrieving your previous audit reports. This might take a moment...
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
            <ClockIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Audit History for {websiteUrl}</h2>
          </div>
        </div>

        {/* Past Audits List */}
        <div className="mb-8">
          <h3 className="text-md font-medium text-gray-900 mb-3">Previous Audits</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select any two audits to compare them and see your website's progress.
          </p>
          
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {mockAuditHistoryData.audits.map((audit) => (
              <div 
                key={audit.id} 
                className={`p-4 flex items-center justify-between cursor-pointer ${
                  selectedAudits.includes(audit.id) ? "bg-purple-50" : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => toggleAuditSelection(audit.id)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={selectedAudits.includes(audit.id)}
                    onChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Audit #{audit.id} - {formatDate(audit.date)}
                    </p>
                    <p className="text-xs text-gray-500">{formatTime(audit.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">SEO:</span>
                    <span className={`text-xs font-medium ${getScoreColor(audit.scores.seo)}`}>
                      {audit.scores.seo}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Perf:</span>
                    <span className={`text-xs font-medium ${getScoreColor(audit.scores.performance)}`}>
                      {audit.scores.performance}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">A11y:</span>
                    <span className={`text-xs font-medium ${getScoreColor(audit.scores.accessibility)}`}>
                      {audit.scores.accessibility}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">BP:</span>
                    <span className={`text-xs font-medium ${getScoreColor(audit.scores.bestPractices)}`}>
                      {audit.scores.bestPractices}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      // View full audit report action
                    }}
                  >
                    <DocumentChartBarIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Comparison Section */}
        {selectedAudits.length === 2 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-900">Comparison Analysis</h3>
              <span className="text-sm text-gray-600">
                Showing progress from {formatDate(mockAuditHistoryData.audits.find(a => a.id === selectedAudits[0])?.date || "")} to {formatDate(mockAuditHistoryData.audits.find(a => a.id === selectedAudits[1])?.date || "")}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Comparisons */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Score Improvements</h4>
                <div className="space-y-4">
                  {mockAuditHistoryData.comparisons.map((comparison, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-800">
                          {comparison.categoryName}
                        </span>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600">
                            {comparison.firstAudit}
                          </span>
                          <ChevronRightIcon className="h-3 w-3 text-gray-400 mx-1" />
                          <span className={`text-xs font-medium ${getScoreColor(comparison.latestAudit)}`}>
                            {comparison.latestAudit}
                          </span>
                          <span className="ml-1 text-xs text-green-600">
                            ({comparison.improvement})
                          </span>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                              {comparison.improvementPercentage}% improvement
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                          <div style={{ width: `${comparison.firstAudit}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"></div>
                          <div style={{ width: `${comparison.latestAudit - comparison.firstAudit}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Improvement Breakdown */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Key Improvements Made</h4>
                <div className="divide-y divide-gray-200">
                  {mockAuditHistoryData.audits.filter(a => a.id === selectedAudits[1]).map((audit) => (
                    <div key={audit.id} className="py-3 first:pt-0 last:pb-0">
                      <h5 className="text-xs font-medium text-gray-700 mb-2">
                        Improvements in Audit #{audit.id}
                      </h5>
                      <ul className="space-y-1">
                        {audit.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start">
                            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div className="pt-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-2">
                      Overall Progress
                    </h5>
                    <p className="text-sm text-gray-700">
                      Your website has shown significant improvement across all categories, with the greatest gains in Accessibility (+23%) and SEO (+21%).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Progress Over Time */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-900 mb-3">Progress Over Time</h3>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="h-64 flex items-center justify-center">
              <div className="w-full space-y-6">
                {/* SEO Score Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">SEO Score</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {mockAuditHistoryData.audits.map((audit, index) => (
                      <React.Fragment key={audit.id}>
                        <div className="flex flex-col items-center">
                          <div 
                            className={`${getScoreBg(audit.scores.seo)} ${getScoreColor(audit.scores.seo)} w-8 text-center py-1 rounded text-xs font-medium`}
                          >
                            {audit.scores.seo}
                          </div>
                          <span className="text-xs text-gray-500 mt-1">#{audit.id}</span>
                        </div>
                        {index < mockAuditHistoryData.audits.length - 1 && (
                          <div className="h-px bg-gray-300 flex-grow"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* Performance Score Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">Performance Score</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {mockAuditHistoryData.audits.map((audit, index) => (
                      <React.Fragment key={audit.id}>
                        <div className="flex flex-col items-center">
                          <div 
                            className={`${getScoreBg(audit.scores.performance)} ${getScoreColor(audit.scores.performance)} w-8 text-center py-1 rounded text-xs font-medium`}
                          >
                            {audit.scores.performance}
                          </div>
                          <span className="text-xs text-gray-500 mt-1">#{audit.id}</span>
                        </div>
                        {index < mockAuditHistoryData.audits.length - 1 && (
                          <div className="h-px bg-gray-300 flex-grow"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* Accessibility Score Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">Accessibility Score</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {mockAuditHistoryData.audits.map((audit, index) => (
                      <React.Fragment key={audit.id}>
                        <div className="flex flex-col items-center">
                          <div 
                            className={`${getScoreBg(audit.scores.accessibility)} ${getScoreColor(audit.scores.accessibility)} w-8 text-center py-1 rounded text-xs font-medium`}
                          >
                            {audit.scores.accessibility}
                          </div>
                          <span className="text-xs text-gray-500 mt-1">#{audit.id}</span>
                        </div>
                        {index < mockAuditHistoryData.audits.length - 1 && (
                          <div className="h-px bg-gray-300 flex-grow"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* Best Practices Score Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">Best Practices Score</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {mockAuditHistoryData.audits.map((audit, index) => (
                      <React.Fragment key={audit.id}>
                        <div className="flex flex-col items-center">
                          <div 
                            className={`${getScoreBg(audit.scores.bestPractices)} ${getScoreColor(audit.scores.bestPractices)} w-8 text-center py-1 rounded text-xs font-medium`}
                          >
                            {audit.scores.bestPractices}
                          </div>
                          <span className="text-xs text-gray-500 mt-1">#{audit.id}</span>
                        </div>
                        {index < mockAuditHistoryData.audits.length - 1 && (
                          <div className="h-px bg-gray-300 flex-grow"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
            Export History
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Run New Audit
          </motion.button>
        </div>
      </div>
    </div>
  );
} 