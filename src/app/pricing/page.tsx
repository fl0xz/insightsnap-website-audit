"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header/Header";
import PricingToggle from "@/components/pricing/PricingToggle";
import PricingCard from "@/components/pricing/PricingCard";
import ClientLogos from "@/components/trust/ClientLogos";
import TestimonialsCarousel from "@/components/trust/TestimonialsCarousel";
import CollapsibleSection from "@/components/ui/CollapsibleSection";
import { CheckIcon } from "@heroicons/react/24/solid";

// Define the pricing plans
const pricingPlans = [
  {
    title: "Free",
    description: "Basic website audit for individuals",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: "Basic SEO Analysis", included: true },
      { text: "Performance Score", included: true },
      { text: "Mobile Responsiveness Check", included: true },
      { text: "Up to 5 Pages Per Website", included: true },
      { text: "Basic Security Assessment", included: true },
      { text: "Export PDF Reports", included: true },
      { text: "Email Support", included: false },
      { text: "API Monitoring", included: false },
      { text: "Real User Monitoring", included: false },
      { text: "Accessibility Evaluation", included: false },
      { text: "Script Tracker Analysis", included: false },
      { text: "Conversion Funnel Analysis", included: false },
      { text: "Synthetic Transaction Tests", included: false },
      { text: "Multiple Team Members", included: false },
      { text: "White-Labeling", included: false }
    ],
    ctaText: "Start For Free",
    ctaLink: "/signup"
  },
  {
    title: "Pro",
    description: "Advanced monitoring for businesses",
    monthlyPrice: 49,
    yearlyPrice: 470,
    features: [
      { text: "Everything in Free", included: true },
      { text: "Unlimited Pages Per Website", included: true },
      { text: "5 Websites", included: true },
      { text: "Priority Email Support", included: true },
      { text: "API Monitoring (5 endpoints)", included: true },
      { text: "Real User Monitoring", included: true },
      { text: "Accessibility Evaluation", included: true },
      { text: "Script Tracker Analysis", included: true },
      { text: "Conversion Funnel Analysis", included: true },
      { text: "Synthetic Transaction Tests (3)", included: true },
      { text: "1 Team Member", included: true },
      { text: "Daily Automated Audits", included: true },
      { text: "Custom Alerts", included: true },
      { text: "White-Labeling", included: false },
      { text: "Priority Phone Support", included: false }
    ],
    ctaText: "Get Pro",
    ctaLink: "/signup?plan=pro",
    isPrimary: true
  },
  {
    title: "Agency",
    description: "Multi-site management for agencies",
    monthlyPrice: 149,
    yearlyPrice: 1430,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited Websites", included: true },
      { text: "Priority Phone Support", included: true },
      { text: "API Monitoring (Unlimited)", included: true },
      { text: "Unlimited Team Members", included: true },
      { text: "White-Labeling", included: true },
      { text: "Client Management Dashboard", included: true },
      { text: "Advanced Reporting", included: true },
      { text: "Audit History (1 year)", included: true },
      { text: "Custom API Integration", included: true },
      { text: "Synthetic Transaction Tests (Unlimited)", included: true },
      { text: "Custom Branding Options", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "SOC2 Compliance Reports", included: true },
      { text: "Priority Feature Requests", included: true }
    ],
    ctaText: "Contact Sales",
    ctaLink: "/contact?inquiry=agency"
  }
];

// Define FAQ items
const faqItems = [
  {
    question: "What's the difference between the plans?",
    answer: "Our Free plan provides basic website auditing for individual sites. Pro includes more advanced features like real user monitoring, accessibility testing, and API monitoring for up to 5 websites. Agency offers unlimited websites, white-labeling, client management tools, and priority support for digital agencies and larger organizations."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the changes will take effect at the end of your current billing cycle."
  },
  {
    question: "Is there a limit to how many audits I can run?",
    answer: "Free users can run up to 5 audits per day. Pro users get up to 50 audits per day. Agency users have unlimited audits. All plans allow for scheduled automated audits according to their respective plan limits."
  },
  {
    question: "How does white-labeling work?",
    answer: "White-labeling is available on the Agency plan and allows you to customize the reports and dashboards with your own logo, brand colors, and company name. This is perfect for agencies that want to present the audit results to their clients under their own brand."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our service. Simply contact our support team within 14 days of your purchase for a full refund."
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Toggle between monthly and yearly billing
  const toggleBillingPeriod = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Pricing Header */}
        <section className="pt-16 pb-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
                  Simple, Transparent Pricing
                </h1>
                <p className="mt-5 text-xl text-gray-500">
                  Choose the plan that's right for you and start improving your website today.
                </p>
              </motion.div>
              
              {/* Pricing Toggle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8"
              >
                <PricingToggle
                  isAnnual={isAnnual}
                  onToggle={toggleBillingPeriod}
                  yearlyDiscount={20}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={plan.title}
                  title={plan.title}
                  description={plan.description}
                  monthlyPrice={plan.monthlyPrice}
                  yearlyPrice={plan.yearlyPrice}
                  isAnnual={isAnnual}
                  features={plan.features}
                  ctaText={plan.ctaText}
                  ctaLink={plan.ctaLink}
                  isPrimary={'isPrimary' in plan ? plan.isPrimary : false}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Service Upsell Cards */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Need Expert Help?
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Let our team of experts fix the issues we identify in your audit.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* SEO Fix Pack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">SEO Fix Pack</h3>
                  <p className="text-gray-600 mb-6">
                    We'll optimize your meta tags, headings, and content structure to improve search engine rankings.
                  </p>
                  <div className="flex items-baseline text-gray-900 mb-6">
                    <span className="text-3xl font-extrabold">£99</span>
                    <span className="ml-1 text-sm text-gray-500">/one-time</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Meta tags optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Heading structure fixes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">URL structure review</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Image alt text optimization</span>
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => window.location.href = "/order?service=seo-fix-pack"}
                  >
                    Order SEO Fix
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Speed Surge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-500 relative"
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    Best Value
                  </span>
                </div>
                <div className="p-8 bg-purple-50">
                  <h3 className="text-xl font-semibold text-purple-600 mb-4">Speed Surge</h3>
                  <p className="text-gray-600 mb-6">
                    We'll optimize your website to load faster by implementing core web vitals improvements.
                  </p>
                  <div className="flex items-baseline text-gray-900 mb-6">
                    <span className="text-3xl font-extrabold">£149</span>
                    <span className="ml-1 text-sm text-gray-500">/one-time</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Image optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">JavaScript minification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">CSS optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Browser caching setup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Core Web Vitals optimization</span>
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => window.location.href = "/order?service=speed-surge"}
                  >
                    Order Speed Fix
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Full Fix Bundle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Full Fix Bundle</h3>
                  <p className="text-gray-600 mb-6">
                    Complete optimization package including SEO, speed, accessibility, and security fixes.
                  </p>
                  <div className="flex items-baseline text-gray-900 mb-6">
                    <span className="text-3xl font-extrabold">£299</span>
                    <span className="ml-1 text-sm text-gray-500">/one-time</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Everything in SEO Fix Pack</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Everything in Speed Surge</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Accessibility improvements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">Security vulnerability fixes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">30-day support included</span>
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => window.location.href = "/order?service=full-fix-bundle"}
                  >
                    Order Full Bundle
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Trusted by Businesses Worldwide
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Join thousands of companies using InsightSnap to improve their websites.
                </p>
              </motion.div>
            </div>
            
            <ClientLogos className="mb-16" />
            
            <TestimonialsCarousel />
          </div>
        </section>
        
        {/* FAQs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Everything you need to know about our plans and pricing.
                </p>
              </motion.div>
            </div>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <CollapsibleSection
                  key={index}
                  title={item.question}
                  initiallyExpanded={index === 0}
                >
                  <p className="text-gray-600 pt-2">{item.answer}</p>
                </CollapsibleSection>
              ))}
            </div>
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
                  Ready to improve your website?
                </h2>
                <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
                  Start with our free plan today, no credit card required. Upgrade anytime as your needs grow.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
                    onClick={() => window.location.href = "/signup"}
                  >
                    Get Started Free
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