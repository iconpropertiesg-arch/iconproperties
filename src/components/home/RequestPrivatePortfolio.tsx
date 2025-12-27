'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface RequestPrivatePortfolioProps {
  locale: string;
}

export default function RequestPrivatePortfolio({ locale }: RequestPrivatePortfolioProps) {
  const router = useRouter();

  const handleRequest = () => {
    router.push(`/${locale}/contact`);
  };

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Request Private Portfolio
          </h2>

          {/* Animated Glow Line */}
          <div className="relative w-full max-w-md mx-auto mb-8 h-1">
            <svg 
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 4"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="portfolioLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F02FC2" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFC080" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FF4500" stopOpacity="1" />
                </linearGradient>
                <filter id="portfolioGlowFilter" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="portfolioStrongGlowFilter" x="-250%" y="-250%" width="600%" height="600%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Strong glow layer */}
              <line
                x1="0"
                y1="2"
                x2="400"
                y2="2"
                stroke="url(#portfolioLineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="50 350"
                pathLength="400"
                filter="url(#portfolioStrongGlowFilter)"
                opacity="0.7"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-400"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </line>
              {/* Main line with glow */}
              <line
                x1="0"
                y1="2"
                x2="400"
                y2="2"
                stroke="url(#portfolioLineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="50 350"
                pathLength="400"
                filter="url(#portfolioGlowFilter)"
                opacity="1"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-400"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Most of Mallorca's finest properties are sold privately, without ever appearing on public portals.
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get access to exclusive listings, pre-market opportunities, and private sales, personally curated for your lifestyle and investment needs.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleRequest}
            className="group px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl  inline-flex items-center gap-2"
          >
            <span>Request Private Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

