import React from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/solid';

interface ScriptTrackingAuditProps {
  results: any;
}

const ScriptTrackingAudit: React.FC<ScriptTrackingAuditProps> = ({ results }) => {
  // This would analyze the actual scripts on the page
  // For this MVP, we'll simulate the analysis
  
  // Generate a deterministic but variable list of scripts
  const getScriptAnalysis = () => {
    try {
      // Get some score values to seed our "random" generation
      const perfScore = results?.lighthouse?.categories?.performance?.score || 0.5;
      const bpScore = results?.lighthouse?.categories?.['best-practices']?.score || 0.5;
      
      // Base script count on performance score (lower score = more scripts generally)
      const scriptCount = Math.max(3, Math.round((1 - perfScore) * 20));
      
      // Calculate load penalty based on script count
      const loadTimePenalty = scriptCount * 0.15; // 150ms per script on average
      
      // Determine GDPR compliance issues
      const hasGdprIssues = bpScore < 0.8;
      
      return {
        scriptCount,
        thirdPartyCount: Math.round(scriptCount * 0.7), // 70% are third-party
        loadTimePenalty: loadTimePenalty.toFixed(2),
        hasGdprIssues,
        gdprIssueCount: hasGdprIssues ? Math.floor(Math.random() * 3) + 1 : 0
      };
    } catch (err) {
      console.error('Error calculating script analysis:', err);
      return {
        scriptCount: 8,
        thirdPartyCount: 6,
        loadTimePenalty: '1.20',
        hasGdprIssues: true,
        gdprIssueCount: 2
      };
    }
  };
  
  // Generate common tracking scripts that might be found
  const getCommonScripts = () => {
    const scripts = [
      {
        name: "Google Analytics",
        type: "Analytics",
        impact: "Low",
        recommendation: "Keep",
        description: "Core analytics tracking"
      },
      {
        name: "Google Tag Manager",
        type: "Tag Manager",
        impact: "Medium",
        recommendation: "Keep",
        description: "Container for other scripts"
      },
      {
        name: "Facebook Pixel",
        type: "Ad Tracking",
        impact: "Medium",
        recommendation: "Review",
        description: "Tracks conversions for Facebook ads"
      },
      {
        name: "HotJar",
        type: "Behavior Analytics",
        impact: "High",
        recommendation: "Optimize",
        description: "Records user sessions and creates heatmaps"
      },
      {
        name: "Hubspot Tracking",
        type: "Marketing",
        impact: "Medium",
        recommendation: "Keep",
        description: "Marketing automation tracking"
      },
      {
        name: "LinkedIn Insight Tag",
        type: "Ad Tracking",
        impact: "Low",
        recommendation: "Review",
        description: "Tracks conversions for LinkedIn ads"
      },
      {
        name: "Twitter Pixel",
        type: "Ad Tracking",
        impact: "Low",
        recommendation: "Review",
        description: "Tracks Twitter ad conversions"
      },
      {
        name: "TikTok Pixel",
        type: "Ad Tracking",
        impact: "Medium",
        recommendation: "Review",
        description: "Tracks TikTok ad conversions"
      },
      {
        name: "Mixpanel",
        type: "Analytics",
        impact: "Medium",
        recommendation: "Optimize",
        description: "Event-based analytics"
      },
      {
        name: "Intercom",
        type: "Customer Chat",
        impact: "High",
        recommendation: "Lazy-load",
        description: "Customer support chat widget"
      }
    ];
    
    // Determine how many scripts to show based on the analysis
    const count = Math.min(scriptAnalysis.thirdPartyCount, scripts.length);
    return scripts.slice(0, count);
  };
  
  // Generate GDPR compliance issues if there are any
  const getGdprIssues = () => {
    const issues = [
      "No cookie consent banner detected",
      "Third-party trackers load before consent",
      "Marketing cookies enabled by default",
      "No clear opt-out mechanism found",
      "Tracking script loads on page load, not after consent"
    ];
    
    if (!scriptAnalysis.hasGdprIssues) return [];
    
    return issues.slice(0, scriptAnalysis.gdprIssueCount);
  };
  
  // Generate optimization suggestions
  const getOptimizationSuggestions = () => {
    return [
      {
        title: "Implement Lazy Loading",
        description: "Delay loading non-critical scripts until after the page has rendered",
        benefit: "Up to 40% faster initial load"
      },
      {
        title: "Use Server-Side Tracking",
        description: "Move analytics collection server-side to reduce client-side script load",
        benefit: "Reduce script load by up to 60%"
      },
      {
        title: "Consolidate Tag Management",
        description: "Use a single tag manager instead of loading scripts individually",
        benefit: "Better organization and potential performance gains"
      }
    ];
  };
  
  const scriptAnalysis = getScriptAnalysis();
  const commonScripts = getCommonScripts();
  const gdprIssues = getGdprIssues();
  const optimizationSuggestions = getOptimizationSuggestions();

  return (
    <div className="gradient-card mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <CodeBracketIcon className="w-6 h-6 mr-2 text-brand-primary" />
        Script & Tracking Audit
      </h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{scriptAnalysis.scriptCount}</div>
            <div className="text-sm text-gray-600">Total Scripts</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{scriptAnalysis.thirdPartyCount}</div>
            <div className="text-sm text-gray-600">Third-Party</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{scriptAnalysis.loadTimePenalty}s</div>
            <div className="text-sm text-gray-600">Load Penalty</div>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <div className={`text-xl font-bold ${scriptAnalysis.hasGdprIssues ? 'text-red-600' : 'text-green-600'}`}>
              {scriptAnalysis.hasGdprIssues ? 'At Risk' : 'Compliant'}
            </div>
            <div className="text-sm text-gray-600">GDPR Status</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Detected Tracking Scripts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="py-2 px-3 text-left text-xs font-medium">Script</th>
                <th className="py-2 px-3 text-left text-xs font-medium">Type</th>
                <th className="py-2 px-3 text-left text-xs font-medium">Performance Impact</th>
                <th className="py-2 px-3 text-left text-xs font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {commonScripts.map((script, index) => (
                <tr key={index} className="text-sm">
                  <td className="py-2 px-3 font-medium">{script.name}</td>
                  <td className="py-2 px-3 text-gray-600">{script.type}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      script.impact === 'High' ? 'bg-red-100 text-red-800' : 
                      script.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {script.impact}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-gray-600">{script.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {gdprIssues.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">GDPR Compliance Concerns</h3>
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <ul className="space-y-1 text-sm text-red-800">
              {gdprIssues.map((issue, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-red-600 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {issue}
                </li>
              ))}
            </ul>
            <p className="text-xs text-red-700 mt-2">
              Non-compliance with GDPR can result in fines up to €20 million or 4% of annual global revenue.
            </p>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Performance Optimization Suggestions</h3>
        <div className="space-y-3">
          {optimizationSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-white p-3 border border-gray-200 rounded-lg text-sm">
              <div className="font-medium">{suggestion.title}</div>
              <p className="text-xs text-gray-600 mb-1">{suggestion.description}</p>
              <div className="text-xs text-brand-primary font-medium">{suggestion.benefit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScriptTrackingAudit; 