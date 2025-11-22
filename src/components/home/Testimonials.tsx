'use client';

import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialsProps {
  locale: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John M.',
    location: 'Palma',
    text: "I was hesitant to list my home. I didn't want it all over the internet. Within 6 weeks, Daniel brought me two serious buyers. No stress, no drama",
    avatar: '/testimonials/john-m.jpg'
  },
  {
    id: 2,
    name: 'Jessica R.',
    location: 'Santa Ponsa',
    text: 'Goldie was very professional in the process. She helped me sell my premise in Santa Ponsa bringing serious buyers.',
    avatar: '/testimonials/jessica-r.jpg'
  },
  {
    id: 3,
    name: 'David L.',
    location: 'Cala Vinyes',
    text: "Their strategy is truly different. I didn't want my apartment exposed everywhere — and I didn't have to. Two serious buyers came through in weeks.",
    avatar: '/testimonials/david-l.jpg'
  },
  {
    id: 4,
    name: 'Michael K.',
    location: 'Portals Nous',
    text: 'It was very pleasant to sell my apartment without dealing with five agencies and constant phone calls. Everything was smooth, respectful, and effective.',
    avatar: '/testimonials/michael-k.jpg'
  },
  {
    id: 5,
    name: 'Sarah T.',
    location: 'Son Vida',
    text: 'We avoided so much wasted time. No open houses, no random viewings. Just qualified buyers who actually made offers. That\'s rare.',
    avatar: '/testimonials/sarah-t.jpg'
  },
  {
    id: 6,
    name: 'Robert P.',
    location: 'Puerto Portals',
    text: "At first I wasn't sure if off-market would work, but Daniel's approach delivered. My villa was sold quietly and fast, just like he promised.",
    avatar: '/testimonials/robert-p.jpg'
  }
];

export default function Testimonials({ locale }: TestimonialsProps) {
  return (
    <section className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real experiences from property owners who chose our private, discreet service
          </p>
        </div>

        {/* Testimonials Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Quote Icon - Top Right */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <Quote className="w-8 h-8 text-blue-400" />
              </div>

              {/* Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400/30 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                    <span className="text-blue-400 font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base">
                "{testimonial.text}"
              </p>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

              {/* User Info */}
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">
                  {testimonial.name}
                </span>
                <span className="text-gray-400 text-xs mt-1">
                  {testimonial.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

