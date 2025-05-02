"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import AuditForm from "@/components/AuditForm/AuditForm";
import AuditResults from "@/components/AuditResults/AuditResults";

export default function LoggedInTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication state - Default to logged in with Free plan for this demo page
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'agency'>('free');
  
  // Function to switch between plans
  const switchPlan = (plan: 'free' | 'pro' | 'agency') => {
    setUserPlan(plan);
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
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h1 className="text-2xl font-bold text-brand-text mb-4">Logged-In Experience Demo</h1>
            <p className="text-gray-600 mb-6">
              This page demonstrates how the audit results appear for logged-in users with different subscription plans.
            </p>
            
            {/* Plan switcher */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold mb-2">Select Subscription Plan</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => switchPlan('free')}
                  className={`px-4 py-2 rounded-lg ${userPlan === 'free' ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Free Plan
                </button>
                <button
                  onClick={() => switchPlan('pro')}
                  className={`px-4 py-2 rounded-lg ${userPlan === 'pro' ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Pro Plan
                </button>
                <button
                  onClick={() => switchPlan('agency')}
                  className={`px-4 py-2 rounded-lg ${userPlan === 'agency' ? 'bg-[#5D3FD3] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  Agency Plan
                </button>
              </div>
            </div>
            
            {/* Plan features explanation */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Plan Features</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Free Plan:</span>
                  <span>Basic audit results, no PDF exports, limited details</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Pro Plan:</span>
                  <span>Full audit details, PDF exports, AI fix suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Agency Plan:</span>
                  <span>Everything in Pro, plus white-labeling and priority support</span>
                </li>
              </ul>
            </div>
          </div>
          
          {!results ? (
            <div className="bg-white p-8 rounded-xl shadow-card">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Run a website audit</h2>
                <p className="text-gray-600">
                  Enter a URL to see how audit results appear for {userPlan} plan users.
                </p>
              </div>
              <AuditForm onSubmit={runAudit} isLoading={isLoading} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-card">
              <AuditResults 
                results={results} 
                isAuthenticated={isAuthenticated}
                userPlan={userPlan}
              />
              
              <div className="mt-6 flex justify-center space-x-4">
                <button 
                  onClick={() => setResults(null)} 
                  className="py-2.5 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  New Audit
                </button>
                <a 
                  href="/"
                  className="py-2.5 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Back to Main Page
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            This is a demo page to showcase the logged-in user experience.
          </p>
          <div className="mt-4 text-gray-500">
            &copy; {new Date().getFullYear()} InsightSnap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 