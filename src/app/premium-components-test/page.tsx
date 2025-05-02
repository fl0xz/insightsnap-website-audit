"use client";

import React, { useState } from 'react';
import AILandingPageAnalysis from '@/components/ui/AILandingPageAnalysis';
import ConversionFunnelEvaluation from '@/components/ui/ConversionFunnelEvaluation';
import ScriptTrackerAudit from '@/components/ui/ScriptTrackerAudit';
import AccessibilityUXScore from '@/components/ui/AccessibilityUXScore';
import MobileOptimization from '@/components/ui/MobileOptimization';

export default function PremiumComponentsTest() {
  // Demo state for toggling features
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Toggle helpers
  const toggleLocked = () => setIsLocked(!isLocked);
  const toggleLoading = () => setIsLoading(!isLoading);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Premium Components Test</h1>
          <p className="mt-2 text-lg text-gray-600">View all premium components with different states</p>
          
          {/* Controls */}
          <div className="mt-4 flex justify-center space-x-4">
            <button 
              onClick={toggleLocked}
              className={`px-4 py-2 rounded-md ${isLocked ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {isLocked ? 'Locked' : 'Unlocked'}
            </button>
            <button 
              onClick={toggleLoading}
              className={`px-4 py-2 rounded-md ${isLoading ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {isLoading ? 'Loading' : 'Loaded'}
            </button>
          </div>
        </div>
        
        <div className="space-y-8">
          <AILandingPageAnalysis 
            websiteUrl="example.com"
            isLocked={isLocked}
            isLoading={isLoading}
          />
          
          <ConversionFunnelEvaluation 
            websiteUrl="example.com"
            isLocked={isLocked}
            isLoading={isLoading}
          />
          
          <ScriptTrackerAudit 
            websiteUrl="example.com"
            isLocked={isLocked}
            isLoading={isLoading}
          />
          
          <AccessibilityUXScore 
            websiteUrl="example.com"
            isLocked={isLocked}
            isLoading={isLoading}
          />
          
          <MobileOptimization 
            websiteUrl="example.com"
            isLocked={isLocked}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
} 