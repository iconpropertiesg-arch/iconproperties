'use client';

import Image from 'next/image';

export default function ProcessSteps() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
           The Private Buying Experience
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Image */}
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&auto=format"
              alt="Modern interior"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Right Side - Process Steps Cards */}
          <div className="space-y-6">
            {/* Step 1: Briefing & Discovery */}
            <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                {/* Speech Bubble Icon with Number */}
                <div className="relative flex-shrink-0">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  <div className="absolute top-2 left-0 right-0 flex items-center justify-center">
                    <span className="text-gray-600 text-lg font-bold">1</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Briefing & Discovery</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We begin with a private consultation to understand your lifestyle preferences, investment goals and preferred locations.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Curated Portfolio Delivery */}
            <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                {/* Speech Bubble Icon with Number */}
                <div className="relative flex-shrink-0">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  <div className="absolute top-2 left-0 right-0 flex items-center justify-center">
                    <span className="text-gray-600 text-lg font-bold">2</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Curated Portfolio Delivery</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You will be entered in a Whatsapp group, including exclusive off-market listings unavailable to the public.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

