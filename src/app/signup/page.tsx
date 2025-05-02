"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import AnimatedButton from "@/components/ui/AnimatedButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedFormField from "@/components/ui/AnimatedFormField";
import { EnvelopeIcon, LockClosedIcon, UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    website: "",
    agreeTerms: false
  });
  
  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep1()) {
      setStep(2);
    }
  };
  
  const handleSubmitStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep2()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        router.push("/select-plan");
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Header isAuthenticated={false} userPlan={null} />
      
      <main className="flex flex-col items-center justify-center px-4 py-12">
        <AnimatedSection 
          className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100"
          animationStyle="scaleUp"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join InsightSnap to get in-depth analysis of your website</p>
          </div>
          
          {/* Step indicators */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 1 ? "bg-purple-600 text-white" : "bg-green-600 text-white"
              }`}>
                {step > 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : "1"}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2">Account Details</span>
            </div>
            
            <div className={`flex-grow mx-4 h-0.5 ${step === 1 ? "bg-gray-200" : "bg-green-500"}`}></div>
            
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                2
              </div>
              <span className="text-sm font-medium text-gray-700 ml-2">Company Info</span>
            </div>
          </div>
          
          {/* Step 1: Account Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmitStep1} className="space-y-6">
                <AnimatedFormField
                  label="Full Name"
                  id="fullName"
                  index={0}
                  error={errors.fullName}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-3 py-3 border ${
                        errors.fullName ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2`}
                      placeholder="Jane Smith"
                    />
                  </div>
                  {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                </AnimatedFormField>
                
                <AnimatedFormField
                  label="Email Address"
                  id="email"
                  index={1}
                  error={errors.email}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-3 py-3 border ${
                        errors.email ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </AnimatedFormField>
                
                <AnimatedFormField
                  label="Password"
                  id="password"
                  index={2}
                  error={errors.password}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-3 py-3 border ${
                        errors.password ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </AnimatedFormField>
                
                <AnimatedFormField
                  label="Confirm Password"
                  id="confirmPassword"
                  index={3}
                  error={errors.confirmPassword}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full pl-11 pr-3 py-3 border ${
                        errors.confirmPassword ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                      } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                </AnimatedFormField>
                
                <AnimatedSection delay={0.4}>
                  <div className="flex justify-end">
                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-8"
                    >
                      Continue
                    </AnimatedButton>
                  </div>
                </AnimatedSection>
              </form>
            </motion.div>
          )}
          
          {/* Step 2: Company Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmitStep2} className="space-y-6">
                <AnimatedFormField
                  label="Company Name (Optional)"
                  id="companyName"
                  index={0}
                  error={errors.companyName}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="block w-full pl-11 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Your Company"
                    />
                  </div>
                </AnimatedFormField>
                
                <AnimatedFormField
                  label="Website URL (Optional)"
                  id="website"
                  index={1}
                  error={errors.website}
                >
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="https://example.com"
                  />
                </AnimatedFormField>
                
                <AnimatedSection delay={0.2}>
                  <div className="flex items-start mt-6">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={`h-4 w-4 text-purple-600 focus:ring-purple-500 ${
                          errors.agreeTerms ? "border-red-300" : "border-gray-300"
                        } rounded`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                        I agree to the{" "}
                        <Link href="/terms" className="text-purple-600 hover:text-purple-500">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
                          Privacy Policy
                        </Link>
                      </label>
                      {errors.agreeTerms && (
                        <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={0.3}>
                  <div className="flex justify-between mt-8">
                    <AnimatedButton
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </AnimatedButton>
                    
                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-8"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating Account...
                        </div>
                      ) : "Create Account"}
                    </AnimatedButton>
                  </div>
                </AnimatedSection>
              </form>
            </motion.div>
          )}
          
          <AnimatedSection delay={0.5} className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                Log in
              </Link>
            </p>
          </AnimatedSection>
        </AnimatedSection>
      </main>
    </div>
  );
} 