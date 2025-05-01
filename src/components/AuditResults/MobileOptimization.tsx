import React from 'react';
import ScoreIndicator from '@/components/ui/ScoreIndicator';

interface MobileOptimizationProps {
  results: any;
}

const MobileOptimization: React.FC<MobileOptimizationProps> = ({ results }) => {
  // Extract mobile-specific metrics from the audit results
  const getMobileScore = () => {
    try {
      // Try to get from Lighthouse scores
      const mobileFriendlyScore = Math.round((results?.lighthouse?.categories?.['pwa']?.score || 0) * 100);
      
      // If that's not available, calculate from individual metrics
      if (mobileFriendlyScore === 0) {
        const touchTargetsScore = Math.round((results?.lighthouse?.audits?.['tap-targets']?.score || 0) * 100);
        const viewportScore = Math.round((results?.lighthouse?.audits?.['viewport']?.score || 0) * 100);
        const fontSizeScore = Math.round((results?.lighthouse?.audits?.['font-size']?.score || 0) * 100);
        const responsiveImagesScore = Math.round((results?.lighthouse?.audits?.['uses-responsive-images']?.score || 0) * 100);
        
        return Math.round((touchTargetsScore + viewportScore + fontSizeScore + responsiveImagesScore) / 4);
      }
      
      return mobileFriendlyScore;
    } catch (err) {
      console.error('Error calculating mobile score:', err);
      return 50; // Default fallback
    }
  };
  
  const mobileScore = getMobileScore();
  
  // Get individual mobile metrics
  const getMobileMetrics = () => {
    return {
      viewportConfigured: results?.lighthouse?.audits?.['viewport']?.score >= 0.9,
      touchTargetsAdequate: results?.lighthouse?.audits?.['tap-targets']?.score >= 0.9,
      textSizeReadable: results?.lighthouse?.audits?.['font-size']?.score >= 0.9,
      usesResponsiveImages: results?.lighthouse?.audits?.['uses-responsive-images']?.score >= 0.9,
      mobileSpeed: Math.round((results?.lighthouse?.audits?.['speed-index']?.score || 0) * 100),
    };
  };
  
  const metrics = getMobileMetrics();
  
  // Generate recommendations based on metrics
  const getRecommendations = () => {
    const recommendations = [];
    
    if (!metrics.viewportConfigured) {
      recommendations.push({
        title: "Configure Viewport",
        description: "Add a proper viewport meta tag to ensure your site displays correctly on mobile devices.",
        impact: "High"
      });
    }
    
    if (!metrics.touchTargetsAdequate) {
      recommendations.push({
        title: "Fix Touch Targets",
        description: "Ensure buttons and links are large enough (at least 48px x 48px) and have adequate spacing for mobile users.",
        impact: "Medium"
      });
    }
    
    if (!metrics.textSizeReadable) {
      recommendations.push({
        title: "Improve Text Readability",
        description: "Use a base font size of at least 16px and ensure text is readable without zooming.",
        impact: "High"
      });
    }
    
    if (!metrics.usesResponsiveImages) {
      recommendations.push({
        title: "Implement Responsive Images",
        description: "Use srcset and size attributes to serve different-sized images based on device capabilities.",
        impact: "Medium"
      });
    }
    
    if (metrics.mobileSpeed < 70) {
      recommendations.push({
        title: "Improve Mobile Page Speed",
        description: "Optimize resources and reduce render-blocking CSS/JavaScript to improve mobile loading times.",
        impact: "High"
      });
    }
    
    return recommendations;
  };
  
  const recommendations = getRecommendations();

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-brand-primary">
          <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
          <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
        </svg>
        Mobile Optimization
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-shrink-0 flex flex-col items-center mb-4 md:mb-0 md:mr-8">
          <ScoreIndicator score={mobileScore} size="lg" showLabel={true} />
        </div>
        
        <div className="flex-1">
          <p className="text-gray-700 mb-4">
            {mobileScore >= 80 
              ? "Your site is well-optimized for mobile devices." 
              : mobileScore >= 60 
                ? "Your site has some mobile-friendly aspects but needs improvements." 
                : "Your site needs significant mobile optimization improvements."}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-semibold mb-2">Mobile Metrics</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Viewport Configured</span>
                  <span className={metrics.viewportConfigured ? "text-green-600" : "text-red-600"}>
                    {metrics.viewportConfigured ? "Yes" : "No"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Touch Targets Size</span>
                  <span className={metrics.touchTargetsAdequate ? "text-green-600" : "text-red-600"}>
                    {metrics.touchTargetsAdequate ? "Adequate" : "Too Small"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Text Readability</span>
                  <span className={metrics.textSizeReadable ? "text-green-600" : "text-red-600"}>
                    {metrics.textSizeReadable ? "Good" : "Poor"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Responsive Images</span>
                  <span className={metrics.usesResponsiveImages ? "text-green-600" : "text-red-600"}>
                    {metrics.usesResponsiveImages ? "Yes" : "No"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Mobile Speed</span>
                  <span className={
                    metrics.mobileSpeed >= 80 ? "text-green-600" : 
                    metrics.mobileSpeed >= 60 ? "text-yellow-600" : "text-red-600"
                  }>
                    {metrics.mobileSpeed}%
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-semibold mb-2">Why It Matters</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Over 50% of global web traffic comes from mobile devices</li>
                <li>• Google uses mobile-first indexing for search rankings</li>
                <li>• Mobile users abandon slow sites after just 3 seconds</li>
                <li>• Poor mobile UX can significantly increase bounce rates</li>
              </ul>
            </div>
          </div>
          
          {recommendations.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Recommendations</h3>
              <div className="space-y-2">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white p-2 border border-gray-200 rounded text-sm">
                    <div className="font-medium flex items-center justify-between">
                      {rec.title}
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        rec.impact === 'High' ? 'bg-red-100 text-red-800' : 
                        rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.impact}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileOptimization; 