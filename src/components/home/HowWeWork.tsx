'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Home, Check, Compass, Trash2, Phone, FileCode, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => new Set([...Array.from(prev), index]));
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-950 via-slate-950 via-black to-black py-20 px-4">
      {/* Subtle blue and purple glow effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">#7</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Private Buying Experience
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image */}
          <div className="relative lg:sticky lg:top-20">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-blue-900/20 to-black/40">
                <Image
                  src="/images/home_section_property.jpg"
                  alt="Private Buying Experience"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Blue glow effect at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-600/40 via-blue-600/20 to-transparent z-20 pointer-events-none" />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isVisible = visibleSteps.has(index);
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative rounded-2xl border border-white/12 p-6 transition-all duration-300 overflow-hidden",
                    "backdrop-blur-2xl",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(50, 80, 200, 0.4), transparent 60%), radial-gradient(circle at bottom right, rgba(0, 150, 255, 0.3), transparent 70%), linear-gradient(135deg, #0b0f29, #0a0f25)",
                    backgroundBlendMode: "screen, color-dodge, normal",
                    boxShadow:
                      "inset 0 0 35px rgba(255,255,255,0.04), 0 0 60px rgba(0, 90, 255, 0.2)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "white",
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    aria-hidden="true"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 40%, rgba(255,255,255,0.07) 65%, transparent 100%)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-35"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(circle at 25% 30%, rgba(64,140,255,0.14) 0%, transparent 40%), radial-gradient(circle at 75% 70%, rgba(30,64,175,0.12) 0%, transparent 45%)",
                    }}
                  />
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
                        <div className="w-10 h-10 bg-blue-100/20 rounded-lg flex items-center justify-center border border-white/10">
                          <Home className="w-5 h-5 text-orange-400 fill-orange-400" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      {step.subtitle && (
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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
                              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
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
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                          {index === 1 ? (
                            <Compass className="w-6 h-6 text-blue-400" />
                          ) : index === 2 ? (
                            <Phone className="w-6 h-6 text-blue-400" />
                          ) : (
                            <FileCode className="w-6 h-6 text-blue-400" />
                          )}
                        </div>
                        
                        {/* Top Right Icon - Trash Can for Investment, Colorful House for Buy Luxury, Bell for Property Management */}
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                          {index === 1 ? (
                            <Trash2 className="w-5 h-5 text-blue-400" />
                          ) : index === 2 ? (
                            <Home className="w-5 h-5 text-orange-400 fill-orange-400" />
                          ) : (
                            <Bell className="w-5 h-5 text-orange-400" />
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      {step.subtitle && (
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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
                              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA Button for third card */}
                      {step.ctaButton && (
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 blue-glow">
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

