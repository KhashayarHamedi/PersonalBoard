import React from 'react';

/**
 * Very faint musical staff overlay — warm gold/sage lines at 5–12% opacity.
 * Single staff or fragmented; never overpowering text. Purely decorative.
 */
export default function SubtleStaffOverlay() {
  const lineOpacity = 0.08;
  const strokeColor = '#A7BEAE'; // sage, with opacity applied in SVG

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="staff-lines"
            width="100"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {[0, 6, 12, 18, 24].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke={strokeColor}
                strokeWidth="0.5"
                opacity={lineOpacity}
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#staff-lines)" />
      </svg>
    </div>
  );
}
