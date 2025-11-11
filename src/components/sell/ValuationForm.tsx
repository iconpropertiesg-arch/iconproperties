'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { validateEmail, validatePhone } from '@/lib/utils';
import { ValuationForm as ValuationFormType } from '@/types';

interface ValuationFormProps {
  locale: string;
}

export default function ValuationForm({ locale }: ValuationFormProps) {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<ValuationFormType>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyLocation: '',
    propertyType: '',
    estimatedPrice: 0,
    contactMethod: 'email',
    consent: false,
  });

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

    if (!formData.propertyLocation.trim()) {
      newErrors.propertyLocation = 'Property location is required';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
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
      // TODO: Implement valuation form API
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
          source: 'sell_page'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit valuation request');
      }
    } catch (error) {
      console.error('Valuation form error:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ValuationFormType, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="valuation-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valuation Request Received!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in our valuation service. Our team will analyze your property 
                and provide a comprehensive valuation report within 24 hours.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What happens next:</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-gray-600">Our team reviews your property details</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-600">We conduct a comparative market analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-600">You receive a detailed valuation report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="valuation-form" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Property Valuation
            </h2>
            <p className="text-lg text-gray-600">
              Receive a comprehensive, professional valuation of your property within 24 hours. 
              No obligations, completely confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('common.name')} *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('common.email')} *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('sell.form.location')} *
                        </label>
                        <input
                          type="text"
                          value={formData.propertyLocation}
                          onChange={(e) => handleInputChange('propertyLocation', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary ${
                            errors.propertyLocation ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Portals Nous, Santa Ponsa..."
                        />
                        {errors.propertyLocation && <p className="mt-1 text-sm text-red-600">{errors.propertyLocation}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('sell.form.type')} *
                          </label>
                          <select
                            value={formData.propertyType}
                            onChange={(e) => handleInputChange('propertyType', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary ${
                              errors.propertyType ? 'border-red-300' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select property type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="commercial">Commercial</option>
                          </select>
                          {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('sell.form.estimatedPrice')}
                          </label>
                          <select
                            value={formData.estimatedPrice}
                            onChange={(e) => handleInputChange('estimatedPrice', parseInt(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                          >
                            <option value={0}>I'm not sure</option>
                            <option value={500000}>€300k - €500k</option>
                            <option value={1000000}>€500k - €1M</option>
                            <option value={2000000}>€1M - €2M</option>
                            <option value={5000000}>€2M - €5M</option>
                            <option value={10000000}>€5M+</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('common.phone')}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-primary focus:border-primary ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="+34 123 456 789"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('sell.form.contactMethod')}
                        </label>
                        <select
                          value={formData.contactMethod}
                          onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Tell us more about your property, timeline, or any specific requirements..."
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => handleInputChange('consent', e.target.checked)}
                        className={`mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary ${
                          errors.consent ? 'border-red-300' : ''
                        }`}
                      />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        {t('common.consent')}. View our{' '}
                        <a href={`/${locale}/legal/privacy`} className="text-primary hover:text-primary/80 underline">
                          Privacy Policy
                        </a>.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-sm text-red-600">{errors.consent}</p>}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : t('common.getValuation')}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Our valuation experts are available to assist you with any questions.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="tel:+34123456789"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Call Direct</div>
                      <div className="text-sm text-gray-600">+34 123 456 789</div>
                    </div>
                  </a>

                  <a
                    href="mailto:valuations@lioncapitala.com"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">Email Us</div>
                      <div className="text-sm text-gray-600">valuations@lioncapitala.com</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/34123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium text-gray-900">WhatsApp</div>
                      <div className="text-sm text-gray-600">Quick response</div>
                    </div>
                  </a>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Free Service</h4>
                  <p className="text-sm text-gray-600">
                    Our property valuation is completely free with no obligations. 
                    Professional, confidential, and delivered within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
