import React, { useState } from 'react';
import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/solid';

interface WeeklyHealthTrackingProps {
  results: any;
  isAuthenticated: boolean;
  userPlan: 'free' | 'pro' | 'agency' | null;
}

const WeeklyHealthTracking: React.FC<WeeklyHealthTrackingProps> = ({ 
  results, 
  isAuthenticated,
  userPlan
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  
  // Simulated historical data
  const getHistoricalData = () => {
    // Create 5 weeks of fake data with slight improvements
    const weeks = [];
    const currentDate = new Date();
    
    // Get current scores
    const performanceScore = Math.round((results?.lighthouse?.categories?.performance?.score || 0.5) * 100);
    const seoScore = Math.round((results?.lighthouse?.categories?.seo?.score || 0.5) * 100);
    
    // Generate backwards from current date
    for (let i = 4; i >= 0; i--) {
      const weekDate = new Date(currentDate);
      weekDate.setDate(weekDate.getDate() - (i * 7));
      
      // Make scores trend upward slightly (showing improvement over time)
      // The further in the past, the lower the score
      const weekPerformanceScore = Math.max(0, Math.min(100, performanceScore - (i * 3) - Math.floor(Math.random() * 5)));
      const weekSeoScore = Math.max(0, Math.min(100, seoScore - (i * 2) - Math.floor(Math.random() * 4)));
      
      weeks.push({
        date: weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        performance: weekPerformanceScore,
        seo: weekSeoScore
      });
    }
    
    return weeks;
  };
  
  const getMaxScoreY = () => {
    // Find the maximum score in the historical data
    const allScores = [
      ...historicalData.map(data => data.performance),
      ...historicalData.map(data => data.seo)
    ];
    
    return Math.max(...allScores, 100);
  };
  
  const historicalData = getHistoricalData();
  const maxScoreY = getMaxScoreY();
  
  // Chart specific calculations
  const chartHeight = 150;
  const chartWidth = 100; // percentage width
  
  const getYPosition = (score: number) => {
    return chartHeight - (score / 100 * chartHeight);
  };
  
  const generatePath = (dataPoints: number[], color: string) => {
    if (dataPoints.length < 2) return null;
    
    const segmentWidth = chartWidth / (dataPoints.length - 1);
    
    // Start with a move to the first point
    let path = `M0,${getYPosition(dataPoints[0])}`;
    
    // Add line segments to each subsequent point
    for (let i = 1; i < dataPoints.length; i++) {
      path += ` L${i * segmentWidth},${getYPosition(dataPoints[i])}`;
    }
    
    return (
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };
  
  // Features available based on user plan
  const canAccessWeeklyTracking = isAuthenticated && (userPlan === 'pro' || userPlan === 'agency');
  
  // Toggle weekly tracking
  const handleToggleTracking = () => {
    if (canAccessWeeklyTracking) {
      setIsEnabled(!isEnabled);
    }
  };

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ChartBarIcon className="w-6 h-6 mr-2 text-brand-primary" />
        Weekly Health Tracking
      </h2>
      
      {!isAuthenticated && (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Unlock Weekly Health Tracking</h3>
          <p className="text-gray-600 mb-4">
            Monitor your website's performance over time with automated weekly audits.
          </p>
          <button className="bg-brand-primary hover:bg-brand-dark text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Sign Up to Track Progress
          </button>
        </div>
      )}
      
      {isAuthenticated && userPlan === 'free' && (
        <div className="bg-gray-50 p-6 rounded-lg text-center border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Upgrade to Pro for Weekly Tracking</h3>
          <p className="text-gray-600 mb-4">
            Pro and Agency plans include automated weekly audits to track your progress over time.
          </p>
          <button className="bg-brand-primary hover:bg-brand-dark text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Upgrade to Pro
          </button>
        </div>
      )}
      
      {canAccessWeeklyTracking && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-700">
                Get automated weekly scans of your website to track improvements over time.
              </p>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <ClockIcon className="h-4 w-4 mr-1" />
                Scans run every Monday at 9:00 AM GMT
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm mr-2 text-gray-700">
                {isEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={handleToggleTracking}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isEnabled ? 'bg-brand-primary' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isEnabled ? 'translate-x-6' : ''
                  }`} 
                />
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-sm font-semibold mb-4">Performance History</h3>
            
            <div className="relative h-[150px] w-full mb-4">
              <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                {/* Chart grid */}
                <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1={chartHeight/2} x2={chartWidth} y2={chartHeight/2} stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="0" y1="0" x2={chartWidth} y2="0" stroke="#e5e7eb" strokeWidth="1" />
                
                {/* Performance line */}
                {generatePath(historicalData.map(data => data.performance), '#5D3FD3')}
                
                {/* SEO line */}
                {generatePath(historicalData.map(data => data.seo), '#00BFA6')}
                
                {/* Data points */}
                {historicalData.map((data, index) => {
                  const x = index * (chartWidth / (historicalData.length - 1));
                  return (
                    <React.Fragment key={index}>
                      <circle 
                        cx={x} 
                        cy={getYPosition(data.performance)} 
                        r="2" 
                        fill="#5D3FD3" 
                      />
                      <circle 
                        cx={x} 
                        cy={getYPosition(data.seo)} 
                        r="2" 
                        fill="#00BFA6" 
                      />
                    </React.Fragment>
                  );
                })}
              </svg>
              
              {/* Y-axis labels */}
              <div className="absolute top-0 left-0 flex flex-col justify-between h-full -ml-8 text-xs text-gray-500">
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-gray-500 px-1">
              {historicalData.map((data, index) => (
                <span key={index}>{data.date}</span>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#5D3FD3] rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Performance</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-[#00BFA6] rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">SEO</span>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-primary bg-opacity-5 p-4 rounded-lg border border-brand-primary border-opacity-20">
            <h3 className="text-sm font-semibold mb-2 text-brand-primary">Insights</h3>
            <p className="text-sm text-gray-700">
              Your performance score has improved by <span className="font-medium text-green-600">+{performanceLastImprovementPercentage}%</span> in the last 30 days. 
              Continue implementing the suggested fixes to see further improvements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to calculate the improvement percentage
const performanceLastImprovementPercentage = 8;

export default WeeklyHealthTracking; 