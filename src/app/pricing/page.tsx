"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import Header from "@/components/Header";

const PricingPage = () => {
  const [annual, setAnnual] = useState(false);

  // Calculate prices with 16% savings for annual billing
  const prices = {
    free: { monthly: 0, yearly: 0 },
    pro: { monthly: 19, yearly: Math.round(19 * 12 * 0.84) },
    agency: { monthly: 49, yearly: Math.round(49 * 12 * 0.84) },
  };

  // Feature lists for each tier
  const features = {
    free: [
      "5 Website Audits/month",
      "Basic SEO Analysis",
      "Performance Metrics",
      "Export to PDF",
      "Email Support",
    ],
    pro: [
      "20 Website Audits/month",
      "Advanced SEO Analysis",
      "Performance Metrics",
      "Mobile Optimization Check",
      "Security Analysis",
      "Accessibility Audit",
      "Export to PDF & CSV",
      "Email & Chat Support",
    ],
    agency: [
      "Unlimited Website Audits",
      "Complete SEO Analysis",
      "Performance Metrics",
      "Mobile Optimization Check",
      "Security Analysis",
      "Accessibility Audit",
      "Competitive Analysis",
      "Custom Branding",
      "API Access",
      "White Label Reports",
      "Priority Support",
      "Dedicated Account Manager",
    ],
  };

  // FAQ content
  const faqs = [
    {
      question: "How does the website audit work?",
      answer:
        "InsightSnap scans your website and analyzes various aspects including SEO, performance, accessibility, and security. Our algorithm provides actionable insights to improve your website.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for our paid plans. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
  ];

  return (
    <div className="bg-white">
      <Header />
      {/* Header Section */}
      <div className="bg-[#F5F5F7] py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Get the insights you need to optimize your website and stay ahead of the competition.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 inline-flex items-center bg-white p-1 rounded-full shadow-sm">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              !annual
                ? "bg-[#5D3FD3] text-white"
                : "bg-transparent text-gray-700 hover:text-[#5D3FD3]"
            } transition-colors duration-200 focus:outline-none`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              annual
                ? "bg-[#5D3FD3] text-white"
                : "bg-transparent text-gray-700 hover:text-[#5D3FD3]"
            } transition-colors duration-200 focus:outline-none`}
          >
            Yearly <span className="text-[#00BFA6]">Save 16%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1E1E1E]">Free</h3>
              <p className="mt-2 text-gray-600">Perfect for getting started</p>
              <p className="mt-6 text-5xl font-bold text-[#1E1E1E]">
                £{prices.free[annual ? "yearly" : "monthly"]}
                <span className="text-base font-normal text-gray-500 ml-1">
                  /{annual ? "year" : "month"}
                </span>
              </p>
              <Link
                href="/signup"
                className="mt-6 block w-full bg-gray-100 hover:bg-gray-200 text-[#1E1E1E] py-3 rounded-lg text-center font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="px-6 pb-8">
              <p className="text-sm font-medium text-gray-500 mb-4">Includes:</p>
              <ul className="space-y-3">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5D3FD3] overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 relative">
            <div className="absolute top-0 right-0 bg-[#5D3FD3] text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
              MOST POPULAR
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1E1E1E]">Pro</h3>
              <p className="mt-2 text-gray-600">For growing businesses</p>
              <p className="mt-6 text-5xl font-bold text-[#1E1E1E]">
                £{prices.pro[annual ? "yearly" : "monthly"]}
                <span className="text-base font-normal text-gray-500 ml-1">
                  /{annual ? "year" : "month"}
                </span>
              </p>
              <Link
                href="/signup"
                className="mt-6 block w-full bg-[#5D3FD3] hover:bg-[#4F33B0] text-white py-3 rounded-lg text-center font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="px-6 pb-8">
              <p className="text-sm font-medium text-gray-500 mb-4">Everything in Free, plus:</p>
              <ul className="space-y-3">
                {features.pro.slice(1).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Agency Tier */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#1E1E1E]">Agency</h3>
              <p className="mt-2 text-gray-600">For agencies and teams</p>
              <p className="mt-6 text-5xl font-bold text-[#1E1E1E]">
                £{prices.agency[annual ? "yearly" : "monthly"]}
                <span className="text-base font-normal text-gray-500 ml-1">
                  /{annual ? "year" : "month"}
                </span>
              </p>
              <Link
                href="/signup"
                className="mt-6 block w-full bg-[#00BFA6] hover:bg-[#00A894] text-white py-3 rounded-lg text-center font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
            <div className="px-6 pb-8">
              <p className="text-sm font-medium text-gray-500 mb-4">Everything in Pro, plus:</p>
              <ul className="space-y-3">
                {features.agency.slice(features.pro.length - 1).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#F5F5F7] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1E1E1E] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium text-[#1E1E1E] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto bg-[#5D3FD3] rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to optimize your website?</h2>
              <p className="text-lg mb-6 opacity-90">
                Start your journey to a better website with InsightSnap's powerful audit tools.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-[#00BFA6] hover:bg-[#00A894] text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Get Started Now
              </Link>
            </div>
            <div className="bg-[#4F33B0] p-10 md:p-12 flex flex-col justify-center">
              <div className="text-white font-medium opacity-90 space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-3" />
                  <span>No credit card required for free plan</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-3" />
                  <span>14-day money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-3" />
                  <span>Cancel or change plans anytime</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-3" />
                  <span>Dedicated support for all plans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 