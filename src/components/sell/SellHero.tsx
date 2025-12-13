'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';

interface SellHeroProps {
  locale: string;
}

export default function SellHero({ locale }: SellHeroProps) {
  const scrollToForm = () => {
    const form = document.getElementById('valuation-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    // Scroll to contact section or navigate to contact page
    window.location.href = `/${locale}/contact`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background - Photo or video with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 via-black to-black">
        {/* You can add a background image/video here */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Subtle glowing effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Sell Your Property in Mallorca, Privately & Professionally
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
            A boutique service for property owners seeking a discreet, premium and efficient sales process with qualified international buyers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
            >
              Request Valuation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Speak With an Advisor
              <MessageCircle className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
