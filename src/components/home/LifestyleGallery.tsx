'use client';

import Image from 'next/image';

interface LifestyleGalleryProps {
  locale: string;
}

export default function LifestyleGallery({ locale }: LifestyleGalleryProps) {
  // Lifestyle images - using property images or placeholder villa images
  // These represent sea views, pools, and modern interiors
  const lifestyleImages = [
    {
      src: '/uploads/properties/property-1763216428828-byybj4voerg.png',
      alt: 'Luxury villa with sea view'
    },
    {
      src: '/uploads/properties/property-1763216506681-xfsdw69uuph.png',
      alt: 'Modern villa interior'
    },
    {
      src: '/uploads/properties/property-1764315217294-9uuls8vzpnl.png',
      alt: 'Villa pool area'
    },
    {
      src: '/uploads/properties/property-1764344118745-2gfjxnnat7a.png',
      alt: 'Luxury villa exterior'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Glimpse of What's Available
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            These are examples of the villas and apartments we source for our clients. Many of the best homes remain private and are shown only after receiving your request.
          </p>
        </div>

        {/* Image Gallery - 3 or 4 horizontal images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyleImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-gray-900"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                unoptimized
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = '/images/home_section_property.jpg';
                }}
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






