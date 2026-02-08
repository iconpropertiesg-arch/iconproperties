'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Home, Check, Compass, Trash2, Phone, FileCode, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

interface HowWeWorkProps {
  locale: string;
}

const steps = [
  {
    number: '1',
    title: 'Sell your Home Privately',
    subtitle: 'Off-market strategies for maximum value and full discretion',
    tags: [
      { text: 'Free / Evaluation', bold: 'Free' },
      { text: '3 Months Avg. Sale', bold: '3 Months' }
    ],
    features: [
      'No ads, no signs',
      'Strategic Pricing & Presentation',
      'Direct access to pre-vetted, high intent buyers'
    ]
  },
  {
    number: '2',
    title: 'Investment Opportunities',
    subtitle: 'Looking for a smart place to grow your capital? From land development to renovation flips and rental income properties, we connect investors with deals that make sense — on and off the market.',
    tags: [
      { text: 'Deal Sourcing / On & Off Market' },
      { text: '~9% ROI' }
    ],
    features: [
      'ROI Analysis & Projection',
      'Introduction to architects, lawyers, builders... our network',
      'Exit Strategies & resale advice'
    ]
  },
  {
    number: '3',
    title: 'Buy Luxury Properties',
    subtitle: 'We help discerning buyers find the perfect home, whether it\'s a frontline villa, historic finca, or modern penthouse. Thanks to our off-market inventory, many of our best properties are never published online.',
    tags: [
      { text: 'ES DE GB / Multilingual agents' },
      { text: 'Early Access', bold: 'Early' }
    ],
    features: [
      'Personalized Property matching',
      'Support with financing & relocation',
      'Negotiation & Legal guidance'
    ],
    ctaButton: 'Book an Appointment'
  },
  {
    number: '4',
    title: 'Property Management & Concierge',
    subtitle: 'For owners who live abroad or want peace of mind, our management team ensures your property is always in top condition — and your guests or tenants are cared for.',
    tags: [
      { text: '+45 / Project' },
      { text: 'Tax & legal handling', bold: 'Tax & legal' }
    ],
    features: [
      'Maintenance, repairs & security checks',
      'Rental management & short-term permits',
      'Interior styling & staging'
    ],
    ctaButton: 'Book an Appointment'
  }
];

export default function HowWeWork({ locale }: HowWeWorkProps) {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState<{ [key: number]: number }>({});
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  
  // Blur reveal effects (this ref will be used for both blur and line reveal)
  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });
  
  // Line-by-line reveal effect
  useEffect(() => {
    const titleText = "The Private Buying Experience";
    const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
    
    finalTitleLines.forEach((_, index) => {
      setTimeout(() => {
        setTitleLinesVisible(prev => [...prev, index]);
      }, 600 + (index * 500));
    });
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => new Set([...Array.from(prev), index]));
              
              // Calculate scroll progress (0 to 1)
              const rect = entry.boundingClientRect;
              const windowHeight = window.innerHeight;
              const elementTop = rect.top;
              const elementHeight = rect.height;
              
              // Progress: 1 when fully visible, 0 when just entering from bottom
              let progress = 1;
              if (elementTop > windowHeight * 0.5) {
                // Card is entering from bottom
                progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (elementHeight + windowHeight * 0.3)));
              }
              
              setScrollProgress((prev) => ({
                ...prev,
                [index]: progress
              }));
            }
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '0px'
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    // Also track scroll for smooth blur updates - optimized for mobile
    let rafId: number | null = null;
    let ticking = false;
    
    const updateBlurs = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
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
        
        // More lenient threshold for mobile (30% instead of 30% of card)
        const threshold = window.innerWidth < 768 ? 0.3 : 0.3;
        
        // Calculate progress: 0 = blurred (below viewport), 1 = clear (visible on screen)
        let progress = 1; // Default to clear (no blur)
        
        if (cardBottom <= viewportTop) {
          // Card is above viewport
          progress = 0;
        } else if (cardTop >= viewportBottom) {
          // Card is below viewport - should be blurred
          progress = 0;
        } else if (visibleRatio < threshold) {
          // Less than threshold visible, apply blur
          progress = visibleRatio / threshold;
        } else {
          // More than threshold visible, fully clear
          progress = 1;
        }
        
        setScrollProgress((prev) => ({
          ...prev,
          [index]: progress
        }));
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
      observers.forEach((observer) => observer.disconnect());
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 w-full">
      {/* Subtle blue and purple glow effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gray-600/30 rounded-full blur-[120px] max-w-full" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-purple-500/20 rounded-full blur-[120px] max-w-full" />
      </div>
      <div className="container mx-auto max-w-7xl relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 w-full">
          {/* <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">#7</span>
          </div> */}
          <h2 ref={titleRef} style={titleBlurStyle} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6">
            {(() => {
              const titleText = "The Private Buying Experience";
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
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start w-full min-w-0">
          {/* Left Side - Image */}
          <div className="relative lg:sticky lg:top-20 mb-8 sm:mb-10 lg:mb-0 w-full min-w-0">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full">
              <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full bg-gradient-to-br from-gray-900/20 to-black/40">
                <Image
                  src="/images/home_section_property.jpg"
                  alt="Private Buying Experience"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Blue glow effect at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-700/40 via-gray-700/20 to-transparent z-20 pointer-events-none" />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 w-full min-w-0">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.has(index);
              const progress = scrollProgress[index] ?? 0;
              
              // Calculate blur based on scroll progress
              // When progress is 0 (below viewport, not visible), blur is high (20px)
              // When progress is 1 (visible on screen), blur is 0 (perfectly clear)
              const blurAmount = progress < 1 ? Math.max(0, 20 * (1 - progress)) : 0; // Blur from 20px to 0px, 0 when visible
              const opacity = progress < 1 ? Math.max(0.5, 0.5 + (progress * 0.5)) : 1; // Opacity from 0.5 to 1.0, 1 when visible
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-5 md:p-6 transition-all duration-700 ease-out overflow-hidden w-full min-w-0",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
                    backdropFilter: `blur(20px) saturate(180%)`,
                    WebkitBackdropFilter: `blur(20px) saturate(180%)`,
                    filter: `blur(${blurAmount}px)`,
                    WebkitFilter: `blur(${blurAmount}px)`,
                    opacity: opacity,
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    transition: "filter 0.15s ease-out, opacity 0.15s ease-out, transform 0.7s ease-out",
                  }}
                >
                  {index === 0 ? (
                    // First card: "Sell your Home Privately" design
                    <div className="w-full min-w-0">
                      {/* Top Icons */}
                      <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6">
                        {/* Top Left Icon - House Outline */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800/50 rounded-lg flex items-center justify-center border border-white/10">
                          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-2" />
                        </div>
                        
                        {/* Top Right Icon - Colorful House */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100/20 rounded-lg flex items-center justify-center border border-white/10">
                          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-orange-400" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        "font-bold text-white mb-2 sm:mb-3 transition-all duration-700 ease-out break-words",
                        isVisible ? "text-xl sm:text-2xl md:text-3xl scale-100" : "text-lg sm:text-xl md:text-2xl scale-95"
                      )}>
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      {step.subtitle && (
                        <p className={cn(
                          "text-gray-300 mb-3 sm:mb-4 leading-relaxed transition-all duration-700 ease-out delay-100 break-words",
                          isVisible ? "text-xs sm:text-sm md:text-base opacity-100" : "text-xs sm:text-sm opacity-70"
                        )}>
                          {step.subtitle}
                        </p>
                      )}

                      {/* Tags */}
                      {step.tags && (
                        <div className="flex gap-2 mb-4 sm:mb-5 md:mb-6 flex-wrap">
                          {step.tags.map((tag, tagIndex) => {
                            const hasBold = 'bold' in tag && tag.bold;
                            return (
                              <span key={tagIndex} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-800/60 text-white text-[10px] sm:text-xs rounded-lg border border-white/10 break-words">
                                {hasBold ? (
                                  <>
                                    <span className="font-semibold">{tag.bold}</span>{' '}
                                    {tag.text.replace(tag.bold as string, '').trim()}
                                  </>
                                ) : (
                                  tag.text
                                )}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Features List */}
                      {step.features && (
                        <ul className="space-y-2 sm:space-y-3">
                          {step.features.map((feature, featIndex) => (
                            <li key={featIndex} className="flex items-start gap-2 sm:gap-3 text-white text-xs sm:text-sm min-w-0">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                              </div>
                              <span className="break-words min-w-0 flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    // Second and Third cards: Similar design with different icons
                    <div className="w-full min-w-0">
                      {/* Top Icons */}
                      <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6">
                        {/* Top Left Icon - Compass for Investment, Phone for Buy Luxury, FileCode for Property Management */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-400/30">
                          {index === 1 ? (
                            <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                          ) : index === 2 ? (
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                          ) : (
                            <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                          )}
                        </div>
                        
                        {/* Top Right Icon - Trash Can for Investment, Colorful House for Buy Luxury, Bell for Property Management */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-400/30">
                          {index === 1 ? (
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          ) : index === 2 ? (
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 fill-orange-400" />
                          ) : (
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        "font-bold text-white mb-2 sm:mb-3 transition-all duration-700 ease-out",
                        isVisible ? "text-xl sm:text-2xl md:text-3xl scale-100" : "text-lg sm:text-xl md:text-2xl scale-95"
                      )}>
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      {step.subtitle && (
                        <p className={cn(
                          "text-gray-300 mb-3 sm:mb-4 leading-relaxed transition-all duration-700 ease-out delay-100",
                          isVisible ? "text-xs sm:text-sm md:text-base opacity-100" : "text-xs sm:text-sm opacity-70"
                        )}>
                          {step.subtitle}
                        </p>
                      )}

                      {/* Tags */}
                      {step.tags && (
                        <div className="flex gap-2 mb-4 sm:mb-5 md:mb-6 flex-wrap">
                          {step.tags.map((tag, tagIndex) => {
                            const hasBold = 'bold' in tag && tag.bold;
                            return (
                              <span key={tagIndex} className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-800/60 text-white text-[10px] sm:text-xs rounded-lg border border-white/10">
                                {hasBold ? (
                                  <>
                                    <span className="font-semibold">{tag.bold}</span>{' '}
                                    {tag.text.replace(tag.bold as string, '').trim()}
                                  </>
                                ) : (
                                  tag.text
                                )}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Features List */}
                      {step.features && (
                        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
                          {step.features.map((feature, featIndex) => (
                            <li key={featIndex} className="flex items-start gap-2 sm:gap-3 text-white text-xs sm:text-sm min-w-0">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                              </div>
                              <span className="break-words min-w-0 flex-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA Button for third card */}
                      {step.ctaButton && (
                        <button className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg blue-glow">
                          {step.ctaButton}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

