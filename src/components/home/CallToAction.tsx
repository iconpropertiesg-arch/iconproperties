'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, TrendingUp, Users, Clock, Star } from 'lucide-react';

interface CallToActionProps {
  locale: string;
  variant: 'hiring' | 'sell';
}

export default function CallToAction({ locale, variant }: CallToActionProps) {
  const t = useTranslations();

  if (variant === 'hiring') {
    return (
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('home.hiring.title')}
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {t('home.hiring.text')}
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-white/80" />
                  <span>High Commission Structure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-white/80" />
                  <span>Team Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-white/80" />
                  <span>Flexible Schedule</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-white/80" />
                  <span>Premium Brand</span>
                </div>
              </div>

              <Link
                href={`/${locale}/contact?reason=hiring`}
                className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors group smooth-elevation"
              >
                {t('home.hiring.cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Why Join Us?</h3>
                <ul className="space-y-4 text-white/90">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span>Work with luxury properties in premium locations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span>Access to exclusive listings and high-net-worth clients</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span>Comprehensive training and ongoing support</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span>Leading marketing tools and technologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('home.sellRent.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t('home.sellRent.text')}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">24-Hour Valuation</h4>
                  <p className="text-gray-400 text-sm">Get your property valued within one business day</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Premium Marketing</h4>
                  <p className="text-gray-400 text-sm">Professional photography, drone footage, and social media campaigns</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Qualified Buyers</h4>
                  <p className="text-gray-400 text-sm">Access to our extensive network of verified buyers</p>
                </div>
              </div>
            </div>

            <Link
              href={`/${locale}/sell`}
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors group smooth-elevation"
            >
              {t('home.sellRent.cta')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-primary mb-2">€3.2M</div>
                <div className="text-sm text-gray-400">Average Sale Price</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-primary mb-2">45</div>
                <div className="text-sm text-gray-400">Days Average to Sell</div>
              </div>
            </div>
            <div className="space-y-6 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-gray-400">Of Asking Price Achieved</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-gray-400">Successful Sales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
