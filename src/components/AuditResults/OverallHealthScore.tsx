import React from 'react';
import ScoreIndicator from '@/components/ui/ScoreIndicator';
import { TrafficLightIndicator } from '@/components/PDFReport/TrafficLightIndicator';

interface OverallHealthScoreProps {
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  securityScore: number;
}

const OverallHealthScore: React.FC<OverallHealthScoreProps> = ({
  performanceScore,
  seoScore,
  accessibilityScore,
  bestPracticesScore,
  securityScore,
}) => {
  // Calculate the combined score
  const calculateCombinedScore = () => {
    // Weight the scores - performance and security are weighted more heavily
    const weightedScore = 
      (performanceScore * 0.30) + 
      (seoScore * 0.25) + 
      (accessibilityScore * 0.15) + 
      (bestPracticesScore * 0.15) + 
      (securityScore * 0.15);
      
    return Math.round(weightedScore);
  };

  const overallScore = calculateCombinedScore();

  // Get description text based on score
  const getScoreDescription = () => {
    if (overallScore >= 80) {
      return "Excellent! Your website is performing well across most areas with only minor improvements needed.";
    } else if (overallScore >= 60) {
      return "Good foundation, but there are several important opportunities to improve your website's performance and effectiveness.";
    } else {
      return "Your website needs significant improvements in multiple areas to meet modern web standards and user expectations.";
    }
  };

  return (
    <div className="gradient-card mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-brand-primary">
          <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
        </svg>
        Overall Health Score
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-shrink-0 flex flex-col items-center mb-4 md:mb-0 md:mr-8">
          <ScoreIndicator score={overallScore} size="lg" showLabel={true} />
        </div>
        
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">{getScoreDescription()}</p>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-semibold mb-2">Score Breakdown</div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                  Performance: {performanceScore}%
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                  SEO: {seoScore}%
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                  Accessibility: {accessibilityScore}%
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                  Best Practices: {bestPracticesScore}%
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                  Security: {securityScore}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-semibold mb-1">Health Indicator</div>
            <div className="flex items-center">
              <div className="h-8 w-full max-w-md bg-gray-200 rounded-full relative overflow-hidden mr-2">
                <div className="absolute top-0 left-0 flex w-full">
                  <div className="h-8 bg-score-poor w-1/3"></div>
                  <div className="h-8 bg-score-average w-1/3"></div>
                  <div className="h-8 bg-score-good w-1/3"></div>
                </div>
                <div 
                  className="absolute h-8 w-1 bg-gray-800 top-0" 
                  style={{ left: `${Math.min(100, Math.max(0, overallScore))}%`, transform: 'translateX(-50%)' }}
                ></div>
              </div>
              <div className="text-sm font-medium">{overallScore}%</div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1 max-w-md">
              <span>Poor</span>
              <span>Average</span>
              <span>Good</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallHealthScore; 