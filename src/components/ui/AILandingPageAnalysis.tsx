"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LightBulbIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
  PresentationChartLineIcon,
  LockClosedIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

interface AILandingPageAnalysisProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isLoading?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock AI analysis data
const mockAIAnalysisData = {
  conversionScore: 72,
  pageType: "Product Landing Page",
  mainGoal: "Generate sales leads",
  strengths: [
    {
      id: 1,
      title: "Clear value proposition",
      description: "The main headline clearly communicates the product's value",
      impact: "high"
    },
    {
      id: 2,
      title: "Effective use of social proof",
      description: "Customer testimonials add credibility to your claims",
      impact: "high"
    },
    {
      id: 3,
      title: "Strong call-to-action visibility",
      description: "Primary CTA button stands out with contrasting color",
      impact: "medium"
    }
  ],
  weaknesses: [
    {
      id: 1,
      title: "Form is too long",
      description: "The lead capture form has 8 fields, which may deter completions",
      impact: "high"
    },
    {
      id: 2,
      title: "Cluttered layout",
      description: "Too many elements competing for attention above the fold",
      impact: "high"
    },
    {
      id: 3,
      title: "Unclear next steps",
      description: "Users may be confused about what happens after form submission",
      impact: "medium"
    },
    {
      id: 4,
      title: "Missing mobile optimization",
      description: "Button sizes are too small on mobile devices",
      impact: "medium"
    }
  ],
  recommendations: [
    {
      id: 1,
      title: "Reduce form fields",
      description: "Limit form fields to essential information only (name, email, company)",
      expectedImpact: "+15% form completion rate",
      difficulty: "easy"
    },
    {
      id: 2,
      title: "Simplify above-the-fold content",
      description: "Focus on one primary message and one main CTA above the fold",
      expectedImpact: "+8% click-through rate",
      difficulty: "medium"
    },
    {
      id: 3,
      title: "Add a clear success message",
      description: "Explain what happens after form submission and set expectations",
      expectedImpact: "+12% lead quality",
      difficulty: "easy"
    },
    {
      id: 4,
      title: "Increase touch targets on mobile",
      description: "Make all buttons at least 44px tall for better mobile usability",
      expectedImpact: "+10% mobile conversion rate",
      difficulty: "medium"
    },
    {
      id: 5,
      title: "A/B test headline variations",
      description: "Test 2-3 alternative headlines focusing on different benefits",
      expectedImpact: "Up to +20% engagement",
      difficulty: "hard"
    }
  ],
  heatmapInsights: {
    clickHotspots: ["Navigation menu", "Hero CTA button", "Pricing table"],
    coldAreas: ["Mid-page testimonials", "Secondary CTAs", "Footer links"],
    scrollDepth: "68% of visitors scroll below the fold"
  }
};

export default function AILandingPageAnalysis({
  websiteUrl = "example.com",
  isLocked = false,
  isLoading = false,
  isPremium = false,
  className = ""
}: AILandingPageAnalysisProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "strengths" | "weaknesses" | "recommendations">("overview");
  
  // Get impact color
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case "high": return "text-purple-600";
      case "medium": return "text-blue-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };
  
  // Get impact badge
  const getImpactBadge = (impact: string) => {
    switch(impact) {
      case "high": return "bg-purple-100 text-purple-800";
      case "medium": return "bg-blue-100 text-blue-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Get difficulty badge
  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Landing Page Analysis</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock AI analysis with our Pro plan</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => window.location.href = "/pricing"}
                >
                  Upgrade Now
                </motion.button>
              </div>
            </div>
            
            {/* Blurred preview content */}
            <div className="h-48 w-full rounded-lg bg-gradient-to-r from-purple-100 to-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Landing Page Analysis for {websiteUrl}</h2>
          </div>
          
          <div className="text-center py-10">
            <ArrowPathIcon className="h-10 w-10 text-purple-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Analysis in Progress</h3>
            <p className="text-gray-600">
              Our AI is analyzing your landing page for conversion opportunities. This might take a minute...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <SparklesIcon className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">AI Landing Page Analysis for {websiteUrl}</h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap space-x-6">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "overview" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "strengths" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("strengths")}
            >
              Strengths ({mockAIAnalysisData.strengths.length})
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "weaknesses" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("weaknesses")}
            >
              Weaknesses ({mockAIAnalysisData.weaknesses.length})
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "recommendations" 
                  ? "border-purple-500 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("recommendations")}
            >
              AI Recommendations
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Score and Page Info */}
            <div className="flex flex-col md:flex-row items-start mb-8">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 bg-gray-50 p-6 rounded-xl border border-gray-200 text-center w-full md:w-auto">
                <div className="inline-flex flex-col items-center">
                  <div className={`text-5xl font-bold mb-2 ${getScoreColor(mockAIAnalysisData.conversionScore)}`}>
                    {mockAIAnalysisData.conversionScore}
                  </div>
                  <div className="text-sm text-gray-700 font-medium">Conversion Score</div>
                  <div className="mt-3 text-xs text-gray-500">
                    {mockAIAnalysisData.conversionScore >= 80 
                      ? "Excellent - Keep optimizing" 
                      : mockAIAnalysisData.conversionScore >= 60 
                      ? "Good - Room for improvement" 
                      : "Needs work - Follow recommendations"}
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Page Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Page Type:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockAIAnalysisData.pageType}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Primary Goal:</span>
                      <span className="ml-2 text-sm text-gray-900">{mockAIAnalysisData.mainGoal}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Strengths:</span>
                      <span className="ml-2 text-sm text-green-600">{mockAIAnalysisData.strengths.length}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Weaknesses:</span>
                      <span className="ml-2 text-sm text-red-600">{mockAIAnalysisData.weaknesses.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                  <div className="flex">
                    <LightBulbIcon className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-purple-900">AI Insight</h3>
                      <p className="mt-1 text-sm text-purple-800">
                        This landing page could achieve a {mockAIAnalysisData.conversionScore + 15}% conversion score by implementing our top 3 recommendations, potentially increasing lead generation by 25-30%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analytics Snapshot */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">User Behavior Insights</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Click Hotspots</h4>
                    <ul className="space-y-1">
                      {mockAIAnalysisData.heatmapInsights.clickHotspots.map((hotspot, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {hotspot}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Cold Areas</h4>
                    <ul className="space-y-1">
                      {mockAIAnalysisData.heatmapInsights.coldAreas.map((area, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Scroll Depth</h4>
                    <p className="text-sm text-gray-600">{mockAIAnalysisData.heatmapInsights.scrollDepth}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Top Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-gray-900">Top Recommendations</h3>
                <button 
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                  onClick={() => setActiveTab("recommendations")}
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {mockAIAnalysisData.recommendations.slice(0, 3).map((recommendation) => (
                  <div key={recommendation.id} className="bg-white p-3 rounded-lg border border-gray-200 flex items-start">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-purple-100 text-purple-800 font-semibold text-sm mr-3 flex-shrink-0">
                      {recommendation.id}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{recommendation.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5 mb-1">{recommendation.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600">{recommendation.expectedImpact}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getDifficultyBadge(recommendation.difficulty)}`}>
                          {recommendation.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Strengths Tab */}
        {activeTab === "strengths" && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Our AI has identified the following strengths in your landing page. These are elements that are likely helping your conversion rate.
              </p>
            </div>
            
            <div className="space-y-4">
              {mockAIAnalysisData.strengths.map((strength) => (
                <div key={strength.id} className="bg-white p-4 rounded-lg border border-green-200 border-l-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900 mr-2">{strength.title}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getImpactBadge(strength.impact)}`}>
                          {strength.impact} impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{strength.description}</p>
                      <div className="mt-2 text-sm text-green-700">
                        <strong>AI Advice:</strong> {" "}
                        {strength.impact === "high" 
                          ? "Continue leveraging this strength and consider highlighting it further." 
                          : "This is working well but could be optimized for even better results."}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Weaknesses Tab */}
        {activeTab === "weaknesses" && (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Our AI has identified the following areas for improvement on your landing page. Addressing these issues can help boost your conversion rate.
              </p>
            </div>
            
            <div className="space-y-4">
              {mockAIAnalysisData.weaknesses.map((weakness) => (
                <div key={weakness.id} className="bg-white p-4 rounded-lg border border-red-200 border-l-4">
                  <div className="flex items-start">
                    <ArrowDownIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900 mr-2">{weakness.title}</h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getImpactBadge(weakness.impact)}`}>
                          {weakness.impact} impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{weakness.description}</p>
                      
                      {/* Related recommendation if exists */}
                      {mockAIAnalysisData.recommendations.some(r => r.title.toLowerCase().includes(weakness.title.toLowerCase())) && (
                        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                          <p className="text-xs text-gray-700">
                            <strong>Related recommendation: </strong>
                            {mockAIAnalysisData.recommendations.find(r => 
                              r.title.toLowerCase().includes(weakness.title.toLowerCase())
                            )?.title}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <div>
            <div className="mb-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-md mb-4">
                <div className="flex">
                  <SparklesIcon className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-purple-800">AI Conversion Recommendations</h3>
                    <div className="mt-1 text-sm text-purple-700">
                      <p>
                        Based on our analysis of over 10,000 similar landing pages, these recommendations could increase your conversion rate by 25-40%.
                      </p>
                      <p className="mt-1">
                        <strong>Implementation Priority:</strong> Start with high-impact, low-effort changes for the best ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockAIAnalysisData.recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-purple-100 text-purple-800 font-semibold text-sm mr-3">
                        {recommendation.id}
                      </span>
                      <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                    </div>
                    
                    <p className="text-sm text-gray-600 ml-10 mb-3">{recommendation.description}</p>
                    
                    <div className="ml-10 flex flex-wrap items-center justify-between">
                      <div className="flex items-center mb-2 md:mb-0">
                        <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-700 font-medium">{recommendation.expectedImpact}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getDifficultyBadge(recommendation.difficulty)}`}>
                          {recommendation.difficulty} to implement
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-2 py-1 border border-purple-300 text-xs font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        >
                          <CheckCircleIcon className="h-3 w-3 mr-1" /> Apply Fix
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PresentationChartLineIcon className="h-4 w-4 mr-2" />
                Generate Full Report
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 