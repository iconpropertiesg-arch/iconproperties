'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, Calendar, Heart, Share2, User } from 'lucide-react';
import { generateWhatsAppURL, generateEmailURL, validateEmail, validatePhone } from '@/lib/utils';
import { Property, ContactForm } from '@/types';

interface PropertyAgentProps {
  property: Property;
  locale: string;
}

export default function PropertyAgent({ property, locale }: PropertyAgentProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in the property "${property.title}" (Ref: ${property.referenceId}). Please contact me with more information.`,
    propertyId: property.id,
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = useTranslations();
  const agent = property.agent;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement contact form API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setShowContactForm(false);
      }
    } catch (error) {
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickContact = (method: 'phone' | 'email' | 'whatsapp') => {
    switch (method) {
      case 'phone':
        window.open(`tel:${agent.phone}`);
        break;
      case 'email':
        const emailURL = generateEmailURL(
          agent.email,
          `Inquiry about ${property.title}`,
          `I am interested in the property "${property.title}" (Ref: ${property.referenceId}). Please contact me with more information.`
        );
        window.open(emailURL);
        break;
      case 'whatsapp':
        const whatsappURL = generateWhatsAppURL(
          agent.whatsapp,
          `Hi! I'm interested in the property "${property.title}" (Ref: ${property.referenceId}). Could you provide more information?`
        );
        window.open(whatsappURL, '_blank');
        break;
    }
  };

  const handleSaveProperty = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save property functionality
  };

  const handleShareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Card */}
      <div className="bg-black rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="text-center text-white mb-6">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image
              src={agent.avatar}
              alt={agent.name}
              fill
              className="object-cover rounded-full"
              sizes="80px"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-1">{agent.name}</h3>
          <p className="text-white">Licensed Real Estate Agent</p>
          <div className="flex justify-center space-x-2 mt-2">
            {agent.languages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {lang.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => handleQuickContact('phone')}
            className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 p-3 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Call</span>
          </button>
          <button
            onClick={() => handleQuickContact('email')}
            className="flex items-center justify-center space-x-2 bg-gray-50 text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Email</span>
          </button>
          <button
            onClick={() => handleQuickContact('whatsapp')}
            className="flex items-center justify-center space-x-2 bg-green-50 text-green-700 p-3 rounded-lg hover:bg-green-100 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">WhatsApp</span>
          </button>
        </div>

        {/* Primary CTAs */}
        <div className="space-y-3">
          <button
            onClick={() => setShowContactForm(true)}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('common.requestDetails')}
          </button>
          <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            {t('common.scheduleViewing')}
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleSaveProperty}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-colors ${
              isSaved
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>
          <button
            onClick={handleShareProperty}
            className="flex items-center justify-center space-x-2 bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Contact Agent</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">{t('common.success')}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('common.name')} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('common.email')} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('common.phone')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('common.message')} *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                        className="mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        {t('common.consent')}
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? t('common.loading') : t('common.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
