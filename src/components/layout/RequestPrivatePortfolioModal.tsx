'use client';

import { useState } from 'react';
import { X, Mail, Phone, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { validateEmail, validatePhone } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface RequestPrivatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function RequestPrivatePortfolioModal({
  isOpen,
  onClose,
  locale
}: RequestPrivatePortfolioModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    buyerOrSeller: '',
    budget: '',
    preferredAreas: '',
    typeOfHome: '',
    timeline: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

    if (!formData.buyerOrSeller) {
      newErrors.buyerOrSeller = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/portfolio-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit portfolio request');
      }

      // Check for warnings (like database errors)
      if (data.warnings && data.warnings.length > 0) {
        console.warn('⚠️ Submission completed with warnings:', data.warnings);
        
        // Show database errors prominently
        const dbWarning = data.warnings.find((w: string) => w.includes('Database'));
        if (dbWarning) {
          console.error('❌ DATABASE ERROR:', dbWarning);
          console.error('💡 Solution: Update SUPABASE_SERVICE_ROLE_KEY in .env.local and restart server');
          // Still show success to user since emails were sent, but log the issue
        }
      }

      // Log success
      if (data.id) {
        console.log('✅ Portfolio request saved successfully to database with ID:', data.id);
      } else {
        console.error('❌ WARNING: Portfolio request submitted but NOT saved to database!');
        console.error('💡 Check your server terminal for database connection errors.');
        console.error('💡 Make sure SUPABASE_SERVICE_ROLE_KEY is set in .env.local');
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Form submission error:', error);
      setErrors({ 
        submit: error.message || 'Failed to submit request. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form after a delay to allow modal close animation
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          buyerOrSeller: '',
          budget: '',
          preferredAreas: '',
          typeOfHome: '',
          timeline: ''
        });
        setErrors({});
        setIsSubmitted(false);
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-black via-blue-950 to-blue-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {isSubmitted ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
            <p className="text-gray-300 mb-8">
              We've received your request. Our team will contact you shortly to discuss your private portfolio needs.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-white mb-2">Request Private Portfolio</h2>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you with exclusive listings.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all",
                      errors.name && "border-red-400"
                    )}
                    placeholder="Jane"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    How can we reach you? <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all",
                      errors.email && "border-red-400"
                    )}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all",
                      errors.phone && "border-red-400"
                    )}
                    placeholder="+34 XXX XXX XXX"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Buyer or Seller */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Buyer or Seller? <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="buyerOrSeller"
                      value={formData.buyerOrSeller}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer pr-10",
                        errors.buyerOrSeller && "border-red-400"
                      )}
                    >
                      <option value="">Select an option...</option>
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                      <option value="both">Both</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.buyerOrSeller && <p className="text-red-400 text-xs mt-1">{errors.buyerOrSeller}</p>}
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="e.g., €500,000 - €1,000,000"
                  />
                </div>

                {/* Preferred Areas */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Preferred Areas
                  </label>
                  <input
                    type="text"
                    name="preferredAreas"
                    value={formData.preferredAreas}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="e.g., Portals Nous, Palma, Son Vida"
                  />
                </div>

                {/* Type of Home */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Type of Home
                  </label>
                  <div className="relative">
                    <select
                      name="typeOfHome"
                      value={formData.typeOfHome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="">Select type...</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="commercial">Commercial</option>
                      <option value="any">Any</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Timeline
                  </label>
                  <div className="relative">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="">Select timeline...</option>
                      <option value="immediate">Immediate</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Error Message */}
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <span>Submit Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Contact Info */}
            <div className="bg-white/5 backdrop-blur-sm p-8 lg:p-12 border-l border-white/10">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Email Card */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">Email</span>
                      <span className="px-2 py-0.5 bg-blue-600 rounded-full text-xs text-white font-medium">24/7</span>
                    </div>
                  </div>
                  <a 
                    href="mailto:info@iconproperties.es"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    info@iconproperties.es
                  </a>
                </div>

                {/* Phone Card */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white font-semibold">Phone</span>
                  </div>
                  <a 
                    href="tel:+34XXXXXXXXX"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    +34 XXX XXX XXX
                  </a>
                </div>

                {/* Address Card */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">Address</span>
                      <span className="px-2 py-0.5 bg-blue-600 rounded-full text-xs text-white font-medium">REMOTE</span>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>Mallorca, Spain</p>
                    <p>Private Office</p>
                    <p>By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

