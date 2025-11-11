'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';

interface ContactInfoProps {
  locale: string;
}

export default function ContactInfo({ locale }: ContactInfoProps) {
  const t = useTranslations('contact');

  const contactMethods = [
    {
      icon: Phone,
      label: t('info.phone'),
      value: '+34 123 456 789',
      href: 'tel:+34123456789',
      description: 'Call us directly'
    },
    {
      icon: Mail,
      label: t('info.email'),
      value: 'info@lioncapitala.com',
      href: 'mailto:info@lioncapitala.com',
      description: 'Send us an email'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+34 123 456 789',
      href: 'https://wa.me/34123456789',
      description: 'Chat with us on WhatsApp'
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      label: t('info.address'),
      value: 'Calle Marina, 15\n07181 Portals Nous\nMallorca, Spain'
    },
    {
      icon: Clock,
      label: t('info.hours'),
      value: 'Monday - Friday: 9:00 AM - 7:00 PM\nSaturday: 10:00 AM - 6:00 PM\nSunday: By appointment'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{method.label}</h4>
                  <p className="text-primary font-medium mb-1">{method.value}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Office Information */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Office Information</h3>
        <div className="space-y-6">
          {officeInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{info.label}</h4>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-primary rounded-2xl p-8 text-white">
        <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
        <p className="text-white/90 mb-6">
          For urgent inquiries or to schedule a same-day viewing, contact us directly.
        </p>
        <div className="space-y-3">
          <a
            href="tel:+34123456789"
            className="flex items-center justify-center w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-3 px-4 font-medium transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now: +34 123 456 789
          </a>
          <a
            href="https://wa.me/34123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-3 px-4 font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Appointment Booking */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule a Meeting</h3>
          <p className="text-gray-600 mb-6">
            Book a consultation to discuss your property needs in detail.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Book Appointment
          </button>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-green-900">Quick Response Guarantee</h4>
            <p className="text-green-700 text-sm">
              We respond to all inquiries within 1 business day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
