'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

interface RequestPrivatePortfolioProps {
  locale: string;
}

export default function RequestPrivatePortfolio({ locale }: RequestPrivatePortfolioProps) {
  const router = useRouter();
  const t = useTranslations('home.requestPrivatePortfolio');
  
  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  
  // Blur reveal effects (this ref will be used for both blur and line reveal)
  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });
  
  // Line-by-line reveal effect
  useEffect(() => {
    const titleText = t('title');
    const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
    
    finalTitleLines.forEach((_, index) => {
      setTimeout(() => {
        setTitleLinesVisible(prev => [...prev, index]);
      }, 600 + (index * 500));
    });
  }, [t]);

  const handleRequest = () => {
    router.push(`/${locale}/contact`);
  };

  return (
    <section className="relative bg-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          {/* Title */}
          <h2 ref={titleRef} style={titleBlurStyle} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {(() => {
              const titleText = t('title');
              const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
              const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
              
              return finalTitleLines.map((line, index) => {
                const isVisible = titleLinesVisible.includes(index);
                return (
                  <span
                    key={index}
                    className={cn(
                      "block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                  >
                    {line}
                  </span>
                );
              });
            })()}
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
            {t('subheading')}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleRequest}
            className="group px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl  inline-flex items-center gap-2"
          >
            <span>{t('cta')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

