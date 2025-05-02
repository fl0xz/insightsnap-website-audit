"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RealUserMonitoringProps {
  websiteUrl?: string;
  isLocked?: boolean;
  isPremium?: boolean;
  className?: string;
}

// Mock data for RUM metrics
const mockRUMData = {
  timeToInteract: {
    current: 2.3, // seconds
    previous: 2.8,
    change: -0.5,
    history: [3.1, 2.9, 2.8, 2.7, 2.6, 2.4, 2.3],
    dates: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Today"]
  },
  visualStability: {
    current: 0.05, // CLS score
    previous: 0.08,
    change: -0.03,
    history: [0.11, 0.09, 0.08, 0.07, 0.06, 0.05, 0.05],
    dates: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Today"]
  },
  interactionLatency: {
    current: 85, // ms
    previous: 98,
    change: -13,
    history: [105, 102, 98, 95, 90, 87, 85],
    dates: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Today"]
  },
  deviceBreakdown: {
    mobile: 68,
    desktop: 27,
    tablet: 5
  },
  browsers: {
    chrome: 62,
    safari: 19,
    firefox: 11,
    edge: 7,
    other: 1
  },
  locations: [
    { country: "United States", percentage: 45 },
    { country: "United Kingdom", percentage: 18 },
    { country: "Germany", percentage: 9 },
    { country: "Canada", percentage: 7 },
    { country: "Other", percentage: 21 }
  ]
};

export default function RealUserMonitoring({
  websiteUrl = "example.com",
  isLocked = false,
  isPremium = false,
  className = ""
}: RealUserMonitoringProps) {
  const [activeMetric, setActiveMetric] = useState<"tti" | "cls" | "inp">("tti");

  // If premium feature is locked for free users
  if (isLocked) {
    return (
      <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Real User Monitoring</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4 blur-sm relative">
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 backdrop-blur-sm">
              <div className="text-center p-6">
                <LockIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock real user monitoring with our Pro plan</p>
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

  // Helper function to get trend indicator
  const getTrendIndicator = (change: number) => {
    if (change === 0) return null;
    
    const isPositive = change < 0; // For these metrics, negative change is positive (improved performance)
    
    return isPositive ? (
      <span className="inline-flex items-center text-green-600">
        <ArrowDownIcon className="w-3 h-3 mr-1" />
        {Math.abs(change).toFixed(2)}
      </span>
    ) : (
      <span className="inline-flex items-center text-red-600">
        <ArrowUpIcon className="w-3 h-3 mr-1" />
        {Math.abs(change).toFixed(2)}
      </span>
    );
  };

  // Prepare chart data based on active metric
  const getChartData = () => {
    let data;
    let label;
    let borderColor;

    switch (activeMetric) {
      case "tti":
        data = mockRUMData.timeToInteract.history;
        label = "Time to Interactive (s)";
        borderColor = "#8B5CF6"; // Purple
        break;
      case "cls":
        data = mockRUMData.visualStability.history;
        label = "Cumulative Layout Shift";
        borderColor = "#10B981"; // Green
        break;
      case "inp":
        data = mockRUMData.interactionLatency.history;
        label = "Interaction to Next Paint (ms)";
        borderColor = "#F59E0B"; // Amber
        break;
    }

    return {
      labels: mockRUMData.timeToInteract.dates,
      datasets: [
        {
          label,
          data,
          borderColor,
          backgroundColor: `${borderColor}33`,
          borderWidth: 2,
          pointBackgroundColor: borderColor,
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  // Device breakdown chart data
  const deviceData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        label: "Visitors by Device",
        data: [
          mockRUMData.deviceBreakdown.mobile,
          mockRUMData.deviceBreakdown.desktop,
          mockRUMData.deviceBreakdown.tablet,
        ],
        backgroundColor: ["#8B5CF6", "#10B981", "#F59E0B"],
      },
    ],
  };

  // Browser breakdown chart data
  const browserData = {
    labels: ["Chrome", "Safari", "Firefox", "Edge", "Other"],
    datasets: [
      {
        label: "Visitors by Browser",
        data: [
          mockRUMData.browsers.chrome,
          mockRUMData.browsers.safari,
          mockRUMData.browsers.firefox,
          mockRUMData.browsers.edge,
          mockRUMData.browsers.other,
        ],
        backgroundColor: ["#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#6B7280"],
      },
    ],
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Real User Monitoring for {websiteUrl}</h2>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div 
            className={`p-4 rounded-lg border ${activeMetric === "tti" ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-gray-50"} cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveMetric("tti")}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">Time to Interactive</h3>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900 mr-2">{mockRUMData.timeToInteract.current}s</span>
                {getTrendIndicator(mockRUMData.timeToInteract.change)}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">How long until your page is fully interactive</p>
          </motion.div>

          <motion.div 
            className={`p-4 rounded-lg border ${activeMetric === "cls" ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-gray-50"} cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveMetric("cls")}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">Visual Stability</h3>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900 mr-2">{mockRUMData.visualStability.current}</span>
                {getTrendIndicator(mockRUMData.visualStability.change)}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Measures unexpected layout shifts during page load</p>
          </motion.div>

          <motion.div 
            className={`p-4 rounded-lg border ${activeMetric === "inp" ? "border-purple-300 bg-purple-50" : "border-gray-200 bg-gray-50"} cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveMetric("inp")}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">Interaction Latency</h3>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900 mr-2">{mockRUMData.interactionLatency.current}ms</span>
                {getTrendIndicator(mockRUMData.interactionLatency.change)}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">How responsive your page feels to user interactions</p>
          </motion.div>
        </div>

        {/* Performance History Chart */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Performance Trend (Last 7 Days)</h3>
          <div className="h-64 bg-white p-4 rounded-lg border border-gray-200">
            <Line 
              data={getChartData()}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        if (activeMetric === "inp") return `${value}ms`;
                        return activeMetric === "tti" ? `${value}s` : value;
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </div>

        {/* User Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Device Breakdown</h3>
            <div className="h-56 bg-white p-4 rounded-lg border border-gray-200">
              <Bar
                data={deviceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.parsed.x}%`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      max: 100,
                      ticks: {
                        callback: function(value) {
                          return `${value}%`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Browser Distribution</h3>
            <div className="h-56 bg-white p-4 rounded-lg border border-gray-200">
              <Bar
                data={browserData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y',
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.parsed.x}%`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      max: 100,
                      ticks: {
                        callback: function(value) {
                          return `${value}%`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Visitor Locations</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockRUMData.locations.map((location, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{location.country}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                        <span>{location.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => window.location.href = "/dashboard/rum"}
          >
            View Detailed Insights
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