"use client";

import React from "react";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { 
  LightBulbIcon, 
  SparklesIcon, 
  DocumentArrowDownIcon, 
  ShieldCheckIcon, 
  DevicePhoneMobileIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Header isAuthenticated={false} userPlan={null} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Everything you need to understand — and fix — your website.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              InsightSnap runs full audits with AI-written recommendations, turning raw issues into actionable fixes.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center py-3 px-8 bg-[#5D3FD3] hover:bg-[#4c34a9] text-white font-medium rounded-lg transition-colors text-lg"
            >
              Run Free Audit
            </Link>
          </div>
        </section>
        
        {/* Feature Grid */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900">
              Powerful features for your website
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl shadow-md p-8 transition-transform hover:transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/10 flex items-center justify-center mb-6">
                  <LightBulbIcon className="h-6 w-6 text-[#5D3FD3]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Website Audits</h3>
                <p className="text-gray-600">
                  Get comprehensive analysis of your site's SEO, performance, accessibility, and security in seconds.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white rounded-xl shadow-md p-8 transition-transform hover:transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/10 flex items-center justify-center mb-6">
                  <SparklesIcon className="h-6 w-6 text-[#5D3FD3]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Recommendations</h3>
                <p className="text-gray-600">
                  Receive intelligent, prioritized suggestions with clear explanations on how to improve your site.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white rounded-xl shadow-md p-8 transition-transform hover:transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/10 flex items-center justify-center mb-6">
                  <DocumentArrowDownIcon className="h-6 w-6 text-[#5D3FD3]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Branded PDF Reports</h3>
                <p className="text-gray-600">
                  Download shareable, professional reports complete with your branding for client presentations.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white rounded-xl shadow-md p-8 transition-transform hover:transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/10 flex items-center justify-center mb-6">
                  <ShieldCheckIcon className="h-6 w-6 text-[#5D3FD3]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security Checks</h3>
                <p className="text-gray-600">
                  Identify vulnerabilities, missing headers, and security best practices to keep your site protected.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-white rounded-xl shadow-md p-8 transition-transform hover:transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/10 flex items-center justify-center mb-6">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-[#5D3FD3]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mobile & UX Metrics</h3>
                <p className="text-gray-600">
                  Ensure your site delivers exceptional experiences across all devices with detailed UX analytics.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-white rounded-xl shadow-md p-8 transition-transform hover:transform hover:-translate-y-1">
                <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/10 flex items-center justify-center mb-6">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-[#5D3FD3]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Done-for-You Fixes</h3>
                <p className="text-gray-600">
                  Let our experts implement the recommended changes with our premium service packages.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Secondary Features Section with Illustration */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  Advanced analytics that make sense
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  InsightSnap translates technical metrics into clear, actionable insights that anyone can understand.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#00BFA6]/20 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="h-4 w-4 text-[#00BFA6]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Core Web Vitals Monitoring</h3>
                      <p className="text-sm text-gray-600">Track LCP, FID, and CLS metrics with simple explanations.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#00BFA6]/20 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="h-4 w-4 text-[#00BFA6]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Competitor Benchmarking</h3>
                      <p className="text-sm text-gray-600">See how your site stacks up against industry standards.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#00BFA6]/20 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="h-4 w-4 text-[#00BFA6]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Historical Tracking</h3>
                      <p className="text-sm text-gray-600">Monitor your website's progress over time with trend analysis.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="w-full lg:w-1/2">
                <div className="bg-[#F5F5F7] rounded-xl p-8 relative overflow-hidden">
                  {/* This would be better as an actual illustration or screenshot */}
                  <div className="aspect-video bg-white rounded-lg shadow-md p-4">
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="h-24 bg-[#5D3FD3]/10 rounded flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-[#5D3FD3]/20"></div>
                      </div>
                      <div className="h-24 bg-[#00BFA6]/10 rounded flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-[#00BFA6]/20"></div>
                      </div>
                      <div className="h-24 bg-yellow-100 rounded flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-yellow-200"></div>
                      </div>
                    </div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-[#5D3FD3] text-white">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Thousands of websites have hidden issues. Fix yours today.
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
              Join the smart businesses that use InsightSnap to optimize their online presence.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center py-3 px-8 bg-white hover:bg-gray-100 text-[#5D3FD3] font-medium rounded-lg transition-colors text-lg"
            >
              Try InsightSnap Free
            </Link>
          </div>
        </section>
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