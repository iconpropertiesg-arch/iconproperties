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
    <div className="space-y-6">
      {/* Contact Methods */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
        <div className="space-y-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.href}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-900/30 border border-gray-700 hover:border-blue-500 hover:bg-gray-900/50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{method.label}</h4>
                  <p className="text-blue-400 font-medium mb-1">{method.value}</p>
                  <p className="text-sm text-gray-400">{method.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Office Information */}
      <div className="pt-6 border-t border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-6">Office Hours</h3>
        <div className="space-y-6">
          {officeInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{info.label}</h4>
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm">{info.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-lg font-semibold text-white mb-3">Need Immediate Assistance?</h3>
        <p className="text-gray-300 text-sm mb-4">
          For urgent inquiries or same-day viewings
        </p>
        <div className="space-y-2">
          <a
            href="tel:+34123456789"
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 font-medium transition-colors text-white shadow-lg hover:shadow-blue-600/50"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </a>
          <a
            href="https://wa.me/34123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 px-4 font-medium transition-colors text-white shadow-lg hover:shadow-green-600/50"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h4 className="font-semibold text-green-300 text-sm">Quick Response</h4>
            <p className="text-green-400/80 text-xs">
              Reply within 1 business day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
