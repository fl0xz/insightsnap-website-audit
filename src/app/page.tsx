"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import AuditForm from "@/components/AuditForm/AuditForm";
import AuditResults from "@/components/AuditResults/AuditResults";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedStaggerGroup, { AnimatedStaggerItem } from "@/components/ui/AnimatedStaggerGroup";
import AnimatedButton from "@/components/ui/AnimatedButton";
import AnimatedHero from "@/components/ui/AnimatedHero";
import AnimatedFeatureCard from "@/components/ui/AnimatedFeatureCard";
import FeatureCard from "@/components/ui/FeatureCard";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import LogoSlider from "@/components/ui/LogoSlider";
import AnimatedCTA from "@/components/ui/AnimatedCTA";
import { mockTestimonials, mockPartnerLogos, mockMediaLogos } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Always set to not authenticated for the main page
  const isAuthenticated = false;
  const userPlan = null;

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header 
        isAuthenticated={isAuthenticated} 
        userPlan={userPlan}
      />
      
      <main className="flex-grow">
        {!results ? (
          <>
            {/* Hero Section */}
            <AnimatedHero
              title="Unlock Your Website's Full Potential"
              subtitle="Get comprehensive insights into your website's performance, SEO, accessibility, and security with AI-powered recommendations."
              ctaButton={
                <AnimatedButton 
                  variant="primary"
                  size="lg"
                  href="#audit-form"
                >
                  Analyze Your Website Now
                </AnimatedButton>
              }
              secondaryButton={
                <AnimatedButton 
                  variant="outline"
                  size="lg"
                  href="/pricing"
                >
                  View Plans
                </AnimatedButton>
              }
              visual={
                <div className="relative w-full h-full min-h-[400px]">
                  <Image
                    src="/images/website-screenshot.svg"
                    alt="Website audit visualization"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-teal-500/20 mix-blend-overlay rounded-lg" />
                </div>
              }
              className="bg-gradient-to-br from-white to-purple-50 py-16"
            />
            
            {/* Client Logos */}
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <LogoSlider
                  logos={mockPartnerLogos}
                  title="Trusted by innovative companies"
                  grayscale
                  speed={35}
                />
              </div>
            </section>
            
            {/* Feature Highlights */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <AnimatedSection animationStyle="fadeInUp" className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    AI-Powered Website Analysis
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    InsightSnap analyzes every aspect of your website to provide actionable recommendations backed by data.
                  </p>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  <AnimatedFeatureCard
                    title="AI-Powered Landing Page Clarity Analysis"
                    description="Our AI analyzes your landing page content to ensure it clearly communicates your value proposition to visitors."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    }
                    index={0}
                  />
                  
                  <AnimatedFeatureCard
                    title="Conversion Funnel Audit"
                    description="Identify bottlenecks in your conversion funnel with our detailed analysis of CTA visibility and copy effectiveness."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                    }
                    index={1}
                  />
                  
                  <AnimatedFeatureCard
                    title="Heatmap Prediction"
                    description="Simulate user attention focus based on your website's layout to understand where visitors are looking."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                      </svg>
                    }
                    index={2}
                  />
                  
                  <AnimatedFeatureCard
                    title="Third-party Script Bloat Analysis"
                    description="Identify slow third-party scripts that are affecting your website's performance and user experience."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    }
                    index={3}
                  />
                  
                  <AnimatedFeatureCard
                    title="SEO Structure Breakdown"
                    description="Get a comprehensive breakdown of your website's SEO structure with actionable recommendations for improvement."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    }
                    index={4}
                  />
                  
                  <AnimatedFeatureCard
                    title="Form UX Scan"
                    description="Analyze your forms for usability issues, including field count, labeling clarity, and trust signals."
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                    }
                    index={5}
                  />
                </div>
              </div>
            </section>
            
            {/* Audit Form Section */}
            <section id="audit-form" className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <AnimatedSection className="max-w-3xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-md">
                  <h2 className="text-2xl font-bold text-center mb-6">Analyze Your Website Now</h2>
                  <AuditForm onSubmit={runAudit} isLoading={isLoading} />
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                </AnimatedSection>
              </div>
            </section>
            
            {/* As Seen On */}
            <section className="py-10 bg-gray-900 text-white">
              <div className="container mx-auto px-4">
                <LogoSlider
                  logos={mockMediaLogos}
                  title="As seen on"
                  grayscale={false}
                  speed={30}
                />
              </div>
            </section>
            
            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <AnimatedSection animationStyle="fadeInUp" className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Join thousands of website owners who have improved their online presence with InsightSnap.
                  </p>
                </AnimatedSection>
                
                <div className="max-w-3xl mx-auto">
                  <TestimonialCarousel testimonials={mockTestimonials} />
                </div>
              </div>
            </section>
            
            {/* CTA Section */}
            <AnimatedCTA
              title="Ready to improve your website's performance?"
              description="Join thousands of businesses that use InsightSnap to enhance their online presence."
              primaryButton={
                <AnimatedButton 
                  variant="primary"
                  size="lg"
                  href="/signup"
                >
                  Get Started Free
                </AnimatedButton>
              }
              secondaryButton={
                <AnimatedButton 
                  variant="outline"
                  size="lg"
                  href="/pricing"
                >
                  View Pricing
                </AnimatedButton>
              }
              bgClassName="bg-gradient-to-r from-purple-600 to-indigo-600"
            />
          </>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <AnimatedSection 
              className="bg-white p-6 rounded-xl shadow-card"
              animationStyle="scaleUp"
            >
              <AuditResults 
                results={results} 
                isAuthenticated={isAuthenticated}
                userPlan={userPlan}
              />
              
              <AnimatedSection
                className="mt-6 text-center"
                animationStyle="fadeInUp"
                delay={0.3}
              >
                <AnimatedButton 
                  href="/signup" 
                  variant="primary"
                >
                  Sign Up For More Insights
                </AnimatedButton>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        )}
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
                <li><Link href="/features" className="hover:text-white transition-colors">AI Landing Page Analysis</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">SEO Optimization</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Conversion Funnel Audit</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Security Analysis</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Mobile Responsiveness</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/agency" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms & Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li className="hover:text-white transition-colors">support@insightsnap.com</li>
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
