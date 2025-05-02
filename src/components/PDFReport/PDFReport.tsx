import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import InsightSnapLogo from "./InsightSnapLogo";
import TrafficLightIndicator from "./TrafficLightIndicator";
import ActionChecklist from "./ActionChecklist";
import CompetitorComparison from "./CompetitorComparison";
import UpsellPage from "./UpsellPage";
import { 
  calculateCombinedScore, 
  getSeoBreakdown, 
  getMobileOptimization, 
  getUXEvaluation,
  getPriorityLevel,
  calculateSecurityScore
} from "./pdfHelpers";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #EEEEEE",
    paddingBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  detailSection: {
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444444",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
    color: "#555555",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  emphasizedText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  smallText: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.4,
    color: "#555555",
  },
  scoreContainer: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  scoreText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  recommendationBlock: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderLeft: "3 solid #DDDDDD",
  },
  issueItem: {
    marginBottom: 8,
    padding: 5,
    borderLeft: "2 solid #FFBB00",
  },
  securityIssueItem: {
    marginBottom: 8,
    padding: 5,
    borderLeft: "2 solid #FF4444",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  itemContent: {
    flex: 1,
    fontSize: 10,
  },
  footer: {
    marginTop: 30,
    borderTop: "1 solid #EEEEEE",
    paddingTop: 10,
    fontSize: 10,
    textAlign: "center",
    color: "#666666",
  },
  calloutBox: {
    backgroundColor: "#EDF2F7", 
    padding: 8,
    borderRadius: 5,
    marginVertical: 10,
  },
  impactHigh: {
    backgroundColor: "#FEE2E2", 
    padding: 4,
    borderRadius: 3,
    color: "#B91C1C",
    fontSize: 9,
    fontWeight: "bold",
    marginLeft: 5,
  },
  impactMedium: {
    backgroundColor: "#FEF3C7", 
    padding: 4,
    borderRadius: 3,
    color: "#92400E",
    fontSize: 9,
    fontWeight: "bold",
    marginLeft: 5,
  },
  impactLow: {
    backgroundColor: "#D1FAE5", 
    padding: 4,
    borderRadius: 3,
    color: "#065F46",
    fontSize: 9,
    fontWeight: "bold",
    marginLeft: 5,
  },
  // New styles for the enhanced report
  healthSummary: {
    backgroundColor: "#F7FAFC",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    border: "1 solid #E2E8F0",
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  combinedScore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  combinedScoreText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  summaryContent: {
    flex: 1,
  },
  trafficLightContainer: {
    marginVertical: 8,
  },
  atGlanceItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  atGlanceLabel: {
    width: 90,
    fontSize: 11,
    fontWeight: "bold",
    color: "#4A5568",
  },
  atGlanceValue: {
    flex: 1,
    fontSize: 11,
    color: "#4A5568",
  },
  seoBreakdownTable: {
    marginTop: 5,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #E2E8F0",
    paddingVertical: 4,
  },
  tableHeader: {
    backgroundColor: "#F7FAFC",
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
    flex: 1,
    paddingHorizontal: 5,
  },
  statusCell: {
    fontSize: 10,
    width: 70,
    textAlign: "right",
    paddingHorizontal: 5,
  },
  mobileOptSection: {
    marginVertical: 5,
  },
  mobileMetricRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  metricIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  uxEvaluation: {
    backgroundColor: "#F0F9FF",
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  aiSuggestion: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    borderLeft: "3 solid #4F46E5",
  },
  suggestionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1E293B",
  },
  suggestionText: {
    fontSize: 10,
    color: "#334155",
    lineHeight: 1.3,
  },
  fixInstructions: {
    fontSize: 10,
    color: "#4F46E5",
    marginTop: 3,
    lineHeight: 1.3,
  },
  priorityBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 8,
    padding: "2 5",
    borderRadius: 3,
    color: "white",
  },
  brandingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTop: "1 solid #E2E8F0",
  },
  footerText: {
    fontSize: 10,
    color: "#6B7280",
  },
  footerLink: {
    fontSize: 10,
    color: "#4F46E5",
  },
  statusBadge: {
    fontSize: 9,
    padding: "2 6",
    borderRadius: 4,
    color: "white",
    fontWeight: "bold",
  },
  statusGood: {
    backgroundColor: "#10B981",
  },
  statusWarning: {
    backgroundColor: "#F59E0B",
  },
  statusBad: {
    backgroundColor: "#EF4444",
  },
  progressBarContainer: {
    height: 8,
    flex: 1,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  progressBar: {
    height: "100%",
  },
  percentageText: {
    fontSize: 10,
    fontWeight: "bold",
    width: 35,
    textAlign: "right",
  },
});

interface PDFReportProps {
  results: any;
  url: string;
}

// Helper function to safely get scores
const getScore = (results: any, path: string) => {
  try {
    const parts = path.split('.');
    let current = results;
    for (const part of parts) {
      if (current === undefined || current === null) return 0;
      current = current[part];
    }
    return current || 0;
  } catch (error) {
    console.error(`Error getting score for ${path}:`, error);
    return 0;
  }
};

// Helper to get performance metrics
const getPerformanceMetrics = (results: any) => {
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

// Helper to get performance optimization suggestions
const getPerformanceOptimizations = (results: any) => {
  const audits = results?.lighthouse?.audits || {};
  const suggestions = [];
  
  if (audits['total-blocking-time']?.score < 0.9) {
    suggestions.push({
      title: "Reduce JavaScript Execution Time",
      description: "Long JavaScript execution blocks the main thread and delays page interactivity. Consider code-splitting and optimizing your JavaScript.",
      impact: "High",
      howToFix: "Identify and optimize JavaScript that takes too long to execute. Split large components, use lazy loading, and consider server-side rendering for complex pages."
    });
  }
  
  if (audits['render-blocking-resources']?.score < 0.9) {
    suggestions.push({
      title: "Eliminate Render-Blocking Resources",
      description: "CSS and JavaScript files block rendering. Consider inlining critical CSS and deferring non-critical JavaScript.",
      impact: "High",
      howToFix: "Add 'defer' or 'async' attributes to non-critical JavaScript. Move critical CSS inline in the <head> and load non-critical CSS asynchronously."
    });
  }
  
  if (audits['unminified-css']?.score < 0.9 || audits['unminified-javascript']?.score < 0.9) {
    suggestions.push({
      title: "Minify CSS and JavaScript",
      description: "Minifying your code resources removes unnecessary characters, reducing file sizes and improving load times.",
      impact: "Medium",
      howToFix: "Use tools like Terser for JavaScript and cssnano for CSS minification. Most build tools like Webpack, Rollup, or Parcel can handle this automatically."
    });
  }
  
  if (audits['uses-responsive-images']?.score < 0.9 || audits['uses-optimized-images']?.score < 0.9) {
    suggestions.push({
      title: "Optimize Images",
      description: "Use properly sized and compressed images. Consider WebP format and responsive image techniques.",
      impact: "High",
      howToFix: "Compress images with tools like ImageOptim, use srcset for responsive images, convert to WebP format, and consider lazy loading for below-the-fold images."
    });
  }
  
  if (audits['uses-text-compression']?.score < 0.9) {
    suggestions.push({
      title: "Enable Text Compression",
      description: "Enable GZIP or Brotli compression on your server to reduce the size of transferred resources.",
      impact: "High",
      howToFix: "Configure your web server to use Gzip or preferably Brotli compression for HTML, CSS, JavaScript, and other text assets."
    });
  }
  
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Maintain Current Performance",
      description: "Your website is performing well. Continue monitoring performance metrics to maintain this level.",
      impact: "Low",
      howToFix: "Regularly test your website with tools like Lighthouse and WebPageTest to ensure performance doesn't degrade over time."
    });
  }
  
  return suggestions;
};

// Helper to get SEO optimization suggestions
const getSeoOptimizations = (results: any) => {
  const audits = results?.lighthouse?.audits || {};
  const suggestions = [];
  
  if (audits['meta-description']?.score < 0.9) {
    suggestions.push({
      title: "Improve Meta Description",
      description: "Meta descriptions provide concise summaries of web pages and appear in search results. They should be compelling and relevant to improve click-through rates.",
      impact: "High",
      howToFix: "Write unique, descriptive meta descriptions of 120-155 characters for each page that accurately summarize content and include relevant keywords."
    });
  }
  
  if (audits['document-title']?.score < 0.9) {
    suggestions.push({
      title: "Optimize Page Title",
      description: "Page titles are critical for user experience, SEO, and social sharing. Ensure each page has a unique, descriptive title of optimal length (50-60 characters).",
      impact: "High",
      howToFix: "Create unique titles for each page that include your primary keyword near the beginning. Keep titles under 60 characters to prevent truncation in search results."
    });
  }
  
  if (audits['link-text']?.score < 0.9) {
    suggestions.push({
      title: "Use Descriptive Link Text",
      description: "Avoid generic link text like 'click here' or 'learn more'. Descriptive link text helps search engines understand your content and improves accessibility.",
      impact: "Medium",
      howToFix: "Replace generic anchor text with specific descriptions of the linked content, using relevant keywords where appropriate."
    });
  }
  
  if (audits['image-alt']?.score < 0.9) {
    suggestions.push({
      title: "Add Alt Text to Images",
      description: "Alt text is essential for accessibility, allowing screen readers to describe images to visually impaired users. It also helps search engines understand image content.",
      impact: "High",
      howToFix: "Add descriptive alt attributes to all meaningful images. Keep alt text concise (under 125 characters) and descriptive of the image content."
    });
  }
  
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Maintain Current SEO Practices",
      description: "Your website follows good SEO practices. Continue monitoring and updating your content to maintain search visibility.",
      impact: "Low",
      howToFix: "Regularly audit your site, update content to keep it fresh, and stay informed about SEO best practices as search algorithms evolve."
    });
  }
  
  return suggestions;
};

// Generate UX/design improvement suggestions
const getUXSuggestions = (results: any) => {
  const uxEval = getUXEvaluation(results);
  const suggestions = [];
  
  if (!uxEval.contrastGood) {
    suggestions.push({
      title: "Improve Color Contrast",
      description: "Low contrast between text and background makes content difficult to read, especially for users with visual impairments.",
      howToFix: "Ensure text has a contrast ratio of at least 4.5:1 against its background. Use tools like the WebAIM Contrast Checker to verify."
    });
  }
  
  if (!uxEval.spacingGood) {
    suggestions.push({
      title: "Optimize Text Spacing",
      description: "Proper spacing between lines and paragraphs improves readability and reduces cognitive load.",
      howToFix: "Use line height of at least 1.5 for body text and add sufficient margin between paragraphs (at least 1.5 times the font size)."
    });
  }
  
  if (uxEval.hasLayoutShiftIssues) {
    suggestions.push({
      title: "Prevent Layout Shifts",
      description: "Content that moves after it has loaded creates a poor user experience and makes it difficult to interact with the page.",
      howToFix: "Set size attributes on images and videos, use CSS aspect ratio boxes, and avoid inserting content above existing content."
    });
  }
  
  // Add general UX suggestions regardless of test results
  suggestions.push({
    title: "Improve Visual Hierarchy",
    description: "A clear visual hierarchy guides users through content and helps them find information quickly.",
    howToFix: "Use size, color, and spacing to establish importance. Ensure headings stand out and related items are visually grouped."
  });
  
  suggestions.push({
    title: "Enhance Call-to-Action Visibility",
    description: "Clear, visible calls to action improve conversion rates by making desired actions obvious to users.",
    howToFix: "Use contrasting colors for buttons, provide adequate white space around CTAs, and use action-oriented text."
  });
  
  suggestions.push({
    title: "Simplify Forms",
    description: "Complex forms create friction and can lead to abandonment before completion.",
    howToFix: "Minimize required fields, group related fields, provide clear error messages, and consider multi-step forms for complex processes."
  });
  
  return suggestions;
};

// Helper to get accessibility issues
const getAccessibilityIssues = (results: any) => {
  try {
    return results?.accessibility?.violations || [];
  } catch (err) {
    console.error("Error getting accessibility issues:", err);
    return [];
  }
};

// Helper to get security issues
const getSecurityIssues = (results: any) => {
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

// Get page speed
const getPageSpeed = (results: any) => {
  try {
    return results?.lighthouse?.performance?.speed || 
           (results?.lighthouse?.audits?.['speed-index']?.numericValue / 1000) || 1.5;
  } catch (err) {
    console.error("Error getting page speed:", err);
    return 1.5; // Default fallback value
  }
};

// Helper function to classify speed
const getSpeedClassification = (speedInSeconds: number) => {
  if (speedInSeconds < 1) return "Very Fast";
  if (speedInSeconds < 2.5) return "Fast";
  if (speedInSeconds < 4) return "Average";
  if (speedInSeconds < 6) return "Slow";
  return "Very Slow";
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "#4CAF50"; // Green
  if (score >= 50) return "#FF9800"; // Orange
  return "#F44336"; // Red
};

// Create checklist items for the action plan
const createChecklistItems = (results: any) => {
  const items = {
    performance: [] as { text: string; priority: "high" | "medium" | "low" }[],
    seo: [] as { text: string; priority: "high" | "medium" | "low" }[],
    accessibility: [] as { text: string; priority: "high" | "medium" | "low" }[],
    security: [] as { text: string; priority: "high" | "medium" | "low" }[],
  };
  
  // Performance items
  const performanceScore = Math.round((getScore(results, 'lighthouse.categories.performance.score') || 0) * 100);
  const performanceOptimizations = getPerformanceOptimizations(results);
  
  performanceOptimizations.forEach(opt => {
    items.performance.push({
      text: opt.title,
      priority: performanceScore < 50 ? "high" : 
               performanceScore < 80 ? "medium" : "low"
    });
  });
  
  // SEO items
  const seoScore = Math.round((getScore(results, 'lighthouse.categories.seo.score') || 0) * 100);
  const seoOptimizations = getSeoOptimizations(results);
  
  seoOptimizations.forEach(opt => {
    items.seo.push({
      text: opt.title,
      priority: seoScore < 50 ? "high" : 
               seoScore < 80 ? "medium" : "low"
    });
  });
  
  // Accessibility items
  const accessibilityScore = Math.round((getScore(results, 'lighthouse.categories.accessibility.score') || 0) * 100);
  const accessibilityIssues = getAccessibilityIssues(results);
  
  // Add critical accessibility issues
  const criticalAccessibilityIssues = accessibilityIssues
    .filter((issue: any) => issue.impact === 'critical' || issue.impact === 'serious')
    .slice(0, 3);
    
  criticalAccessibilityIssues.forEach((issue: any) => {
    items.accessibility.push({
      text: `Fix ${issue.id || 'accessibility issue'}: ${issue.help || 'Needs attention'}`,
      priority: "high"
    });
  });
  
  // Add moderate accessibility issues
  const moderateAccessibilityIssues = accessibilityIssues
    .filter((issue: any) => issue.impact === 'moderate')
    .slice(0, 2);
    
  moderateAccessibilityIssues.forEach((issue: any) => {
    items.accessibility.push({
      text: `Fix ${issue.id || 'accessibility issue'}: ${issue.help || 'Needs attention'}`,
      priority: "medium"
    });
  });
  
  // Add general accessibility items if no specific issues
  if (items.accessibility.length === 0) {
    items.accessibility.push({
      text: "Add alt text to all meaningful images",
      priority: accessibilityScore < 70 ? "high" : "medium"
    });
    items.accessibility.push({
      text: "Ensure sufficient color contrast for all text",
      priority: accessibilityScore < 70 ? "high" : "medium"
    });
    items.accessibility.push({
      text: "Make sure all interactive elements are keyboard accessible",
      priority: "medium"
    });
  }
  
  // Security items
  const securityIssues = getSecurityIssues(results);
  const securityScore = calculateSecurityScore(results);
  
  // Add critical security issues
  const criticalSecurityIssues = securityIssues
    .filter((issue: any) => issue.severity === 'high')
    .slice(0, 3);
    
  criticalSecurityIssues.forEach((issue: any) => {
    items.security.push({
      text: `Fix ${issue.type}: ${issue.description}`,
      priority: "high"
    });
  });
  
  // Add moderate security issues
  const moderateSecurityIssues = securityIssues
    .filter((issue: any) => issue.severity === 'medium')
    .slice(0, 2);
    
  moderateSecurityIssues.forEach((issue: any) => {
    items.security.push({
      text: `Implement ${issue.type}: ${issue.description}`,
      priority: "medium"
    });
  });
  
  // Add general security items if no specific issues
  if (items.security.length === 0) {
    items.security.push({
      text: "Implement regular security scanning and monitoring",
      priority: "low"
    });
    items.security.push({
      text: "Keep all software and dependencies updated",
      priority: "medium"
    });
  }
  
  return items;
};

const PDFReport: React.FC<PDFReportProps> = ({ results, url }) => {
  // Calculate scores with fallbacks
  const performanceScore = Math.round((getScore(results, 'lighthouse.categories.performance.score') || 0) * 100);
  const seoScore = Math.round((getScore(results, 'lighthouse.categories.seo.score') || 0) * 100);
  const accessibilityScore = Math.round((getScore(results, 'lighthouse.categories.accessibility.score') || 0) * 100);
  const bestPracticesScore = Math.round((getScore(results, 'lighthouse.categories.best-practices.score') || 0) * 100);
  const securityScore = calculateSecurityScore(results);
  const securityStatus = results?.security?.isSecure ? 'Secure' : 'Not Secure';
  
  // Get detailed metrics and issues
  const pageSpeed = getPageSpeed(results);
  const speedClassification = getSpeedClassification(pageSpeed);
  const performanceMetrics = getPerformanceMetrics(results);
  const performanceOptimizations = getPerformanceOptimizations(results);
  const seoOptimizations = getSeoOptimizations(results);
  const accessibilityIssues = getAccessibilityIssues(results);
  const securityIssues = getSecurityIssues(results);

  // Calculate combined score for overall health
  const combinedScore = calculateCombinedScore(
    performanceScore, 
    seoScore, 
    accessibilityScore, 
    securityScore
  );
  
  // Get detailed breakdowns for enhanced sections
  const seoBreakdown = getSeoBreakdown(results);
  const mobileOptimization = getMobileOptimization(results);
  const uxEvaluation = getUXEvaluation(results);
  const uxSuggestions = getUXSuggestions(results);
  
  // Create action checklist items
  const checklistItems = createChecklistItems(results);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Website Audit Report</Text>
          <Text style={styles.text}>URL: {url}</Text>
          <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.smallText}>This comprehensive audit analyzes your website's performance, SEO, accessibility, and security - providing actionable recommendations for improvement.</Text>
        </View>

        {/* Overall Health Summary - NEW */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Overall Health Summary</Text>
          <View style={styles.healthSummary}>
            <View style={styles.summaryHeader}>
              <View style={styles.combinedScore}>
                <Text style={styles.combinedScoreText}>{combinedScore}</Text>
              </View>
              <View style={styles.summaryContent}>
                <Text style={styles.emphasizedText}>
                  Website Health Score: {combinedScore}/100
                </Text>
                <View style={styles.trafficLightContainer}>
                  <TrafficLightIndicator score={combinedScore} />
                </View>
                <Text style={styles.smallText}>
                  {combinedScore >= 80 ? "Your website is in good health with some minor improvements possible." :
                   combinedScore >= 60 ? "Your website needs attention in several key areas." : 
                   "Your website has critical issues that require immediate attention."}
                </Text>
              </View>
            </View>
            
            <Text style={[styles.text, {fontWeight: "bold", marginTop: 10, marginBottom: 5}]}>
              At a Glance:
            </Text>
            
            <View style={styles.atGlanceItem}>
              <Text style={styles.atGlanceLabel}>Performance:</Text>
              <Text style={styles.atGlanceValue}>
                {performanceScore}/100 - {speedClassification} ({pageSpeed.toFixed(2)}s load time)
              </Text>
            </View>
            
            <View style={styles.atGlanceItem}>
              <Text style={styles.atGlanceLabel}>SEO:</Text>
              <Text style={styles.atGlanceValue}>
                {seoScore}/100 - {seoScore >= 90 ? "Excellent" : seoScore >= 70 ? "Good" : "Needs improvement"}
              </Text>
            </View>
            
            <View style={styles.atGlanceItem}>
              <Text style={styles.atGlanceLabel}>Accessibility:</Text>
              <Text style={styles.atGlanceValue}>
                {accessibilityScore}/100 - {accessibilityIssues.length} issues found
              </Text>
            </View>
            
            <View style={styles.atGlanceItem}>
              <Text style={styles.atGlanceLabel}>Security:</Text>
              <Text style={styles.atGlanceValue}>
                {securityScore}/100 - {securityIssues.length} vulnerabilities detected
              </Text>
            </View>
            
            <View style={styles.atGlanceItem}>
              <Text style={styles.atGlanceLabel}>Mobile-Friendly:</Text>
              <Text style={styles.atGlanceValue}>
                {mobileOptimization.mobileScore}/100 - {mobileOptimization.mobileScore >= 80 ? "Well optimized" : "Needs improvement"}
              </Text>
            </View>
          </View>
        </View>

        {/* Performance Section */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Performance Analysis</Text>
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(performanceScore) }]}>
              <Text style={styles.scoreText}>{performanceScore}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.emphasizedText}>
                Your page loads in {pageSpeed.toFixed(2)} seconds - {speedClassification}
              </Text>
              <Text style={styles.smallText}>
                {pageSpeed < 2.5 
                  ? `This is good, but optimizing further could improve user experience and search rankings.` 
                  : `This is ${pageSpeed > 4 ? 'significantly ' : ''}slower than the recommended 2.5 seconds. Users may abandon your site before it loads completely.`}
              </Text>
            </View>
          </View>
          
          <View style={styles.calloutBox}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Business Impact of Page Speed:</Text>
            <Text style={styles.smallText}>
              Studies show that 53% of mobile users abandon sites that take longer than 3 seconds to load.
              For every 1 second improvement in page speed, conversion rates can increase by up to 2%.
              Faster websites also rank higher in search results, as page speed is a ranking factor for Google.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>Core Web Vitals:</Text>
          <View style={styles.detailSection}>
            {performanceMetrics.map((metric, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemContent}>{metric.name}: {metric.value}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.sectionTitle}>Top Optimization Opportunities:</Text>
          <View style={styles.detailSection}>
            {performanceOptimizations.slice(0, 3).map((opt, i) => (
              <View key={i} style={{marginBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                  <Text style={[styles.text, {fontWeight: 'bold', flex: 1}]}>{opt.title}</Text>
                  <Text style={
                    opt.impact === 'High' ? styles.impactHigh : 
                    opt.impact === 'Medium' ? styles.impactMedium : 
                    styles.impactLow
                  }>
                    {opt.impact} IMPACT
                  </Text>
                </View>
                <Text style={styles.smallText}>{opt.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
      
      {/* Second page - Detailed SEO Breakdown */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Detailed SEO Breakdown</Text>
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(seoScore) }]}>
              <Text style={styles.scoreText}>{seoScore}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.emphasizedText}>
                {seoScore >= 90 
                  ? "Strong SEO Implementation" 
                  : seoScore >= 70 
                    ? "Moderate SEO Implementation" 
                    : "Poor SEO Implementation"}
              </Text>
              <Text style={styles.smallText}>
                {seoScore >= 90 
                  ? "Your website follows most SEO best practices, which helps search engines properly index your content." 
                  : "Your website needs SEO improvements to increase visibility in search results and drive more organic traffic."}
              </Text>
            </View>
          </View>
          
          <View style={styles.calloutBox}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Why SEO Matters for Business:</Text>
            <Text style={styles.smallText}>
              Organic search drives 53% of website traffic, compared to just 15% from paid search.
              SEO has a 14.6% close rate, compared to 1.7% for traditional outbound methods.
              Strong SEO implementation ensures your website is discoverable when potential customers search for related products or services.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>SEO Elements Assessment:</Text>
          <View style={styles.seoBreakdownTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Element</Text>
              <Text style={styles.statusCell}>Status</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Page Title Tag</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasTitleTag ? "✓ Present" : "✗ Missing"}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Meta Description</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasMetaDescription ? "✓ Present" : "✗ Missing"}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Broken Links</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasBrokenLinks ? `✗ ${seoBreakdown.brokenLinksCount} found` : "✓ None found"}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Schema Markup</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasSchemaMarkup ? "✓ Present" : "✗ Missing"}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Open Graph Data</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasOpenGraph ? "✓ Present" : "✗ Missing"}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Image Alt Text</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Text style={styles.statusCell}>
                  {seoBreakdown.altTextCoverage}% Coverage
                </Text>
              </View>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Sitemap.xml</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasSitemap ? "✓ Present" : "✗ Missing"}
              </Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Robots.txt</Text>
              <Text style={styles.statusCell}>
                {seoBreakdown.hasRobotsTxt ? "✓ Present" : "✗ Missing"}
              </Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Top SEO Recommendations:</Text>
          <View style={styles.detailSection}>
            {seoOptimizations.slice(0, 3).map((opt, i) => (
              <View key={i} style={{marginBottom: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 2}}>
                  <Text style={[styles.text, {fontWeight: 'bold', flex: 1}]}>{opt.title}</Text>
                  <Text style={
                    opt.impact === 'High' ? styles.impactHigh : 
                    opt.impact === 'Medium' ? styles.impactMedium : 
                    styles.impactLow
                  }>
                    {opt.impact} IMPACT
                  </Text>
                </View>
                <Text style={styles.smallText}>{opt.description}</Text>
                <Text style={[styles.smallText, {fontStyle: 'italic', color: '#4F46E5', marginTop: 2}]}>
                  How to fix: {opt.howToFix}
                </Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.sectionTitle}>Best Practices Score: {bestPracticesScore}%</Text>
          <Text style={styles.smallText}>
            Best practices include proper error handling, HTTPS usage, avoiding deprecated APIs, and using appropriate image sizes.
            {bestPracticesScore >= 90 
              ? " Your website follows most web best practices." 
              : " Improving adherence to web best practices will enhance user experience and technical SEO."}
          </Text>
        </View>
      </Page>
      
      {/* Third page - Mobile Optimization and UX Evaluation */}
      <Page size="A4" style={styles.page}>
        {/* Mobile Optimization */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Mobile Optimization Score</Text>
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(mobileOptimization.mobileScore) }]}>
              <Text style={styles.scoreText}>{mobileOptimization.mobileScore}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.emphasizedText}>
                {mobileOptimization.mobileScore >= 90 
                  ? "Excellent Mobile Optimization" 
                  : mobileOptimization.mobileScore >= 70 
                    ? "Good Mobile Experience" 
                    : "Poor Mobile Experience"}
              </Text>
              <Text style={styles.smallText}>
                {mobileOptimization.mobileScore >= 90 
                  ? "Your website is well-optimized for mobile devices, providing a smooth experience across all screen sizes." 
                  : "Your website needs improvements to provide a better experience on mobile devices."}
              </Text>
            </View>
          </View>
          
          <View style={styles.calloutBox}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Why Mobile Optimization Matters:</Text>
            <Text style={styles.smallText}>
              Over 60% of web traffic now comes from mobile devices. Google's mobile-first indexing means 
              mobile optimization directly impacts your search rankings. Additionally, 53% of mobile visitors 
              will leave a site that takes longer than 3 seconds to load.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>Mobile-Specific Metrics:</Text>
          <View style={styles.mobileOptSection}>
            <View style={styles.mobileMetricRow}>
              <View style={[styles.metricIcon, { backgroundColor: mobileOptimization.touchTargetSize ? "#10B981" : "#EF4444" }]} />
              <Text style={styles.text}>Touch Target Size</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { 
                  width: `${mobileOptimization.touchTargetScore}%`,
                  backgroundColor: mobileOptimization.touchTargetScore >= 90 ? "#10B981" : 
                                  mobileOptimization.touchTargetScore >= 50 ? "#F59E0B" : "#EF4444" 
                }]} />
              </View>
              <Text style={styles.percentageText}>{mobileOptimization.touchTargetScore}%</Text>
            </View>
            
            <View style={{marginLeft: 20, marginBottom: 10}}>
              <Text style={styles.smallText}>
                {mobileOptimization.touchTargetSize 
                  ? "Touch targets (buttons, links) are properly sized for mobile users' fingers." 
                  : "Touch targets are too small or too close together, making them difficult to tap accurately."}
              </Text>
              {!mobileOptimization.touchTargetSize && (
                <Text style={[styles.smallText, {fontStyle: 'italic', color: '#4F46E5', marginTop: 2}]}>
                  Recommendation: Ensure touch targets are at least 48x48 pixels and have sufficient spacing.
                </Text>
              )}
            </View>
            
            <View style={styles.mobileMetricRow}>
              <View style={[styles.metricIcon, { backgroundColor: mobileOptimization.viewportConfigured ? "#10B981" : "#EF4444" }]} />
              <Text style={styles.text}>Viewport Configuration</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { 
                  width: `${mobileOptimization.viewportConfigured ? 100 : 0}%`,
                  backgroundColor: mobileOptimization.viewportConfigured ? "#10B981" : "#EF4444" 
                }]} />
              </View>
              <Text style={styles.percentageText}>{mobileOptimization.viewportConfigured ? "100%" : "0%"}</Text>
            </View>
            
            <View style={{marginLeft: 20, marginBottom: 10}}>
              <Text style={styles.smallText}>
                {mobileOptimization.viewportConfigured 
                  ? "Viewport meta tag is properly configured to control layout on mobile browsers." 
                  : "Missing or improperly configured viewport meta tag, which is essential for responsive design."}
              </Text>
              {!mobileOptimization.viewportConfigured && (
                <Text style={[styles.smallText, {fontStyle: 'italic', color: '#4F46E5', marginTop: 2}]}>
                  Recommendation: Add &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt; to your HTML.
                </Text>
              )}
            </View>
            
            <View style={styles.mobileMetricRow}>
              <View style={[styles.metricIcon, { backgroundColor: mobileOptimization.fontSizeReadable ? "#10B981" : "#EF4444" }]} />
              <Text style={styles.text}>Font Size Readability</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { 
                  width: `${mobileOptimization.fontSizeScore}%`,
                  backgroundColor: mobileOptimization.fontSizeScore >= 90 ? "#10B981" : 
                                  mobileOptimization.fontSizeScore >= 50 ? "#F59E0B" : "#EF4444" 
                }]} />
              </View>
              <Text style={styles.percentageText}>{mobileOptimization.fontSizeScore}%</Text>
            </View>
            
            <View style={{marginLeft: 20, marginBottom: 10}}>
              <Text style={styles.smallText}>
                {mobileOptimization.fontSizeReadable 
                  ? "Font sizes are readable on mobile devices without requiring zoom." 
                  : "Text is too small to read comfortably on mobile screens without zooming."}
              </Text>
              {!mobileOptimization.fontSizeReadable && (
                <Text style={[styles.smallText, {fontStyle: 'italic', color: '#4F46E5', marginTop: 2}]}>
                  Recommendation: Use a minimum font size of 16px for body text on mobile devices.
                </Text>
              )}
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Top Mobile Recommendations:</Text>
          <View style={styles.detailSection}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemContent}>
                <Text style={{fontWeight: 'bold'}}>Prioritize Content for Mobile: </Text>
                Show the most important content first on mobile screens.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemContent}>
                <Text style={{fontWeight: 'bold'}}>Simplify Navigation: </Text>
                Use a hamburger menu or simplified navigation for mobile screens.
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemContent}>
                <Text style={{fontWeight: 'bold'}}>Test on Real Devices: </Text>
                Test your website on various mobile devices and screen sizes.
              </Text>
            </View>
          </View>
        </View>
        
        {/* UX/Design Evaluation */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>UX / Design Evaluation</Text>
          <View style={styles.uxEvaluation}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              Overall Design Assessment:
            </Text>
            <Text style={styles.smallText}>
              This evaluation analyzes basic user experience aspects of your website including contrast, 
              readability, spacing, and visual hierarchy. Good UX design can increase conversions by up 
              to 400% and significantly improve user engagement metrics.
            </Text>
            
            <View style={{marginTop: 8}}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemContent}>
                  <Text style={{fontWeight: 'bold'}}>Contrast & Readability: </Text>
                  {uxEvaluation.contrastGood ? "Good - Text is easily readable" : "Needs Improvement - Some text has poor contrast"}
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemContent}>
                  <Text style={{fontWeight: 'bold'}}>Layout Stability: </Text>
                  {!uxEvaluation.hasLayoutShiftIssues ? "Good - Page elements don't shift unexpectedly" : "Poor - Page has layout shift issues"}
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.itemContent}>
                  <Text style={{fontWeight: 'bold'}}>Text Spacing: </Text>
                  {uxEvaluation.spacingGood ? "Good - Text has appropriate spacing" : "Needs Improvement - Text spacing could be improved"}
                </Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>AI-Generated Design Suggestions:</Text>
          <View style={styles.detailSection}>
            {uxSuggestions.slice(0, 3).map((suggestion, index) => (
              <View key={index} style={styles.aiSuggestion}>
                <Text style={styles.suggestionTitle}>{suggestion.title}</Text>
                <Text style={styles.suggestionText}>{suggestion.description}</Text>
                <Text style={styles.fixInstructions}>How to fix: {suggestion.howToFix}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
      
      {/* Fourth page - Competitor Comparison and Action Checklist */}
      <Page size="A4" style={styles.page}>
        {/* Competitor Comparison */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Competitor Comparison</Text>
          <CompetitorComparison 
            yourScores={{
              performance: performanceScore,
              seo: seoScore,
              accessibility: accessibilityScore
            }}
          />
        </View>
        
        {/* AI-Powered Recommendations */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>AI-Powered Recommendations</Text>
          <Text style={styles.smallText}>
            Our AI has analyzed your website and identified the following key opportunities for improvement,
            with clear explanations of why they matter and how to implement them:
          </Text>
          
          <View style={styles.detailSection}>
            {[
              ...performanceOptimizations.slice(0, 1),
              ...seoOptimizations.slice(0, 1),
              ...uxSuggestions.slice(0, 1)
            ].map((recommendation, index) => (
              <View key={index} style={{
                marginBottom: 14,
                padding: 8,
                backgroundColor: "#F9FAFB",
                borderRadius: 4,
                borderLeft: "3 solid #4F46E5",
                position: "relative"
              }}>
                <View style={[
                  styles.priorityBadge, 
                  { backgroundColor: recommendation.impact === 'High' ? '#EF4444' : 
                                    recommendation.impact === 'Medium' ? '#F59E0B' : '#10B981' }
                ]}>
                  <Text>{recommendation.impact === 'High' ? 'HIGH' : 
                         recommendation.impact === 'Medium' ? 'MED' : 'LOW'}</Text>
                </View>
                
                <Text style={styles.suggestionTitle}>{recommendation.title}</Text>
                <Text style={styles.suggestionText}>{recommendation.description}</Text>
                
                <View style={{marginTop: 6, paddingTop: 6, borderTop: "1 dashed #E2E8F0"}}>
                  <Text style={[styles.smallText, {fontWeight: 'bold', color: '#1E293B'}]}>
                    Why It Matters:
                  </Text>
                  <Text style={[styles.smallText, {color: '#4B5563'}]}>
                    {recommendation.impact === 'High' 
                      ? "This issue has a significant impact on your website's performance and user experience."
                      : recommendation.impact === 'Medium'
                        ? "Addressing this will provide a noticeable improvement to your website."
                        : "This is a refinement that will help polish your website experience."}
                  </Text>
                </View>
                
                <View style={{marginTop: 6}}>
                  <Text style={[styles.smallText, {fontWeight: 'bold', color: '#1E293B'}]}>
                    How to Fix:
                  </Text>
                  <Text style={[styles.smallText, {color: '#4B5563'}]}>
                    {recommendation.howToFix}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Action Checklist */}
        <View style={styles.section}>
          <ActionChecklist
            performanceItems={checklistItems.performance}
            seoItems={checklistItems.seo}
            accessibilityItems={checklistItems.accessibility}
            securityItems={checklistItems.security}
          />
        </View>
      </Page>
      
      {/* Final page with branding and footer */}
      <Page size="A4" style={styles.page}>
        {/* Security Analysis Summary */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Security Analysis Summary</Text>
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreCircle, { backgroundColor: securityScore >= 90 ? "#10B981" : securityScore >= 70 ? "#F59E0B" : "#EF4444" }]}>
              <Text style={styles.scoreText}>{securityScore}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.emphasizedText}>
                {securityScore >= 90 
                  ? "Strong Security Implementation" 
                  : securityScore >= 70 
                    ? "Moderate Security Implementation" 
                    : "Poor Security Implementation"}
              </Text>
              <Text style={styles.smallText}>
                {securityIssues.length === 0 
                  ? "Your website has good security measures in place, though regular monitoring is still recommended." 
                  : `Detected ${securityIssues.length} security ${securityIssues.length === 1 ? 'issue' : 'issues'} that could potentially expose your website and users to risks.`}
              </Text>
            </View>
          </View>
          
          <View style={styles.calloutBox}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>Business Impact of Security Vulnerabilities:</Text>
            <Text style={styles.smallText}>
              The average cost of a data breach in 2023 was $4.45 million, a 15% increase over 3 years.
              60% of small businesses close within 6 months of a cyber attack.
              Security breaches can lead to data theft, financial losses, regulatory penalties, and severe reputation damage.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>Key Security Findings:</Text>
          <View style={styles.detailSection}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemContent}>
                <Text style={{fontWeight: 'bold'}}>HTTPS: </Text>
                {results?.security?.https ? "Enabled ✓" : "Not Enabled ✗"}
                {!results?.security?.https && " - This is a critical security issue that should be fixed immediately."}
              </Text>
            </View>
            
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemContent}>
                <Text style={{fontWeight: 'bold'}}>Security Headers: </Text>
                {(results?.security?.securityHeaders?.missing || []).length === 0 
                  ? "All important headers present ✓" 
                  : `Missing ${(results?.security?.securityHeaders?.missing || []).length} important headers ✗`}
              </Text>
            </View>
            
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.itemContent}>
                <Text style={{fontWeight: 'bold'}}>Critical Vulnerabilities: </Text>
                {securityIssues.filter(issue => issue.severity === 'high').length === 0 
                  ? "None detected ✓" 
                  : `${securityIssues.filter(issue => issue.severity === 'high').length} found ✗`}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.subtitle}>Checklist Summary</Text>
          <Text style={styles.smallText}>Based on our analysis, here are the key actions you should take:</Text>
          
          <View style={{marginTop: 10, marginBottom: 20}}>
            <View style={[styles.statusBadge, styles.statusBad, {alignSelf: 'flex-start'}]}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>CRITICAL (FIX NOW)</Text>
            </View>
            <View style={{marginTop: 5}}>
              {[
                ...checklistItems.security.filter(item => item.priority === "high"),
                ...checklistItems.performance.filter(item => item.priority === "high")
              ].slice(0, 3).map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemContent}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={{marginBottom: 20}}>
            <View style={[styles.statusBadge, styles.statusWarning, {alignSelf: 'flex-start'}]}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>IMPORTANT (WITHIN 30 DAYS)</Text>
            </View>
            <View style={{marginTop: 5}}>
              {[
                ...checklistItems.seo.filter(item => item.priority === "medium"),
                ...checklistItems.accessibility.filter(item => item.priority === "medium")
              ].slice(0, 3).map((item, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemContent}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        {/* Branding Footer */}
        <View style={{marginTop: 'auto', paddingTop: 20}}>
          <View style={styles.brandingFooter}>
            <InsightSnapLogo />
            <View>
              <Text style={styles.footerText}>
                © InsightSnap 2025 | <Text style={styles.footerLink}>insightsnap.ai</Text>
              </Text>
              <Text style={styles.footerText}>
                Report generated on {new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </Page>
      
      {/* Add the Upsell Page */}
      <UpsellPage />
    </Document>
  );
};

export default PDFReport;