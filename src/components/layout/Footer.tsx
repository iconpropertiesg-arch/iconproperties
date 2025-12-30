'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import RequestPrivatePortfolioModal from './RequestPrivatePortfolioModal';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const tNav = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // TODO: Implement email collection API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Email submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href={`/${locale}`} className="inline-block mb-4 sm:mb-6">
                <Image
                  src="/images/logo3.png"
                  alt="ICON PROPERTIES"
                  width={200}
                  height={67}
                  className="h-10 sm:h-12 w-auto"
                />
              </Link>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {tFooter('tagline')}
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                {tFooter('quickLinks')}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link 
                    href={`/${locale}/properties`}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tNav('portfolio')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/sell`}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tNav('sell')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/about`}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/properties`}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tFooter('areas')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/team`}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tNav('team')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/contact`}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                {tFooter('contact')}
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <a 
                    href="mailto:info@iconproperties.es"
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-2 break-all"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>info@iconproperties.es</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+34XXXXXXXXX"
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>+34 XXX XXX XXX</span>
                  </a>
                </li>
                <li>
                  <div className="text-gray-300 text-xs sm:text-sm flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Mallorca, Spain — Private Office. By Appointment Only.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
                {tFooter('ctaTitle')}
              </h4>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg  flex items-center justify-center gap-2 mb-4 sm:mb-6"
              >
                <span className="text-xs sm:text-sm md:text-base">
                  {tFooter('ctaButton')}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <p className="text-gray-400 text-xs leading-relaxed">
                {tFooter('ctaDescription')}
              </p>
            </div>
          </div>

          {/* Email Collection Bar */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1 w-full md:w-auto">
                <h5 className="text-white font-semibold mb-1 text-sm sm:text-base">
                  {tFooter('newsletterTitle')}
                </h5>
                <p className="text-gray-400 text-xs">
                  {tFooter('newsletterDescription')}
                </p>
              </div>
              {isSubmitted ? (
                <div className="text-green-400 text-xs sm:text-sm font-medium w-full md:w-auto text-center md:text-left">
                  Thank you! Check your email.
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={tFooter('newsletter.placeholder')}
                    className="flex-1 md:w-64 px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/50 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      tFooter('submitting')
                    ) : (
                      <>
                        <span className="hidden md:inline">
                          {tFooter('subscribe')}
                        </span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Legal & Copyright */}
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-gray-400">
                © {currentYear} ICON PROPERTIES. {tFooter('copyright')}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                <Link 
                  href={`/${locale}/legal/privacy`}
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tFooter('legal.privacy')}
                </Link>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <Link 
                  href={`/${locale}/legal/notice`}
                  className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {tFooter('legal.terms')}
                </Link>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Request Private Portfolio Modal */}
      <RequestPrivatePortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
