'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, Camera, Users, CheckCircle } from 'lucide-react';

interface HowWeSellProps {
  locale: string;
}

const steps = [
  {
    number: '1',
    icon: FileText,
    title: 'Property Review & Pricing Strategy',
    description: 'We analyse your home and recommend the ideal pricing aligned with current demand.'
  },
  {
    number: '2',
    icon: Camera,
    title: 'Premium Preparation',
    description: 'Professional photography, video, drone and a bespoke presentation to highlight your property.'
  },
  {
    number: '3',
    icon: Users,
    title: 'Private Network + Online Marketing',
    description: 'We introduce your property to verified buyers, banks and launch it using google and meta ads online with premium marketing, expenses on us.'
  },
  {
    number: '4',
    icon: CheckCircle,
    title: 'Viewings, Negotiation & Closing',
    description: 'We handle everything from viewings to negotiations and coordinate with lawyers and notaries through completion.'
  }
];

export default function HowWeSell({ locale }: HowWeSellProps) {
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
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px'
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
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our 4-Step Selling Process
          </h2>
        </div>

        {/* Steps Grid - 4 columns on desktop, 2 on tablet, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.has(index);
            const Icon = step.icon;
            
            if (!Icon) {
              console.error(`Icon is undefined for step ${index}`);
              return null;
            }
            
            return (
              <div
                key={index}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
                }}
              >
                {/* Numbered Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-600/20 to-gray-700/20 border-2 border-gray-400/30 flex items-center justify-center group-hover:border-gray-400/50 transition-colors">
                    {Icon && <Icon className="w-8 h-8 text-gray-400" />}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{step.number}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

