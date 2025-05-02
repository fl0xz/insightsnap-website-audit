import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Tailwind classes based on variant
  const variantClasses = {
    primary: 'bg-[#5D3FD3] hover:bg-[#4c34a9] text-white border-transparent',
    secondary: 'bg-[#00BFA6] hover:bg-[#00a78f] text-white border-transparent',
    outline: 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300',
    text: 'bg-transparent hover:bg-gray-100 text-[#5D3FD3] border-transparent'
  };

  // Tailwind classes based on size
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2 px-4 text-sm',
    lg: 'py-3 px-6 text-base'
  };

  // Base classes for all buttons
  const baseClasses = `
    inline-flex items-center justify-center 
    font-medium rounded-lg transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D3FD3]
    border
    ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : ''}
  `;

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
