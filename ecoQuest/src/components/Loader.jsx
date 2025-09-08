import React from 'react';


export default function ForestLoader({ size = 160 }) {
  // size controls the SVG viewport (square)
  const bg = 'bg-lime-800';
  const wrapper = `flex items-center justify-center min-h-screen ${bg} p-6`;

  return (
    <div className={wrapper}>
      <div className="flex flex-col items-center gap-6">
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Forest loader"
        >
          {/* soil / pot */}
          <g transform="translate(60,80)">
            <ellipse cx="0" cy="15" rx="30" ry="10" fill="#6A3049" opacity="0.9">
              <animate attributeName="opacity" values="0.7;0.95;0.7" dur="2.6s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* stem */}
          <g transform="translate(60,60)">
            <path d="M0 20 C-2 10 -2 -6 0 -22" stroke="#6b8a3a" strokeWidth="3" fill="none" strokeLinecap="round">
              <animate attributeName="stroke-width" values="0;3;2.5;3" dur="2.4s" repeatCount="indefinite" />
            </path>
          </g>

          {/* leaves - three leaves, staggered animation */}

          {/* left leaf */}
          <g transform="translate(52,46)">
            <path d="M0 0 C-14 -6 -20 -22 -10 -30 C-2 -24 2 -14 0 0 Z" fill="#b4e69e" transformOrigin="center">
              <animateTransform attributeName="transform" type="scale" values="0.2;1.06;0.95;1" dur="1.6s" repeatCount="indefinite" begin="0s" />
              <animate attributeName="opacity" values="0;1;0.95;1" dur="1.6s" repeatCount="indefinite" begin="0s" />
            </path>
          </g>

          {/* center leaf (bigger) */}
          <g transform="translate(60,34)">
            <path d="M0 0 C-6 -6 -12 -22 0 -36 C12 -22 6 -6 0 0 Z" fill="#b4e69e" transformOrigin="center">
              <animateTransform attributeName="transform" type="scale" values="0.15;1.08;0.98;1" dur="1.6s" repeatCount="indefinite" begin="0.2s" />
              <animate attributeName="opacity" values="0;1;0.95;1" dur="1.6s" repeatCount="indefinite" begin="0.2s" />
            </path>
          </g>

          {/* right leaf */}
          <g transform="translate(72,46)">
            <path d="M0 0 C14 -6 20 -22 10 -30 C2 -24 -2 -14 0 0 Z" fill="#b4e69e" transformOrigin="center">
              <animateTransform attributeName="transform" type="scale" values="0.2;1.02;0.96;1" dur="1.6s" repeatCount="indefinite" begin="0.35s" />
              <animate attributeName="opacity" values="0;1;0.95;1" dur="1.6s" repeatCount="indefinite" begin="0.35s" />
            </path>
          </g>

          {/* subtle floating/pulse for whole plant */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -3; 0 0"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </g>
        </svg>

        
      </div>
    </div>
  );
}

