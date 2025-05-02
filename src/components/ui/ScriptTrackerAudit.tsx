"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { CodeBracketIcon, ShieldExclamationIcon, ArrowPathIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import CollapsibleSection from "./CollapsibleSection";

interface ScriptTrackerAuditProps {
  websiteUrl?: string;
  isLoading?: boolean;
  isLocked?: boolean;
  className?: string;
}

/**
 * ScriptTrackerAudit - Analyzes third-party scripts and trackers
 * 
 * For premium users, identifies performance impact of scripts,
 * privacy concerns, and GDPR risks.
 */
export default function ScriptTrackerAudit({
  websiteUrl = "example.com",
  isLoading = false,
  isLocked = false,
  className = "",
}: ScriptTrackerAuditProps) {
  const [expandedScript, setExpandedScript] = useState<string | null>(null);

  // Mock script and tracker data
  const mockTrackerData = {
    total_scripts: 18,
    blocking_scripts: 7,
    total_size: 1.84, // MB
    load_time_impact: 2.3, // seconds
    gdpr_risk_level: "high",
    privacy_risk_level: "medium",
    gdpr_risk_reason: "Multiple trackers storing personal data without explicit consent mechanisms",
    scripts: [
      {
        id: "script-1",
        name: "Google Analytics",
        type: "Analytics",
        size: 43.2, // KB
        load_time: 0.32, // seconds
        impact: "Medium",
        blocking: true,
        cookies: 4,
        personal_data: true,
        gdpr_compliant: false,
        recommendation: "Switch to Google Analytics 4 with properly configured consent or consider a privacy-focused alternative like Plausible or Fathom"
      },
      {
        id: "script-2",
        name: "Facebook Pixel",
        type: "Marketing",
        size: 128.7, // KB
        load_time: 0.52, // seconds
        impact: "High",
        blocking: true,
        cookies: 7,
        personal_data: true,
        gdpr_compliant: false,
        recommendation: "Implement proper cookie consent and load only after explicit user permission"
      },
      {
        id: "script-3",
        name: "Hotjar",
        type: "Analytics",
        size: 67.5, // KB
        load_time: 0.58, // seconds
        impact: "High",
        blocking: true,
        cookies: 3,
        personal_data: true,
        gdpr_compliant: false,
        recommendation: "Implement delayed loading and proper anonymization settings"
      },
      {
        id: "script-4",
        name: "Custom Font Loader",
        type: "Functionality",
        size: 84.3, // KB
        load_time: 0.74, // seconds
        impact: "High",
        blocking: true,
        cookies: 0,
        personal_data: false,
        gdpr_compliant: true,
        recommendation: "Load fonts using the font-display: swap CSS property and consider system fonts"
      },
      {
        id: "script-5",
        name: "HubSpot Tracking",
        type: "Marketing",
        size: 156.2, // KB
        load_time: 0.88, // seconds
        impact: "High",
        blocking: true,
        cookies: 12,
        personal_data: true,
        gdpr_compliant: false,
        recommendation: "Implement proper consent mechanism and load conditionally"
      },
      {
        id: "script-6",
        name: "jQuery",
        type: "Framework",
        size: 94.6, // KB
        load_time: 0.21, // seconds
        impact: "Medium",
        blocking: true,
        cookies: 0,
        personal_data: false,
        gdpr_compliant: true,
        recommendation: "Consider if jQuery is necessary or if modern JavaScript could be used instead"
      },
      {
        id: "script-7",
        name: "Twitter Widget",
        type: "Social",
        size: 75.8, // KB
        load_time: 0.48, // seconds
        impact: "Medium",
        blocking: false,
        cookies: 3,
        personal_data: true,
        gdpr_compliant: false,
        recommendation: "Load only after user interaction or consent"
      }
    ]
  };

  // Sort scripts by impact/size
  const sortedScripts = [...mockTrackerData.scripts].sort((a, b) => {
    if (a.impact === "High" && b.impact !== "High") return -1;
    if (a.impact !== "High" && b.impact === "High") return 1;
    return b.size - a.size;
  });

  // Toggle script details expansion
  const toggleScriptExpansion = (scriptId: string) => {
    if (expandedScript === scriptId) {
      setExpandedScript(null);
    } else {
      setExpandedScript(scriptId);
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <CodeBracketIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Script & Tracker Audit</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock script & tracker analysis with our Pro plan</p>
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
            <CodeBracketIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Script & Tracker Audit</h2>
          </div>
          
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <ArrowPathIcon className="w-10 h-10 text-purple-500" />
            </motion.div>
            <p className="text-gray-600">Scanning for scripts and trackers...</p>
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
            <CodeBracketIcon className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Script & Tracker Audit</h2>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Scripts</p>
            <p className="text-2xl font-semibold text-gray-900">{mockTrackerData.total_scripts}</p>
            <p className="text-xs text-red-600 mt-1">
              {mockTrackerData.blocking_scripts} blocking render
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Total Size</p>
            <p className="text-2xl font-semibold text-gray-900">{mockTrackerData.total_size.toFixed(2)} MB</p>
            <p className="text-xs text-amber-600 mt-1">
              Above recommended limit
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Load Impact</p>
            <p className="text-2xl font-semibold text-gray-900">+{mockTrackerData.load_time_impact.toFixed(1)}s</p>
            <p className="text-xs text-red-600 mt-1">
              Significantly slowing page
            </p>
          </div>
        </div>

        {/* GDPR Warning */}
        {(mockTrackerData.gdpr_risk_level === "high" || mockTrackerData.gdpr_risk_level === "medium") && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
            <ShieldExclamationIcon className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800">GDPR Compliance Risk: {mockTrackerData.gdpr_risk_level}</h3>
              <p className="text-sm text-red-700 mt-1">{mockTrackerData.gdpr_risk_reason}</p>
            </div>
          </div>
        )}

        {/* Scripts List */}
        <CollapsibleSection
          title="Third-Party Scripts"
          initiallyExpanded={true}
          className="mb-6"
        >
          <div className="space-y-3 mt-2">
            {sortedScripts.map((script) => (
              <div key={script.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Script Header */}
                <div 
                  className={`p-3 flex justify-between items-center cursor-pointer ${
                    script.impact === "High" ? 'bg-red-50' : 
                    script.impact === "Medium" ? 'bg-amber-50' : 
                    'bg-blue-50'
                  }`}
                  onClick={() => toggleScriptExpansion(script.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      script.impact === "High" ? 'bg-red-500' : 
                      script.impact === "Medium" ? 'bg-amber-500' : 
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{script.name}</h4>
                      <p className="text-xs text-gray-600">{script.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-3">
                      <p className="text-sm font-medium text-gray-900">{script.size.toFixed(1)} KB</p>
                      <p className="text-xs text-gray-600">{script.load_time.toFixed(2)}s load time</p>
                    </div>
                    {expandedScript === script.id ? (
                      <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
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
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-white border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Render Blocking</p>
                            <p className={`text-sm font-medium ${script.blocking ? 'text-red-600' : 'text-green-600'}`}>
                              {script.blocking ? 'Yes' : 'No'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Cookies Set</p>
                            <p className="text-sm font-medium text-gray-900">{script.cookies}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">GDPR Compliant</p>
                            <p className={`text-sm font-medium ${script.gdpr_compliant ? 'text-green-600' : 'text-red-600'}`}>
                              {script.gdpr_compliant ? 'Yes' : 'No'}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Recommendation</p>
                          <p className="text-sm text-gray-700">{script.recommendation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Recommendation Summary */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Key Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <ArrowPathIcon className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Implement proper cookie consent mechanism before loading analytics and marketing trackers</span>
            </li>
            <li className="flex items-start">
              <ArrowPathIcon className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Remove render-blocking scripts by using the defer or async attributes</span>
            </li>
            <li className="flex items-start">
              <ArrowPathIcon className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Consider consolidating analytics tools to reduce script load</span>
            </li>
            <li className="flex items-start">
              <ArrowPathIcon className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Update privacy policy to clearly disclose all data collection</span>
            </li>
          </ul>
        </div>
        
        {/* Action Button */}
        <div className="flex justify-end">
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