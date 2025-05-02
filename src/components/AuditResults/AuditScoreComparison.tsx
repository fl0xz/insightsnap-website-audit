import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface AuditScoreComparisonProps {
  results: any;
  isAuthenticated: boolean;
  userPlan: 'free' | 'pro' | 'agency' | null;
}

const AuditScoreComparison: React.FC<AuditScoreComparisonProps> = ({ 
  results, 
  isAuthenticated,
  userPlan 
}) => {
  // This would normally compare with previous audit data
  // For this MVP, we'll simulate previous scores
  
  const getCurrentScores = () => {
    return {
      performance: Math.round((results?.lighthouse?.categories?.performance?.score || 0.5) * 100),
      seo: Math.round((results?.lighthouse?.categories?.seo?.score || 0.5) * 100),
      accessibility: Math.round((results?.lighthouse?.categories?.accessibility?.score || 0.5) * 100),
      bestPractices: Math.round((results?.lighthouse?.categories?.['best-practices']?.score || 0.5) * 100)
    };
  };
  
  const getPreviousScores = () => {
    // Generate previous scores that are generally lower than current ones
    const current = getCurrentScores();
    
    return {
      performance: Math.max(0, current.performance - 8 - Math.floor(Math.random() * 7)),
      seo: Math.max(0, current.seo - 5 - Math.floor(Math.random() * 5)),
      accessibility: Math.max(0, current.accessibility - 3 - Math.floor(Math.random() * 6)),
      bestPractices: Math.max(0, current.bestPractices - 4 - Math.floor(Math.random() * 5))
    };
  };
  
  // Calculate differences between current and previous scores
  const calculateDifferences = () => {
    const current = currentScores;
    const previous = previousScores;
    
    return {
      performance: current.performance - previous.performance,
      seo: current.seo - previous.seo,
      accessibility: current.accessibility - previous.accessibility,
      bestPractices: current.bestPractices - previous.bestPractices,
      total: Math.round(
        (current.performance + current.seo + current.accessibility + current.bestPractices) / 4 -
        (previous.performance + previous.seo + previous.accessibility + previous.bestPractices) / 4
      )
    };
  };
  
  // Generate improvement recommendations based on the scores
  const getImprovementFocus = () => {
    // Find the metric with the lowest score
    const scores = currentScores;
    const lowestCategory = Object.entries(scores).reduce(
      (lowest, [category, score]) => score < lowest.score ? { category, score } : lowest,
      { category: 'performance', score: 100 }
    );
    
    // Generate a recommendation based on the lowest score
    const recommendations = {
      performance: "Focus on reducing JavaScript execution time and optimizing images to boost your performance score.",
      seo: "Improve your meta descriptions and fix crawlability issues to enhance your search engine visibility.",
      accessibility: "Add proper ARIA labels and improve color contrast to make your site more accessible.",
      bestPractices: "Update outdated libraries and fix HTTPS issues to align with web best practices."
    };
    
    return recommendations[lowestCategory.category as keyof typeof recommendations];
  };
  
  const currentScores = getCurrentScores();
  const previousScores = getPreviousScores();
  const differences = calculateDifferences();
  const improvementFocus = getImprovementFocus();
  
  // Format date for "last audit" display
  const getPreviousAuditDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 14); // Two weeks ago
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const previousAuditDate = getPreviousAuditDate();

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-brand-primary">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z" clipRule="evenodd" />
        </svg>
        Audit Score Comparison
      </h2>
      
      {!isAuthenticated && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Track Your Progress</h3>
          <p className="text-gray-600 mb-4">
            Sign up to compare your current audit with previous results and track improvements over time.
          </p>
          <button className="bg-brand-primary hover:bg-brand-dark text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Create An Account
          </button>
        </div>
      )}
      
      {isAuthenticated && (
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Overall Improvement</h3>
                <p className="text-sm text-gray-600">Compared to your last audit on {previousAuditDate}</p>
              </div>
              <div className={`text-2xl font-bold flex items-center ${differences.total > 0 ? 'text-green-600' : differences.total < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {differences.total > 0 && <ArrowUpIcon className="w-5 h-5 mr-1" />}
                {differences.total < 0 && <ArrowDownIcon className="w-5 h-5 mr-1" />}
                {differences.total > 0 ? '+' : ''}{differences.total}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ScoreComparisonCard 
                title="Performance" 
                currentScore={currentScores.performance} 
                difference={differences.performance} 
              />
              <ScoreComparisonCard 
                title="SEO" 
                currentScore={currentScores.seo} 
                difference={differences.seo} 
              />
              <ScoreComparisonCard 
                title="Accessibility" 
                currentScore={currentScores.accessibility} 
                difference={differences.accessibility} 
              />
              <ScoreComparisonCard 
                title="Best Practices" 
                currentScore={currentScores.bestPractices} 
                difference={differences.bestPractices} 
              />
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold mb-2">Where to Focus Next</h3>
            <p className="text-sm text-gray-700">
              {improvementFocus}
            </p>
            
            <div className="bg-brand-primary bg-opacity-5 p-3 rounded-lg mt-4 text-sm border-l-4 border-brand-primary">
              <p>
                <span className="font-medium">Pro Tip:</span> Track your progress by checking weekly and implementing the suggested improvements step-by-step.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for score comparison cards
const ScoreComparisonCard = ({ title, currentScore, difference }) => {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{currentScore}</div>
        <div className={`text-sm font-medium flex items-center ${difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-500'}`}>
          {difference > 0 && <ArrowUpIcon className="w-3 h-3 mr-0.5" />}
          {difference < 0 && <ArrowDownIcon className="w-3 h-3 mr-0.5" />}
          {difference > 0 ? '+' : ''}{difference}
        </div>
      </div>
    </div>
  );
};

export default AuditScoreComparison; 