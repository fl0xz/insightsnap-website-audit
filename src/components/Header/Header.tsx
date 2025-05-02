import React from "react";
import Navbar from "./Navbar";

export interface HeaderProps {
  isAuthenticated?: boolean;
  userPlan?: 'free' | 'pro' | 'agency' | null;
  onLogin?: (plan?: 'free' | 'pro' | 'agency') => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated = false, 
  userPlan = null,
  onLogin,
  onLogout
}) => {
  return (
    <Navbar 
      isAuthenticated={isAuthenticated} 
      userPlan={userPlan}
      onLogin={onLogin}
      onLogout={onLogout}
    />
  );
};

export default Header;