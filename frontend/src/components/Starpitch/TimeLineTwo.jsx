import React from 'react';

const timelineEvents = [
  {
    title: "Registration Opens",
    date: "March 10, 2024",
    description: "Teams can start registering their entries on the website.",
  },
  {
    title: "Registration Closes",
    date: "March 31, 2024",
    description: "Last date to register for StarPitch 3.0.",
  },
  {
    title: "Preliminary Round (Submission Deadline)",
    date: "April 7, 2024",
    description: "Deadline for submission of pitch decks for the preliminary screening.",
  },
  {
    title: "Shortlist Announcement",
    date: "April 12, 2024",
    description: "Selected teams for the finale announced.",
  },
  {
    title: "Grand Finale",
    date: "April 20, 2024",
    description: "Live pitching to jury, followed by results & prize distribution.",
  },
];

function TimelineTwo() {
  return (
    <div className="flex relative z-10 flex-col gap-8 items-center py-8 w-full max-w-full pointer-events-none sm:py-12 md:py-16 sm:gap-10 md:gap-12">
      <h1 className="mb-3 text-3xl font-black text-center text-white drop-shadow-lg pointer-events-auto sm:text-4xl md:text-5xl sm:mb-4">Timeline</h1>
      <div className="flex relative flex-col gap-8 px-0 w-full max-w-2xl pointer-events-auto sm:max-w-3xl md:max-w-4xl sm:gap-10 md:gap-12 xs:px-1 sm:px-3 md:px-4">
        {/* Central line for md+ screens */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full border-l-[4px] border-purple-400 opacity-40 z-0" />
        {timelineEvents.map((event, idx) => (
          <div
            key={idx}
            className={`
              relative flex flex-col md:flex-row items-center z-10 group w-full
              ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}
            `}
          >
            {/* Timeline dot for all screens */}
            <div
              className={`absolute left-1/2 z-20 transform -translate-x-1/2 md:static md:left-auto md:transform-none md:translate-x-0`}
              style={{ minWidth: 60 }}
            >
              <div className="flex relative flex-col items-center">
                <span className="absolute z-0 w-7 h-7 bg-purple-400 rounded-full opacity-50 animate-ping sm:w-8 sm:h-8" />
                <div className="flex relative z-10 justify-center items-center w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-700 rounded-full border-2 border-white shadow-lg transition-transform sm:w-6 sm:h-6 sm:border-4 group-hover:scale-110">
                  {idx === 0 ? (
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 20 20"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4 4-4m-4-9v13" /></svg>
                  ) : idx === timelineEvents.length - 1 ? (
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4m0-4A7 7 0 015 6V5h14v1a7 7 0 01-7 7z" /></svg>
                  ) : (
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M16 2v4M8 2v4M4 10h16" /></svg>
                  )}
                </div>
                {/* Connecting line: only on desktop */}
                {idx < timelineEvents.length - 1 && (
                  <div className="hidden w-1 h-20 md:block lg:h-24 bg-purple-400/30"></div>
                )}
                {/* Connecting line: for mobile */}
                {idx < timelineEvents.length - 1 && (
                  <div className="block md:hidden w-0.5 h-12 mx-auto bg-purple-400/30 mt-1 mb-0" />
                )}
              </div>
            </div>
            <div className={`
              mt-6 md:mt-0 md:w-1/2 
              ${idx % 2 === 0 ? "md:pr-14 md:text-right" : "md:pl-14 md:text-left"}
              w-full
              flex flex-col items-center md:items-stretch
            `}>
              <div className={`relative px-4 py-4 w-full max-w-md rounded-lg border shadow-xl backdrop-blur-lg transition-transform duration-300 bg-white/10 sm:rounded-xl sm:px-6 sm:py-5 md:py-6 border-white/20 group-hover:scale-105 md:max-w-none`}>
                <span className="block text-xs font-semibold tracking-wide text-purple-200 uppercase opacity-80 sm:text-sm">{event.date}</span>
                <h2 className="mt-1 mb-1 text-xl font-bold text-purple-100 drop-shadow-sm sm:text-2xl sm:mt-2">{event.title}</h2>
                <p className="text-sm text-white opacity-90 sm:text-base">{event.description}</p>
                <span className="hidden sm:block absolute -top-2 right-6 w-8 h-0.5 bg-gradient-to-r from-purple-400/60 via-white/30 to-purple-600/60 rounded blur-[1px] animate-pulse" />
              </div>
            </div>
            {/* Blank space on desktop, hidden on mobile */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
        {/* Faded overlay for possible trailing effect */}
        <div className="absolute bottom-0 left-0 w-full h-10 pointer-events-none sm:h-20 md:h-28" />
      </div>
    </div>
  );
}

export default TimelineTwo;