'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Eye, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HowWeWorkProps {
  locale: string;
}

const steps = [
  {
    number: '1',
    icon: MessageCircle,
    title: 'Briefing & Discovery',
    description: 'We begin with a private consultation to understand your lifestyle preferences, investment goals and preferred locations.'
  },
  {
    number: '2',
    icon: MessageCircle,
    title: 'Curated Portfolio Delivery',
    description: 'You will be entered in a Whatsapp group, including exclusive off-market listings unavailable to the public.'
  },
  {
    number: '3',
    icon: Eye,
    title: 'Private Viewings & Due Diligence',
    description: 'We schedule and coordinate private tours, carry out property evaluation, legal checks and negotiation on your behalf, all handled discreetly.'
  },
  {
    number: '4',
    icon: Shield,
    title: 'Trusted Closing & Ongoing Support',
    description: 'From reservation to ownership transfer, we work alongside top-tier legal and financial partners such as CaixaBank to ensure a smooth closing, and support you even after the keys are handed over.'
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
              setVisibleSteps((prev) => new Set([...prev, index]));
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
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
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
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.has(index);
              
              return (
                <div
                  key={index}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 transition-all duration-700 shadow-lg",
                    isVisible
                      ? "opacity-100 translate-y-0 bg-white/10 border-white/20 shadow-blue-500/10"
                      : "opacity-0 translate-y-8"
                  )}
                >
                  {/* Step Number and Icon */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/30">
                        <div className="relative">
                          <Icon className="w-8 h-8 text-blue-400" />
                          <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {step.number}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative line connecting steps */}
                  {index < steps.length - 1 && (
                    <div className="absolute bottom-0 left-8 top-full w-0.5 h-8 bg-gradient-to-b from-blue-400/30 to-transparent" />
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

