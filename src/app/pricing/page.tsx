"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import Header from "@/components/Header/Header";
import AnimatedHero from "@/components/ui/AnimatedHero";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedButton from "@/components/ui/AnimatedButton";
import AnimatedPricingCard from "@/components/ui/AnimatedPricingCard";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import AnimatedCTA from "@/components/ui/AnimatedCTA";
import { motion } from "framer-motion";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Pricing calculations with discount for annual billing
  const pricingPlans = {
    free: {
      monthly: 0,
      annually: 0
    },
    pro: {
      monthly: 19,
      annually: Math.round(19 * 12 * 0.84)
    },
    agency: {
      monthly: 49,
      annually: Math.round(49 * 12 * 0.84)
    }
  };
  
  // Feature lists for each tier
  const features = {
    free: [
      "1 free audit per day",
      "Branded PDF download",
      "Basic SEO + Performance report",
      "Limited support"
    ],
    pro: [
      "Unlimited Website Audits",
      "Full Audit Breakdown",
      "AI-Powered Recommendations",
      "PDF Export with Branding",
      "SEO + UX Fix Suggestions",
      "Security and Mobile Analysis",
      "Priority Email Support"
    ],
    agency: [
      "Everything in Pro plan",
      "Add your agency branding/logo",
      "Export audit CSV/JSON",
      "Team access",
      "Priority support"
    ],
  };

  // FAQ content
  const faqs = [
    {
      question: "How does the website audit work?",
      answer:
        "InsightSnap scans your website and analyzes various aspects including SEO, performance, accessibility, and security. Our algorithm provides actionable insights to improve your website."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle."
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for our paid plans. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "What's included in the AI recommendations?",
      answer:
        "Our AI analyzes your website's structure, content, performance metrics, and user experience to provide personalized recommendations based on industry best practices and competitor analysis."
    },
    {
      question: "Can I use InsightSnap on multiple websites?",
      answer:
        "Yes, all plans allow you to audit multiple websites. The Free plan is limited to 1 audit per day, while Pro and Agency plans offer unlimited audits across multiple websites."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={false} userPlan={null} />
      
      {/* Hero Section */}
      <AnimatedHero
        title="Choose the Right Plan for Your Needs"
        subtitle="Get all the insights you need to optimize your website and stay ahead of the competition."
        className="bg-gradient-to-b from-white to-purple-50 py-16"
      />
      
      {/* Pricing Toggle */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-16">
        <AnimatedSection 
          animationStyle="fadeInUp" 
          className="bg-white rounded-xl shadow-md p-6 max-w-sm mx-auto flex flex-col items-center"
        >
          <div className="flex items-center justify-center mb-2">
            <span className={`text-sm font-medium mr-3 ${!isAnnual ? 'text-purple-700' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200 focus:outline-none"
              aria-pressed={isAnnual}
              aria-labelledby="pricing-toggle"
            >
              <span className="sr-only">Toggle annual pricing</span>
              <motion.span 
                className="inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition"
                animate={{ 
                  x: isAnnual ? 24 : 4,
                  backgroundColor: isAnnual ? '#ffffff' : '#ffffff'
                }}
              />
              <span 
                className={`absolute inset-0 flex items-center justify-center text-xs transition-opacity ${isAnnual ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden="true"
              >
                <span className="absolute inset-0 rounded-full bg-purple-600" />
              </span>
            </button>
            <span className={`text-sm font-medium ml-3 flex items-center ${isAnnual ? 'text-purple-700' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Save 16%</span>
            </span>
          </div>
          {isAnnual && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-center text-green-600 font-medium"
            >
              You'll save £{(pricingPlans.pro.monthly * 12) - pricingPlans.pro.annually} with annual billing!
            </motion.div>
          )}
        </AnimatedSection>
      </div>
      
      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <AnimatedPricingCard
            title="Free"
            description="Perfect for trying out InsightSnap."
            price={<>£{pricingPlans.free.monthly}<span className="text-base font-normal text-gray-500 ml-1">/month</span></>}
            features={features.free}
            buttonText="Get Started Free"
            buttonHref="/"
            buttonVariant="outline"
            index={0}
          />
          
          {/* Pro Plan */}
          <AnimatedPricingCard
            title="Pro"
            description="Perfect for professionals and small teams."
            price={<>£{isAnnual ? Math.round(pricingPlans.pro.annually / 12) : pricingPlans.pro.monthly}<span className="text-base font-normal text-white/90 ml-1">/month</span></>}
            features={features.pro}
            buttonText="Upgrade to Pro"
            buttonVariant="primary"
            recommended={true}
            index={1}
          />
          
          {/* Agency Plan */}
          <AnimatedPricingCard
            title="Agency"
            description="Perfect for agencies and larger teams."
            price={<>£{isAnnual ? Math.round(pricingPlans.agency.annually / 12) : pricingPlans.agency.monthly}<span className="text-base font-normal text-gray-500 ml-1">/month</span></>}
            features={features.agency}
            buttonText="Start Free Trial"
            buttonVariant="secondary"
            index={2}
          />
        </div>
      </div>
      
      {/* Feature Comparison */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animationStyle="fadeInUp" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare All Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for your needs with our comprehensive feature comparison.
            </p>
          </AnimatedSection>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Free</th>
                  <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider bg-purple-50">Pro</th>
                  <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Website Audits</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">1 per day</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-medium">Unlimited</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">AI Recommendations</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-medium">Advanced</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">Advanced</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">SEO Analysis</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-medium">Full</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">Full</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Heatmap Prediction</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-medium">
                    <svg className="h-5 w-5 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Weekly Automated Scans</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-medium">
                    <svg className="h-5 w-5 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Custom Branding</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-medium">
                    <svg className="h-5 w-5 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    <svg className="h-5 w-5 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnimatedSection animationStyle="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Get answers to the most commonly asked questions about InsightSnap.
          </p>
        </AnimatedSection>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <CollapsibleSection
              key={index}
              title={faq.question}
              initiallyExpanded={index === 0}
              className="bg-white"
            >
              <p className="text-gray-600">{faq.answer}</p>
            </CollapsibleSection>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <AnimatedCTA
        title="Ready to get started with InsightSnap?"
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
            href="/contact"
          >
            Contact Sales
          </AnimatedButton>
        }
        bgClassName="bg-gradient-to-r from-purple-600 to-indigo-600"
      />
    </div>
  );
} 