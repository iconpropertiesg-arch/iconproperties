'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { validateEmail } from '@/lib/utils';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email) || !consent) return;
    
    setIsSubmitting(true);
    
    try {
      // TODO: Implement newsletter signup API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setEmail('');
      setConsent(false);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h3 className="text-xl font-bold">{t('company')}</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Luxury real estate in Mallorca. Discretion, speed, and white-glove service.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{t('address')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+34123456789" className="hover:text-white transition-colors">
                  +34 123 456 789
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@lioncapitala.com" className="hover:text-white transition-colors">
                  info@lioncapitala.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/${locale}/about`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/properties`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/sell`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sell with Us
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/contact`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/areas`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('social')}</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('newsletter.title')}</h4>
            {isSubmitted ? (
              <div className="p-4 bg-green-800 rounded-md">
                <p className="text-sm">Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                />
                <label className="flex items-start space-x-2 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-primary bg-gray-800 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    required
                  />
                  <span>
                    I agree to receive marketing communications and understand I can unsubscribe at any time.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!validateEmail(email) || !consent || isSubmitting}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap space-x-6 text-sm text-gray-300">
              <Link 
                href={`/${locale}/legal/privacy`}
                className="hover:text-white transition-colors"
              >
                {t('legal.privacy')}
              </Link>
              <Link 
                href={`/${locale}/legal/terms`}
                className="hover:text-white transition-colors"
              >
                {t('legal.terms')}
              </Link>
              <Link 
                href={`/${locale}/legal/impressum`}
                className="hover:text-white transition-colors"
              >
                {t('legal.impressum')}
              </Link>
            </div>
            <p className="text-sm text-gray-300">
              © {currentYear} {t('company')}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
