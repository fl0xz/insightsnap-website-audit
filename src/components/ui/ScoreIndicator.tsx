import React from 'react';

interface ScoreIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  score,
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  // Helper to get the color based on score
  const getScoreColor = () => {
    if (score >= 80) return 'bg-score-good';
    if (score >= 60) return 'bg-score-average';
    return 'bg-score-poor';
  };

  // Helper to get the label text
  const getScoreLabel = () => {
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Average';
    return 'Poor';
  };

  // Helper to get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-10 h-10 text-sm';
      case 'lg':
        return 'w-20 h-20 text-2xl';
      case 'md':
      default:
        return 'w-16 h-16 text-xl';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`${getSizeClasses()} ${getScoreColor()} rounded-full flex items-center justify-center text-white font-bold shadow-md`}
      >
        {score}
      </div>
      {showLabel && (
        <span className="mt-1 text-sm font-medium text-gray-700">{getScoreLabel()}</span>
      )}
    </div>
  );
};

export default ScoreIndicator; 