"use client";

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedButton from "@/components/ui/AnimatedButton";
import HeatmapVisualization from "@/components/ui/HeatmapVisualization";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import { mockHeatmapData } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function HeatmapPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [heatmapGenerated, setHeatmapGenerated] = useState(false);
  
  // This would be an actual API call in a real implementation
  const generateHeatmap = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsLoading(false);
    setHeatmapGenerated(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userPlan="pro" />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatedSection
          animationStyle="fadeInUp"
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Attention Heatmap</h1>
          <p className="text-lg text-gray-600 mb-8">
            Predict where users will focus their attention on your website with our AI-powered heatmap technology.
          </p>
          
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Attention Heatmap</h2>
            
            <form onSubmit={generateHeatmap}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isLoading}
                    className="w-full md:w-auto"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Heatmap
                      </div>
                    ) : "Generate Heatmap"}
                  </AnimatedButton>
                </div>
              </div>
            </form>
          </div>
          
          {/* Heatmap Results */}
          {heatmapGenerated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Attention Heatmap Results</h2>
                  <div className="flex space-x-3">
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                    >
                      Download PNG
                    </AnimatedButton>
                    <AnimatedButton
                      variant="outline"
                      size="sm"
                    >
                      Share
                    </AnimatedButton>
                  </div>
                </div>
                
                <div className="mb-8">
                  <HeatmapVisualization
                    screenshotUrl="/images/website-screenshot.svg"
                    screenshotWidth={mockHeatmapData.screenshotWidth}
                    screenshotHeight={mockHeatmapData.screenshotHeight}
                    heatPoints={mockHeatmapData.heatPoints}
                    showIntensityScale={true}
                    opacity={0.7}
                    className="rounded-lg border border-gray-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-purple-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Above-fold Focus</h3>
                    <p className="text-sm text-gray-600">
                      Users are focusing 73% of their attention above the fold, mainly on the hero section.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-blue-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">CTA Visibility</h3>
                    <p className="text-sm text-gray-600">
                      Your main call-to-action button receives 42% of user attention, which is above average.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-amber-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">Image Impact</h3>
                    <p className="text-sm text-gray-600">
                      Images in the right column are receiving less attention than optimal. Consider enhancing visual hierarchy.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Attention Analysis & Recommendations</h2>
                
                <div className="space-y-4">
                  <CollapsibleSection
                    title="Header & Navigation"
                    initiallyExpanded={true}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    }
                  >
                    <div className="text-gray-600 space-y-2">
                      <p>Your header navigation is receiving moderate attention, but the logo gets more focus than navigation links. This suggests visitors may be less aware of your navigation options.</p>
                      <h4 className="font-medium text-gray-900 mt-3">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Consider increasing visual contrast for important navigation items</li>
                        <li>Add subtle animations or hover effects to navigation links</li>
                        <li>Test a more prominent CTA button in the header</li>
                      </ul>
                    </div>
                  </CollapsibleSection>
                  
                  <CollapsibleSection
                    title="Hero Section"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    }
                  >
                    <div className="text-gray-600 space-y-2">
                      <p>Your hero section receives the highest attention, with strong focus on the headline and main image. The headline attracts 63% more attention than the subheading.</p>
                      <h4 className="font-medium text-gray-900 mt-3">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Ensure your most compelling value proposition is in the headline</li>
                        <li>Consider moving your primary CTA closer to the headline</li>
                        <li>Add a visual indicator (arrow, animation) to guide attention down the page</li>
                      </ul>
                    </div>
                  </CollapsibleSection>
                  
                  <CollapsibleSection
                    title="Feature Cards"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    }
                  >
                    <div className="text-gray-600 space-y-2">
                      <p>Users are giving more attention to the left and center feature cards, while the right card receives 29% less visual focus.</p>
                      <h4 className="font-medium text-gray-900 mt-3">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Place your most important features in the left and center positions</li>
                        <li>Consider adding more visual weight to the right card (brighter colors or larger icons)</li>
                        <li>Test a 2x2 grid layout instead of 3-column to balance attention</li>
                      </ul>
                    </div>
                  </CollapsibleSection>
                  
                  <CollapsibleSection
                    title="CTA Elements"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    }
                  >
                    <div className="text-gray-600 space-y-2">
                      <p>Your primary CTA button receives good attention, but the secondary CTA is almost ignored (only 7% of visual focus).</p>
                      <h4 className="font-medium text-gray-900 mt-3">Recommendations:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Increase contrast between the two CTAs if both are important</li>
                        <li>Consider testing a single CTA if the secondary action isn't critical</li>
                        <li>Add subtle animation to the primary CTA to increase attention</li>
                      </ul>
                    </div>
                  </CollapsibleSection>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatedSection>
      </main>
    </div>
  );
} 