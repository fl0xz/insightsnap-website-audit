"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface APIMonitoringProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock API endpoint data
const mockAPIEndpoints = [
  {
    id: "api-1",
    name: "Authentication API",
    url: "/api/auth",
    method: "POST",
    status: "healthy",
    uptime: 99.98,
    responseTime: 123, // ms
    lastChecked: "2 minutes ago",
    history: [
      { timestamp: "10:00", status: "healthy", responseTime: 118 },
      { timestamp: "09:30", status: "healthy", responseTime: 125 },
      { timestamp: "09:00", status: "degraded", responseTime: 342 },
      { timestamp: "08:30", status: "healthy", responseTime: 119 },
      { timestamp: "08:00", status: "healthy", responseTime: 120 }
    ]
  },
  {
    id: "api-2",
    name: "Product Catalog",
    url: "/api/products",
    method: "GET",
    status: "degraded",
    uptime: 98.21,
    responseTime: 487, // ms
    lastChecked: "5 minutes ago",
    history: [
      { timestamp: "10:00", status: "degraded", responseTime: 487 },
      { timestamp: "09:30", status: "degraded", responseTime: 502 },
      { timestamp: "09:00", status: "healthy", responseTime: 198 },
      { timestamp: "08:30", status: "healthy", responseTime: 205 },
      { timestamp: "08:00", status: "healthy", responseTime: 190 }
    ]
  },
  {
    id: "api-3",
    name: "Order Processing",
    url: "/api/orders",
    method: "POST",
    status: "down",
    uptime: 95.67,
    responseTime: 0, // ms
    lastChecked: "1 minute ago",
    history: [
      { timestamp: "10:00", status: "down", responseTime: 0 },
      { timestamp: "09:30", status: "down", responseTime: 0 },
      { timestamp: "09:00", status: "degraded", responseTime: 756 },
      { timestamp: "08:30", status: "healthy", responseTime: 231 },
      { timestamp: "08:00", status: "healthy", responseTime: 225 }
    ]
  },
  {
    id: "api-4",
    name: "User Profile",
    url: "/api/users/profile",
    method: "GET",
    status: "healthy",
    uptime: 99.95,
    responseTime: 89, // ms
    lastChecked: "7 minutes ago",
    history: [
      { timestamp: "10:00", status: "healthy", responseTime: 89 },
      { timestamp: "09:30", status: "healthy", responseTime: 92 },
      { timestamp: "09:00", status: "healthy", responseTime: 87 },
      { timestamp: "08:30", status: "healthy", responseTime: 90 },
      { timestamp: "08:00", status: "healthy", responseTime: 88 }
    ]
  }
];

export default function APIMonitoring({
  websiteUrl = "example.com",
  isLocked = false,
  isPremium = false,
  className = ""
}: APIMonitoringProps) {
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [isAddingEndpoint, setIsAddingEndpoint] = useState(false);
  const [newEndpoint, setNewEndpoint] = useState({
    name: "",
    url: "",
    method: "GET"
  });
  const [apiEndpoints, setApiEndpoints] = useState(mockAPIEndpoints);
  
  // Toggle endpoint details visibility
  const toggleEndpoint = (id: string) => {
    if (expandedEndpoint === id) {
      setExpandedEndpoint(null);
    } else {
      setExpandedEndpoint(id);
    }
  };

  // Handle adding new endpoint
  const handleAddEndpoint = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new endpoint with mock data
    const newApiEndpoint = {
      id: `api-${apiEndpoints.length + 1}`,
      name: newEndpoint.name,
      url: newEndpoint.url,
      method: newEndpoint.method,
      status: "healthy",
      uptime: 100,
      responseTime: Math.floor(Math.random() * 150) + 50, // Random time between 50-200ms
      lastChecked: "just now",
      history: [
        { timestamp: "10:00", status: "healthy", responseTime: Math.floor(Math.random() * 150) + 50 }
      ]
    };
    
    setApiEndpoints([...apiEndpoints, newApiEndpoint]);
    setNewEndpoint({ name: "", url: "", method: "GET" });
    setIsAddingEndpoint(false);
  };

  // Handle deleting an endpoint
  const handleDeleteEndpoint = (id: string) => {
    setApiEndpoints(apiEndpoints.filter(endpoint => endpoint.id !== id));
    if (expandedEndpoint === id) {
      setExpandedEndpoint(null);
    }
  };

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">API Monitoring</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock API monitoring with our Pro plan</p>
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
      case "healthy": return "text-green-500";
      case "degraded": return "text-amber-500";
      case "down": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  // Get status indicator background
  const getStatusBg = (status: string) => {
    switch(status) {
      case "healthy": return "bg-green-100";
      case "degraded": return "bg-amber-100";
      case "down": return "bg-red-100";
      default: return "bg-gray-100";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "healthy": return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "degraded": return <ClockIcon className="w-5 h-5 text-amber-500" />;
      case "down": return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  // Get method badge color
  const getMethodColor = (method: string) => {
    switch(method) {
      case "GET": return "bg-blue-100 text-blue-800";
      case "POST": return "bg-green-100 text-green-800";
      case "PUT": return "bg-amber-100 text-amber-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">API Monitoring for {websiteUrl}</h2>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-3 py-1.5 border border-purple-300 text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => setIsAddingEndpoint(true)}
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Endpoint
          </motion.button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Monitored Endpoints</p>
            <p className="text-2xl font-semibold text-gray-900">{apiEndpoints.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-500 mb-1">Healthy</p>
            <p className="text-2xl font-semibold text-green-600">
              {apiEndpoints.filter(api => api.status === "healthy").length}
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-gray-500 mb-1">Degraded</p>
            <p className="text-2xl font-semibold text-amber-600">
              {apiEndpoints.filter(api => api.status === "degraded").length}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-gray-500 mb-1">Down</p>
            <p className="text-2xl font-semibold text-red-600">
              {apiEndpoints.filter(api => api.status === "down").length}
            </p>
          </div>
        </div>

        {/* Add API Endpoint Form */}
        <AnimatePresence>
          {isAddingEndpoint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Add New API Endpoint</h3>
                <form onSubmit={handleAddEndpoint}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label htmlFor="api-name" className="block text-xs font-medium text-gray-700 mb-1">
                        Endpoint Name
                      </label>
                      <input
                        type="text"
                        id="api-name"
                        required
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={newEndpoint.name}
                        onChange={(e) => setNewEndpoint({...newEndpoint, name: e.target.value})}
                        placeholder="e.g. Authentication API"
                      />
                    </div>
                    <div>
                      <label htmlFor="api-url" className="block text-xs font-medium text-gray-700 mb-1">
                        API URL Path
                      </label>
                      <input
                        type="text"
                        id="api-url"
                        required
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={newEndpoint.url}
                        onChange={(e) => setNewEndpoint({...newEndpoint, url: e.target.value})}
                        placeholder="e.g. /api/auth"
                      />
                    </div>
                    <div>
                      <label htmlFor="api-method" className="block text-xs font-medium text-gray-700 mb-1">
                        HTTP Method
                      </label>
                      <select
                        id="api-method"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={newEndpoint.method}
                        onChange={(e) => setNewEndpoint({...newEndpoint, method: e.target.value})}
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={() => setIsAddingEndpoint(false)}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Add Endpoint
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* API Endpoints List */}
        <div className="space-y-4">
          {apiEndpoints.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-gray-400 mx-auto mb-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
                />
              </svg>
              <p className="text-gray-500 mb-3">No API endpoints are being monitored</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => setIsAddingEndpoint(true)}
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Your First Endpoint
              </motion.button>
            </div>
          ) : (
            apiEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Endpoint Header */}
                <div 
                  className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleEndpoint(endpoint.id)}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${getStatusBg(endpoint.status)} mr-3`}>
                      {getStatusIcon(endpoint.status)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900 mr-2">{endpoint.name}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{endpoint.url}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {endpoint.status === "down" ? "—" : `${endpoint.responseTime}ms`}
                      </p>
                      <p className="text-xs text-gray-500">Uptime: {endpoint.uptime}%</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEndpoint(endpoint.id);
                        }}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                      {expandedEndpoint === endpoint.id ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedEndpoint === endpoint.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Last checked: {endpoint.lastChecked}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <ArrowPathIcon className="w-3 h-3 mr-1" />
                            Check Now
                          </motion.button>
                        </div>
                        
                        <h4 className="font-medium text-sm text-gray-700 mb-3">Response Time History</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {endpoint.history.map((record, index) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{record.timestamp}</td>
                                  <td className="px-3 py-2 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                      record.status === "healthy" ? "bg-green-100 text-green-800" :
                                      record.status === "degraded" ? "bg-amber-100 text-amber-800" :
                                      "bg-red-100 text-red-800"
                                    }`}>
                                      {record.status === "healthy" ? "Healthy" : 
                                       record.status === "degraded" ? "Degraded" : "Down"}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                                    {record.status === "down" ? "—" : `${record.responseTime}ms`}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-700 mb-2">Headers</h4>
                              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                                  {`{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer ***"\n}`}
                                </pre>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-700 mb-2">Request Body</h4>
                              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                                  {endpoint.method === "GET" ? "No body for GET requests" : 
                                   `{\n  "key": "value",\n  "example": true\n}`}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>

        {/* Settings Button */}
        {apiEndpoints.length > 0 && (
          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={() => window.location.href = "/dashboard/api-monitoring"}
            >
              View Advanced Settings
            </motion.button>
          </div>
        )}
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