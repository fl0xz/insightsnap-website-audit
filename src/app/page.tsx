"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import AuditForm from "@/components/AuditForm/AuditForm";
import AuditResults from "@/components/AuditResults/AuditResults";

// Mock authentication state for demonstration
// In a real app, this would come from a provider or API
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'agency' | null>(null);
  
  // This would be a real authentication function in a production app
  const handleLogin = (plan: 'free' | 'pro' | 'agency' = 'free') => {
    setIsAuthenticated(true);
    setUserPlan(plan);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserPlan(null);
  };

  const runAudit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to run audit');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Header 
        isAuthenticated={isAuthenticated} 
        userPlan={userPlan}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          {!results ? (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-text">
                Website Audit Tool
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get comprehensive insights into your website's performance, SEO, accessibility, and security.
              </p>
              
              {/* Auth demo controls - would not be present in a real app */}
              <div className="mb-8 flex justify-center space-x-4">
                <button
                  onClick={() => handleLogin('free')}
                  className={`px-4 py-2 rounded ${isAuthenticated && userPlan === 'free' ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Free Plan
                </button>
                <button
                  onClick={() => handleLogin('pro')}
                  className={`px-4 py-2 rounded ${isAuthenticated && userPlan === 'pro' ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Pro Plan
                </button>
                <button
                  onClick={() => handleLogin('agency')}
                  className={`px-4 py-2 rounded ${isAuthenticated && userPlan === 'agency' ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Agency Plan
                </button>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded ${!isAuthenticated ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Not Logged In
                </button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-card">
                <AuditForm onSubmit={runAudit} isLoading={isLoading} />
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="gradient-card">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-primary">
                      <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Performance Audit</h3>
                  <p className="text-gray-600 text-sm">Measure load times, identify bottlenecks, and get actionable recommendations to speed up your site.</p>
                </div>
                
                <div className="gradient-card">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-primary">
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">SEO Analysis</h3>
                  <p className="text-gray-600 text-sm">Discover opportunities to improve your search engine visibility and attract more organic traffic.</p>
                </div>
                
                <div className="gradient-card">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-primary">
                      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Security Check</h3>
                  <p className="text-gray-600 text-sm">Identify security vulnerabilities and get recommendations to keep your website and users safe.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-card">
              <AuditResults 
                results={results} 
                isAuthenticated={isAuthenticated}
                userPlan={userPlan}
              />
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">InsightSnap</h3>
              <p className="text-gray-400 text-sm">
                Powerful website audit tool providing actionable insights to improve your online presence.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Performance Analysis</li>
                <li>SEO Optimization</li>
                <li>Accessibility Testing</li>
                <li>Security Audit</li>
                <li>Mobile Responsiveness</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Pricing</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Terms & Privacy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>support@insightsnap.com</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} InsightSnap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
