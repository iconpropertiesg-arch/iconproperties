'use client';

import { Check, Home, Compass, Briefcase, FileCode, Bell } from 'lucide-react';

export default function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-4 py-16">
      {/* Sell your Home Privately Card */}
      <div className="relative rounded-2xl p-6 border border-white/12 shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(50, 80, 200, 0.4), transparent 60%), radial-gradient(circle at bottom right, rgba(0, 150, 255, 0.3), transparent 70%), linear-gradient(135deg, #0b0f29, #0a0f25)',
          backgroundBlendMode: 'screen, color-dodge, normal',
          boxShadow: 'inset 0 0 35px rgba(255,255,255,0.04), 0 0 60px rgba(0, 90, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: 'white'
        }}>
        {/* Glowing gradient overlay */}
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 40%, rgba(255,255,255,0.07) 65%, transparent 100%)'
        }}></div>
        {/* Top Left Icon - House Outline */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center border border-white/10 z-20">
          <Home className="w-6 h-6 text-white stroke-2" />
        </div>
        
        {/* Top Right Small Icon - Colorful House */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-100/20 rounded-lg flex items-center justify-center border border-white/10 z-20">
          <Home className="w-5 h-5 text-orange-400 fill-orange-400" />
        </div>

        <div className="relative z-10 mt-16">
          <h3 className="text-2xl font-bold text-white mb-3">Sell your Home Privately</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Off-market strategies for maximum value and full discretion
          </p>

          {/* Tags */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <span className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
              <span className="font-semibold">Free</span> / Evaluation
            </span>
            <span className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
              <span className="font-semibold">3 Months</span> Avg. Sale
            </span>
          </div>

          {/* Features List */}
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>No ads, no signs</span>
            </li>
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Strategic Pricing & Presentation</span>
            </li>
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Direct access to pre-vetted, high intent buyers</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Investment Opportunities Card */}
      <div className="relative rounded-2xl p-6 border border-white/12 shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(50, 80, 200, 0.4), transparent 60%), radial-gradient(circle at bottom right, rgba(0, 150, 255, 0.3), transparent 70%), linear-gradient(135deg, #0b0f29, #0a0f25)',
          backgroundBlendMode: 'screen, color-dodge, normal',
          boxShadow: 'inset 0 0 35px rgba(255,255,255,0.04), 0 0 60px rgba(0, 90, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: 'white'
        }}>
        {/* Glowing gradient overlay */}
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 40%, rgba(255,255,255,0.07) 65%, transparent 100%)'
        }}></div>
        {/* Top Left Icon - Compass */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-gray-700/20 rounded-lg flex items-center justify-center border border-gray-400/30 z-20">
          <Compass className="w-6 h-6 text-gray-400" />
        </div>
        
        {/* Top Right Small Icon - Briefcase/Stack */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-700/20 rounded-lg flex items-center justify-center border border-gray-400/30 z-20">
          <Briefcase className="w-5 h-5 text-gray-400" />
        </div>

        <div className="relative z-10 mt-16">
          <h3 className="text-2xl font-bold text-white mb-3">Investment Opportunities</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            Looking for a smart place to grow your capital? From land development to renovation flips and rental income properties, we connect investors with deals that make sense — on and off the market.
          </p>

          {/* Tags */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <span className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
              Deal Sourcing / On & Off Market
            </span>
            <span className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
              ≈9% ROI
            </span>
          </div>

          {/* Features List */}
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>ROI Analysis & Projection</span>
            </li>
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Introduction to architects, lawyers, builders... our network</span>
            </li>
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Exit Strategies & resale advice</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Property Management & Concierge Card */}
      <div className="relative rounded-2xl p-6 border border-white/12 shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(50, 80, 200, 0.4), transparent 60%), radial-gradient(circle at bottom right, rgba(0, 150, 255, 0.3), transparent 70%), linear-gradient(135deg, #0b0f29, #0a0f25)',
          backgroundBlendMode: 'screen, color-dodge, normal',
          boxShadow: 'inset 0 0 35px rgba(255,255,255,0.04), 0 0 60px rgba(0, 90, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: 'white'
        }}>
        {/* Glowing gradient overlay */}
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 40%, rgba(255,255,255,0.07) 65%, transparent 100%)'
        }}></div>
        {/* Top Left Icon - Document with Code brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-400/30 z-20">
          <FileCode className="w-6 h-6 text-gray-400" />
        </div>
        
        {/* Top Right Small Icon - Bell (Golden/Orange) */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-400/30 z-20">
          <Bell className="w-5 h-5 text-orange-400" />
        </div>

        <div className="relative z-10 mt-16">
          <h3 className="text-2xl font-bold text-white mb-3">Property Management & Concierge</h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            For owners who live abroad or want peace of mind, our management team ensures your property is always in top condition — and your guests or tenants are cared for.
          </p>

          {/* Tags */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <span className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
              +45 / Project
            </span>
            <span className="px-3 py-1.5 bg-slate-800/60 text-white text-xs rounded-lg border border-white/10">
              <span className="font-semibold">Tax & legal</span> handling
            </span>
          </div>

          {/* Features List */}
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Maintenance, repairs & security checks</span>
            </li>
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Rental management & short-term permits</span>
            </li>
            <li className="flex items-center gap-3 text-white text-sm">
              <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span>Interior styling & staging</span>
            </li>
          </ul>

          {/* CTA Button */}
          <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

