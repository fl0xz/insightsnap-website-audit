"use client";

import React from "react";
import { motion } from "framer-motion";

interface DataPoint {
  value: number;
  label: string;
}

interface SimpleLineChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
  lineColor?: string;
  fillColor?: string;
  showPoints?: boolean;
  showLabels?: boolean;
  showGrid?: boolean;
  className?: string;
  animated?: boolean;
}

/**
 * SimpleLineChart - A component for displaying line charts using SVG
 * Used for showing performance metrics over time
 */
export default function SimpleLineChart({
  data,
  height = 200,
  width = 500,
  lineColor = "#5D3FD3",
  fillColor = "rgba(93, 63, 211, 0.1)",
  showPoints = true,
  showLabels = true,
  showGrid = true,
  className = "",
  animated = true
}: SimpleLineChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-gray-400 text-center py-4">No data available</div>;
  }

  // Calculate values for the chart
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  // Find the max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Calculate the points for the line
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - (d.value / maxValue) * chartHeight;
    return { x, y, ...d };
  });
  
  // Generate the path string for the line
  const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")}`;
  
  // Generate the path string for the filled area
  const areaPath = `
    M ${points[0].x},${height - padding} 
    L ${points.map(p => `${p.x},${p.y}`).join(" L ")} 
    L ${points[points.length - 1].x},${height - padding} 
    Z
  `;

  // Generate grid lines
  const gridLines = [];
  if (showGrid) {
    // Horizontal grid lines
    const numHLines = 5;
    for (let i = 0; i <= numHLines; i++) {
      const y = padding + (i / numHLines) * chartHeight;
      gridLines.push(
        <line
          key={`h-${i}`}
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    }
    
    // Vertical grid lines for each data point
    for (let i = 0; i < points.length; i++) {
      gridLines.push(
        <line
          key={`v-${i}`}
          x1={points[i].x}
          y1={padding}
          x2={points[i].x}
          y2={height - padding}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    }
  }
  
  // Animation variants for the line
  const lineVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };
  
  // Animation variants for the area fill
  const areaVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1
      }
    }
  };

  const LineComponent = animated ? motion.path : "path";
  const AreaComponent = animated ? motion.path : "path";
  
  return (
    <div className={className}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      >
        {/* Grid Lines */}
        {gridLines}
        
        {/* Area Fill */}
        <AreaComponent
          d={areaPath}
          fill={fillColor}
          initial={animated ? "hidden" : undefined}
          animate={animated ? "visible" : undefined}
          variants={areaVariants}
        />
        
        {/* Line */}
        <LineComponent
          d={linePath}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          initial={animated ? "hidden" : undefined}
          animate={animated ? "visible" : undefined}
          variants={lineVariants}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data Points */}
        {showPoints && points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="white"
            stroke={lineColor}
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: animated ? 0.8 + (i * 0.1) : 0 }}
          />
        ))}
        
        {/* X-Axis Labels */}
        {showLabels && points.map((point, i) => (
          <text
            key={i}
            x={point.x}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {point.label}
          </text>
        ))}
        
        {/* Y-Axis Labels */}
        {showLabels && Array.from({ length: 6 }).map((_, i) => {
          const value = (maxValue * (5 - i)) / 5;
          return (
            <text
              key={i}
              x={15}
              y={padding + (i * chartHeight) / 5 + 5}
              textAnchor="start"
              className="text-xs fill-gray-500"
            >
              {value.toFixed(0)}
            </text>
          );
        })}
      </svg>
    </div>
  );
} 