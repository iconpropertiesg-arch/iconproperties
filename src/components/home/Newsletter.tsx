'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Check } from 'lucide-react';
import { validateEmail } from '@/lib/utils';

interface NewsletterProps {
  locale: string;
}

export default function Newsletter({ locale }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!consent) {
      setError('Please agree to receive marketing communications');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement newsletter signup API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, locale }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setConsent(false);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Thank you for subscribing!
            </h2>
            <p className="text-xl text-white/90">
              You'll receive our exclusive property insights and market updates directly in your inbox.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-xl text-white/90 mb-12">
            {t('home.newsletter.text')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-white focus:outline-none backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {isSubmitting ? 'Subscribing...' : t('home.newsletter.cta')}
              </button>
            </div>

            <div className="max-w-md mx-auto">
              <label className="flex items-start space-x-3 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white focus:ring-2"
                  required
                />
                <span className="text-sm text-white/80 leading-relaxed">
                  I agree to receive marketing communications from Lion Capital Real Estate. 
                  I understand I can unsubscribe at any time. View our{' '}
                  <a 
                    href={`/${locale}/legal/privacy`} 
                    className="underline hover:text-white"
                  >
                    Privacy Policy
                  </a>.
                </span>
              </label>
            </div>

            {error && (
              <div className="text-red-200 text-sm max-w-md mx-auto">
                {error}
              </div>
            )}
          </form>

          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm">
              Join 2,500+ property investors and homeowners who trust our market insights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
