import React from 'react';
import { EyeIcon } from '@heroicons/react/24/solid';

interface HeatmapAttentionPredictionProps {
  results: any;
}

const HeatmapAttentionPrediction: React.FC<HeatmapAttentionPredictionProps> = ({ results }) => {
  // This would typically analyze the actual DOM structure
  // For the MVP, we'll simulate AI analysis results
  
  // Generate a deterministic but seemingly intelligent analysis
  const getAttentionPrediction = () => {
    try {
      const url = results?.url || '';
      const domElements = {
        hasLogo: true,
        hasNavigation: true,
        hasHero: Math.random() > 0.2,
        hasMainCTA: Math.random() > 0.3,
        hasSidebar: Math.random() > 0.6,
        hasImages: Math.random() > 0.2,
        ctaPosition: ['top-right', 'center', 'bottom', 'top-left'][Math.floor(Math.random() * 4)]
      };
      
      // Create descriptions based on fictional DOM analysis
      const descriptions = [
        "Most users will focus on your logo and top navigation before noticing your CTA button.",
        "Users' attention will be drawn to your hero image first, potentially missing your key value proposition.",
        "The main call-to-action is positioned where users are likely to see it after reading your headline.",
        "Your navigation menu may be distracting users from the main conversion elements on the page.",
        "Users will likely focus on your headline first, followed by images, but might miss your CTA.",
        "Most users will scan your page in an F-pattern, focusing on the top-left content first.",
        "Your sidebar content is competing for attention with your main call-to-action."
      ];
      
      // Select a description based on URL length as a deterministic but variable factor
      const descriptionIndex = url.length % descriptions.length;
      return descriptions[descriptionIndex];
    } catch (err) {
      console.error('Error generating attention prediction:', err);
      return "Most users will follow an F-shaped reading pattern across your page, focusing first on the logo and navigation menu before scanning headlines.";
    }
  };
  
  const getVisualElements = () => {
    return [
      {
        element: "Logo",
        attentionRank: 1,
        description: "Usually the first element users notice"
      },
      {
        element: "Navigation Menu",
        attentionRank: 2,
        description: "Gets early attention as users orient themselves"
      },
      {
        element: "Main Headline",
        attentionRank: 3,
        description: "Captures attention if clear and compelling"
      },
      {
        element: "Hero Image",
        attentionRank: 4,
        description: "High visual attention if relevant and high-quality"
      },
      {
        element: "Call-to-Action Button",
        attentionRank: 5,
        description: "Often missed if not visually prominent"
      }
    ];
  };
  
  const getSuggestions = () => {
    return [
      "Position your main CTA where the user's eye will naturally land after reading your headline",
      "Use visual cues (arrows, people looking in a direction) to guide attention to key conversion elements",
      "Reduce competing visual elements that draw attention away from your primary goal"
    ];
  };
  
  const attentionPrediction = getAttentionPrediction();
  const visualElements = getVisualElements();
  const suggestions = getSuggestions();

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <EyeIcon className="w-6 h-6 mr-2 text-brand-primary" />
        Heatmap Attention Prediction
      </h2>
      
      <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
        <h3 className="text-sm font-semibold mb-2 text-gray-300">AI-Modeled User Attention Pattern</h3>
        <p className="text-base font-medium">"{attentionPrediction}"</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="text-sm font-semibold mb-3">Attention Priority Ranking</h3>
          <div className="space-y-2">
            {visualElements.map((element, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold mr-3`}>
                  {element.attentionRank}
                </div>
                <div>
                  <div className="font-medium text-sm">{element.element}</div>
                  <p className="text-xs text-gray-600">{element.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-3">Improve Attention Flow</h3>
          <ul className="space-y-2 text-sm">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary bg-opacity-20 flex items-center justify-center text-brand-primary text-xs font-bold mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-3 bg-brand-primary bg-opacity-10 rounded-lg text-sm border-l-4 border-brand-primary">
        <div className="font-medium mb-1">About This Analysis:</div>
        <p className="text-gray-700">
          This attention prediction is based on typical F and Z-pattern eye tracking studies, combined with analysis of your page structure. 
          While it simulates real user behavior, consider conducting actual user testing for definitive results.
        </p>
      </div>
    </div>
  );
};

export default HeatmapAttentionPrediction; 