// Helper functions for the enhanced PDF report

// Calculate and return the combined score from performance, SEO, accessibility, and security scores
export const calculateCombinedScore = (
  performanceScore: number, 
  seoScore: number, 
  accessibilityScore: number, 
  securityScore: number
): number => {
  // Weight the scores - performance and security are weighted more heavily
  const weightedScore = 
    (performanceScore * 0.35) + 
    (seoScore * 0.25) + 
    (accessibilityScore * 0.15) + 
    (securityScore * 0.25);
    
  return Math.round(weightedScore);
};

// Get detailed SEO breakdown data from the audit results
export const getSeoBreakdown = (results: any) => {
  const seoData = {
    hasTitleTag: results?.lighthouse?.audits?.['document-title']?.score >= 0.9,
    hasMetaDescription: results?.lighthouse?.audits?.['meta-description']?.score >= 0.9,
    hasBrokenLinks: results?.seo?.brokenLinks && results.seo.brokenLinks.length > 0,
    brokenLinksCount: results?.seo?.brokenLinks?.length || 0,
    hasSchemaMarkup: results?.seo?.schemaMarkup || false,
    hasOpenGraph: results?.seo?.openGraph || 
                  (results?.lighthouse?.audits?.['social-cards'] && 
                   results.lighthouse.audits['social-cards'].score >= 0.9),
    altTextCoverage: calculateAltTextCoverage(results),
    hasSitemap: results?.seo?.sitemap || false,
    hasRobotsTxt: results?.seo?.robotsTxt || false
  };
  
  return seoData;
};

// Calculate percentage of images with alt text
const calculateAltTextCoverage = (results: any): number => {
  try {
    if (results?.accessibility?.images) {
      const total = results.accessibility.images.total || 0;
      const withAlt = results.accessibility.images.withAlt || 0;
      
      if (total === 0) return 100; // No images
      return Math.round((withAlt / total) * 100);
    }
    
    // Fallback calculation from Lighthouse
    if (results?.lighthouse?.audits?.['image-alt']) {
      const score = results.lighthouse.audits['image-alt'].score || 0;
      return Math.round(score * 100);
    }
    
    return 70; // Default fallback
  } catch (err) {
    console.error("Error calculating alt text coverage:", err);
    return 70; // Default fallback
  }
};

// Get mobile optimization data from the audit results
export const getMobileOptimization = (results: any) => {
  return {
    touchTargetSize: results?.lighthouse?.audits?.['tap-targets']?.score >= 0.9,
    touchTargetScore: Math.round((results?.lighthouse?.audits?.['tap-targets']?.score || 0) * 100),
    viewportConfigured: results?.lighthouse?.audits?.['viewport']?.score >= 0.9,
    fontSizeReadable: results?.lighthouse?.audits?.['font-size']?.score >= 0.9,
    fontSizeScore: Math.round((results?.lighthouse?.audits?.['font-size']?.score || 0) * 100),
    usesResponsiveImages: results?.lighthouse?.audits?.['uses-responsive-images']?.score >= 0.9,
    mobileScore: Math.round((results?.lighthouse?.categories?.['pwa']?.score || 0) * 100)
  };
};

// Generate UX/Design evaluation from available data
export const getUXEvaluation = (results: any) => {
  const contrastScore = Math.round((results?.lighthouse?.audits?.['color-contrast']?.score || 0) * 100);
  const textSpacingGood = results?.lighthouse?.audits?.['logical-tab-order']?.score >= 0.9;
  
  return {
    contrastGood: contrastScore >= 70,
    contrastScore,
    textSpacingGood,
    layoutShiftScore: Math.round((results?.lighthouse?.audits?.['cumulative-layout-shift']?.score || 0) * 100),
    hasLayoutShiftIssues: results?.lighthouse?.audits?.['cumulative-layout-shift']?.score < 0.9,
    readabilityGood: contrastScore >= 70 && textSpacingGood,
    spacingGood: textSpacingGood
  };
};

// Get priority level for different issues
export const getPriorityLevel = (score: number) => {
  if (score < 50) return "Must fix now";
  if (score < 80) return "Fix in next 30 days";
  return "Nice to have";
};

// Format security score as a percentage 
export const calculateSecurityScore = (results: any): number => {
  try {
    if (results?.security?.score) return Math.round(results.security.score * 100);
    
    // Calculate from security issues if score not directly available
    const isSecure = results?.security?.isSecure || false;
    const issues = results?.security?.issues || [];
    const missingHeaders = results?.security?.securityHeaders?.missing || [];
    
    if (isSecure && issues.length === 0 && missingHeaders.length === 0) return 100;
    
    // Count critical issues
    const criticalIssues = issues.filter((i: any) => i.severity === 'high').length;
    
    // Base score of 70 if HTTPS is enabled
    let score = results?.security?.https ? 70 : 30;
    
    // Deduct for issues
    score -= criticalIssues * 15;
    score -= (issues.length - criticalIssues) * 5;
    
    // Deduct for missing headers (less impact)
    score -= missingHeaders.length * 3;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  } catch (err) {
    console.error("Error calculating security score:", err);
    return 50; // Default fallback
  }
}; 