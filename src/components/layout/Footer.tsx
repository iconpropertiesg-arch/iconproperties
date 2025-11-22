'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, ArrowRight } from 'lucide-react';
import RequestPrivatePortfolioModal from './RequestPrivatePortfolioModal';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
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
      <footer className="bg-gradient-to-br from-black via-blue-950 to-blue-900 text-white">
        <div className="container mx-auto px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href={`/${locale}`} className="inline-block mb-6">
                <Image
                  src="/images/logo3.png"
                  alt="ICON PROPERTIES"
                  width={200}
                  height={67}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Private real estate advisory for discerning buyers and property owners in Mallorca.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Explore</h4>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href={`/${locale}/properties`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/sell`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Sell With Us
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/about`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/properties`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Areas We Serve
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/about`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/contact`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:info@iconproperties.es"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    info@iconproperties.es
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+34XXXXXXXXX"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    +34 XXX XXX XXX
                  </a>
                </li>
                <li>
                  <div className="text-gray-300 text-sm flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Mallorca, Spain — Private Office. By Appointment Only.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Get Started</h4>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 mb-6"
              >
                <span>Request Private Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-gray-400 text-xs">
                Access exclusive off-market listings and private sales opportunities.
              </p>
            </div>
          </div>

          {/* Email Collection Bar */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <h5 className="text-white font-semibold mb-1">Stay Private. Receive Off-Market Listings First.</h5>
                <p className="text-gray-400 text-xs">Only sent occasionally. No public listings.</p>
              </div>
              {isSubmitted ? (
                <div className="text-green-400 text-sm font-medium">
                  Thank you! Check your email.
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <span className="hidden md:inline">Subscribe</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Legal & Copyright */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {currentYear} ICON PROPERTIES. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link 
                  href={`/${locale}/legal/privacy`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link 
                  href={`/${locale}/legal/notice`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Legal Notice
                </Link>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
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
