"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header/Header";
import ScriptTrackerAudit from "@/components/ui/ScriptTrackerAudit";
import AccessibilityUXScore from "@/components/ui/AccessibilityUXScore";
import MobileOptimization from "@/components/ui/MobileOptimization";
import AILandingPageAnalysis from "@/components/ui/AILandingPageAnalysis";
import ConversionFunnelEvaluation from "@/components/ui/ConversionFunnelEvaluation";
import AuditHistory from "@/components/ui/AuditHistory";
import FixRequestCTA from "@/components/ui/FixRequestCTA";
import AuditComparison from "@/components/ui/AuditComparison";

export default function PremiumFeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [featureStates, setFeatureStates] = useState({
    isLocked: false,
    isLoading: false,
  });
  
  // Toggle feature states
  const toggleLock = () => {
    setFeatureStates({ ...featureStates, isLocked: !featureStates.isLocked });
  };
  
  const toggleLoading = () => {
    setFeatureStates({ ...featureStates, isLoading: !featureStates.isLoading });
  };
  
  // Filter features by category
  const shouldShowFeature = (category: string) => {
    return selectedCategory === "all" || selectedCategory === category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Page Header */}
        <section className="pt-16 pb-8 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                  Premium Features Showcase
                </h1>
                <p className="mt-5 text-xl text-gray-500">
                  Explore all the advanced features available with our Pro and Agency plans
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Feature Controls */}
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
                <button
                  className={`px-3 py-1.5 rounded-md text-sm transition ${
                    selectedCategory === "all" 
                      ? "bg-purple-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Features
                </button>
                <button
                  className={`px-3 py-1.5 rounded-md text-sm transition ${
                    selectedCategory === "audit" 
                      ? "bg-purple-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory("audit")}
                >
                  Audit Features
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <input
                    id="toggle-lock"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={featureStates.isLocked}
                    onChange={toggleLock}
                  />
                  <label htmlFor="toggle-lock" className="ml-2 block text-sm text-gray-700">
                    Show Locked State
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="toggle-loading"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    checked={featureStates.isLoading}
                    onChange={toggleLoading}
                  />
                  <label htmlFor="toggle-loading" className="ml-2 block text-sm text-gray-700">
                    Show Loading State
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Audit Features */}
        {shouldShowFeature("audit") || selectedCategory === "all" && (
          <section className="py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Audit Features</h2>
              
              <div className="grid grid-cols-1 gap-8">
                <ScriptTrackerAudit 
                  isLocked={featureStates.isLocked} 
                  websiteUrl="example.com"
                />
                
                <AccessibilityUXScore 
                  isLocked={featureStates.isLocked} 
                  isLoading={featureStates.isLoading}
                  websiteUrl="example.com"
                />
                
                <MobileOptimization 
                  isLocked={featureStates.isLocked} 
                  isLoading={featureStates.isLoading}
                  websiteUrl="example.com"
                />
                
                <AILandingPageAnalysis 
                  isLocked={featureStates.isLocked} 
                  isLoading={featureStates.isLoading}
                  websiteUrl="example.com"
                />
                
                <ConversionFunnelEvaluation 
                  isLocked={featureStates.isLocked} 
                  isLoading={featureStates.isLoading}
                  websiteUrl="example.com"
                />
                
                <AuditHistory 
                  isLocked={featureStates.isLocked} 
                  isLoading={featureStates.isLoading}
                  websiteUrl="example.com"
                />
              </div>
            </div>
          </section>
        )}
        
        {/* Audit Comparison */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Audit Comparison</h2>
            <AuditComparison 
              isLocked={featureStates.isLocked} 
              websiteUrl="example.com"
            />
          </div>
        </section>
        
        {/* Fix Request CTA */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Fix Request</h2>
            <FixRequestCTA websiteUrl="example.com" totalIssues={24} />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Ready to upgrade your website audit experience?
                </h2>
                <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                  Get access to all these premium features with our Pro and Agency plans. Elevate your website performance today.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
                    onClick={() => window.location.href = "/pricing"}
                  >
                    View Pricing
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Contact Sales
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 