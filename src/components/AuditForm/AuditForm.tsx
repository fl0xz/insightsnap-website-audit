"use client";

import { useState } from 'react';

interface AuditFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export default function AuditForm({ onSubmit, isLoading }: AuditFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
      setError('');
      onSubmit(url);
    } catch (e) {
      setError('Please enter a valid URL (including http:// or https://)');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enter a URL to audit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-700">
            Website URL
          </label>
          <div className="flex">
            <input
              type="text"
              id="url"
              placeholder="https://example.com"
              className="flex-1 rounded-l-md border border-gray-300 p-2.5 text-gray-900 focus:border-purple-600 focus:outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`rounded-r-md px-5 py-2.5 text-white ${
                isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Auditing...' : 'Audit Website'}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Currently in demo mode. This is a simplified version with sample data.
          </p>
        </div>
      </form>
    </div>
  );
} 