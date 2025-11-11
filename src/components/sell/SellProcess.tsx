'use client';

import { useTranslations } from 'next-intl';
import { Calculator, Camera, Users, Key, CheckCircle } from 'lucide-react';

interface SellProcessProps {
  locale: string;
}

export default function SellProcess({ locale }: SellProcessProps) {
  const t = useTranslations('sell');

  const steps = [
    {
      icon: Calculator,
      title: 'Free Property Valuation',
      description: 'We analyze your property using comparative market data and our local expertise to provide an accurate valuation within 24 hours.',
      duration: '24 hours',
      included: [
        'Comprehensive market analysis',
        'Professional property assessment',
        'Written valuation report',
        'Pricing strategy recommendations'
      ]
    },
    {
      icon: Camera,
      title: 'Premium Marketing Package',
      description: 'Our marketing team creates stunning visuals and campaigns to showcase your property to qualified buyers worldwide.',
      duration: '3-5 days',
      included: [
        'Professional photography',
        'Drone aerial footage',
        'Virtual 3D tour',
        'Social media campaigns',
        'International listings'
      ]
    },
    {
      icon: Users,
      title: 'Buyer Qualification & Viewings',
      description: 'We carefully screen potential buyers and coordinate viewings to ensure only serious, qualified prospects visit your property.',
      duration: 'Ongoing',
      included: [
        'Financial pre-qualification',
        'Scheduled private viewings',
        'Viewing feedback reports',
        'Negotiation management'
      ]
    },
    {
      icon: Key,
      title: 'Sale Completion',
      description: 'Our legal team handles all paperwork and coordinates with notaries to ensure a smooth, stress-free completion.',
      duration: '30-45 days',
      included: [
        'Legal documentation',
        'Notary coordination',
        'Final inspections',
        'Key handover ceremony'
      ]
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Proven Selling Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From initial valuation to final sale, we handle every detail with professionalism and care. 
            Our streamlined process ensures maximum value and minimal stress for property sellers.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  isEven ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-primary font-semibold">
                        Step {index + 1} • {step.duration}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">What's Included:</h4>
                    <ul className="space-y-2">
                      {step.included.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual */}
                <div className={isEven ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                      <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                        <Icon className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Timeline */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Typical Timeline: Property Listed to Sold
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Week 1</div>
                <div className="text-sm text-gray-600">Valuation & Marketing Prep</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Week 2-4</div>
                <div className="text-sm text-gray-600">Active Marketing & Viewings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Week 5-6</div>
                <div className="text-sm text-gray-600">Offers & Negotiations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Week 7-12</div>
                <div className="text-sm text-gray-600">Legal Process & Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
