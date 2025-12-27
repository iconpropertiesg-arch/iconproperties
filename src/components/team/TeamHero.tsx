'use client';

import Image from 'next/image';

interface TeamHeroProps {
  locale: string;
}

export default function TeamHero({ locale }: TeamHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-black/30" />
        {/* You can add a background image here */}
      </div>
      
      {/* Subtle glowing effects */}
      <div className="absolute inset-0 opacity-30">
        
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Meet the ICON PROPERTIES Team
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-4 leading-relaxed max-w-3xl mx-auto">
            A boutique real estate advisory built on trust, discretion and deep local expertise.
          </p>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            We work with a limited number of clients to deliver exceptional results — personally, privately and professionally.
          </p>
        </div>
      </div>
    </section>
  );
}










