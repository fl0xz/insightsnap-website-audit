"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import AnimatedButton from "@/components/ui/AnimatedButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedStaggerGroup, { AnimatedStaggerItem } from "@/components/ui/AnimatedStaggerGroup";
import { BrandedEmailPreview, BrandedPDFPreview, FixRequestPreview } from "./ReportPreview";
import {
  DocumentDuplicateIcon,
  ClockIcon,
  CheckIcon,
  UserGroupIcon,
  InboxIcon,
  EnvelopeIcon,
  TagIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useAnimationVariants } from "@/lib/hooks/useAnimationVariants";

// Feature data
const agencyFeatures = [
  {
    id: "branded-audits",
    icon: <DocumentDuplicateIcon className="w-6 h-6" />,
    title: "Unlimited Branded Audits",
    description: "Add your logo, brand colors, and custom domain to every report your clients see."
  },
  {
    id: "report-history",
    icon: <ClockIcon className="w-6 h-6" />,
    title: "Client Report History",
    description: "Keep a log of all audits done per client — PDF, CSV exports with trend graphs."
  },
  {
    id: "status-tracking",
    icon: <CheckIcon className="w-6 h-6" />,
    title: "Audit Status Tracking",
    description: "Mark audit items as: Fixed / In Progress / Ignored with a simple checkbox UI."
  },
  {
    id: "team-access",
    icon: <UserGroupIcon className="w-6 h-6" />,
    title: "Team Access",
    description: "Invite team members to run, view, or export audits with custom permission levels."
  },
  {
    id: "fix-request",
    icon: <InboxIcon className="w-6 h-6" />,
    title: "Fix Request Portal",
    description: "Each client can request fixes with one click — routes back to your agency inbox."
  },
  {
    id: "email-automation",
    icon: <EnvelopeIcon className="w-6 h-6" />,
    title: "Email Delivery Automation",
    description: "Auto-send audit reports to client emails on a weekly or monthly schedule."
  },
  {
    id: "white-label",
    icon: <TagIcon className="w-6 h-6" />,
    title: "White-Label Mode",
    description: "Hide InsightSnap branding entirely if needed for complete white-label reporting."
  }
];

// Client view previews
const clientPreviews = [
  {
    id: "email-preview",
    title: "Branded Email Reports",
    description: "Clients receive beautiful, branded emails with their audit results and key metrics.",
    component: <BrandedEmailPreview />
  },
  {
    id: "pdf-preview",
    title: "Professional PDF Reports",
    description: "Downloadable PDFs include your agency's branding and custom recommendations.",
    component: <BrandedPDFPreview />
  },
  {
    id: "fix-preview",
    title: "One-Click Fix Requests",
    description: "Clients can request fixes directly from their report with a simple button click.",
    component: <FixRequestPreview />
  }
];

export default function AgencyPage() {
  const router = useRouter();
  const { staggeredItem } = useAnimationVariants();
  
  const handleStartTrial = () => {
    // In a real implementation, this would redirect to signup with agency plan preselected
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <AnimatedSection 
          className="relative bg-gradient-to-br from-[#5D3FD3] to-[#4c34a9] py-20 px-4"
          animationStyle="fadeInUp"
        >
          <div className="max-w-6xl mx-auto text-center text-white relative z-10">
            <AnimatedStaggerGroup staggerDelay={0.1}>
              <AnimatedStaggerItem>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  InsightSnap for Agencies
                </h1>
              </AnimatedStaggerItem>
              
              <AnimatedStaggerItem>
                <p className="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto">
                  Audit, report, and fix client websites at scale — all from one dashboard.
                </p>
              </AnimatedStaggerItem>
              
              <AnimatedStaggerItem>
                <AnimatedButton 
                  onClick={handleStartTrial} 
                  size="lg" 
                  variant="secondary"
                  className="font-semibold"
                >
                  Try Agency Plan Free
                </AnimatedButton>
              </AnimatedStaggerItem>
              
              <AnimatedStaggerItem>
                <p className="mt-4 text-sm text-white/80">
                  14 day free trial. No credit card required.
                </p>
              </AnimatedStaggerItem>
            </AnimatedStaggerGroup>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#00BFA6]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </AnimatedSection>
        
        {/* Feature Grid Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animationStyle="fadeInUp">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Agency Dashboard Features</h2>
              <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
                Everything you need to manage website audits for multiple clients with your own branding.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agencyFeatures.map((feature, index) => {
                const isEven = index % 2 === 0;
                return (
                <AnimatedSection 
                  key={feature.id} 
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
                  animationStyle={isEven ? "slideInLeft" : "slideInRight"}
                  margin="-50px"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-[#5D3FD3]/10 p-3 rounded-lg text-[#5D3FD3]">
                      {feature.icon}
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Client Preview Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animationStyle="fadeInUp">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Client View Preview</h2>
              <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
                Here's what your clients receive — clean, branded, and professional.
              </p>
            </AnimatedSection>
            
            <AnimatedStaggerGroup className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12" staggerDelay={0.15}>
              {clientPreviews.map((preview, index) => (
                <AnimatedStaggerItem key={preview.id} custom={index}>
                  <div className="text-center">
                    <div className="mb-6 bg-gray-100 rounded-lg p-2 h-[220px] flex items-center justify-center border border-gray-200">
                      {preview.component}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{preview.title}</h3>
                    <p className="text-gray-600">{preview.description}</p>
                  </div>
                </AnimatedStaggerItem>
              ))}
            </AnimatedStaggerGroup>
            
            <AnimatedSection 
              className="bg-[#5D3FD3]/5 border border-[#5D3FD3]/10 rounded-xl p-8 text-center"
              animationStyle="scaleUp"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Want to see a demo of the client experience?</h3>
              <p className="text-gray-600 mb-6">
                Schedule a quick call and we'll walk you through how your clients will see and interact with your branded reports.
              </p>
              <AnimatedButton 
                variant="primary" 
                size="lg" 
                className="inline-flex items-center"
              >
                Request Demo
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </AnimatedButton>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Pricing Reminder Section */}
        <AnimatedSection 
          className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          animationStyle="fadeInUp"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-[#00BFA6]/20 text-[#00BFA6] px-4 py-1 rounded-full text-sm font-medium mb-6">
              AGENCY PLAN
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your agency reporting?</h2>
            <AnimatedSection
              className="bg-white/10 rounded-xl p-8 mb-10 backdrop-blur-sm"
              animationStyle="scaleUp"
              delay={0.2}
            >
              <div className="text-5xl font-bold mb-2">$49<span className="text-xl font-normal text-white/80">/month</span></div>
              <p className="text-lg mb-6">Everything in Pro + white-label, team access, and export tools</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] mr-2" />
                  <span>White-label reporting</span>
                </li>
                <li className="flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] mr-2" />
                  <span>Team member accounts</span>
                </li>
                <li className="flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] mr-2" />
                  <span>Client audit history</span>
                </li>
                <li className="flex items-center justify-center">
                  <CheckIcon className="h-5 w-5 text-[#00BFA6] mr-2" />
                  <span>Automated email reports</span>
                </li>
              </ul>
              <AnimatedButton 
                onClick={handleStartTrial} 
                variant="secondary" 
                size="lg" 
                className="w-full font-semibold"
              >
                Start Agency Trial
              </AnimatedButton>
            </AnimatedSection>
            <div>
              <Link 
                href="/contact" 
                className="text-white/80 hover:text-white flex items-center justify-center transition-colors"
              >
                Need more? Contact us for enterprise solutions
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonial Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-3xl font-bold text-center mb-4 text-gray-900">
              What Agencies Say
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <AnimatedSection 
                className="bg-gray-50 p-8 rounded-xl border border-gray-100"
                animationStyle="slideInLeft"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Digital Spark Agency</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "InsightSnap has transformed how we present website audits to clients. The white-label reports look like they were custom-built by our team, and clients love the visual score cards."
                </p>
              </AnimatedSection>
              <AnimatedSection 
                className="bg-gray-50 p-8 rounded-xl border border-gray-100"
                animationStyle="slideInRight"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-500">WebGrowth Partners</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The team access feature alone is worth the agency plan. Our SEO specialists and developers can collaborate on the same client audits, see what's been fixed, and track progress over time."
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <AnimatedSection 
          className="py-16 px-4 bg-gray-50"
          animationStyle="scaleUp"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Start your 14-day free trial today</h2>
            <p className="text-lg text-gray-600 mb-8">
              No credit card required. Upgrade, downgrade, or cancel anytime.
            </p>
            <AnimatedButton 
              onClick={handleStartTrial} 
              size="lg" 
              className="font-semibold"
            >
              Try Agency Plan Free
            </AnimatedButton>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
} 