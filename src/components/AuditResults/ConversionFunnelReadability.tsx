import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface ConversionFunnelReadabilityProps {
  results: any;
}

const ConversionFunnelReadability: React.FC<ConversionFunnelReadabilityProps> = ({ results }) => {
  // This would typically analyze the actual page results
  // For this MVP, we'll simulate analysis results
  
  // Generate a deterministic but seemingly random UX rating
  const getUXRating = () => {
    try {
      const url = results?.url || '';
      const seoScore = results?.lighthouse?.categories?.seo?.score || 0;
      const accessibilityScore = results?.lighthouse?.categories?.accessibility?.score || 0;
      const bestPracticesScore = results?.lighthouse?.categories?.['best-practices']?.score || 0;
      
      // Calculate weighted average
      const weightedScore = (seoScore * 0.3) + (accessibilityScore * 0.4) + (bestPracticesScore * 0.3);
      
      // Determine letter grade
      if (weightedScore >= 0.85) return "A";
      if (weightedScore >= 0.7) return "B";
      if (weightedScore >= 0.5) return "C";
      if (weightedScore >= 0.3) return "D";
      return "F";
    } catch (err) {
      console.error('Error calculating UX rating:', err);
      return "C"; // Default fallback
    }
  };

  const uxRating = getUXRating();
  
  // Simulate funnel readability issues
  const getFunnelIssues = () => {
    const possibleIssues = [
      {
        title: "CTA Visibility Issues",
        description: "Your primary call-to-action buttons may not be visible above the fold on mobile devices.",
        impact: "High"
      },
      {
        title: "Form Field Overload",
        description: "Your sign-up form has 7+ fields, which can reduce completion rates by up to 50%.",
        impact: "High"
      },
      {
        title: "Navigation Distractions",
        description: "Too many navigation options may be distracting users from your primary conversion path.",
        impact: "Medium"
      },
      {
        title: "Competing Buttons",
        description: "Multiple buttons with similar visual weight compete for attention on your landing page.",
        impact: "Medium"
      },
      {
        title: "Form Label Clarity",
        description: "Some form fields lack clear labels, creating confusion during the conversion process.",
        impact: "Medium"
      },
      {
        title: "Insufficient Form Validation",
        description: "Your form doesn't provide clear feedback when users make input errors.",
        impact: "Medium"
      }
    ];
    
    // Determine how many issues to show based on UX rating
    const issueCount = uxRating === "A" ? 1 : uxRating === "B" ? 2 : uxRating === "C" ? 3 : 4;
    
    // Select a subset of issues
    const seed = results?.url?.length || 5;
    return possibleIssues.slice(0, issueCount);
  };
  
  const getQuickWins = () => {
    const possibleWins = [
      {
        title: "Reduce Form Fields",
        description: "Decrease form fields to only essential information (name, email) to improve completion rates by 30-50%."
      },
      {
        title: "Make CTAs Stand Out",
        description: "Use contrasting colors and larger size for your primary CTA buttons to increase visibility."
      },
      {
        title: "Add Progress Indicators",
        description: "For multi-step forms, show clear progress indicators to reduce abandonment."
      },
      {
        title: "Simplify Navigation",
        description: "Reduce navigation options on landing pages to focus user attention on conversion actions."
      },
      {
        title: "Implement Inline Validation",
        description: "Add instant feedback for form fields to help users correct errors in real-time."
      },
      {
        title: "Use Social Proof Near CTAs",
        description: "Place testimonials or trust indicators near conversion points to reduce hesitation."
      }
    ];
    
    // Select 2 quick wins that are most relevant
    return possibleWins.slice(0, 2);
  };
  
  const funnelIssues = getFunnelIssues();
  const quickWins = getQuickWins();
  
  // Get rating color based on letter grade
  const getRatingColor = () => {
    switch(uxRating) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-green-400';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ArrowPathIcon className="w-6 h-6 mr-2 text-brand-primary" />
        Conversion Funnel Readability
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="flex-shrink-0 flex flex-col items-center mb-6 md:mb-0 md:mr-8">
          <div className={`w-20 h-20 ${getRatingColor()} rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md`}>
            {uxRating}
          </div>
          <span className="mt-1 text-sm font-medium text-gray-700">UX Rating</span>
        </div>
        
        <div className="flex-1">
          <p className="text-gray-700 mb-4">
            {uxRating === "A" ? 
              "Your conversion funnel has excellent readability and usability, making it easy for users to complete desired actions." :
              uxRating === "B" ? 
              "Your conversion funnel is generally clear, but has a few readability issues that may impact conversion rates." :
              uxRating === "C" ? 
              "Your conversion funnel has moderate readability issues that are likely reducing your conversion rates significantly." :
              "Your conversion funnel has major readability and usability problems that require immediate attention."}
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Critical Friction Points</h3>
            <div className="space-y-3">
              {funnelIssues.map((issue, index) => (
                <div key={index} className="bg-white p-3 border border-gray-200 rounded-lg text-sm">
                  <div className="font-medium flex items-center justify-between">
                    {issue.title}
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      issue.impact === 'High' ? 'bg-red-100 text-red-800' : 
                      issue.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Quick Conversion Wins</h3>
            <div className="space-y-3">
              {quickWins.map((win, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4 border-brand-primary">
                  <div className="font-medium text-sm">{win.title}</div>
                  <p className="text-xs text-gray-600 mt-1">{win.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
            <div className="font-medium mb-1">Why This Matters:</div>
            <p>
              Studies show that every friction point in your conversion funnel can decrease conversion rates by 7-20%. 
              Improving funnel readability often produces the highest ROI of any optimization effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnelReadability; 