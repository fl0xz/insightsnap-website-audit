"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeatPoint {
  x: number;
  y: number;
  intensity: number; // 0 to 1
}

interface HeatmapVisualizationProps {
  screenshotUrl: string;
  screenshotWidth: number;
  screenshotHeight: number;
  heatPoints: HeatPoint[];
  showIntensityScale?: boolean;
  opacity?: number;
  className?: string;
}

/**
 * HeatmapVisualization - A component for displaying attention heatmaps on websites
 * Shows predicted user attention focus based on layout analysis
 */
export default function HeatmapVisualization({
  screenshotUrl,
  screenshotWidth,
  screenshotHeight,
  heatPoints,
  showIntensityScale = true,
  opacity = 0.7,
  className = ""
}: HeatmapVisualizationProps) {
  const [heatmapCanvas, setHeatmapCanvas] = useState<string | null>(null);
  
  // Generate heatmap canvas when component mounts or when heatPoints change
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const canvas = document.createElement('canvas');
    canvas.width = screenshotWidth;
    canvas.height = screenshotHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw heat points
    heatPoints.forEach(point => {
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, 100 * point.intensity
      );
      
      gradient.addColorStop(0, `rgba(255, 0, 0, ${point.intensity * opacity})`);
      gradient.addColorStop(0.3, `rgba(255, 255, 0, ${point.intensity * opacity * 0.7})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 100 * point.intensity, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Convert canvas to data URL
    setHeatmapCanvas(canvas.toDataURL('image/png'));
  }, [heatPoints, screenshotWidth, screenshotHeight, opacity]);
  
  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {/* Website Screenshot */}
      <div className="relative">
        <Image
          src={screenshotUrl}
          alt="Website Screenshot"
          width={screenshotWidth}
          height={screenshotHeight}
          className="max-w-full h-auto"
        />
        
        {/* Heatmap Overlay */}
        {heatmapCanvas && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image
              src={heatmapCanvas}
              alt="Attention Heatmap"
              width={screenshotWidth}
              height={screenshotHeight}
              className="max-w-full h-auto"
            />
          </motion.div>
        )}
      </div>
      
      {/* Intensity Scale */}
      {showIntensityScale && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 flex items-center">
          <div className="w-32 h-4 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 rounded"></div>
          <div className="flex justify-between w-32 mt-1 text-xs text-gray-600 px-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      )}
    </div>
  );
} 