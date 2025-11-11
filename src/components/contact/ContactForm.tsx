'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle } from 'lucide-react';
import { validateEmail, validatePhone } from '@/lib/utils';
import { ContactForm as ContactFormType } from '@/types';

interface ContactFormProps {
  locale: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ContactForm({ locale, searchParams }: ContactFormProps) {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    message: '',
    reason: (searchParams.reason as 'buying' | 'selling' | 'renting') || 'buying',
    consent: false,
  });

  // Pre-fill form based on search params
  useEffect(() => {
    if (searchParams.reason) {
      setFormData(prev => ({
        ...prev,
        reason: searchParams.reason as 'buying' | 'selling' | 'renting'
      }));
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement contact form API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
          source: 'contact_page'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormType, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
          <p className="text-gray-300 mb-6">
            Your message has been sent successfully. We'll get back to you within one business day.
          </p>
          <div className="text-sm text-gray-400">
            <p>Expect a response from our team soon.</p>
            <p>In the meantime, feel free to explore our property listings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Send us a Message</h2>
        <p className="text-gray-300">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            {t('common.name')} *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            {t('common.email')} *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            {t('common.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="+34 123 456 789"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
            {t('contact.form.reason')}
          </label>
          <select
            id="reason"
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            <option value="buying">{t('contact.form.buying')}</option>
            <option value="selling">{t('contact.form.selling')}</option>
            <option value="renting">{t('contact.form.renting')}</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            {t('common.message')} *
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 ${
              errors.message ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Tell us about your requirements, budget, preferred areas, or any questions you have..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className={`mt-1 w-4 h-4 text-blue-600 bg-gray-900/50 border-gray-600 rounded focus:ring-blue-500 ${
                errors.consent ? 'border-red-500' : ''
              }`}
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              {t('common.consent')}. View our{' '}
              <a href={`/${locale}/legal/privacy`} className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </a>.
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-sm text-red-400">{errors.consent}</p>}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-300">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-600/50"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
