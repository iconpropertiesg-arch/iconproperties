'use client';

import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  locale: string;
}

export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const testimonials = [
    {
      name: 'Maria Schmidt',
      location: 'Villa in Portals Nous',
      rating: 5,
      quote: 'Lion Capital exceeded all our expectations. They sold our villa for the full asking price in just 35 days. Their marketing was exceptional and the entire process was completely stress-free.',
      salePrice: '€2.8M',
      timeToSell: '35 days'
    },
    {
      name: 'James & Sarah Wilson',
      location: 'Apartment in Puerto Portals',
      rating: 5,
      quote: 'The level of service and professionalism was outstanding. From the initial valuation to the final sale, every detail was handled perfectly. We couldn\'t be happier with the result.',
      salePrice: '€1.2M',
      timeToSell: '42 days'
    },
    {
      name: 'Carlos Mendez',
      location: 'Commercial Property in Palma',
      rating: 5,
      quote: 'As a business owner, I needed discretion and efficiency. Lion Capital delivered both. The sale was completed smoothly and confidentially, exactly as promised.',
      salePrice: '€3.5M',
      timeToSell: '58 days'
    }
  ];

  const stats = [
    { value: '4.9/5', label: 'Average Rating' },
    { value: '500+', label: 'Properties Sold' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '€2.5B+', label: 'Total Sales Value' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Sellers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what property owners say about 
            their experience selling with Lion Capital Real Estate.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary">{testimonial.salePrice}</div>
                    <div className="text-xs text-gray-500">{testimonial.timeToSell}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Track Record Speaks for Itself
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free property valuation today and discover why property owners 
              trust Lion Capital for their most important real estate transactions.
            </p>
            <a
              href="#valuation-form"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors smooth-elevation"
            >
              Get Free Valuation Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
