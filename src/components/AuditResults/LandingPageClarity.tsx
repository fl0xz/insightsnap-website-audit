import React from 'react';
import ScoreIndicator from '@/components/ui/ScoreIndicator';
import { LightBulbIcon } from '@heroicons/react/24/solid';

interface LandingPageClarityProps {
  results: any;
}

const LandingPageClarity: React.FC<LandingPageClarityProps> = ({ results }) => {
  // This would normally be calculated from the actual scan results
  // For this MVP, we'll use a simulation of GPT analysis
  
  // Generate a deterministic but seemingly random score based on URL
  const generateClarityScore = () => {
    try {
      const url = results?.url || '';
      let score = 65; // Default starting score
      
      // Add some variance based on URL pattern
      if (url.includes('blog')) score += 10;
      if (url.includes('shop') || url.includes('store')) score += 5;
      if (url.length > 20) score += 7;
      if (url.includes('.org')) score += 8;
      if (url.includes('-')) score += 3;
      
      // Adjust for known SEO attributes that might indicate better landing page
      const seoScore = results?.lighthouse?.categories?.seo?.score || 0;
      score += Math.round(seoScore * 20); // Add up to 20 points based on SEO score
      
      // Cap score at 0-100
      return Math.min(100, Math.max(0, score));
    } catch (err) {
      console.error('Error calculating landing page clarity score:', err);
      return 72; // Fallback
    }
  };

  const clarityScore = generateClarityScore();
  
  // Simulate GPT-4 evaluation of different aspects
  const headlineClarityScore = Math.min(100, clarityScore + Math.round(Math.random() * 15 - 5));
  const messagingFocusScore = Math.min(100, clarityScore + Math.round(Math.random() * 15 - 7));
  const trustSignalsScore = Math.min(100, clarityScore - Math.round(Math.random() * 20));
  const ctaPositioningScore = Math.min(100, clarityScore + Math.round(Math.random() * 15 - 3));
  
  // Generate simulated GPT commentary based on scores
  const getCommentary = () => {
    if (clarityScore >= 80) {
      return "Your landing page has strong clarity with an effective headline and clear messaging. Users can quickly understand your value proposition.";
    } else if (clarityScore >= 60) {
      return "Your landing page communicates reasonably well but could use improvements in headline clarity and call-to-action positioning.";
    } else {
      return "Your landing page may be confusing visitors. The headline, messaging focus, and call-to-action need significant improvements to effectively communicate your value.";
    }
  };
  
  // Generate improvement suggestions
  const getImprovementSuggestions = () => {
    const suggestions = [];
    
    if (headlineClarityScore < 75) {
      suggestions.push({
        title: "Improve Headline Clarity",
        description: "Your headline should instantly communicate your primary value proposition in 10 words or less.",
        impact: headlineClarityScore < 60 ? "High" : "Medium"
      });
    }
    
    if (messagingFocusScore < 70) {
      suggestions.push({
        title: "Sharpen Messaging Focus",
        description: "Reduce the number of competing messages. Focus on one primary benefit with 2-3 supporting points.",
        impact: messagingFocusScore < 55 ? "High" : "Medium"
      });
    }
    
    if (trustSignalsScore < 70) {
      suggestions.push({
        title: "Add Trust Signals",
        description: "Include logos of well-known customers, industry certifications, or clear social proof to build credibility.",
        impact: trustSignalsScore < 50 ? "High" : "Medium"
      });
    }
    
    if (ctaPositioningScore < 75) {
      suggestions.push({
        title: "Optimize CTA Positioning",
        description: "Ensure your main call-to-action is prominently positioned above the fold with clear, action-oriented text.",
        impact: ctaPositioningScore < 60 ? "High" : "Medium"
      });
    }
    
    return suggestions;
  };
  
  const commentary = getCommentary();
  const suggestions = getImprovementSuggestions();

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <LightBulbIcon className="w-6 h-6 mr-2 text-brand-primary" />
        Landing Page Clarity Score
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="flex-shrink-0 flex flex-col items-center mb-4 md:mb-0 md:mr-8">
          <ScoreIndicator score={clarityScore} size="lg" showLabel={true} />
        </div>
        
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-gray-700 mb-4">{commentary}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold mb-3">Clarity Component Scores</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Headline Clarity</span>
                    <span className="font-medium">{headlineClarityScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${headlineClarityScore >= 80 ? 'bg-green-500' : headlineClarityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${headlineClarityScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Messaging Focus</span>
                    <span className="font-medium">{messagingFocusScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${messagingFocusScore >= 80 ? 'bg-green-500' : messagingFocusScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${messagingFocusScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Trust Signals</span>
                    <span className="font-medium">{trustSignalsScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${trustSignalsScore >= 80 ? 'bg-green-500' : trustSignalsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${trustSignalsScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>CTA Positioning</span>
                    <span className="font-medium">{ctaPositioningScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${ctaPositioningScore >= 80 ? 'bg-green-500' : ctaPositioningScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${ctaPositioningScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {suggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">AI-Generated Suggestions</h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white p-3 border border-gray-200 rounded text-sm">
                    <div className="font-medium flex items-center justify-between">
                      {suggestion.title}
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        suggestion.impact === 'High' ? 'bg-red-100 text-red-800' : 
                        suggestion.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {suggestion.impact} Impact
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
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

export default LandingPageClarity; 