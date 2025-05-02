"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  UserIcon,
  ShoppingCartIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

interface SyntheticTransactionMonitoringProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock transaction test data
const mockTransactions = [
  {
    id: "login-flow",
    name: "User Login",
    icon: <UserIcon className="w-5 h-5" />,
    status: "success",
    duration: 1.2, // seconds
    lastRun: "2 hours ago",
    steps: [
      { name: "Navigate to login page", duration: 0.3, status: "success" },
      { name: "Enter credentials", duration: 0.1, status: "success" },
      { name: "Submit form", duration: 0.5, status: "success" },
      { name: "Verify user dashboard loads", duration: 0.3, status: "success" }
    ],
    history: [
      { date: "Jun 10", status: "success", duration: 1.2 },
      { date: "Jun 9", status: "success", duration: 1.3 },
      { date: "Jun 8", status: "warning", duration: 2.6 },
      { date: "Jun 7", status: "success", duration: 1.1 },
      { date: "Jun 6", status: "success", duration: 1.2 }
    ]
  },
  {
    id: "checkout-flow",
    name: "Checkout Process",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
    status: "warning",
    duration: 4.7, // seconds
    lastRun: "35 minutes ago",
    steps: [
      { name: "Add product to cart", duration: 0.4, status: "success" },
      { name: "Proceed to checkout", duration: 0.8, status: "success" },
      { name: "Enter shipping details", duration: 0.3, status: "success" },
      { name: "Enter payment information", duration: 0.5, status: "success" },
      { name: "Complete purchase", duration: 2.7, status: "warning" }
    ],
    history: [
      { date: "Jun 10", status: "warning", duration: 4.7 },
      { date: "Jun 9", status: "warning", duration: 4.5 },
      { date: "Jun 8", status: "success", duration: 2.8 },
      { date: "Jun 7", status: "success", duration: 2.9 },
      { date: "Jun 6", status: "success", duration: 3.1 }
    ]
  },
  {
    id: "contact-form",
    name: "Contact Form Submission",
    icon: <EnvelopeIcon className="w-5 h-5" />,
    status: "error",
    duration: 3.5, // seconds
    lastRun: "1 hour ago",
    steps: [
      { name: "Navigate to contact page", duration: 0.5, status: "success" },
      { name: "Fill out form fields", duration: 0.6, status: "success" },
      { name: "Submit form", duration: 0.8, status: "error" },
      { name: "Verify confirmation message", duration: 0, status: "error" }
    ],
    history: [
      { date: "Jun 10", status: "error", duration: 3.5 },
      { date: "Jun 9", status: "error", duration: 3.2 },
      { date: "Jun 8", status: "error", duration: 3.6 },
      { date: "Jun 7", status: "success", duration: 2.2 },
      { date: "Jun 6", status: "success", duration: 2.1 }
    ]
  },
  {
    id: "account-creation",
    name: "New Account Registration",
    icon: <UserIcon className="w-5 h-5" />,
    status: "success",
    duration: 2.3, // seconds
    lastRun: "3 hours ago",
    steps: [
      { name: "Navigate to sign up page", duration: 0.4, status: "success" },
      { name: "Fill registration form", duration: 0.5, status: "success" },
      { name: "Accept terms and submit", duration: 0.7, status: "success" },
      { name: "Verify email confirmation", duration: 0.7, status: "success" }
    ],
    history: [
      { date: "Jun 10", status: "success", duration: 2.3 },
      { date: "Jun 9", status: "success", duration: 2.2 },
      { date: "Jun 8", status: "success", duration: 2.4 },
      { date: "Jun 7", status: "warning", duration: 3.9 },
      { date: "Jun 6", status: "success", duration: 2.5 }
    ]
  }
];

export default function SyntheticTransactionMonitoring({
  websiteUrl = "example.com",
  isLocked = false,
  isPremium = false,
  className = ""
}: SyntheticTransactionMonitoringProps) {
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  
  // Toggle transaction details
  const toggleTransaction = (id: string) => {
    if (expandedTransaction === id) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(id);
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Synthetic Transaction Monitoring</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock transaction monitoring with our Pro plan</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => window.location.href = "/pricing"}
                >
                  Upgrade Now
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

  // Get status indicator color
  const getStatusColor = (status: string) => {
    switch(status) {
      case "success": return "text-green-500";
      case "warning": return "text-amber-500";
      case "error": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  // Get status indicator background
  const getStatusBg = (status: string) => {
    switch(status) {
      case "success": return "bg-green-100";
      case "warning": return "bg-amber-100";
      case "error": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "success": return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "warning": return <ClockIcon className="w-5 h-5 text-amber-500" />;
      case "error": return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Transaction Monitoring for {websiteUrl}</h2>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
            <p className="text-2xl font-semibold text-gray-900">{mockTransactions.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-500 mb-1">Successful</p>
            <p className="text-2xl font-semibold text-green-600">
              {mockTransactions.filter(t => t.status === "success").length}
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-500 mb-1">Slow</p>
            <p className="text-2xl font-semibold text-amber-600">
              {mockTransactions.filter(t => t.status === "warning").length}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-gray-500 mb-1">Failed</p>
            <p className="text-2xl font-semibold text-red-600">
              {mockTransactions.filter(t => t.status === "error").length}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Transaction Header */}
              <div 
                className="p-4 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => toggleTransaction(transaction.id)}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${getStatusBg(transaction.status)} mr-3`}>
                    {transaction.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{transaction.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`flex items-center text-sm ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1">
                          {transaction.status === "success" ? "Passing" : 
                           transaction.status === "warning" ? "Slow" : "Failing"}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 ml-3">Last run: {transaction.lastRun}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">{transaction.duration}s</span>
                  {expandedTransaction === transaction.id ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {expandedTransaction === transaction.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200">
                      <h4 className="font-medium text-sm text-gray-700 mb-3">Transaction Steps</h4>
                      <div className="space-y-3 mb-6">
                        {transaction.steps.map((step, index) => (
                          <div key={index} className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getStatusBg(step.status)}`}>
                              {step.status === "success" ? (
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              ) : step.status === "warning" ? (
                                <ClockIcon className="w-4 h-4 text-amber-500" />
                              ) : (
                                <XCircleIcon className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                            <span className="ml-2 text-sm text-gray-700 flex-grow">{step.name}</span>
                            <span className="text-sm text-gray-500">{step.duration}s</span>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="font-medium text-sm text-gray-700 mb-3">Recent History</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {transaction.history.map((record, index) => (
                              <tr key={index}>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{record.date}</td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    record.status === "success" ? "bg-green-100 text-green-800" :
                                    record.status === "warning" ? "bg-amber-100 text-amber-800" :
                                    "bg-red-100 text-red-800"
                                  }`}>
                                    {record.status === "success" ? "Passed" : 
                                     record.status === "warning" ? "Slow" : "Failed"}
                                  </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">{record.duration}s</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-3 py-1.5 border border-purple-300 text-sm font-medium rounded text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Run Test Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Add Transaction Button */}
        <div className="mt-6 flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Create New Transaction Test
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => window.location.href = "/dashboard/transactions"}
          >
            View Detailed Reports
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Lock icon for the premium feature version
function LockIcon({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
} 