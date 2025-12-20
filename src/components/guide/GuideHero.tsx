'use client';

import { ArrowDown } from 'lucide-react';

interface GuideHeroProps {
  locale: string;
}

export default function GuideHero({ locale }: GuideHeroProps) {
  const scrollToForm = () => {
    const form = document.getElementById('download-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 via-black to-black" />
        <div className="absolute inset-0 bg-black/25" />
        {/* You can add a background image here */}
      </div>
      
      {/* Subtle glowing effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Free Guide: How to Buy a Luxury Property in Mallorca
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            Learn everything you need before buying — legal steps, taxes, areas, budgets, negotiation tips and access to off-market listings.
          </p>

          {/* Primary CTA */}
          <button
            onClick={scrollToForm}
            className="group inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
          >
            Download the Free Guide
            <ArrowDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}







