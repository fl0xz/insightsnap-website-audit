/**
 * Mock data service for InsightSnap
 * 
 * Provides realistic test data for audit results, dashboard, and visualizations
 * Used for development and demos before connecting to actual API
 */

// Mock audit scores
export const mockAuditScores = {
  overall: {
    current: 82,
    previous: 73
  },
  performance: {
    current: 78,
    previous: 65
  },
  seo: {
    current: 86,
    previous: 81
  },
  accessibility: {
    current: 75,
    previous: 72
  },
  bestPractices: {
    current: 90,
    previous: 85
  },
  security: {
    current: 83,
    previous: 65
  }
};

// Mock historical data for charts
export const mockHistoricalData = [
  { value: 74, label: 'Mar 1' },
  { value: 71, label: 'Mar 8' },
  { value: 73, label: 'Mar 15' },
  { value: 70, label: 'Mar 22' },
  { value: 75, label: 'Mar 29' },
  { value: 82, label: 'Apr 5' },
];

// Mock SEO issues
export const mockSeoIssues = [
  {
    id: 'seo-1',
    severity: 'high',
    title: 'Missing Meta Descriptions',
    description: '6 pages are missing meta descriptions which are crucial for SEO.',
    impact: 'Reduces click-through rates from search results and affects ranking potential.',
    recommendation: 'Add unique, descriptive meta descriptions to all pages that are missing them.'
  },
  {
    id: 'seo-2',
    severity: 'medium',
    title: 'Duplicate H1 Tags',
    description: '3 pages have duplicate H1 tags which can confuse search engines.',
    impact: 'Creates content cannibalization and dilutes ranking potential.',
    recommendation: 'Ensure each page has a unique, descriptive H1 tag that matches the main content topic.'
  },
  {
    id: 'seo-3',
    severity: 'low',
    title: 'Missing Alt Text on Images',
    description: '12 images are missing alt text descriptions.',
    impact: 'Reduces accessibility and limits image search potential.',
    recommendation: 'Add descriptive alt text to all images, focusing on relevance to the page content.'
  }
];

// Mock performance issues
export const mockPerformanceIssues = [
  {
    id: 'perf-1',
    severity: 'high',
    title: 'Large JavaScript Bundles',
    description: 'Main JavaScript bundle is 2.4MB which is above recommended size.',
    impact: 'Increases page load time and reduces overall performance, especially on mobile devices.',
    recommendation: 'Implement code splitting and lazy loading for non-critical components.'
  },
  {
    id: 'perf-2',
    severity: 'medium',
    title: 'Unoptimized Images',
    description: '8 images are not properly sized or compressed.',
    impact: 'Increases page weight and slows down loading time.',
    recommendation: 'Compress images and use responsive image sizing with srcset attributes.'
  },
  {
    id: 'perf-3',
    severity: 'high',
    title: 'Render-Blocking Resources',
    description: '4 CSS and JavaScript resources are blocking the initial render.',
    impact: 'Delays First Contentful Paint and increases user perceived loading time.',
    recommendation: 'Inline critical CSS and defer non-critical JavaScript loading.'
  }
];

// Mock accessibility issues
export const mockAccessibilityIssues = [
  {
    id: 'a11y-1',
    severity: 'high',
    title: 'Low Contrast Text',
    description: 'Several text elements have contrast ratios below 4.5:1.',
    impact: 'Makes content difficult to read for users with visual impairments.',
    recommendation: 'Increase contrast between text and background colors to meet WCAG AA standards.'
  },
  {
    id: 'a11y-2',
    severity: 'medium',
    title: 'Missing Form Labels',
    description: 'Contact form has input fields without associated labels.',
    impact: 'Creates barriers for screen reader users who cannot identify form fields.',
    recommendation: 'Add proper labels for all form fields and ensure they are programmatically associated.'
  }
];

// Mock security issues
export const mockSecurityIssues = [
  {
    id: 'sec-1',
    severity: 'high',
    title: 'Insecure Mixed Content',
    description: 'Some resources are loaded over HTTP on an HTTPS site.',
    impact: 'Creates security vulnerabilities and triggers browser warnings.',
    recommendation: 'Ensure all resources are loaded via HTTPS.'
  },
  {
    id: 'sec-2',
    severity: 'medium',
    title: 'Missing Content Security Policy',
    description: 'No Content Security Policy is implemented.',
    impact: 'Increases risk of XSS attacks and other security vulnerabilities.',
    recommendation: 'Implement a Content Security Policy that restricts resource origins.'
  }
];

// Mock client testimonials
export const mockTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechFlow Solutions',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    content: 'InsightSnap helped us identify critical issues we never knew existed on our website. Our conversion rate increased by 23% after implementing their recommendations!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CEO',
    company: 'Greenleaf Startups',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    content: 'We\'ve tried several website audit tools, but nothing comes close to InsightSnap. The AI-powered recommendations are spot on, and the interface is incredibly intuitive.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Web Developer',
    company: 'Digital Crafters',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'As a developer, I appreciate the technical depth of InsightSnap\'s reports. It helps me communicate issues to clients and prioritize what really matters.',
    rating: 4
  }
];

// Mock partner logos
export const mockPartnerLogos = [
  {
    id: 1,
    src: '/logos/microsoft.svg',
    alt: 'Microsoft',
    width: 150,
    height: 50
  },
  {
    id: 2,
    src: '/logos/shopify.svg',
    alt: 'Shopify',
    width: 140,
    height: 40
  },
  {
    id: 3,
    src: '/logos/airbnb.svg',
    alt: 'Airbnb',
    width: 120,
    height: 40
  },
  {
    id: 4,
    src: '/logos/slack.svg',
    alt: 'Slack',
    width: 130,
    height: 40
  },
  {
    id: 5,
    src: '/logos/webflow.svg',
    alt: 'Webflow',
    width: 140,
    height: 40
  },
  {
    id: 6,
    src: '/logos/atlassian.svg',
    alt: 'Atlassian',
    width: 160,
    height: 40
  }
];

// Mock media logos
export const mockMediaLogos = [
  {
    id: 1,
    src: '/logos/techcrunch.svg',
    alt: 'TechCrunch',
    width: 140,
    height: 30
  },
  {
    id: 2,
    src: '/logos/wired.svg',
    alt: 'Wired',
    width: 120,
    height: 30
  },
  {
    id: 3,
    src: '/logos/forbes.svg',
    alt: 'Forbes',
    width: 120,
    height: 30
  },
  {
    id: 4,
    src: '/logos/mashable.svg',
    alt: 'Mashable',
    width: 130,
    height: 30
  }
];

// Mock heatmap data
export const mockHeatmapData = {
  screenshotUrl: '/images/website-screenshot.jpg',
  screenshotWidth: 1200,
  screenshotHeight: 800,
  heatPoints: [
    { x: 600, y: 150, intensity: 0.9 }, // Header/hero section
    { x: 300, y: 300, intensity: 0.7 }, // Main content
    { x: 900, y: 300, intensity: 0.5 }, // Sidebar
    { x: 600, y: 500, intensity: 0.8 }, // CTA button
    { x: 600, y: 700, intensity: 0.4 }  // Footer
  ]
};

// Mock third-party script analysis
export const mockThirdPartyScripts = [
  {
    id: 'script-1',
    name: 'Google Analytics',
    type: 'Analytics',
    size: 43.2,
    loadTime: 0.32,
    impact: 'Medium',
    recommendation: 'Consider switching to Google Analytics 4 for better performance'
  },
  {
    id: 'script-2',
    name: 'Facebook Pixel',
    type: 'Marketing',
    size: 28.7,
    loadTime: 0.18,
    impact: 'Low',
    recommendation: 'No action needed'
  },
  {
    id: 'script-3',
    name: 'Hotjar',
    type: 'Analytics',
    size: 67.5,
    loadTime: 0.58,
    impact: 'High',
    recommendation: 'Implement lazy loading for this script'
  },
  {
    id: 'script-4',
    name: 'Custom Font Loader',
    type: 'Functionality',
    size: 84.3,
    loadTime: 0.74,
    impact: 'High',
    recommendation: 'Optimize font delivery and consider system fonts'
  }
];

// Mock form UX analysis
export const mockFormAnalysis = {
  formCount: 2,
  issues: [
    {
      id: 'form-1',
      location: 'Contact Page Form',
      fieldCount: 8,
      issueType: 'Too Many Fields',
      impact: 'Form has 8 fields, reducing completion rate by approximately 30%',
      recommendation: 'Reduce to maximum 5 fields or split into multiple steps'
    },
    {
      id: 'form-2',
      location: 'Newsletter Signup',
      fieldCount: 1,
      issueType: 'Missing Labels',
      impact: 'Email field has placeholder but no proper label',
      recommendation: 'Add visible label above input field'
    }
  ],
  trustSignals: {
    present: ['Privacy Policy Link'],
    missing: ['Security Badge', 'GDPR Compliance Notice']
  }
};

// Mock trust score metrics
export const mockTrustScore = {
  overall: 72,
  factors: [
    { name: 'SSL Certificate', score: 100, notes: 'Valid and up to date' },
    { name: 'Visual Design', score: 85, notes: 'Professional but some inconsistencies' },
    { name: 'Content Quality', score: 80, notes: 'Well-written but some pages need updates' },
    { name: 'Load Speed', score: 65, notes: 'Above average but room for improvement' },
    { name: 'Mobile Experience', score: 70, notes: 'Generally good but some tap targets too small' },
    { name: 'Trust Signals', score: 60, notes: 'Missing key trust elements like testimonials' },
    { name: 'Contact Information', score: 50, notes: 'Contact page exists but lacks physical address' }
  ]
}; 