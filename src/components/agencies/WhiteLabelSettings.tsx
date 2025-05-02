"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  SwatchIcon,
  EyeIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";

interface WhiteLabelSettingsProps {
  isLocked?: boolean;
  isPremium?: boolean;
  className?: string;
}

export default function WhiteLabelSettings({
  isLocked = false,
  isPremium = false,
  className = ""
}: WhiteLabelSettingsProps) {
  const [brandName, setBrandName] = useState("Your Agency Name");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#5D3FD3");
  const [secondaryColor, setSecondaryColor] = useState("#00BFA6");
  const [previewTab, setPreviewTab] = useState<"dashboard" | "report">("dashboard");
  
  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoPreview(null);
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">White-Label Branding</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockClosedIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Agency Feature</h3>
                <p className="text-gray-600 mb-4">Unlock white-labeling with our Agency plan</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => window.location.href = "/pricing"}
                >
                  View Agency Plan
                </motion.button>
              </div>
            </div>
            
            {/* Blurred preview content */}
            <div className="h-48 w-full rounded-lg bg-gradient-to-r from-purple-100 to-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">White-Label Branding</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Settings Column */}
          <div>
            <div className="mb-6">
              <label htmlFor="brand-name" className="block text-sm font-medium text-gray-700 mb-1">
                Agency/Company Name
              </label>
              <input
                type="text"
                id="brand-name"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Your Agency Name"
              />
              <p className="mt-1 text-xs text-gray-500">
                This name will appear on all reports and dashboards shared with clients.
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agency Logo
              </label>
              {!logoPreview ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                        <span>Upload a logo</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          accept="image/*"
                          className="sr-only" 
                          onChange={handleLogoUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                  </div>
                </div>
              ) : (
                <div className="mt-1 relative">
                  <div className="relative h-32 w-full bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    <Image 
                      src={logoPreview} 
                      alt="Logo Preview" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={removeLogo}
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Recommended size: 200x60 pixels, transparent background
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand Colors
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primary-color" className="block text-xs text-gray-500 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="h-8 w-8 rounded-md border border-gray-300 mr-2"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <input
                      type="text"
                      id="primary-color"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="#5D3FD3"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="secondary-color" className="block text-xs text-gray-500 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="h-8 w-8 rounded-md border border-gray-300 mr-2"
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <input
                      type="text"
                      id="secondary-color"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      placeholder="#00BFA6"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                These colors will be used for buttons, headers, and accents in reports.
              </p>
            </div>
            
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => {}}
              >
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Save Brand Settings
              </motion.button>
            </div>
          </div>
          
          {/* Preview Column */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">Live Preview</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className={`inline-flex items-center px-3 py-1.5 border ${
                    previewTab === 'dashboard' 
                      ? 'border-purple-600 bg-purple-50 text-purple-700' 
                      : 'border-gray-300 bg-white text-gray-700'
                  } text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                  onClick={() => setPreviewTab('dashboard')}
                >
                  <EyeIcon className="h-3.5 w-3.5 mr-1" />
                  Dashboard
                </button>
                <button
                  type="button"
                  className={`inline-flex items-center px-3 py-1.5 border ${
                    previewTab === 'report' 
                      ? 'border-purple-600 bg-purple-50 text-purple-700' 
                      : 'border-gray-300 bg-white text-gray-700'
                  } text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                  onClick={() => setPreviewTab('report')}
                >
                  <DocumentTextIcon className="h-3.5 w-3.5 mr-1" />
                  PDF Report
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {previewTab === 'dashboard' ? (
                <div>
                  {/* Dashboard Header Preview */}
                  <div 
                    className="p-4 border-b border-gray-200"
                    style={{ backgroundColor: primaryColor + '10' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {logoPreview ? (
                          <div className="h-8 w-24 relative mr-3">
                            <Image
                              src={logoPreview}
                              alt="Brand Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div 
                            className="text-lg font-bold mr-3"
                            style={{ color: primaryColor }}
                          >
                            {brandName}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-7 w-24 rounded-md bg-gray-200"></div>
                        <div className="h-7 w-7 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content Preview */}
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="h-5 w-1/3 bg-gray-200 rounded mb-3"></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-14 bg-gray-100 rounded"></div>
                        <div className="h-14 bg-gray-100 rounded"></div>
                        <div className="h-14 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="h-5 w-1/4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-32 bg-gray-100 rounded mb-3"></div>
                    </div>
                    
                    <div>
                      <div className="h-5 w-1/5 bg-gray-200 rounded mb-3"></div>
                      <div className="flex space-x-2">
                        <div
                          className="h-8 w-24 rounded"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                        <div
                          className="h-8 w-24 rounded border"
                          style={{ borderColor: secondaryColor, backgroundColor: 'white' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* PDF Report Header Preview */}
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      {logoPreview ? (
                        <div className="h-8 w-24 relative mr-3">
                          <Image
                            src={logoPreview}
                            alt="Brand Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div 
                          className="text-lg font-bold mr-3"
                          style={{ color: primaryColor }}
                        >
                          {brandName}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Website Audit Report
                    </div>
                  </div>
                  
                  {/* PDF Report Content Preview */}
                  <div className="p-4">
                    <div className="mb-4">
                      <div 
                        className="h-7 w-2/3 rounded mb-3 font-bold"
                        style={{ color: primaryColor }}
                      >
                        Audit Results for example.com
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
                      <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
                      <div className="h-3 w-2/3 bg-gray-100 rounded mb-3"></div>
                    </div>
                    
                    <div className="mb-4">
                      <div 
                        className="h-6 w-1/3 rounded mb-3 font-medium"
                        style={{ color: primaryColor }}
                      >
                        Key Findings
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="h-12 bg-gray-100 rounded"></div>
                        <div className="h-12 bg-gray-100 rounded"></div>
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
                      <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
                      <div className="h-3 w-4/5 bg-gray-100 rounded mb-3"></div>
                    </div>
                    
                    <div>
                      <div 
                        className="h-6 w-1/4 rounded mb-3 font-medium"
                        style={{ color: primaryColor }}
                      >
                        Recommendations
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
                      <div className="h-3 w-full bg-gray-100 rounded mb-1"></div>
                      <div className="h-3 w-3/4 bg-gray-100 rounded mb-3"></div>
                    </div>
                  </div>
                  
                  {/* PDF Footer */}
                  <div 
                    className="p-3 border-t border-gray-200 text-xs text-center"
                    style={{ color: secondaryColor }}
                  >
                    Generated by {brandName} • {new Date().toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => {}}
              >
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Download Sample Report
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 