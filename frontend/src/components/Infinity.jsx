import React from 'react'

function InfinityComponent() {

  const stats = [
    "4+ YEARS",
    "20+ SPEAKERS",
    "15+ EVENTS",
    "3000+ FOOTFALL",
    "|"
  ];


  const repeatedStats = Array(4).fill(stats).flat();

  return (
    <div className="flex overflow-hidden relative items-center w-full h-28 bg-[#6D4DFE]">
      <style>
        {`
          @keyframes infinity-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .infinity-track {
            display: flex;
            gap: 2rem;
            width: max-content;
            animation: infinity-scroll 18s linear infinite;
          }
        `}
      </style>
      <div className="flex overflow-hidden absolute top-0 left-0 items-center w-full h-full">
        <div className="flex items-center h-full text-4xl font-black text-white infinity-track">
          {repeatedStats.map((stat, idx) => (
            <span key={idx} className="whitespace-nowrap">{stat}</span>
            
          ))}
        </div>
        <div className="flex items-center h-full text-lg font-black text-white infinity-track" aria-hidden="true">
          {repeatedStats.map((stat, idx) => (
            <span key={idx} className="whitespace-nowrap">{stat}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfinityComponent