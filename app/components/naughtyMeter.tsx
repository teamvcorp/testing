
'use client';

import React, { useMemo } from 'react';

interface NaughtyMeterProps {
  kid: {
    niceScore: number;
  };
}

const MAX_SCORE = 365;

const NaughtyMeter: React.FC<NaughtyMeterProps> = ({ kid }) => {
  // Validate niceScore to handle edge cases
  const niceScore = Math.max(0, Math.min(kid.niceScore || 0, MAX_SCORE));
  const percentage = niceScore / MAX_SCORE;
  const angle = percentage * 180; // 0 to 180 degrees

  // Memoize SVG arc calculations to prevent unnecessary re-renders
  const arcData = useMemo(() => {
    const radius = 80;
    const center = 100;
    const start = {
      x: center - radius,
      y: center,
    };
    const end = {
      x: center + radius * Math.cos((Math.PI * angle) / 180 - Math.PI),
      y: center + radius * Math.sin((Math.PI * angle) / 180 - Math.PI),
    };
    const largeArcFlag = angle > 180 ? 1 : 0;

    return { radius, center, start, end, largeArcFlag };
  }, [angle]);

  return (
    <div className="flex flex-col items-center w-56 p-4 bg-white rounded-lg shadow-lg">
      <div className="relative w-full h-32">
        <svg
          width="200"
          height="120"
          className="mx-auto"
          role="meter"
          aria-valuenow={Math.round(percentage * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Naughty or Nice Meter"
        >
          {/* Background arc */}
          <path
            d={`
              M ${arcData.start.x} ${arcData.start.y}
              A ${arcData.radius} ${arcData.radius} 0 1 1 ${arcData.center + arcData.radius} ${arcData.center}
            `}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={18}
          />
          {/* Foreground arc with gradient */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#ef4444' }} />
              <stop offset="100%" style={{ stopColor: '#22c55e' }} />
            </linearGradient>
          </defs>
          <path
            d={`
              M ${arcData.start.x} ${arcData.start.y}
              A ${arcData.radius} ${arcData.radius} 0 ${arcData.largeArcFlag} 1 ${arcData.end.x} ${arcData.end.y}
            `}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={18}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
          {/* Needle with animation */}
          <line
            x1={arcData.center}
            y1={arcData.center}
            x2={arcData.center + arcData.radius * Math.cos((Math.PI * angle) / 180 - Math.PI)}
            y2={arcData.center + arcData.radius * Math.sin((Math.PI * angle) / 180 - Math.PI)}
            stroke="#dc2626"
            strokeWidth={4}
            className="transition-transform duration-500 ease-in-out"
          />
          {/* Center circle with gradient */}
          <defs>
            <radialGradient id="centerGradient">
              <stop offset="0%" style={{ stopColor: '#ffffff' }} />
              <stop offset="100%" style={{ stopColor: '#d1d5db' }} />
            </radialGradient>
          </defs>
          <circle
            cx={arcData.center}
            cy={arcData.center}
            r={8}
            fill="url(#centerGradient)"
            stroke="#6b7280"
            strokeWidth={2}
          />
        </svg>
        {/* Naughty and Nice labels */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-red-500 font-semibold text-sm">
          Naughty
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-green-500 font-semibold text-sm">
          Nice
        </div>
      </div>
      <div className="mt-2 text-lg font-bold text-gray-800 drop-shadow-sm">
        {Math.round(percentage * 100)}% Nice
      </div>
      <div className="text-sm text-gray-500">
        Score: {niceScore} / {MAX_SCORE}
      </div>
    </div>
  );
};

export default NaughtyMeter;
