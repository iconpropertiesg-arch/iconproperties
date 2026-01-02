'use client';

import { useState, useEffect, useRef } from 'react';
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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John M.',
    location: 'Palma',
    text: "I was hesitant to list my home. I didn't want it all over the internet. Within 6 weeks, Daniel brought me two serious buyers. No stress, no drama",
    avatar: '/testimonials/john-m.jpg'
  },
  {
    id: 2,
    name: 'Jessica R.',
    location: 'Santa Ponsa',
    text: 'Goldie was very professional in the process. She helped me sell my premise in Santa Ponsa bringing serious buyers.',
    avatar: '/testimonials/jessica-r.jpg'
  },
  {
    id: 3,
    name: 'David L.',
    location: 'Cala Vinyes',
    text: "Their strategy is truly different. I didn't want my apartment exposed everywhere — and I didn't have to. Two serious buyers came through in weeks.",
    avatar: '/testimonials/david-l.jpg'
  },
  {
    id: 4,
    name: 'Michael K.',
    location: 'Portals Nous',
    text: 'It was very pleasant to sell my apartment without dealing with five agencies and constant phone calls. Everything was smooth, respectful, and effective.',
    avatar: '/testimonials/michael-k.jpg'
  },
  {
    id: 5,
    name: 'Sarah T.',
    location: 'Son Vida',
    text: 'We avoided so much wasted time. No open houses, no random viewings. Just qualified buyers who actually made offers. That\'s rare.',
    avatar: '/testimonials/sarah-t.jpg'
  },
  {
    id: 6,
    name: 'Robert P.',
    location: 'Puerto Portals',
    text: "At first I wasn't sure if off-market would work, but Daniel's approach delivered. My villa was sold quietly and fast, just like he promised.",
    avatar: '/testimonials/robert-p.jpg'
  }
];

export default function Testimonials({ locale }: TestimonialsProps) {
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
  
  // Refs and blur states for text elements
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [textBlurs, setTextBlurs] = useState<number[]>(testimonials.map(() => 15));
  const [textOpacities, setTextOpacities] = useState<number[]>(testimonials.map(() => 1)); // Start visible
  const [nameBlurs, setNameBlurs] = useState<number[]>(testimonials.map(() => 15));
  const [nameOpacities, setNameOpacities] = useState<number[]>(testimonials.map(() => 1)); // Start visible
  
  // Element visibility states for step-by-step reveal - initialize all to false
  const [elementVisibility, setElementVisibility] = useState<{
    [key: number]: {
      card: boolean;
      text: boolean;
      name: boolean;
    }
  }>(() => {
    const initial: { [key: number]: { card: boolean; text: boolean; name: boolean } } = {};
    testimonials.forEach((_, index) => {
      initial[index] = { card: false, text: false, name: false };
    });
    return initial;
  });
  
  // Track which cards have started their reveal animation
  const revealedCards = useRef<Set<number>>(new Set());
  
  // Scroll-triggered blur reveal and step-by-step reveal for cards
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !revealedCards.current.has(index)) {
              revealedCards.current.add(index);
              
              const revealDelay = 300; // 300ms between each element
              
              // Initialize all states (start with card, text, and name all blurred)
              setCardBlurs(prev => {
                const newBlurs = [...prev];
                newBlurs[index] = 15;
                return newBlurs;
              });
              setCardOpacities(prev => {
                const newOpacities = [...prev];
                newOpacities[index] = 0.7;
                return newOpacities;
              });
              setTextBlurs(prev => {
                const newBlurs = [...prev];
                newBlurs[index] = 15;
                return newBlurs;
              });
              setTextOpacities(prev => {
                const newOpacities = [...prev];
                newOpacities[index] = 1;
                return newOpacities;
              });
              setNameBlurs(prev => {
                const newBlurs = [...prev];
                newBlurs[index] = 15;
                return newBlurs;
              });
              setNameOpacities(prev => {
                const newOpacities = [...prev];
                newOpacities[index] = 1;
                return newOpacities;
              });
              
              // Step 1: Reveal card with glassy effect (clear card blur)
              setTimeout(() => {
                setElementVisibility(prev => ({
                  ...prev,
                  [index]: { ...prev[index], card: true }
                }));
                setCardBlurs(prev => {
                  const newBlurs = [...prev];
                  newBlurs[index] = 0;
                  return newBlurs;
                });
                setCardOpacities(prev => {
                  const newOpacities = [...prev];
                  newOpacities[index] = 1;
                  return newOpacities;
                });
              }, revealDelay);
              
              // Step 2: Reveal text and clear blur
              setTimeout(() => {
                setElementVisibility(prev => ({
                  ...prev,
                  [index]: { ...prev[index], text: true }
                }));
                setTextBlurs(prev => {
                  const newBlurs = [...prev];
                  newBlurs[index] = 0;
                  return newBlurs;
                });
                setTextOpacities(prev => {
                  const newOpacities = [...prev];
                  newOpacities[index] = 1;
                  return newOpacities;
                });
              }, revealDelay * 2);
              
              // Step 3: Reveal name and clear blur
              setTimeout(() => {
                setElementVisibility(prev => ({
                  ...prev,
                  [index]: { ...prev[index], name: true }
                }));
                setNameBlurs(prev => {
                  const newBlurs = [...prev];
                  newBlurs[index] = 0;
                  return newBlurs;
                });
                setNameOpacities(prev => {
                  const newOpacities = [...prev];
                  newOpacities[index] = 1;
                  return newOpacities;
                });
              }, revealDelay * 3);
            }
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '0px'
        }
      );
      
      observer.observe(card);
      observers.push(observer);
      
      // Check if card is already in viewport on mount
      const rect = card.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport && !revealedCards.current.has(index)) {
        // Trigger reveal immediately if already in viewport
        setTimeout(() => {
          if (!revealedCards.current.has(index)) {
            revealedCards.current.add(index);
            
            const revealDelay = 300;
            
            // Initialize all states
            setCardBlurs(prev => {
              const newBlurs = [...prev];
              newBlurs[index] = 15;
              return newBlurs;
            });
            setCardOpacities(prev => {
              const newOpacities = [...prev];
              newOpacities[index] = 0.7;
              return newOpacities;
            });
            setTextBlurs(prev => {
              const newBlurs = [...prev];
              newBlurs[index] = 15;
              return newBlurs;
            });
            setTextOpacities(prev => {
              const newOpacities = [...prev];
              newOpacities[index] = 1;
              return newOpacities;
            });
            setNameBlurs(prev => {
              const newBlurs = [...prev];
              newBlurs[index] = 15;
              return newBlurs;
            });
            setNameOpacities(prev => {
              const newOpacities = [...prev];
              newOpacities[index] = 1;
              return newOpacities;
            });
            
            // Step 1: Reveal card
            setTimeout(() => {
              setElementVisibility(prev => ({
                ...prev,
                [index]: { ...prev[index], card: true }
              }));
              setCardBlurs(prev => {
                const newBlurs = [...prev];
                newBlurs[index] = 0;
                return newBlurs;
              });
              setCardOpacities(prev => {
                const newOpacities = [...prev];
                newOpacities[index] = 1;
                return newOpacities;
              });
            }, revealDelay);
            
            // Step 2: Reveal text
            setTimeout(() => {
              setElementVisibility(prev => ({
                ...prev,
                [index]: { ...prev[index], text: true }
              }));
              setTextBlurs(prev => {
                const newBlurs = [...prev];
                newBlurs[index] = 0;
                return newBlurs;
              });
              setTextOpacities(prev => {
                const newOpacities = [...prev];
                newOpacities[index] = 1;
                return newOpacities;
              });
            }, revealDelay * 2);
            
            // Step 3: Reveal name
            setTimeout(() => {
              setElementVisibility(prev => ({
                ...prev,
                [index]: { ...prev[index], name: true }
              }));
              setNameBlurs(prev => {
                const newBlurs = [...prev];
                newBlurs[index] = 0;
                return newBlurs;
              });
              setNameOpacities(prev => {
                const newOpacities = [...prev];
                newOpacities[index] = 1;
                return newOpacities;
              });
            }, revealDelay * 3);
          }
        }, 100);
      }
    });
    
    // Also track scroll for smooth blur updates
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      // Update card blur
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardHeight = rect.height;
        
        const cardTop = Math.max(0, rect.top);
        const cardBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, cardBottom - cardTop);
        const visibleRatio = cardHeight > 0 ? visibleHeight / cardHeight : 0;
        
        let progress = 1;
        if (rect.top >= windowHeight) {
          progress = 0;
        } else if (visibleRatio < 0.5) {
          progress = visibleRatio * 2;
        } else {
          progress = 1;
        }
        
        const newBlur = 15 - (progress * 15);
        const newOpacity = 0.3 + (progress * 0.7);
        
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
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      observers.forEach(observer => observer.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Line-by-line reveal effect
  useEffect(() => {
    const titleText = "What Our Clients Say";
    const subtitleText = "Real experiences from property owners who chose our private, discreet service";
    
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
              const titleText = "What Our Clients Say";
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
              const subtitleText = "Real experiences from property owners who chose our private, discreet service";
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
              className={cn(
                "relative rounded-2xl p-6 lg:p-8 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] group overflow-hidden",
                elementVisibility[index]?.card ? "translate-y-0 scale-100" : "translate-y-4 scale-98"
              )}
              style={{
                background: elementVisibility[index]?.card 
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)",
                backdropFilter: elementVisibility[index]?.card 
                  ? "blur(20px) saturate(180%)"
                  : `blur(${Math.max(5, 20 - cardBlurs[index] * 1)}px) saturate(${Math.max(120, 180 - cardBlurs[index] * 4)}%)`,
                WebkitBackdropFilter: elementVisibility[index]?.card 
                  ? "blur(20px) saturate(180%)"
                  : `blur(${Math.max(5, 20 - cardBlurs[index] * 1)}px) saturate(${Math.max(120, 180 - cardBlurs[index] * 4)}%)`,
                boxShadow: elementVisibility[index]?.card
                  ? "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
                  : "0 4px 16px 0 rgba(31, 38, 135, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
                border: elementVisibility[index]?.card
                  ? "1px solid rgba(255, 255, 255, 0.2)"
                  : "1px solid rgba(255, 255, 255, 0.15)",
                position: "relative",
                zIndex: 1,
                willChange: "transform, backdrop-filter, filter, opacity",
                filter: `blur(${cardBlurs[index]}px)`,
                opacity: cardOpacities[index],
                transition: 'filter 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1), background 1s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 1s cubic-bezier(0.4, 0, 0.2, 1), border 1s cubic-bezier(0.4, 0, 0.2, 1)',
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
              <p 
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
                className={cn(
                  "text-gray-300 leading-relaxed mb-6 text-sm lg:text-base transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  elementVisibility[index]?.text ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{
                  filter: `blur(${textBlurs[index]}px)`,
                  opacity: elementVisibility[index]?.text ? textOpacities[index] : 0,
                  transition: 'filter 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                "{testimonial.text}"
              </p>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

              {/* User Info */}
              <div 
                ref={(el) => {
                  nameRefs.current[index] = el;
                }}
                className={cn(
                  "flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  elementVisibility[index]?.name ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{
                  filter: `blur(${nameBlurs[index]}px)`,
                  opacity: elementVisibility[index]?.name ? nameOpacities[index] : 0,
                  transition: 'filter 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
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

