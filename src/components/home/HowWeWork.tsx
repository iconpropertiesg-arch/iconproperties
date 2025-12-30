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
  
  // Blur reveal effects
  const { elementRef: titleRef, style: titleStyle } = useBlurReveal({ maxBlur: 8, minBlur: 0 });

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

    // Also track scroll for smooth blur updates
    const handleScroll = () => {
      stepRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress: 0 = blurred (below viewport), 1 = clear (visible on screen)
        let progress = 1; // Default to clear (no blur)
        
        // Only blur cards that are below the viewport (not yet scrolled into view)
        if (rect.top >= windowHeight) {
          // Card is completely below viewport - should be blurred
          progress = 0;
        } else if (rect.top < windowHeight && rect.top >= 0) {
          // Card is entering from bottom - start clearing blur as soon as any part is visible
          // Calculate how much of the card is visible
          const visibleHeight = windowHeight - rect.top;
          const cardHeight = rect.height;
          
          // Clear blur immediately as card enters viewport
          // Use a small transition zone for smoothness
          const transitionZone = cardHeight * 0.3; // Quick transition over 30% of card
          progress = Math.max(0, Math.min(1, visibleHeight / transitionZone));
        } else if (rect.top < 0) {
          // Card is fully above viewport or fully visible - no blur
          progress = 1;
        }
        
        setScrollProgress((prev) => ({
          ...prev,
          [index]: progress
        }));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle blue and purple glow effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-wider uppercase">#7</span>
          </div> */}
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} style={titleStyle} className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Private Buying Experience
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image */}
          <div className="relative lg:sticky lg:top-20">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-gray-900/20 to-black/40">
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
          <div className="space-y-6">
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
                    "relative rounded-2xl border border-white/20 p-6 transition-all duration-700 ease-out overflow-hidden",
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
                    <div>
                      {/* Top Icons */}
                      <div className="flex justify-between items-start mb-6">
                        {/* Top Left Icon - House Outline */}
                        <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center border border-white/10">
                          <Home className="w-6 h-6 text-white stroke-2" />
                        </div>
                        
                        {/* Top Right Icon - Colorful House */}
                        <div className="w-10 h-10 bg-gray-100/20 rounded-lg flex items-center justify-center border border-white/10">
                          <Home className="w-5 h-5 text-orange-400 fill-orange-400" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        "font-bold text-white mb-3 transition-all duration-700 ease-out",
                        isVisible ? "text-2xl sm:text-3xl scale-100" : "text-xl sm:text-2xl scale-95"
                      )}>
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      {step.subtitle && (
                        <p className={cn(
                          "text-gray-300 mb-4 leading-relaxed transition-all duration-700 ease-out delay-100",
                          isVisible ? "text-sm sm:text-base opacity-100" : "text-xs sm:text-sm opacity-70"
                        )}>
                          {step.subtitle}
                        </p>
                      )}

                      {/* Tags */}
                      {step.tags && (
                        <div className="flex gap-2 mb-6 flex-wrap">
                          {step.tags.map((tag, tagIndex) => {
                            const hasBold = 'bold' in tag && tag.bold;
                            return (
                              <span key={tagIndex} className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
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
                        <ul className="space-y-3">
                          {step.features.map((feature, featIndex) => (
                            <li key={featIndex} className="flex items-center gap-3 text-white text-sm">
                              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    // Second and Third cards: Similar design with different icons
                    <div>
                      {/* Top Icons */}
                      <div className="flex justify-between items-start mb-6">
                        {/* Top Left Icon - Compass for Investment, Phone for Buy Luxury, FileCode for Property Management */}
                        <div className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-400/30">
                          {index === 1 ? (
                            <Compass className="w-6 h-6 text-gray-400" />
                          ) : index === 2 ? (
                            <Phone className="w-6 h-6 text-gray-400" />
                          ) : (
                            <FileCode className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        {/* Top Right Icon - Trash Can for Investment, Colorful House for Buy Luxury, Bell for Property Management */}
                        <div className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-400/30">
                          {index === 1 ? (
                            <Trash2 className="w-5 h-5 text-gray-400" />
                          ) : index === 2 ? (
                            <Home className="w-5 h-5 text-orange-400 fill-orange-400" />
                          ) : (
                            <Bell className="w-5 h-5 text-orange-400" />
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={cn(
                        "font-bold text-white mb-3 transition-all duration-700 ease-out",
                        isVisible ? "text-2xl sm:text-3xl scale-100" : "text-xl sm:text-2xl scale-95"
                      )}>
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      {step.subtitle && (
                        <p className={cn(
                          "text-gray-300 mb-4 leading-relaxed transition-all duration-700 ease-out delay-100",
                          isVisible ? "text-sm sm:text-base opacity-100" : "text-xs sm:text-sm opacity-70"
                        )}>
                          {step.subtitle}
                        </p>
                      )}

                      {/* Tags */}
                      {step.tags && (
                        <div className="flex gap-2 mb-6 flex-wrap">
                          {step.tags.map((tag, tagIndex) => {
                            const hasBold = 'bold' in tag && tag.bold;
                            return (
                              <span key={tagIndex} className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
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
                        <ul className="space-y-3 mb-6">
                          {step.features.map((feature, featIndex) => (
                            <li key={featIndex} className="flex items-center gap-3 text-white text-sm">
                              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA Button for third card */}
                      {step.ctaButton && (
                        <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg  blue-glow">
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

