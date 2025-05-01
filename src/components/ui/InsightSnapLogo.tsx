import React from "react";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

const InsightSnapLogo: React.FC<LogoProps> = ({ 
  variant = "full", 
  className = "" 
}) => {
  if (variant === "icon") {
    return (
      <div className={`w-10 h-10 bg-[#5D3FD3] rounded-md flex items-center justify-center text-white ${className}`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-6 h-6"
        >
          <path 
            fillRule="evenodd" 
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-8 h-8 bg-[#5D3FD3] rounded-md flex items-center justify-center text-white mr-2">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path 
            fillRule="evenodd" 
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
      <div className="text-[#1E1E1E] font-semibold text-xl">
        Insight<span className="text-[#5D3FD3]">Snap</span>
      </div>
    </div>
  );
};

export default InsightSnapLogo; 