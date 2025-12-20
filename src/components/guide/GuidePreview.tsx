'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface GuidePreviewProps {
  locale: string;
}

const previewPages = [
  {
    id: 1,
    title: 'Cover Page',
    thumbnail: '/images/guide-preview-cover.jpg',
    fullImage: '/images/guide-preview-cover.jpg'
  },
  {
    id: 2,
    title: 'Area Overview',
    thumbnail: '/images/guide-preview-areas.jpg',
    fullImage: '/images/guide-preview-areas.jpg'
  },
  {
    id: 3,
    title: 'Buying Steps',
    thumbnail: '/images/guide-preview-steps.jpg',
    fullImage: '/images/guide-preview-steps.jpg'
  },
  {
    id: 4,
    title: 'Off-Market Guide',
    thumbnail: '/images/guide-preview-offmarket.jpg',
    fullImage: '/images/guide-preview-offmarket.jpg'
  }
];

export default function GuidePreview({ locale }: GuidePreviewProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
        {/* Subtle glowing effects overlay */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Take a Look Inside
            </h2>
          </div>

          {/* Preview Grid - 4 columns on desktop, 2 on tablet, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewPages.map((page) => (
              <div
                key={page.id}
                onClick={() => setSelectedImage(page.fullImage)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[3/4] bg-gray-900 hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white font-semibold">{page.title}</p>
                </div>
                {/* Placeholder - replace with actual preview images */}
                <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-gray-800/30 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{page.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[3/4] bg-gray-900 rounded-lg overflow-hidden">
              {/* Placeholder - replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-gray-800/30 flex items-center justify-center">
                <span className="text-gray-400">Preview Image</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}







