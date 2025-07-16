import React from 'react'

function InfinityComponent() {
  const stats = [
    "4+ YEARS",
    "20+ SPEAKERS",
    "15+ EVENTS",
    "3000+ FOOTFALL",
    "|"
  ];

  // Repeat enough times for smooth scroll on all screen sizes
  const repeatedStats = Array(6).fill(stats).flat();

  return (
    <div className="flex overflow-hidden relative items-center w-full h-20 sm:h-24 md:h-28 bg-[#6D4DFE]">
      <style>
        {`
          @keyframes infinity-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .infinity-track {
            display: flex;
            gap: 1.5rem;
            width: max-content;
            animation: infinity-scroll 18s linear infinite;
          }
          @media (max-width: 640px) {
            .infinity-track {
              gap: 0.75rem;
              font-size: 1.25rem !important;
            }
          }
          @media (min-width: 641px) and (max-width: 1023px) {
            .infinity-track {
              gap: 1.25rem;
              font-size: 2rem !important;
            }
          }
          @media (min-width: 1024px) {
            .infinity-track {
              gap: 2rem;
              font-size: 2.5rem !important;
            }
          }
        `}
      </style>
      <div className="flex overflow-hidden absolute top-0 left-0 items-center w-full h-full">
        {/* Only one track, font size responsive via CSS */}
        <div className="flex items-center h-full font-black text-white infinity-track">
          {repeatedStats.map((stat, idx) => (
            <span key={idx} className="px-2 whitespace-nowrap">{stat}</span>
          ))}
        </div>
        {/* Optionally, you can keep a second track for extra smoothness, but one is enough for responsiveness */}
      </div>
    </div>
  )
}

export default InfinityComponent