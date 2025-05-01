/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning instead of error
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

export default nextConfig;
