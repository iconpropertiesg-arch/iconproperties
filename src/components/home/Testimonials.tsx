'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useBlurReveal } from '@/hooks/useBlurReveal';

interface TestimonialsProps {
  locale: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations('home.testimonials');
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: t('testimonial1.name'),
      location: t('testimonial1.location'),
      text: t('testimonial1.text'),
      avatar: '/testimonials/john-m.jpg'
    },
    {
      id: 2,
      name: t('testimonial2.name'),
      location: t('testimonial2.location'),
      text: t('testimonial2.text'),
      avatar: '/testimonials/jessica-r.jpg'
    },
    {
      id: 3,
      name: t('testimonial3.name'),
      location: t('testimonial3.location'),
      text: t('testimonial3.text'),
      avatar: '/testimonials/david-l.jpg'
    },
    {
      id: 4,
      name: t('testimonial4.name'),
      location: t('testimonial4.location'),
      text: t('testimonial4.text'),
      avatar: '/testimonials/michael-k.jpg'
    },
    {
      id: 5,
      name: t('testimonial5.name'),
      location: t('testimonial5.location'),
      text: t('testimonial5.text'),
      avatar: '/testimonials/sarah-t.jpg'
    },
    {
      id: 6,
      name: t('testimonial6.name'),
      location: t('testimonial6.location'),
      text: t('testimonial6.text'),
      avatar: '/testimonials/robert-p.jpg'
    }
  ];
  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  const [subtitleLinesVisible, setSubtitleLinesVisible] = useState<number[]>([]);
  
  // Blur reveal effects (these refs will be used for both blur and line reveal)
  const { elementRef: titleRef, style: titleBlurStyle } = useBlurReveal<HTMLHeadingElement>({ maxBlur: 8, minBlur: 0 });
  const { elementRef: subtitleRef, style: subtitleBlurStyle } = useBlurReveal<HTMLParagraphElement>({ maxBlur: 8, minBlur: 0 });
  
  // Refs and blur states for each testimonial card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardBlurs, setCardBlurs] = useState<number[]>(testimonials.map(() => 15));
  const [cardOpacities, setCardOpacities] = useState<number[]>(testimonials.map(() => 0.7));
  
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
  
  // Line-by-line reveal effect
  useEffect(() => {
    const titleText = t('title');
    const subtitleText = t('subtitle');
    
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
  }, [t]);
  
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
          <h2 ref={titleRef} style={titleBlurStyle} className="text-4xl md:text-5xl font-bold text-white mb-4">
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
          <p ref={subtitleRef} style={subtitleBlurStyle} className="text-xl text-gray-300 max-w-2xl mx-auto">
            {(() => {
              const subtitleText = t('subtitle');
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

        {/* Testimonials Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative rounded-2xl p-6 lg:p-8 transition-all duration-300 group overflow-hidden"
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
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)";
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
              {/* Inner glow overlay for enhanced glassy effect */}
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                  mixBlendMode: "overlay",
                }}
              />
              {/* Quote Icon - Top Right */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity z-10">
                <Quote className="w-8 h-8 text-gray-400" />
              </div>

              {/* Content wrapper with relative positioning */}
              <div className="relative z-10">
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400/30 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600/20 to-gray-700/20 flex items-center justify-center">
                    <span className="text-gray-400 font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base">
                "{testimonial.text}"
              </p>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

              {/* User Info */}
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">
                  {testimonial.name}
                </span>
                <span className="text-gray-400 text-xs mt-1">
                  {testimonial.location}
                </span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

