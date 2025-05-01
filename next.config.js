/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // Completely disable TypeScript checks during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Completely disable ESLint during build
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Use serverExternalPackages instead of experimental.externalPackages
  serverExternalPackages: ['puppeteer', 'lighthouse'],
  // Configure webpack to handle ESM imports in Lighthouse
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent webpack from bundling specific packages
      config.externals.push('chrome-launcher');
      
      // Resolve path issues 
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
          os: false,
        },
      };
    }
    
    // This is needed for loading Node.js modules in Next.js 
    config.resolve.fallback = { fs: false, path: false, os: false };
    
    return config;
  },
};

module.exports = nextConfig; 