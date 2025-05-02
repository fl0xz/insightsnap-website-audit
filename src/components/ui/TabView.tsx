"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
  variant?: "pills" | "underline" | "buttons";
}

/**
 * TabView - A component for displaying content in toggleable tabs
 * Used for organizing audit report sections
 */
export default function TabView({
  tabs,
  defaultTabId,
  className = "",
  variant = "pills"
}: TabViewProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  
  // Get the current active tab
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];
  
  // Tab style variants
  const getTabStyles = (isActive: boolean) => {
    switch (variant) {
      case "pills":
        return isActive
          ? "bg-purple-100 text-purple-700 font-medium"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
      
      case "underline":
        return isActive
          ? "text-purple-700 font-medium border-b-2 border-purple-500"
          : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent";
      
      case "buttons":
        return isActive
          ? "bg-purple-600 text-white font-medium shadow-sm"
          : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 shadow-sm";
      
      default:
        return isActive
          ? "bg-purple-100 text-purple-700 font-medium"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";
    }
  };

  return (
    <div className={className}>
      <div className={`flex mb-6 ${variant === "underline" ? "border-b border-gray-200" : ""}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              flex items-center px-4 py-2 text-sm transition-colors
              ${getTabStyles(tab.id === activeTabId)}
              ${variant === "pills" && "rounded-lg"}
              ${variant === "underline" && ""}
              ${variant === "buttons" && "rounded-md mx-1"}
            `}
          >
            {tab.icon && (
              <span className="mr-2">{tab.icon}</span>
            )}
            {tab.label}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 