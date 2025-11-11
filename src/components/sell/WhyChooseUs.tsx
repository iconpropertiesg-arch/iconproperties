'use client';

import { Shield, TrendingUp, Globe, Clock, Award, Users } from 'lucide-react';

interface WhyChooseUsProps {
  locale: string;
}

export default function WhyChooseUs({ locale }: WhyChooseUsProps) {
  const reasons = [
    {
      icon: TrendingUp,
      title: 'Maximum Sale Price',
      description: 'Our strategic pricing and negotiation expertise consistently achieves 98% of asking price for our sellers.',
      stat: '98% of asking price achieved'
    },
    {
      icon: Clock,
      title: 'Faster Sales',
      description: 'Properties sell 40% faster than market average through our targeted marketing and qualified buyer network.',
      stat: '45 days average time to sell'
    },
    {
      icon: Globe,
      title: 'International Reach',
      description: 'Access to global buyers through our partnerships with luxury real estate networks worldwide.',
      stat: '15+ countries reach'
    },
    {
      icon: Shield,
      title: 'Complete Confidentiality',
      description: 'Discretion is paramount. We ensure your privacy throughout the entire selling process.',
      stat: '100% confidential service'
    },
    {
      icon: Award,
      title: 'Premium Marketing',
      description: 'Professional photography, drone footage, virtual tours, and luxury lifestyle marketing campaigns.',
      stat: '€0 marketing costs to you'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Personal agent assignment with multilingual support and 24/7 availability for urgent matters.',
      stat: '24/7 support available'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Sellers Choose Lion Capital
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our proven track record, innovative marketing strategies, and commitment to excellence 
            make us the preferred choice for luxury property sales in Mallorca.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {reason.description}
                </p>
                
                <div className="bg-primary/5 rounded-lg p-3">
                  <div className="text-primary font-semibold text-sm">
                    {reason.stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className="mt-16">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Lion Capital vs Traditional Agents
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">Service</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">Lion Capital</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-600">Traditional Agents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-4 text-gray-900">Professional Photography</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ Included</td>
                    <td className="py-4 px-4 text-center text-gray-400">Often extra cost</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900">Drone Footage</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ Included</td>
                    <td className="py-4 px-4 text-center text-gray-400">Rarely offered</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900">Virtual 3D Tours</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ Included</td>
                    <td className="py-4 px-4 text-center text-gray-400">Additional fee</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900">International Marketing</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ 15+ Countries</td>
                    <td className="py-4 px-4 text-center text-gray-400">Limited reach</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900">Response Time</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ Within 2 hours</td>
                    <td className="py-4 px-4 text-center text-gray-400">1-3 business days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900">Multilingual Support</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">✓ EN/DE/ES</td>
                    <td className="py-4 px-4 text-center text-gray-400">Usually limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
