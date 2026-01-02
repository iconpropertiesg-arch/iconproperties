'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Users, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

interface WhyWorkWithUsProps {
  locale: string;
}

export default function WhyWorkWithUs({ locale }: WhyWorkWithUsProps) {
  const router = useRouter();
  
  const features = [
    {
      icon: Lock,
      title: 'Off-Market Access',
      description: "Most of Mallorca's finest properties never reach public portals. We give our clients privileged access to private listings, pre-market opportunities and exclusive mandates you cannot find online."
    },
    {
      icon: Users,
      title: 'Discreet, Boutique Service',
      description: 'We work with a limited number of clients at a time, offering confidential guidance, curated shortlists and a single point of contact throughout the entire buying or selling process.'
    },
    {
      icon: MapPin,
      title: 'Proven Expertise in Prime Locations',
      description: "From Son Vida to Port Andratx, we specialise exclusively in Mallorca's most desirable areas, combining local knowledge with international buyer intelligence."
    }
  ];
  
  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  const [subtitleLinesVisible, setSubtitleLinesVisible] = useState<number[]>([]);
  
  // Blur reveal effects (these refs will be used for both blur and line reveal)
  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });
  const { elementRef: subtitleRef, style: subtitleBlurStyle } = useBlurReveal<HTMLParagraphElement>({ maxBlur: 8, minBlur: 0 });
  
  // Refs and blur states for each feature card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardBlurs, setCardBlurs] = useState<number[]>(features.map(() => 15));
  const [cardOpacities, setCardOpacities] = useState<number[]>(features.map(() => 0.7));
  
  // Line-by-line reveal effect
  useEffect(() => {
    const titleText = "Why Work With Us";
    const subtitleText = "A private, advisory-style service built for discerning international buyers and sellers.";
    
    const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const subtitleLines = subtitleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
    const finalSubtitleLines = subtitleLines.length > 0 ? subtitleLines : [subtitleText.trim()];
    
    finalTitleLines.forEach((_, index) => {
      setTimeout(() => {
        setTitleLinesVisible(prev => [...prev, index]);
      }, 600 + (index * 500));
    });
    
    const subtitleStartDelay = 600 + (finalTitleLines.length * 500) + 400;
    finalSubtitleLines.forEach((_, index) => {
      setTimeout(() => {
        setSubtitleLinesVisible(prev => [...prev, index]);
      }, subtitleStartDelay + (index * 500));
    });
  }, []);
  
  // Scroll-triggered blur reveal for cards - optimized for mobile
  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;
    
    const updateBlurs = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardHeight = rect.height;
        
        // Account for mobile viewport variations
        const cardTop = rect.top + scrollY;
        const cardBottom = cardTop + cardHeight;
        const viewportTop = scrollY;
        const viewportBottom = scrollY + windowHeight;
        
        // Calculate visible portion
        const visibleTop = Math.max(cardTop, viewportTop);
        const visibleBottom = Math.min(cardBottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibleRatio = cardHeight > 0 ? visibleHeight / cardHeight : 0;
        
        // More lenient threshold for mobile (30% instead of 50%)
        const threshold = window.innerWidth < 768 ? 0.3 : 0.5;
        
        let progress = 1;
        if (cardBottom <= viewportTop) {
          // Card is above viewport
          progress = 0;
        } else if (cardTop >= viewportBottom) {
          // Card is below viewport
          progress = 0;
        } else if (visibleRatio < threshold) {
          // Less than threshold visible, apply blur
          progress = visibleRatio / threshold;
        } else {
          // More than threshold visible, fully clear
          progress = 1;
        }
        
        const newBlur = 15 - (progress * 15);
        const newOpacity = 0.7 + (progress * 0.3); // From 0.7 to 1.0
        
        setCardBlurs(prev => {
          const newBlurs = [...prev];
          newBlurs[index] = Math.max(0, newBlur);
          return newBlurs;
        });
        
        setCardOpacities(prev => {
          const newOpacities = [...prev];
          newOpacities[index] = Math.min(1, newOpacity);
          return newOpacities;
        });
      });
      
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateBlurs);
        ticking = true;
      }
    };
    
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateBlurs);
    };
    
    // Initial check with delay for mobile viewport to settle
    setTimeout(() => {
      updateBlurs();
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <section className="relative bg-black py-20 px-4 overflow-hidden">
      {/* Subtle glowing effects overlay - enhanced for better blur effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">#5</span>
          </div> */}
          <h2 ref={titleRef} style={titleBlurStyle} className="text-4xl md:text-5xl font-bold text-white mb-6">
            {(() => {
              const titleText = "Why Work With Us";
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
          <p ref={subtitleRef} style={subtitleBlurStyle} className="text-xl text-gray-300 max-w-3xl mx-auto">
            {(() => {
              const subtitleText = "A private, advisory-style service built for discerning international buyers and sellers.";
              const subtitleLines = subtitleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
              const finalSubtitleLines = subtitleLines.length > 0 ? subtitleLines : [subtitleText.trim()];
              
              return finalSubtitleLines.map((line, index) => {
                const isVisible = subtitleLinesVisible.includes(index);
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
          </p>
        </div>

        {/* Three Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative rounded-2xl p-8 transition-all duration-300 group overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  position: "relative",
                  zIndex: 1,
                  willChange: "transform, backdrop-filter, filter, opacity",
                  filter: `blur(${cardBlurs[index]}px)`,
                  opacity: cardOpacities[index],
                  transition: 'filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)";
                  e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.boxShadow = "0 8px 40px 0 rgba(31, 38, 135, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.backdropFilter = "blur(25px) saturate(200%)";
                  (e.currentTarget.style as any).WebkitBackdropFilter = "blur(25px) saturate(200%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)";
                  e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.backdropFilter = "blur(20px) saturate(180%)";
                  (e.currentTarget.style as any).WebkitBackdropFilter = "blur(20px) saturate(180%)";
                }}
              >
                {/* Inner glow overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    mixBlendMode: "overlay",
                    zIndex: 0
                  }}
                />
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-700/20 flex items-center justify-center border border-gray-400/30 group-hover:border-gray-400/50 transition-colors">
                      <Icon className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => router.push(`/${locale}/contact`)}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
          >
            <span>Request Private Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

