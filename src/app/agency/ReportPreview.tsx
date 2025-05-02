import React from 'react';

// Simple component to show what a branded agency report might look like
export const BrandedEmailPreview: React.FC = () => {
  return (
    <div className="w-full h-full bg-white rounded overflow-hidden border shadow-sm">
      <div className="bg-gray-800 p-3 flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-100 mr-2"></div>
        <div className="text-sm text-white font-medium">Website Audit Results</div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="w-16 h-6 bg-[#5D3FD3] rounded"></div>
          <div className="text-xs text-gray-500">July 15, 2023</div>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
        <div className="w-2/3 h-4 bg-gray-100 rounded mb-4"></div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">87</div>
            <div className="ml-2">
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
              <div className="w-12 h-2 bg-gray-100 rounded mt-1"></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xs font-bold">72</div>
            <div className="ml-2">
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
              <div className="w-12 h-2 bg-gray-100 rounded mt-1"></div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-24 bg-gray-100 rounded mb-3"></div>
        <div className="flex justify-center">
          <div className="w-32 h-8 bg-[#5D3FD3] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export const BrandedPDFPreview: React.FC = () => {
  return (
    <div className="w-full h-full bg-white rounded overflow-hidden border shadow-sm flex flex-col">
      <div className="bg-[#5D3FD3]/10 p-3 flex items-center justify-between border-b">
        <div className="w-20 h-5 bg-gray-800 rounded"></div>
        <div className="text-xs text-gray-500">PDF REPORT</div>
      </div>
      <div className="p-3 flex-1">
        <div className="w-full h-6 bg-gray-800 rounded mb-3"></div>
        <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-gray-100 p-2 rounded">
            <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
            <div className="w-8 h-4 bg-green-100 rounded"></div>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
            <div className="w-8 h-4 bg-yellow-100 rounded"></div>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
            <div className="w-8 h-4 bg-blue-100 rounded"></div>
          </div>
        </div>
        
        <div className="w-full h-30 bg-gray-100 rounded mb-2"></div>
        <div className="flex items-center justify-between">
          <div className="w-20 h-4 bg-[#5D3FD3]/20 rounded"></div>
          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export const FixRequestPreview: React.FC = () => {
  return (
    <div className="w-full h-full bg-white rounded overflow-hidden border shadow-sm">
      <div className="bg-gray-100 p-3 flex items-center justify-between border-b">
        <div className="text-sm font-medium">Fix Request Portal</div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
      <div className="p-3">
        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-1">ISSUES FOUND</div>
          <div className="w-full h-8 bg-gray-100 rounded p-2 flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-40 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-8 bg-gray-100 rounded p-2 flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-48 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="w-full h-20 bg-gray-100 rounded mb-3"></div>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full h-10 bg-[#00BFA6] rounded-md flex items-center justify-center">
            <div className="text-xs text-white font-medium">REQUEST FIX</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { BrandedEmailPreview, BrandedPDFPreview, FixRequestPreview }; 