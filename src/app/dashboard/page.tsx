"use client";

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedButton from "@/components/ui/AnimatedButton";
import AuditScoreCard from "@/components/ui/AuditScoreCard";
import SimpleLineChart from "@/components/ui/SimpleLineChart";
import WeeklyScanToggle from "@/components/ui/WeeklyScanToggle";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import TabView from "@/components/ui/TabView";
import { 
  mockAuditScores, 
  mockHistoricalData,
  mockSeoIssues,
  mockPerformanceIssues,
  mockAccessibilityIssues
} from "@/lib/mockData";
import { LightBulbIcon, ArrowPathIcon, ChartBarIcon, LockClosedIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [activeWebsite, setActiveWebsite] = useState("example.com");
  
  // Mock website list
  const websites = [
    { id: 1, domain: "example.com", lastScan: "2023-09-17", score: 82 },
    { id: 2, domain: "mysite.com", lastScan: "2023-09-14", score: 68 },
    { id: 3, domain: "clientwebsite.org", lastScan: "2023-09-10", score: 91 }
  ];
  
  // Mock recent audits
  const recentAudits = [
    { id: 101, domain: "example.com", date: "2023-09-17", score: 82 },
    { id: 100, domain: "example.com", date: "2023-09-10", score: 79 },
    { id: 99, domain: "example.com", date: "2023-09-03", score: 73 },
    { id: 98, domain: "example.com", date: "2023-08-28", score: 71 }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} userPlan="pro" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <select 
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={activeWebsite}
              onChange={(e) => setActiveWebsite(e.target.value)}
            >
              {websites.map(site => (
                <option key={site.id} value={site.domain}>{site.domain}</option>
              ))}
            </select>
            
            <AnimatedButton 
              variant="primary"
              size="md"
              href="/audit"
            >
              New Audit
            </AnimatedButton>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <AuditScoreCard
            title="Overall Score"
            score={mockAuditScores.overall.current}
            previousScore={mockAuditScores.overall.previous}
            description="Your website has improved since last audit"
            icon={<ChartBarIcon className="w-5 h-5" />}
            colorClass="text-purple-700"
            bgClass="bg-purple-50"
          />
          
          <AuditScoreCard
            title="Performance"
            score={mockAuditScores.performance.current}
            previousScore={mockAuditScores.performance.previous}
            description="Loading speed and core vitals"
            icon={<ArrowPathIcon className="w-5 h-5" />}
            colorClass="text-blue-700"
            bgClass="bg-blue-50"
          />
          
          <AuditScoreCard
            title="SEO"
            score={mockAuditScores.seo.current}
            previousScore={mockAuditScores.seo.previous}
            description="Search engine optimization"
            icon={<LightBulbIcon className="w-5 h-5" />}
            colorClass="text-amber-700"
            bgClass="bg-amber-50"
          />
          
          <AuditScoreCard
            title="Security"
            score={mockAuditScores.security.current}
            previousScore={mockAuditScores.security.previous}
            description="Protection against threats"
            icon={<LockClosedIcon className="w-5 h-5" />}
            colorClass="text-green-700"
            bgClass="bg-green-50"
          />
          
          <AuditScoreCard
            title="Mobile"
            score={mockAuditScores.accessibility.current}
            previousScore={mockAuditScores.accessibility.previous}
            description="Responsive and accessible"
            icon={<DevicePhoneMobileIcon className="w-5 h-5" />}
            colorClass="text-red-700"
            bgClass="bg-red-50"
          />
        </div>
        
        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trends & Progress */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection 
              animationStyle="fadeInUp" 
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Audit Score Trend</h2>
                <select className="bg-gray-50 border border-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                </select>
              </div>
              
              <SimpleLineChart 
                data={mockHistoricalData} 
                height={250} 
                className="mt-4" 
              />
            </AnimatedSection>
            
            <AnimatedSection 
              animationStyle="fadeInUp" 
              className="bg-white p-6 rounded-xl shadow-sm"
              delay={0.1}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Issues and Recommendations</h2>
              
              <TabView
                tabs={[
                  {
                    id: "seo",
                    label: "SEO",
                    icon: <LightBulbIcon className="w-4 h-4" />,
                    content: (
                      <div className="space-y-4 mt-2">
                        {mockSeoIssues.map((issue, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${
                            issue.severity === 'high' ? 'border-red-200 bg-red-50' :
                            issue.severity === 'medium' ? 'border-amber-200 bg-amber-50' :
                            'border-blue-200 bg-blue-50'
                          }`}>
                            <div className="flex items-start">
                              <div className={`rounded-full p-1 ${
                                issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                                issue.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              } mr-3 mt-0.5`}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{issue.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                                <div className="mt-2 text-sm">
                                  <span className="font-medium text-gray-900">Recommendation:</span> {issue.recommendation}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  },
                  {
                    id: "performance",
                    label: "Performance",
                    icon: <ArrowPathIcon className="w-4 h-4" />,
                    content: (
                      <div className="space-y-4 mt-2">
                        {mockPerformanceIssues.map((issue, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${
                            issue.severity === 'high' ? 'border-red-200 bg-red-50' :
                            issue.severity === 'medium' ? 'border-amber-200 bg-amber-50' :
                            'border-blue-200 bg-blue-50'
                          }`}>
                            <div className="flex items-start">
                              <div className={`rounded-full p-1 ${
                                issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                                issue.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              } mr-3 mt-0.5`}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{issue.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                                <div className="mt-2 text-sm">
                                  <span className="font-medium text-gray-900">Recommendation:</span> {issue.recommendation}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  },
                  {
                    id: "accessibility",
                    label: "Accessibility",
                    icon: <DevicePhoneMobileIcon className="w-4 h-4" />,
                    content: (
                      <div className="space-y-4 mt-2">
                        {mockAccessibilityIssues.map((issue, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${
                            issue.severity === 'high' ? 'border-red-200 bg-red-50' :
                            issue.severity === 'medium' ? 'border-amber-200 bg-amber-50' :
                            'border-blue-200 bg-blue-50'
                          }`}>
                            <div className="flex items-start">
                              <div className={`rounded-full p-1 ${
                                issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                                issue.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-blue-100 text-blue-700'
                              } mr-3 mt-0.5`}>
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{issue.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                                <div className="mt-2 text-sm">
                                  <span className="font-medium text-gray-900">Recommendation:</span> {issue.recommendation}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  }
                ]}
                variant="pills"
              />
            </AnimatedSection>
          </div>
          
          {/* Right Column - History & Settings */}
          <div className="space-y-8">
            <AnimatedSection 
              animationStyle="fadeInUp" 
              className="bg-white p-6 rounded-xl shadow-sm"
              delay={0.2}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Audits</h2>
              
              <div className="space-y-4">
                {recentAudits.map((audit) => (
                  <div key={audit.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{audit.domain}</p>
                      <p className="text-sm text-gray-500">{audit.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`font-medium text-sm ${
                        audit.score >= 80 ? 'text-green-600' : 
                        audit.score >= 60 ? 'text-amber-600' : 
                        'text-red-600'
                      }`}>
                        {audit.score}
                      </span>
                      <AnimatedButton 
                        variant="text"
                        size="sm"
                        href={`/audit/${audit.id}`}
                        className="ml-4"
                      >
                        View
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  href="/audits"
                >
                  View All Audits
                </AnimatedButton>
              </div>
            </AnimatedSection>
            
            <WeeklyScanToggle 
              initialEnabled={true} 
              className="bg-white rounded-xl shadow-sm" 
            />
            
            <AnimatedSection 
              animationStyle="fadeInUp" 
              className="bg-white p-6 rounded-xl shadow-sm"
              delay={0.3}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Metric Progress</h2>
              
              <div className="space-y-4">
                <ProgressIndicator
                  label="First Contentful Paint"
                  currentValue={2.1}
                  previousValue={3.4}
                  maxValue={5}
                  colorScheme="green"
                />
                
                <ProgressIndicator
                  label="Largest Contentful Paint"
                  currentValue={3.8}
                  previousValue={4.9}
                  maxValue={8}
                  colorScheme="amber"
                />
                
                <ProgressIndicator
                  label="Cumulative Layout Shift"
                  currentValue={0.09}
                  previousValue={0.21}
                  maxValue={0.5}
                  colorScheme="green"
                />
                
                <ProgressIndicator
                  label="Total Blocking Time"
                  currentValue={283}
                  previousValue={410}
                  maxValue={600}
                  colorScheme="amber"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </div>
  );
} 