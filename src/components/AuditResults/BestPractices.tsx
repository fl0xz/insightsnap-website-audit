import React from 'react';
import ScoreIndicator from '@/components/ui/ScoreIndicator';

interface BestPracticesProps {
  results: any;
}

const BestPractices: React.FC<BestPracticesProps> = ({ results }) => {
  // Get best practices score from Lighthouse
  const getBestPracticesScore = () => {
    try {
      return Math.round((results?.lighthouse?.categories?.['best-practices']?.score || 0) * 100);
    } catch (err) {
      console.error('Error getting best practices score:', err);
      return 50; // Default fallback
    }
  };
  
  const bestPracticesScore = getBestPracticesScore();
  
  // Extract specific best practices issues
  const getBestPracticesIssues = () => {
    try {
      const audits = results?.lighthouse?.audits || {};
      const failedAudits = [];
      
      // Collect all failed best practices audits
      Object.entries(audits).forEach(([key, audit]: [string, any]) => {
        if (audit.group === 'best-practices' && audit.score < 0.9) {
          failedAudits.push({
            id: key,
            title: audit.title,
            description: audit.description,
            score: audit.score,
          });
        }
      });
      
      // If specific audits aren't available, use common issues as fallback
      if (failedAudits.length === 0) {
        return [
          { 
            id: 'uses-https', 
            title: 'Uses HTTPS', 
            description: 'All sites should be protected with HTTPS, even ones that don\'t handle sensitive data.' 
          },
          { 
            id: 'js-errors', 
            title: 'No JavaScript Errors', 
            description: 'JavaScript errors and exceptions should be fixed to improve user experience and site functionality.' 
          },
          { 
            id: 'doctype', 
            title: 'Doctype HTML5', 
            description: 'Specifying a doctype prevents browser mode switches which can cause rendering issues.' 
          },
          { 
            id: 'geolocation-permission', 
            title: 'Geolocation on HTTPS only', 
            description: 'User location can only be requested on secure origins.' 
          },
        ];
      }
      
      return failedAudits;
    } catch (err) {
      console.error('Error getting best practices issues:', err);
      return [];
    }
  };
  
  const bestPracticesIssues = getBestPracticesIssues();
  
  // Extract quick wins from the best practices data
  const getQuickWins = () => {
    const wins = [];
    
    // From most impactful to least
    const keysToCheck = [
      'uses-https',
      'doctype',
      'js-errors',
      'password-inputs-can-be-pasted-into',
      'image-aspect-ratio',
      'meta-refresh',
      'notification-on-start',
      'deprecations',
    ];
    
    const audits = results?.lighthouse?.audits || {};
    
    keysToCheck.forEach(key => {
      if (audits[key] && audits[key].score < 0.9) {
        wins.push({
          id: key,
          title: audits[key].title,
          description: audits[key].description,
        });
      }
    });
    
    // Add a few more if we don't have many
    if (wins.length < 3) {
      if (audits['csp-xss'] && audits['csp-xss'].score < 0.9) {
        wins.push({
          id: 'csp-xss',
          title: 'Implement Content Security Policy',
          description: 'A CSP helps prevent XSS attacks by restricting the sources from which resources can be loaded.'
        });
      }
      
      if (audits['errors-in-console'] && audits['errors-in-console'].score < 0.9) {
        wins.push({
          id: 'errors-in-console',
          title: 'Fix Browser Console Errors',
          description: 'Browser console errors can indicate unresolved problems that should be fixed.'
        });
      }
    }
    
    // If still no wins, provide general suggestions
    if (wins.length === 0) {
      return [
        {
          id: 'https',
          title: 'Enable HTTPS',
          description: 'HTTPS provides better security and is required for many modern browser features.'
        },
        {
          id: 'browser-errors',
          title: 'Fix JavaScript Errors',
          description: 'Resolve any JavaScript errors to improve functionality and user experience.'
        },
        {
          id: 'doctype',
          title: 'Add Proper Doctype',
          description: 'Include <!DOCTYPE html> at the beginning of your HTML to ensure proper rendering.'
        }
      ];
    }
    
    return wins.slice(0, 5); // Return top 5 quick wins
  };
  
  const quickWins = getQuickWins();

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-brand-primary">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
        Best Practices
      </h2>
      
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-shrink-0 flex flex-col items-center mb-4 md:mb-0 md:mr-8">
          <ScoreIndicator score={bestPracticesScore} size="lg" showLabel={true} />
        </div>
        
        <div className="flex-1">
          <p className="text-gray-700 mb-4">
            {bestPracticesScore >= 80 
              ? "Your website follows most modern best practices, providing a solid foundation for user experience." 
              : bestPracticesScore >= 60 
                ? "Your website implements some best practices but has several important areas for improvement." 
                : "Your website needs significant improvements to align with modern web best practices."}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-semibold mb-2">Quick Wins</h3>
              <div className="space-y-2">
                {quickWins.map((win, index) => (
                  <div key={index} className="text-sm border-l-3 border-brand-primary pl-2 py-1">
                    <p className="font-medium">{win.title}</p>
                    <p className="text-xs text-gray-600">{win.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-semibold mb-2">Why Best Practices Matter</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Improve user experience and site usability</li>
                <li>• Enhance security and protect user data</li>
                <li>• Ensure compatibility across browsers</li>
                <li>• Future-proof against API deprecations</li>
                <li>• Reduce debugging and maintenance costs</li>
              </ul>
            </div>
          </div>
          
          {bestPracticesIssues.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Issues Found</h3>
              <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                {bestPracticesIssues.slice(0, 5).map((issue, index) => (
                  <div key={index} className="bg-white p-2 border border-gray-200 rounded text-sm">
                    <p className="font-medium">{issue.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                  </div>
                ))}
                {bestPracticesIssues.length > 5 && (
                  <p className="text-xs text-gray-500 italic">
                    + {bestPracticesIssues.length - 5} more issues (see PDF report for full details)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestPractices; 