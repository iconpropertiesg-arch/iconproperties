'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Pause } from 'lucide-react';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const router = useRouter();
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInSection, setIsMouseInSection] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setMousePosition({ x: e.clientX, y: e.clientY });
          setIsMouseInSection(true);
        } else {
          setIsMouseInSection(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsMouseInSection(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Base background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-blue-900" />

      {/* Custom cursor dot */}
      {isMouseInSection && (
        <div 
          className="custom-cursor-dot"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Content - Two Column Layout */}
      <div className="relative z-10 container mx-auto px-4 py-20 ml-16 mr-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            {/* New Badge Banner */}
            <div className="relative inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-lg border border-gray-600/30">
              {/* Small white dot */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
              
              {/* Blue NEW badge */}
              <div className="px-3 py-1 bg-blue-600 rounded-md">
                <span className="text-xs font-bold text-white uppercase tracking-wide">NEW</span>
              </div>
              
              {/* Main text */}
              <span className="text-sm font-medium text-white">Mallorca's Leading Off-Market Brokerage</span>
            </div>

            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-90 text-gray-200 max-w-xl">
                {t('subtitle')}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={() => router.push(`/${locale}/contact`)}
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="flex items-center gap-2">
                  {t('cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-black/20 backdrop-blur-sm h-[500px] min-h-[500px]">
              {/* Video */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source 
                  src={
                    process.env.NODE_ENV === 'production' 
                      ? "/videos/video-hero-banner_tpzrhea8.mp4"  // Compressed for Vercel (5.49MB)
                      : "/videos/video_hero_banner.mp4"            // Original for localhost (195MB)
                  }
                  type="video/mp4" 
                />
              </video>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={toggleVideo}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                  aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>

              {/* Gradient overlay for better video appearance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}