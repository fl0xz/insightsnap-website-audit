"use client";

import Link from 'next/link';

export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="flex flex-col space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Text Color Test</h2>
          <p className="text-black">This text should be black</p>
          <p className="text-white bg-gray-800 p-2 rounded">This text should be white</p>
          <p className="text-red-500">This text should be red</p>
          <p className="text-blue-500">This text should be blue</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Background Color Test</h2>
          <div className="p-2 bg-red-500 text-white mb-2">Red background</div>
          <div className="p-2 bg-blue-500 text-white mb-2">Blue background</div>
          <div className="p-2 bg-green-500 text-white mb-2">Green background</div>
        </div>
        
        <div className="mt-8">
          <Link href="/" className="text-blue-500 underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 