"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  WrenchScrewdriverIcon,
  BoltIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

interface FixRequestCTAProps {
  websiteUrl?: string;
  totalIssues?: number;
  className?: string;
}

// Service package data
const servicePackages = [
  {
    id: "seo-fix-pack",
    name: "SEO Fix Pack",
    description: "Quick wins for SEO ranking improvement",
    price: 299,
    deliveryTime: "3-5 days",
    features: [
      "Meta tag optimization",
      "Schema markup implementation",
      "URL structure cleanup",
      "Internal linking fixes",
      "Image alt text optimization"
    ],
    icon: <BoltIcon className="h-8 w-8 text-amber-500" />
  },
  {
    id: "speed-surge",
    name: "Speed Surge",
    description: "Boost your website loading speed",
    price: 349,
    deliveryTime: "4-6 days",
    features: [
      "Image optimization",
      "Script minification & deferring",
      "Cache implementation",
      "Lazy loading setup",
      "Server response improvement"
    ],
    icon: <RocketLaunchIcon className="h-8 w-8 text-purple-500" />
  },
  {
    id: "full-fix-bundle",
    name: "Full Fix Bundle",
    description: "Comprehensive fixes for all issues",
    price: 799,
    deliveryTime: "7-10 days",
    features: [
      "All SEO & Speed fixes",
      "Mobile responsiveness fixes",
      "Accessibility compliance",
      "Security vulnerabilities patching",
      "UX improvements",
      "Custom development as needed"
    ],
    highlighted: true,
    icon: <WrenchScrewdriverIcon className="h-8 w-8 text-blue-500" />
  }
];

export default function FixRequestCTA({
  websiteUrl = "example.com",
  totalIssues = 24,
  className = ""
}: FixRequestCTAProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formState, setFormState] = useState<"initial" | "submitted" | "success">("initial");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitted");
    
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };
  
  // Select a package
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Need help fixing these issues?</h2>
          <p className="mt-2 text-gray-600">
            We found {totalIssues} issues on {websiteUrl} that could be affecting your performance. 
            Let our experts fix them for you.
          </p>
        </div>
        
        {formState === "success" ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">Request Submitted!</h3>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for your interest. Our team will review your website and get back to you within 24 hours with a detailed proposal.
            </p>
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => {
                  setFormState("initial");
                  setSelectedPackage(null);
                  setContactInfo({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                  });
                }}
              >
                Submit another request
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Service Packages */}
            {!selectedPackage && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicePackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ y: -5 }}
                    className={`relative rounded-lg border ${pkg.highlighted ? 'border-purple-400 ring-2 ring-purple-400 ring-opacity-50' : 'border-gray-200'} bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md`}
                  >
                    {pkg.highlighted && (
                      <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                        Recommended
                      </div>
                    )}
                    <div className="flex items-center mb-3">
                      {pkg.icon}
                      <h3 className="ml-2 text-lg font-semibold text-gray-900">{pkg.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                      <span className="text-sm text-gray-500 ml-1">one-time</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Delivery:</span> {pkg.deliveryTime}
                    </div>
                    <ul className="space-y-2 mb-5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 flex-shrink-0 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md ${
                        pkg.highlighted 
                          ? 'border-transparent text-white bg-purple-600 hover:bg-purple-700' 
                          : 'border-purple-600 text-purple-600 bg-white hover:bg-purple-50'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                      onClick={() => handlePackageSelect(pkg.id)}
                    >
                      Select this package
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Contact Form */}
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-800"
                      onClick={() => setSelectedPackage(null)}
                    >
                      Change package
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    You've selected: <span className="font-medium">{servicePackages.find(pkg => pkg.id === selectedPackage)?.name}</span>
                  </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={contactInfo.name}
                          onChange={handleInputChange}
                          className="py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          required
                          value={contactInfo.email}
                          onChange={handleInputChange}
                          className="py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          value={contactInfo.phone}
                          onChange={handleInputChange}
                          className="py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional details</label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={contactInfo.message}
                          onChange={handleInputChange}
                          className="py-3 px-4 block w-full shadow-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Any specific issues you'd like us to address?"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={formState === "submitted"}
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {formState === "submitted" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Request Website Fix <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Testimonial */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src="https://randomuser.me/api/portraits/women/42.jpg" 
                      alt="Sarah Thompson avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <svg 
                          key={rating}
                          className="h-5 w-5 text-yellow-400" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      "The InsightSnap team fixed all our SEO and speed issues in just 4 days. Our site's ranking improved dramatically, and our page load time went from 5.2s to 1.8s. Incredible service!"
                    </p>
                    <p className="text-xs font-medium text-gray-900 mt-2">
                      Sarah Thompson, Marketing Director at TechFlow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 