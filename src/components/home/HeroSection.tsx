'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  // Line-by-line reveal states
  const [titleLinesVisible, setTitleLinesVisible] = useState<number[]>([]);
  const [subtitleLinesVisible, setSubtitleLinesVisible] = useState<number[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Logo images array
  const logos = [
    '/images/logos/Black Beige Bold Framed Typography Planet Brand Business Logo.png',
    '/images/logos/Black White Minimal Design Studio Logo (3).png',
    '/images/logos/Black White Minimal Design Studio Logo (4).png',
    // 'Green and White Simple Technology Logo (3).png',
    // '/images/logos/Green and White Simple Technology Logo (1).png',
    // '/images/logos/Green and White Simple Technology Logo (2).png',
    // '/images/logos/Green and White Simple Technology Logo (3).png',
    // '/images/logos/Green and White Simple Technology Logo.png',
  ];

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

  // Line-by-line reveal effect for title and subtitle
  useEffect(() => {
    const titleText = t('title');
    const subtitleText = t('subtitle');
    
    // Split title into lines (handling \n)
    const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    // Split subtitle into lines
    const subtitleLines = subtitleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // If no explicit line breaks, treat as single line
    const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
    const finalSubtitleLines = subtitleLines.length > 0 ? subtitleLines : [subtitleText.trim()];
    
    // Reveal title lines one by one - slower and smoother
    finalTitleLines.forEach((_, index) => {
      setTimeout(() => {
        setTitleLinesVisible(prev => [...prev, index]);
      }, 600 + (index * 500)); // 600ms initial delay, 500ms between lines
    });
    
    // Reveal subtitle lines after title (with additional delay)
    const subtitleStartDelay = 600 + (finalTitleLines.length * 500) + 400;
    finalSubtitleLines.forEach((_, index) => {
      setTimeout(() => {
        setSubtitleLinesVisible(prev => [...prev, index]);
      }, subtitleStartDelay + (index * 500));
    });
  }, [t]);

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
      className="relative min-h-screen sm:min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Base background gradient - Dark blue to black gradient */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle purple/blue glowing effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] bg-purple-500/15 rounded-full blur-[70px] sm:blur-[90px] md:blur-[100px] animate-pulse-slow animation-delay-2000" />
      </div>

      {/* Cobalt Blue Gradient Element - Top Left Corner */}
      <div 
        className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none z-5 animate-cobalt-glow-pulse hidden sm:block"
        style={{
          background: 'radial-gradient(circle, rgba(19, 56, 190, 0.8) 0%, rgba(19, 56, 190, 0.6) 30%, rgba(19, 56, 190, 0.4) 50%, rgba(19, 56, 190, 0.2) 70%, transparent 100%)',
          boxShadow: '0 0 100px rgba(19, 56, 190, 0.5), 0 0 150px rgba(19, 56, 190, 0.3)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Animated Cobalt Blue Gradient Element - Curved path from top-right to bottom-left corner */}
      <div 
        className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none z-5 animate-cobalt-path hidden sm:block"
        style={{
          background: 'radial-gradient(circle, rgba(19, 56, 190, 0.8) 0%, rgba(19, 56, 190, 0.6) 30%, rgba(19, 56, 190, 0.4) 50%, rgba(19, 56, 190, 0.2) 70%, transparent 100%)',
          boxShadow: '0 0 100px rgba(19, 56, 190, 0.5), 0 0 150px rgba(19, 56, 190, 0.3)',
        }}
      />

      {/* Custom cursor dot */}
      {isMouseInSection && (
        <div 
          className="custom-cursor-dot hidden md:block"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Content - Two Column Layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-6 sm:space-y-8">
            {/* New Badge Banner */}
            <div className="relative inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 mt-8 md:mt-12 py-3 backdrop-blur-sm rounded-lg border border-gray-600/30">
              {/* Small white dot */}
              <div className="absolute -top-1 -left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"></div>
              
              {/* Blue NEW badge */}
              <div className="px-2 sm:px-3 py-0.5 sm:py-1  bg-blue-700 rounded-md">
                <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide">NEW</span>
              </div>
              
              {/* Main text */}
              <span className="text-xs sm:text-sm font-medium text-white">Mallorca's Leading Off-Market Brokerage</span>
            </div>

            {/* Hero Text */}
            <div className="space-y-4 sm:space-y-6">
              <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight sm:leading-tight">
                {(() => {
                  const titleText = t('title');
                  const titleLines = titleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                  const finalTitleLines = titleLines.length > 0 ? titleLines : [titleText.trim()];
                  
                  return finalTitleLines.map((line, index) => {
                    const isVisible = titleLinesVisible.includes(index);
                    return (
                      <span
                        key={index}
                        className={cn(
                          "block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        )}
                      >
                        {line}
                      </span>
                    );
                  });
                })()}
              </h1>
              <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90 text-gray-200 max-w-xl">
                {(() => {
                  const subtitleText = t('subtitle');
                  const subtitleLines = subtitleText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                  const finalSubtitleLines = subtitleLines.length > 0 ? subtitleLines : [subtitleText.trim()];
                  
                  return finalSubtitleLines.map((line, index) => {
                    const isVisible = subtitleLinesVisible.includes(index);
                    return (
                      <span
                        key={index}
                        className={cn(
                          "block transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        )}
                      >
                        {line}
                      </span>
                    );
                  });
                })()}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <button 
                onClick={() => router.push(`/${locale}/contact`)}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  {t('cta')}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Logo Carousel Section */}
            <div className="pt-6 sm:pt-8 w-full max-w-[600px] overflow-hidden relative">
              <div className="flex animate-logo-scroll items-center" style={{ width: 'fit-content' }}>
                {/* First set of logos */}
                {logos.map((logoPath, index) => (
                  <div key={`logo-${index}`} className="relative h-8 sm:h-10 md:h-12 w-24 sm:w-28 md:w-32 mx-4 sm:mx-6 flex-shrink-0 opacity-100">
                    <Image
                      src={logoPath}
                      alt={`Logo ${index + 1}`}
                      fill
                      className="object-contain"
                      unoptimized
                      onError={(e) => {
                        // Fallback: try encoded path if original fails
                        const pathParts = logoPath.split('/');
                        const filename = pathParts.pop();
                        const encodedPath = [...pathParts, encodeURIComponent(filename || '')].join('/');
                        if (e.currentTarget.src !== encodedPath) {
                          e.currentTarget.src = encodedPath;
                        } else {
                          console.error(`Failed to load logo ${index + 1}:`, logoPath);
                        }
                      }}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {logos.map((logoPath, index) => (
                  <div key={`logo-duplicate-${index}`} className="relative h-8 sm:h-10 md:h-12 w-24 sm:w-28 md:w-32 mx-4 sm:mx-6 flex-shrink-0 opacity-100">
                    <Image
                      src={logoPath}
                      alt={`Logo ${index + 1}`}
                      fill
                      className="object-contain"
                      unoptimized
                      onError={(e) => {
                        // Fallback: try encoded path if original fails
                        const pathParts = logoPath.split('/');
                        const filename = pathParts.pop();
                        const encodedPath = [...pathParts, encodeURIComponent(filename || '')].join('/');
                        if (e.currentTarget.src !== encodedPath) {
                          e.currentTarget.src = encodedPath;
                        } else {
                          console.error(`Failed to load logo ${index + 1}:`, logoPath);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-xl sm:rounded-2xl overflow-visible shadow-2xl bg-gradient-to-br from-gray-900/20 to-black/20 backdrop-blur-sm h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
              {/* Top Left Corner - Three Lines Forming Corner Bracket */}
              <div className="absolute -top-0.5 -left-0.5 z-20">
                {/* First line - horizontal extending left (outer, longest) */}
                <div className="absolute w-32 h-[2px] bg-white/30 -left-8 top-0"></div>
                {/* Second line - vertical extending up (outer, longest) */}
                <div className="absolute h-32 w-[2px] bg-white/30 -top-8 left-0"></div>
                {/* Third line - diagonal from corner (shorter) */}
                <div className="absolute w-10 h-[2px] bg-white/25 -left-5 -top-5 rotate-45 origin-left"></div>
              </div>

              {/* Video Container with overflow hidden */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
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
                    src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "https://7bagyx1my6xy2qz4.public.blob.vercel-storage.com/video_hero_banner.mp4"}
                    type="video/mp4" 
                  />
                </video>
                
                {/* Lines Over Video - Full Length */}
                {/* Center horizontal line - spans full width */}
                {/* <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/30 z-10"></div> */}
                {/* Top border line - spans full width */}
                <div className="absolute left-0 right-0 top-0 h-[1px] bg-white/30 z-10"></div>
                {/* Left border line - spans full height */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/30 z-10"></div>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-30">
                <button
                  onClick={toggleVideo}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
                  aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>

              {/* Gradient overlay for better video appearance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}