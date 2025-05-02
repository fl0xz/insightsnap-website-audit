"use client";

import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { 
  EnvelopeIcon, 
  ClockIcon, 
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    helpType: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        helpType: "",
        message: ""
      });
      
      // Reset success message after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Header isAuthenticated={false} userPlan={null} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-20 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Get in touch with our team
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Have questions about InsightSnap? We're here to help you optimize your online presence.
            </p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Contact Form Column */}
              <div className="w-full lg:w-7/12 p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
                
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    Thank you for your message! We'll get back to you shortly.
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] transition-colors"
                        placeholder="Subject"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="helpType" className="block text-sm font-medium text-gray-700 mb-1">
                        What do you need help with?
                      </label>
                      <select
                        id="helpType"
                        name="helpType"
                        value={formData.helpType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] transition-colors appearance-none bg-white"
                      >
                        <option value="" disabled>Select an option</option>
                        <option value="general">General question</option>
                        <option value="technical">Technical issue</option>
                        <option value="pricing">Pricing</option>
                        <option value="fix">Fix request</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] transition-colors"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  {/* reCAPTCHA placeholder */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-sm text-gray-500">
                    Protected by reCAPTCHA - This helps us prevent spam
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-[#5D3FD3] hover:bg-[#4c34a9] text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
              
              {/* Info Column */}
              <div className="w-full lg:w-5/12 bg-[#5D3FD3] p-8 md:p-12 text-white">
                <h2 className="text-2xl font-bold mb-8">Contact information</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <EnvelopeIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email us</h3>
                      <p className="text-white/80">
                        <a href="mailto:support@insightsnap.io" className="hover:text-white">
                          support@insightsnap.io
                        </a>
                      </p>
                      <p className="text-white/60 text-sm mt-1">
                        We'll respond as soon as possible
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <BuildingOfficeIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Office location</h3>
                      <p className="text-white/80">
                        InsightSnap HQ, Digital Square
                      </p>
                      <p className="text-white/60 text-sm mt-1">
                        1234 Tech Avenue, Web City
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                      <ClockIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Working hours</h3>
                      <p className="text-white/80">
                        Monday to Friday
                      </p>
                      <p className="text-white/60 text-sm mt-1">
                        9:00 AM - 5:00 PM GMT
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <h3 className="text-lg font-medium mb-3">Connect with us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-16 md:py-20 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Want to skip the inbox?
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
              Run your audit, choose a fix, and we'll do the rest.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center py-3 px-8 bg-[#5D3FD3] hover:bg-[#4c34a9] text-white font-medium rounded-lg transition-colors text-lg"
            >
              Run Free Audit
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