"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@heroicons/react/24/solid";

interface PlanFeature {
  name: string;
  includedIn: ("free" | "pro" | "agency")[];
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    frequency: "forever",
    description: "Everything you need to get started",
    highlighted: true,
    features: [
      "Unlimited website audits",
      "Basic performance metrics",
      "SEO analysis",
      "Mobile responsiveness checks",
      "Core Web Vitals"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    frequency: "per month",
    description: "Perfect for professionals and small businesses",
    highlighted: false,
    features: [
      "Everything in Free, plus:",
      "PDF report exports",
      "AI recommendations",
      "Weekly site health tracking",
      "Script & tracking pixel audit",
      "GDPR compliance checks",
      "Priority support"
    ]
  },
  {
    id: "agency",
    name: "Agency",
    price: "$49",
    frequency: "per month",
    description: "For teams managing multiple websites",
    highlighted: false,
    features: [
      "Everything in Pro, plus:",
      "White-label reports",
      "Team member accounts",
      "API access",
      "Client sharing portal",
      "Advanced analytics",
      "Dedicated account manager"
    ]
  }
];

export default function SelectPlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("free");
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  const handleContinue = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Selected plan:", selectedPlan);
      // In a real app, this would be an API call to associate the plan with the user account
      
      // Redirect to the main app or dashboard
      router.push("/");
    }, 1000);
  };
  
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Starting Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your needs. You can upgrade or downgrade anytime.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all transform ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-[#5D3FD3] scale-[1.02]' 
                  : 'hover:scale-[1.01] hover:shadow-xl'
              } ${plan.highlighted ? 'border-t-4 border-[#5D3FD3]' : ''}`}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">/{plan.frequency}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <Button
                  onClick={() => handlePlanSelection(plan.id)}
                  variant={selectedPlan === plan.id ? "primary" : "outline"}
                  fullWidth
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-[#5D3FD3] flex-shrink-0 mr-2 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto text-center">
          <Button
            onClick={handleContinue}
            size="lg"
            isLoading={isLoading}
          >
            Start Using InsightSnap
          </Button>
          
          <div className="mt-4">
            <button 
              onClick={() => router.push("/")}
              className="text-sm text-gray-600 hover:text-[#5D3FD3] transition-colors"
            >
              Skip and use free plan
            </button>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto mt-16 p-4 bg-[#5D3FD3]/5 border border-[#5D3FD3]/20 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            <span className="font-medium">100% Risk Free.</span> All plans include a 14-day money-back guarantee.
            If you're not completely satisfied, we'll refund your payment.
          </p>
        </div>
      </main>
    </>
  );
} 