import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "@/components/PDFReport/PDFReport";
import { ChevronDownIcon, ChevronUpIcon, ExclamationTriangleIcon, CheckCircleIcon, ShieldCheckIcon, ShieldExclamationIcon, ClockIcon, TagIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import ScoreIndicator from "@/components/ui/ScoreIndicator";
import OverallHealthScore from "./OverallHealthScore";
import MobileOptimization from "./MobileOptimization";
import BestPractices from "./BestPractices";

interface AuditResultsProps {
  results: any;
}

// Helper function to classify speed
const getSpeedClassification = (speedInSeconds: number) => {
  if (speedInSeconds < 1) return { text: "Very Fast", color: "text-green-600" };
  if (speedInSeconds < 2.5) return { text: "Fast", color: "text-green-500" };
  if (speedInSeconds < 4) return { text: "Average", color: "text-yellow-500" };
  if (speedInSeconds < 6) return { text: "Slow", color: "text-orange-500" };
  return { text: "Very Slow", color: "text-red-600" };
};

// Helper function to get optimization suggestions based on score
const getPerformanceOptimizations = (results: any) => {
  const audits = results?.lighthouse?.audits || {};
  const suggestions = [];
  
  // Check common performance issues
  if (audits['total-blocking-time']?.score < 0.9) {
    suggestions.push({
      title: "Reduce JavaScript Execution Time",
      description: "Long JavaScript execution blocks the main thread and delays page interactivity. Consider code-splitting and optimizing your JavaScript.",
      impact: "High"
    });
  }
  
  if (audits['render-blocking-resources']?.score < 0.9) {
    suggestions.push({
      title: "Eliminate Render-Blocking Resources",
      description: "CSS and JavaScript files block rendering. Consider inlining critical CSS and deferring non-critical JavaScript.",
      impact: "High"
    });
  }
  
  if (audits['unminified-css']?.score < 0.9 || audits['unminified-javascript']?.score < 0.9) {
    suggestions.push({
      title: "Minify CSS and JavaScript",
      description: "Minifying your code resources removes unnecessary characters, reducing file sizes and improving load times.",
      impact: "Medium"
    });
  }
  
  if (audits['uses-responsive-images']?.score < 0.9 || audits['uses-optimized-images']?.score < 0.9) {
    suggestions.push({
      title: "Optimize Images",
      description: "Use properly sized and compressed images. Consider WebP format and responsive image techniques.",
      impact: "High"
    });
  }
  
  if (audits['uses-text-compression']?.score < 0.9) {
    suggestions.push({
      title: "Enable Text Compression",
      description: "Enable GZIP or Brotli compression on your server to reduce the size of transferred resources.",
      impact: "High"
    });
  }
  
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Maintain Current Performance",
      description: "Your website is performing well. Continue monitoring performance metrics to maintain this level.",
      impact: "Low"
    });
  }
  
  return suggestions;
};

// Helper function to get SEO optimization suggestions
const getSeoOptimizations = (results: any) => {
  const audits = results?.lighthouse?.audits || {};
  const suggestions = [];
  
  // Check common SEO issues
  if (audits['meta-description']?.score < 0.9) {
    suggestions.push({
      title: "Improve Meta Description",
      description: "Meta descriptions provide concise summaries of web pages and appear in search results. They should be compelling and relevant to improve click-through rates.",
      impact: "High"
    });
  }
  
  if (audits['document-title']?.score < 0.9) {
    suggestions.push({
      title: "Optimize Page Title",
      description: "Page titles are critical for user experience, SEO, and social sharing. Ensure each page has a unique, descriptive title of optimal length (50-60 characters).",
      impact: "High"
    });
  }
  
  if (audits['link-text']?.score < 0.9) {
    suggestions.push({
      title: "Use Descriptive Link Text",
      description: "Avoid generic link text like 'click here' or 'learn more'. Descriptive link text helps search engines understand your content and improves accessibility.",
      impact: "Medium"
    });
  }
  
  if (audits['image-alt']?.score < 0.9) {
    suggestions.push({
      title: "Add Alt Text to Images",
      description: "Alt text is essential for accessibility, allowing screen readers to describe images to visually impaired users. It also helps search engines understand image content.",
      impact: "High"
    });
  }
  
  if (audits['hreflang']?.score < 0.9) {
    suggestions.push({
      title: "Implement Hreflang for Multilingual Sites",
      description: "If your site targets multiple languages or regions, use hreflang tags to help search engines serve the correct version to users.",
      impact: "Medium"
    });
  }
  
  if (audits['canonical']?.score < 0.9) {
    suggestions.push({
      title: "Use Canonical URLs",
      description: "Canonical tags prevent duplicate content issues by specifying the preferred version of a page when multiple URLs serve similar content.",
      impact: "Medium"
    });
  }
  
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Maintain Current SEO Practices",
      description: "Your website follows good SEO practices. Continue monitoring and updating your content to maintain search visibility.",
      impact: "Low"
    });
  }
  
  return suggestions;
};

const AuditResults: React.FC<AuditResultsProps> = ({ results }) => {
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
  
  // Debug the results to see if there's any missing or invalid data
  console.log("Audit results:", JSON.stringify(results, null, 2));
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const getScoreClass = (score: number) => {
    if (score >= 0.9) return "bg-green-500";
    if (score >= 0.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Safely get scores with fallbacks to prevent errors
  const getPerformanceScore = () => {
    try {
      return Math.round((results?.lighthouse?.categories?.performance?.score || 0) * 100);
    } catch (err) {
      console.error("Error getting performance score:", err);
      return 0;
    }
  };

  const getSeoScore = () => {
    try {
      return Math.round((results?.lighthouse?.categories?.seo?.score || 0) * 100);
    } catch (err) {
      console.error("Error getting SEO score:", err);
      return 0;
    }
  };

  const getAccessibilityScore = () => {
    try {
      return Math.round((results?.lighthouse?.categories?.accessibility?.score || 0) * 100);
    } catch (err) {
      console.error("Error getting accessibility score:", err);
      return 0;
    }
  };

  const getBestPracticesScore = () => {
    try {
      return Math.round((results?.lighthouse?.categories?.["best-practices"]?.score || 0) * 100);
    } catch (err) {
      console.error("Error getting best practices score:", err);
      return 0;
    }
  };
  
  const getSecurityScore = () => {
    try {
      // First check if we have a direct security score
      if (results?.security?.score) {
        return Math.round(results.security.score * 100);
      }
      
      // Otherwise calculate a score based on security factors
      const isSecure = results?.security?.isSecure || false;
      const https = results?.security?.https || false;
      const issues = results?.security?.issues || [];
      const missingHeaders = results?.security?.securityHeaders?.missing || [];
      
      if (isSecure && issues.length === 0 && missingHeaders.length === 0) {
        return 100;
      }
      
      // Base score of 70 if HTTPS is enabled
      let score = https ? 70 : 30;
      
      // Deduct for critical issues
      const criticalIssues = issues.filter((i: any) => i.severity === 'high').length;
      score -= criticalIssues * 15;
      
      // Deduct for other issues
      score -= (issues.length - criticalIssues) * 5;
      
      // Deduct for missing security headers
      score -= missingHeaders.length * 3;
      
      return Math.max(0, Math.min(100, score));
    } catch (err) {
      console.error("Error calculating security score:", err);
      return 50; // Default fallback
    }
  };

  // Get speed metrics
  const getPageSpeed = () => {
    try {
      return results?.lighthouse?.performance?.speed || 
             (results?.lighthouse?.audits?.['speed-index']?.numericValue / 1000) || 1.5;
    } catch (err) {
      console.error("Error getting page speed:", err);
      return 1.5; // Default fallback value
    }
  };

  // Get performance metrics
  const getPerformanceMetrics = () => {
    try {
      const audits = results?.lighthouse?.audits || {};
      return [
        { name: 'First Contentful Paint', value: audits['first-contentful-paint']?.displayValue || 'N/A' },
        { name: 'Largest Contentful Paint', value: audits['largest-contentful-paint']?.displayValue || 'N/A' },
        { name: 'Speed Index', value: audits['speed-index']?.displayValue || 'N/A' },
        { name: 'Total Blocking Time', value: audits['total-blocking-time']?.displayValue || 'N/A' },
        { name: 'Cumulative Layout Shift', value: audits['cumulative-layout-shift']?.displayValue || 'N/A' },
      ];
    } catch (err) {
      console.error("Error getting performance metrics:", err);
      return [];
    }
  };

  // Get accessibility issues
  const getAccessibilityIssues = () => {
    try {
      return results?.accessibility?.violations || [];
    } catch (err) {
      console.error("Error getting accessibility issues:", err);
      return [];
    }
  };

  // Get security issues
  const getSecurityIssues = () => {
    try {
      const security = results?.security || {};
      const issues = [
        ...(security.issues || []),
        ...(!security.https ? [{ type: 'HTTPS', severity: 'high', description: 'Website is not using HTTPS' }] : []),
      ];
      
      // Add missing security headers as issues
      if (security.securityHeaders?.missing?.length > 0) {
        security.securityHeaders.missing.forEach((header: string) => {
          issues.push({
            type: 'Security Header',
            severity: 'medium',
            description: `Missing security header: ${header}`,
          });
        });
      }
      
      return issues;
    } catch (err) {
      console.error("Error getting security issues:", err);
      return [];
    }
  };

  const renderPDFDownloadLink = () => {
    try {
      return (
        <PDFDownloadLink 
          document={<PDFReport results={results} url={results.url} />} 
          fileName={`website-audit-${new Date().toISOString().slice(0, 10)}.pdf`}
          className="py-2.5 px-6 bg-brand-primary hover:bg-brand-dark text-white font-medium rounded-lg transition-colors flex items-center shadow-md"
        >
          {({ loading, error }) => {
            if (loading) return (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            );
            
            if (error) {
              console.error("PDF Generation Error:", error);
              setPdfError(error.message || "Error creating PDF");
              return "Error creating PDF";
            }
            
            return (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                  <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                </svg>
                Download PDF Report
              </>
            );
          }}
        </PDFDownloadLink>
      );
    } catch (err) {
      console.error("Error rendering PDF link:", err);
      return (
        <button className="py-2.5 px-6 bg-red-600 text-white font-medium rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
          PDF Error
        </button>
      );
    }
  };
  
  // Get page speed details
  const pageSpeed = getPageSpeed();
  const speedClassification = getSpeedClassification(pageSpeed);
  
  // Get optimization recommendations
  const performanceOptimizations = getPerformanceOptimizations(results);
  const seoOptimizations = getSeoOptimizations(results);
  
  // Calculate all scores
  const performanceScore = getPerformanceScore();
  const seoScore = getSeoScore();
  const accessibilityScore = getAccessibilityScore();
  const bestPracticesScore = getBestPracticesScore();
  const securityScore = getSecurityScore();
  
  return (
    <div className="space-y-8">
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
          {renderPDFDownloadLink()}
        </div>
      </div>

      {pdfError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-6">
          Error generating PDF: {pdfError}
        </div>
      )}
      
      {/* Overall Health Score */}
      <OverallHealthScore 
        performanceScore={performanceScore}
        seoScore={seoScore}
        accessibilityScore={accessibilityScore}
        bestPracticesScore={bestPracticesScore}
        securityScore={securityScore}
      />
      
      {/* Main Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Performance Score */}
        <div className="gradient-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-brand-primary">
                <path fillRule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clipRule="evenodd" />
              </svg>
              Performance
            </h3>
            <ScoreIndicator score={performanceScore} size="sm" />
          </div>
          
          <div className="flex items-center text-sm mb-3">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>Page loads in <span className="font-medium">{pageSpeed.toFixed(2)}s</span> - </span>
            <span className={`font-medium ${speedClassification.color} ml-1`}>{speedClassification.text}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            {performanceScore >= 80 
              ? "Your page loads quickly, providing a good user experience." 
              : performanceScore >= 60 
                ? "Your page load time needs improvement for better user experience." 
                : "Your page loads too slowly, which may cause visitors to leave."}
          </p>
          
          <button 
            onClick={() => toggleSection('performance')}
            className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
          >
            {expandedSections.performance ? (
              <>
                <span>Show less</span>
                <ChevronUpIcon className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          
          {expandedSections.performance && (
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-brand-primary">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
              SEO
            </h3>
            <ScoreIndicator score={seoScore} size="sm" />
          </div>
          
          <div className="flex items-center text-sm mb-3">
            <TagIcon className="w-4 h-4 mr-1" />
            <span>
              {seoScore >= 80 
                ? "Strong SEO foundation" 
                : seoScore >= 60 
                  ? "Moderate SEO performance" 
                  : "Poor SEO implementation"}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            {seoScore >= 80
              ? "Your website follows SEO best practices, which helps search visibility."
              : seoScore >= 60
                ? "Improving your SEO will help search engines better understand your content."
                : "Your site needs significant SEO improvements to rank better in search results."}
          </p>
          
          <button 
            onClick={() => toggleSection('seo')}
            className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
          >
            {expandedSections.seo ? (
              <>
                <span>Show less</span>
                <ChevronUpIcon className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          
          {expandedSections.seo && (
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-brand-primary">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
              </svg>
              Accessibility
            </h3>
            <ScoreIndicator score={accessibilityScore} size="sm" />
          </div>
          
          <div className="text-sm mb-3">
            <span className="font-medium">
              {getAccessibilityIssues().length === 0 
                ? "No accessibility issues detected" 
                : `${getAccessibilityIssues().length} issues found`}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            {accessibilityScore >= 80
              ? "Your website is accessible to users with disabilities."
              : accessibilityScore >= 60
                ? "Your site has some accessibility issues that should be addressed."
                : "Your site has significant accessibility problems that need fixing."}
          </p>
          
          <button 
            onClick={() => toggleSection('accessibility')}
            className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
          >
            {expandedSections.accessibility ? (
              <>
                <span>Show less</span>
                <ChevronUpIcon className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          
          {expandedSections.accessibility && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="bg-yellow-50 p-3 rounded mb-3 text-sm">
                <h4 className="font-medium text-yellow-800">Why Accessibility Matters:</h4>
                <p className="text-xs text-yellow-700 mt-1">
                  Accessible websites can be used by people with disabilities and improve usability for all users.
                  It's also a legal requirement in many jurisdictions.
                </p>
              </div>
              
              <h4 className="font-medium mb-2 text-sm">Top Issues:</h4>
              <div className="max-h-48 overflow-y-auto pr-2">
                {getAccessibilityIssues().length > 0 ? (
                  <ul className="space-y-3">
                    {getAccessibilityIssues().slice(0, 3).map((issue: any, index: number) => (
                      <li key={index} className="text-sm border-l-4 border-yellow-500 pl-2 py-1 bg-yellow-50">
                        <div className="font-medium flex items-start">
                          <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mr-1 mt-0.5" />
                          <span>
                            {issue.impact === 'critical' ? 'Critical' : 
                             issue.impact === 'serious' ? 'Serious' :
                             issue.impact === 'moderate' ? 'Moderate' : 
                             'Minor'}: {issue.id || 'Issue'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{issue.description || issue.help || 'No description available'}</div>
                      </li>
                    ))}
                    {getAccessibilityIssues().length > 3 && (
                      <li className="text-xs text-gray-600 italic">
                        + {getAccessibilityIssues().length - 3} more issues
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    No specific issues detected
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Security */}
        <div className="gradient-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-brand-primary">
                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              Security
            </h3>
            <ScoreIndicator score={securityScore} size="sm" />
          </div>
          
          <div className="text-sm mb-3">
            <span className={`font-medium ${results.security?.isSecure ? "text-green-600" : "text-red-600"}`}>
              {results.security?.isSecure ? "Secure Connection" : "Security Issues Detected"}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            {securityScore >= 80
              ? "Your website implements good security practices to protect data and users."
              : securityScore >= 60
                ? "Your website has some security vulnerabilities that should be addressed."
                : "Your website has critical security vulnerabilities that need fixing immediately."}
          </p>
          
          <button 
            onClick={() => toggleSection('security')}
            className="text-brand-primary text-sm font-medium hover:text-brand-dark flex items-center"
          >
            {expandedSections.security ? (
              <>
                <span>Show less</span>
                <ChevronUpIcon className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                <span>Show details</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          
          {expandedSections.security && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center mb-3">
                <div className={`w-4 h-4 rounded-full ${results.security?.https ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                <h4 className="font-medium text-sm">HTTPS: {results.security?.https ? "Enabled" : "Not Enabled"}</h4>
                {!results.security?.https && (
                  <span className="ml-auto text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Critical</span>
                )}
              </div>
              
              <h4 className="font-medium mb-2 text-sm">Security Vulnerabilities:</h4>
              <div className="max-h-48 overflow-y-auto pr-2">
                {getSecurityIssues().length > 0 ? (
                  <ul className="space-y-3">
                    {getSecurityIssues().slice(0, 3).map((issue: any, index: number) => (
                      <li key={index} className="text-sm border-l-4 border-red-500 pl-2 py-1 bg-red-50">
                        <div className="font-medium flex items-start justify-between">
                          <div className="flex items-start">
                            <ShieldExclamationIcon className="w-4 h-4 text-red-600 mr-1 mt-0.5" />
                            <span>{issue.severity === 'high' ? 'Critical' : issue.severity === 'medium' ? 'Warning' : 'Info'}: {issue.type}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{issue.description}</div>
                      </li>
                    ))}
                    {getSecurityIssues().length > 3 && (
                      <li className="text-xs text-gray-600 italic">
                        + {getSecurityIssues().length - 3} more issues
                      </li>
                    )}
                  </ul>
                ) : (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    No security issues detected
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Optimization */}
      <MobileOptimization results={results} />
      
      {/* Best Practices */}
      <BestPractices results={results} />
      
      <div className="mt-8 text-center">
        <button 
          onClick={() => window.location.reload()} 
          className="py-2.5 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
        >
          Audit Another Website
        </button>
      </div>
    </div>
  );
};

export default AuditResults;