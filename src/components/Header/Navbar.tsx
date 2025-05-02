import React, { useState } from "react";
import Link from "next/link";
import InsightSnapLogo from "@/components/ui/InsightSnapLogo";
import { HeaderProps } from "./Header";

const Navbar: React.FC<HeaderProps> = ({
  isAuthenticated = false,
  userPlan = null,
  onLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get plan display name
  const getPlanName = () => {
    switch(userPlan) {
      case 'free': return 'Free Plan';
      case 'pro': return 'Pro Plan';
      case 'agency': return 'Agency Plan';
      default: return 'Account';
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex-shrink-0">
            <InsightSnapLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/features" 
              className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
            >
              Features
            </Link>
            <Link 
              href="/agency" 
              className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
            >
              Agencies
            </Link>
            <Link 
              href="/pricing" 
              className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/premium-components-test" 
              className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
            >
              Premium Demo
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-[#1E1E1E] font-medium">
                  {getPlanName()}
                </span>
                <button
                  onClick={onLogout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="ml-4 bg-[#5D3FD3] hover:bg-[#4F33B0] text-white px-5 py-2 rounded-md transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1E1E1E] focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/features" 
                className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/agency" 
                className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agencies
              </Link>
              <Link 
                href="/pricing" 
                className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/premium-components-test" 
                className="text-[#1E1E1E] hover:text-[#5D3FD3] font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium Demo
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="text-[#1E1E1E] font-medium">
                    {getPlanName()}
                  </div>
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition-colors font-medium w-full text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-[#5D3FD3] hover:bg-[#4F33B0] text-white px-5 py-2 rounded-md transition-colors font-medium inline-block w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 