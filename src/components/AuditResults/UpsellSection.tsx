import React from 'react';
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const UpsellSection: React.FC = () => {
  const tiers: PricingTier[] = [
    {
      name: 'SEO Boost',
      price: '£99',
      description: 'Targeted improvements to boost your search ranking and visibility',
      features: [
        'Keyword optimization',
        'Meta tags optimization',
        'Content suggestions',
        'Schema markup implementation',
        'Basic SEO report'
      ],
      ctaText: 'Fix My SEO'
    },
    {
      name: 'Speed Surge',
      price: '£149',
      description: 'Performance improvements to make your website lightning fast',
      features: [
        'Image optimization',
        'Code minification',
        'Caching setup',
        'Server response optimization',
        'CDN implementation'
      ],
      ctaText: 'Speed Up My Site',
      popular: true
    },
    {
      name: 'Full Audit Fix',
      price: '£299',
      description: 'Comprehensive fixes for all identified issues',
      features: [
        'Performance optimization',
        'SEO improvements',
        'Accessibility fixes',
        'Security enhancements',
        'Best practices implementation'
      ],
      ctaText: 'Fix Everything'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 mt-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Help Fixing This?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our team of experts can implement all the recommended fixes to improve your website's performance, security, and search ranking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name} 
            className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl ${
              tier.popular ? 'ring-2 ring-[#5D3FD3] transform md:-translate-y-2' : ''
            }`}
          >
            {tier.popular && (
              <div className="bg-[#5D3FD3] text-white text-xs font-semibold py-1 text-center">
                MOST POPULAR
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-extrabold text-gray-900">{tier.price}</span>
                <span className="text-gray-500 ml-1">one-time</span>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{tier.description}</p>
              
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <CheckIcon className="h-5 w-5 text-[#00BFA6] flex-shrink-0 mr-2" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                  tier.popular 
                    ? 'bg-[#5D3FD3] hover:bg-[#4c34a9] text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {tier.ctaText}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Need a Custom Solution?</h3>
        <a 
          href="mailto:info@insightsnap.com" 
          className="inline-flex items-center py-3 px-6 bg-[#00BFA6] hover:bg-[#00a891] rounded-lg text-white font-medium transition-colors"
        >
          Request a Custom Fix
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default UpsellSection; 