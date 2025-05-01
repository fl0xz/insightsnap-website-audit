/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
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
    
    return config;
  },
};

export default nextConfig;
