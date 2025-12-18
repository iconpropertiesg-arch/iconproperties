'use client';

import { useState } from 'react';
import { Download, CheckCircle, Shield } from 'lucide-react';
import { validateEmail } from '@/lib/utils';

interface DownloadFormProps {
  locale: string;
}

export default function DownloadForm({ locale }: DownloadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interestedIn: 'buying',
    country: ''
  });

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.interestedIn) {
      newErrors.interestedIn = 'Please select an option';
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
      // TODO: Implement guide download API
      const response = await fetch('/api/guide-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`,
          locale,
          source: 'guide_page',
          tags: ['lead_magnet', 'top_of_funnel', 'guide_download']
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Trigger Meta Pixel events
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Guide Download'
          });
          (window as any).fbq('track', 'DownloadGuide', {
            content_name: 'Mallorca Property Buyer Guide'
          });
        }

        // Auto-redirect to thank you page after 2 seconds
        setTimeout(() => {
          window.location.href = `/${locale}/guide/thank-you`;
        }, 2000);
      } else {
        throw new Error('Failed to submit download request');
      }
    } catch (error) {
      console.error('Download form error:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="download-form" className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Success! Your Guide is Ready</h3>
            <p className="text-gray-300 mb-6">
              Redirecting you to the download page...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="download-form" className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 py-20 px-4">
      {/* Subtle glowing effects overlay */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Download Your Free Mallorca Property Guide
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Enter your details to receive immediate access.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-400' : 'border-white/20'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Interested In */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Interested In? *
              </label>
              <select
                value={formData.interestedIn}
                onChange={(e) => handleInputChange('interestedIn', e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.interestedIn ? 'border-red-400' : 'border-white/20'
                }`}
              >
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
                <option value="researching">Just Researching</option>
              </select>
              {errors.interestedIn && <p className="mt-1 text-sm text-red-400">{errors.interestedIn}</p>}
            </div>

            {/* Country (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country (optional)
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Germany, UK, Switzerland"
              />
            </div>

            {/* Secure Badge */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Your information is secure and confidential</span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Guide</span>
                  </>
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}





