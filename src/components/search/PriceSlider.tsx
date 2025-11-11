'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';

interface PriceSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  locale: string;
}

export default function PriceSlider({ min, max, onChange, locale }: PriceSliderProps) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minLimit = 0;
  const maxLimit = 5000000;

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, [min, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 50000);
    setMinValue(value);
    onChange(value, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 50000);
    setMaxValue(value);
    onChange(minValue, value);
  };

  const getMinPercent = () => ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
  const getMaxPercent = () => ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div className="px-2">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/80">Price Range</span>
          <span className="text-sm text-white font-medium">
            {formatPrice(minValue, locale)} - {formatPrice(maxValue, locale)}
          </span>
        </div>
        
        <div className="relative">
          {/* Track */}
          <div className="h-2 bg-white/20 rounded-full relative">
            {/* Active track */}
            <div
              className="absolute h-2 bg-primary rounded-full"
              style={{
                left: `${getMinPercent()}%`,
                width: `${getMaxPercent() - getMinPercent()}%`,
              }}
            />
          </div>

          {/* Min Range Input */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            step={25000}
            value={minValue}
            onChange={handleMinChange}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 1 }}
          />

          {/* Max Range Input */}
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            step={25000}
            value={maxValue}
            onChange={handleMaxChange}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 2 }}
          />
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: 'Up to 500k', max: 500000 },
          { label: 'Up to 1M', max: 1000000 },
          { label: 'Up to 2M', max: 2000000 },
          { label: 'No limit', max: 5000000 },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onChange(0, preset.max)}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-xs text-white transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
