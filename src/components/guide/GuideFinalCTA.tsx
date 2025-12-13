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
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
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
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 inline-flex items-center gap-2 mb-4"
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

