'use client';

interface WhyGuideHelpsProps {
  locale: string;
}

export default function WhyGuideHelps({ locale }: WhyGuideHelpsProps) {
  return (
    <section className="relative bg-black py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why This Guide Is Essential for International Buyers
          </h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <p>
              Buying property in Mallorca involves specific legal steps, taxes and local procedures that many international clients are not aware of.
            </p>
            <p>
              This guide is designed to give you clarity, confidence and insider knowledge, so you can make informed decisions, avoid mistakes and find the right property faster.
            </p>
            <p className="text-gray-400 font-semibold">
              Created by ICON PROPERTIES — specialists in luxury real estate for international buyers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}










