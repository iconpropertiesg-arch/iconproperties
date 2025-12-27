'use client';

import { Download } from 'lucide-react';

interface GuideFinalCTAProps {
  locale: string;
}

export default function GuideFinalCTA({ locale }: GuideFinalCTAProps) {
  const scrollToForm = () => {
    const form = document.getElementById('download-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Your Free Guide Now
          </h2>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="group px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl  inline-flex items-center gap-2 mb-4"
          >
            <Download className="w-5 h-5" />
            <span>Download the Guide</span>
          </button>

          {/* Subtext */}
          <p className="text-gray-400 text-sm">
            You'll receive instant access after submitting the form.
          </p>
        </div>
      </div>
    </section>
  );
}










