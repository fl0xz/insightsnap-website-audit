"use client";

import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "@/components/PDFReport/PDFReport";
import UpsellSection from "./UpsellSection";
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  ShieldExclamationIcon, 
  ClockIcon, 
  TagIcon, 
  LightBulbIcon,
  UserGroupIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid';
import ScoreIndicator from "@/components/ui/ScoreIndicator";
import OverallHealthScore from "./OverallHealthScore";
import MobileOptimization from "./MobileOptimization";
import BestPractices from "./BestPractices";
import styles from './AuditResults.module.css';

// Import new deep-dive components
import LandingPageClarity from "./LandingPageClarity";
import ConversionFunnelReadability from "./ConversionFunnelReadability";
import HeatmapAttentionPrediction from "./HeatmapAttentionPrediction";
import ScriptTrackingAudit from "./ScriptTrackingAudit";
import FormAccessibilityCheck from "./FormAccessibilityCheck";
import WeeklyHealthTracking from "./WeeklyHealthTracking";
import AuditScoreComparison from "./AuditScoreComparison";

// User authentication types
type UserPlan = 'free' | 'pro' | 'agency' | null;

interface AuditResultsProps {
  results: any;
  isAuthenticated?: boolean;
  userPlan?: UserPlan;
}

const AuditResults: React.FC<AuditResultsProps> = ({ 
  results, 
  isAuthenticated = false, 
  userPlan = null 
}) => {
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{
    performance: boolean;
    seo: boolean;
    accessibility: boolean;
    security: boolean;
  }>({
    performance: false,
    seo: false,
    accessibility: false,
    security: false,
  });
  
  // Mock data for demo
  const mockScores = {
    performance: 85,
    seo: 92,
    accessibility: 78,
    security: 88
  };
  
  // Mock page speed data
  const pageSpeed = 1.2; // seconds
  
  const speedClassification = {
    text: pageSpeed < 1 ? "Very Fast" : pageSpeed < 2 ? "Fast" : pageSpeed < 3 ? "Average" : "Slow",
    color: pageSpeed < 1 ? "text-green-600" : pageSpeed < 2 ? "text-green-500" : pageSpeed < 3 ? "text-yellow-500" : "text-red-500",
  };
  
  const getScoreColorClass = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Mock data for expandable sections
  const getPerformanceMetrics = () => [
    { name: "First Contentful Paint", value: "0.8s" },
    { name: "Time to Interactive", value: "1.5s" },
    { name: "Speed Index", value: "1.2s" },
    { name: "Total Blocking Time", value: "120ms" }
  ];
  
  const getAccessibilityIssues = () => [
    { name: "Missing alt text", count: 3 },
    { name: "Low contrast text", count: 2 }
  ];
  
  const performanceOptimizations = [
    { title: "Optimize Images", impact: "High", description: "Properly format and compress images to reduce page load time." },
    { title: "Reduce JavaScript", impact: "Medium", description: "Minimize and defer non-critical JavaScript to improve page load performance." },
    { title: "Use Browser Caching", impact: "Medium", description: "Leverage browser caching to speed up repeat visits." }
  ];
  
  const seoOptimizations = [
    { title: "Improve Meta Description", impact: "Medium", description: "Add a clear, compelling meta description to improve click-through rates." },
    { title: "Fix Broken Links", impact: "High", description: "Repair broken links to improve user experience and SEO ranking." },
    { title: "Optimize Header Structure", impact: "Medium", description: "Use proper header hierarchy (H1, H2, etc.) for better content structure." }
  ];

  // Toggle expandable sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  
  // Helper function for PDF download
  const renderPDFDownloadLink = () => {
    if (!canDownloadPDF) return null;
    
    return (
      <PDFDownloadLink
        document={<PDFReport results={results} userPlan={userPlan} />}
        fileName={`website-audit-${results.url.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`}
        className="py-2 px-4 bg-[#5D3FD3] hover:bg-[#4c34a9] text-white font-medium rounded-lg transition-colors flex items-center"
      >
        {({ loading, error }) => {
          if (error) {
            setPdfError(error.message);
            return null;
          }
          
          return (
            <>
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Download PDF Report
            </>
          );
        }}
      </PDFDownloadLink>
    );
  };
  
  // Determine what features are available based on user plan
  const canDownloadPDF = userPlan === 'pro' || userPlan === 'agency';
  const canAccessAIFixes = userPlan === 'pro' || userPlan === 'agency';
  const canSeeFullReport = isAuthenticated;
  
  console.log("Authentication status:", isAuthenticated); // Debug
  
  return (
    <div className="space-y-8 relative">
      {/* Main content - will be blurred for non-authenticated users */}
      <div className={`${!isAuthenticated ? 'relative backdrop-blur-sm opacity-40 pointer-events-none' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-xl shadow-card">
          <div>
            <h2 className="text-2xl font-bold text-brand-text">Audit Results</h2>
            <p className="text-gray-600">
              {results.url}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => window.location.reload()} 
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              New Audit
            </button>
            {isAuthenticated && renderPDFDownloadLink()}
            {isAuthenticated && userPlan === 'free' && (
              <div className="text-sm text-gray-500">
                <span className="inline-flex items-center">
                  <LockClosedIcon className="h-3 w-3 mr-1" />
                  Upgrade to Pro for PDF exports
                </span>
              </div>
            )}
          </div>
        </div>

        {pdfError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6">
            Error generating PDF: {pdfError}
          </div>
        )}
        
        {/* Overall Health Score is always visible but will be blurred */}
        <OverallHealthScore 
          performanceScore={mockScores.performance}
          seoScore={mockScores.seo}
          accessibilityScore={mockScores.accessibility}
          securityScore={mockScores.security}
        />
        
        {/* Main Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Performance Score */}
          <div className="gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <ChartBarIcon className={styles.icon + " text-brand-primary"} />
                Performance
              </h3>
              <ScoreIndicator score={mockScores.performance} size="sm" />
            </div>
            
            {/* Basic info visible but blurred for non-authenticated */}
            <div className="flex items-center text-sm mb-3">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>Page loads in <span className="font-medium">{pageSpeed.toFixed(2)}s</span> - </span>
              <span className={`font-medium ${speedClassification.color} ml-1`}>{speedClassification.text}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {mockScores.performance >= 80 
                ? "Your page loads quickly, providing a good user experience." 
                : mockScores.performance >= 60 
                  ? "Your page load time needs improvement for better user experience." 
                  : "Your page loads too slowly, which may cause visitors to leave."}
            </p>
            
            {isAuthenticated && (
              <button 
                onClick={() => toggleSection('performance')}
                className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
              >
                {expandedSections.performance ? (
                  <>
                    <span>Show less</span>
                    <ChevronUpIcon className={styles.smallIcon} />
                  </>
                ) : (
                  <>
                    <span>Show details</span>
                    <ChevronDownIcon className={styles.smallIcon + " ml-1"} />
                  </>
                )}
              </button>
            )}
            
            {isAuthenticated && expandedSections.performance && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2 text-sm">Key Metrics:</h4>
                <ul className="space-y-2">
                  {getPerformanceMetrics().map((metric, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{metric.name}:</span>
                      <span className="font-medium">{metric.value}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-medium mb-2 mt-4 text-sm">Optimization Opportunities:</h4>
                <div className="space-y-3">
                  {performanceOptimizations.slice(0, 3).map((opt, i) => (
                    <div key={i} className="bg-gray-50 p-2 rounded text-sm border-l-4 border-brand-primary">
                      <div className="font-medium flex items-center">
                        <LightBulbIcon className="w-4 h-4 mr-1 text-yellow-500" />
                        {opt.title}
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded ${
                          opt.impact === 'High' ? 'bg-red-100 text-red-800' : 
                          opt.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {opt.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{opt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* SEO Score */}
          <div className="gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <MagnifyingGlassIcon className={styles.icon + " text-brand-primary"} />
                SEO
              </h3>
              <ScoreIndicator score={mockScores.seo} size="sm" />
            </div>
            
            <div className="flex items-center text-sm mb-3">
              <TagIcon className="w-4 h-4 mr-1" />
              <span>
                {mockScores.seo >= 80 
                  ? "Strong SEO foundation" 
                  : mockScores.seo >= 60 
                    ? "Moderate SEO performance" 
                    : "Poor SEO implementation"}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {mockScores.seo >= 80
                ? "Your website follows SEO best practices, which helps search visibility."
                : mockScores.seo >= 60
                  ? "Improving your SEO will help search engines better understand your content."
                  : "Your site needs significant SEO improvements to rank better in search results."}
            </p>
            
            {isAuthenticated && (
              <button 
                onClick={() => toggleSection('seo')}
                className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
              >
                {expandedSections.seo ? (
                  <>
                    <span>Show less</span>
                    <ChevronUpIcon className={styles.smallIcon} />
                  </>
                ) : (
                  <>
                    <span>Show details</span>
                    <ChevronDownIcon className={styles.smallIcon + " ml-1"} />
                  </>
                )}
              </button>
            )}
            
            {isAuthenticated && expandedSections.seo && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2 text-sm">SEO Optimization Opportunities:</h4>
                <div className="space-y-3">
                  {seoOptimizations.slice(0, 3).map((opt, i) => (
                    <div key={i} className="bg-gray-50 p-2 rounded text-sm border-l-4 border-brand-primary">
                      <div className="font-medium flex items-center">
                        <LightBulbIcon className="w-4 h-4 mr-1 text-yellow-500" />
                        {opt.title}
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded ${
                          opt.impact === 'High' ? 'bg-red-100 text-red-800' : 
                          opt.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {opt.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{opt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Accessibility Score */}
          <div className="gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <UserGroupIcon className={styles.icon + " text-brand-primary"} />
                Accessibility
              </h3>
              <ScoreIndicator score={mockScores.accessibility} size="sm" />
            </div>
            
            <div className="text-sm mb-3">
              <span className="font-medium">
                {getAccessibilityIssues().length === 0 
                  ? "No accessibility issues detected" 
                  : `${getAccessibilityIssues().length} issues found`}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              {mockScores.accessibility >= 80
                ? "Your website is accessible to users with disabilities."
                : mockScores.accessibility >= 60
                  ? "Your site has some accessibility issues that should be addressed."
                  : "Your site has significant accessibility problems that need fixing."}
            </p>
            
            {isAuthenticated && (
              <button 
                onClick={() => toggleSection('accessibility')}
                className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
              >
                {expandedSections.accessibility ? (
                  <>
                    <span>Show less</span>
                    <ChevronUpIcon className={styles.smallIcon} />
                  </>
                ) : (
                  <>
                    <span>Show details</span>
                    <ChevronDownIcon className={styles.smallIcon + " ml-1"} />
                  </>
                )}
              </button>
            )}
            
            {isAuthenticated && expandedSections.accessibility && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                {/* Rest of accessibility expandable content */}
              </div>
            )}
          </div>
          
          {/* Security */}
          <div className="gradient-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <ShieldCheckIcon className={styles.icon + " text-brand-primary"} />
                Security
              </h3>
              <ScoreIndicator score={mockScores.security} size="sm" />
            </div>
            
            <div className="text-sm mb-3">
              <span className={`font-medium ${results.security?.isSecure ? "text-green-600" : "text-red-600"}`}>
                {results.security?.isSecure ? "Secure Connection" : "Security Issues Detected"}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {mockScores.security >= 80
                ? "Your website implements good security practices to protect data and users."
                : mockScores.security >= 60
                  ? "Your website has some security vulnerabilities that should be addressed."
                  : "Your website has critical security vulnerabilities that need fixing immediately."}
            </p>
            
            {isAuthenticated && (
              <button 
                onClick={() => toggleSection('security')}
                className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
              >
                {expandedSections.security ? (
                  <>
                    <span>Show less</span>
                    <ChevronUpIcon className={styles.smallIcon} />
                  </>
                ) : (
                  <>
                    <span>Show details</span>
                    <ChevronDownIcon className={styles.smallIcon + " ml-1"} />
                  </>
                )}
              </button>
            )}
            
            {isAuthenticated && expandedSections.security && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                {/* Rest of security expandable content */}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Optimization - show only if authenticated */}
        {isAuthenticated && <MobileOptimization results={results} />}
        
        {/* Best Practices - show only if authenticated */}
        {isAuthenticated && <BestPractices results={results} />}
        
        {/* Upsell Section - show only if authenticated */}
        {isAuthenticated && <UpsellSection />}
        
        {/* Advanced analytics sections - only displayed if authenticated */}
        {isAuthenticated && (
          <div className="space-y-8 mt-10">
            <div className="border-b border-gray-200 pb-2 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Advanced Analytics</h2>
              <p className="text-gray-600 text-sm">Deeper insights into your website's effectiveness</p>
            </div>
            
            <LandingPageClarity results={results} />
            <ConversionFunnelReadability results={results} />
            <HeatmapAttentionPrediction results={results} />
            <ScriptTrackingAudit results={results} />
            <FormAccessibilityCheck results={results} />
            
            <div className="border-b border-gray-200 pb-2 mb-6 mt-10">
              <h2 className="text-xl font-bold text-gray-900">Tracking & Progress</h2>
              <p className="text-gray-600 text-sm">Monitor your improvements over time</p>
            </div>
            
            <WeeklyHealthTracking 
              results={results} 
              isAuthenticated={isAuthenticated} 
              userPlan={userPlan} 
            />
            <AuditScoreComparison 
              results={results} 
              isAuthenticated={isAuthenticated} 
              userPlan={userPlan} 
            />
          </div>
        )}
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.reload()} 
            className="py-2.5 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Audit Another Website
          </button>
        </div>
      </div>
      
      {/* Overlay for non-authenticated users */}
      {!isAuthenticated && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-lg bg-white p-8 shadow-xl rounded-2xl text-center">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-[#5D3FD3]/10 rounded-full">
              <LockClosedIcon className="h-8 w-8 text-[#5D3FD3]" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Unlock full report details
            </h2>
            
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create a free account to view AI fixes and full audit details.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <a 
                href="/signup" 
                className="py-3 px-6 bg-[#5D3FD3] hover:bg-[#4c34a9] text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center"
              >
                Create Free Account
              </a>
              <a 
                href="/pricing" 
                className="py-3 px-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors inline-flex items-center justify-center"
              >
                View Plans
              </a>
            </div>
            
            <p className="text-sm text-gray-500">
              Already have an account? <a href="/login" className="text-[#5D3FD3] font-medium">Log in</a> to see full report.
            </p>
          </div>
        </div>
      )}
      
      {/* Free plan limitations banner */}
      {isAuthenticated && userPlan === 'free' && (
        <div className="mt-6 bg-[#5D3FD3]/5 border border-[#5D3FD3]/20 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            <span className="font-medium">You're on the Free plan.</span> 
            {' '}Upgrade to Pro to download PDF reports, get AI-powered fix suggestions, and more.
            <a href="/pricing" className="ml-2 text-[#5D3FD3] font-medium hover:underline">View Plans</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuditResults; 