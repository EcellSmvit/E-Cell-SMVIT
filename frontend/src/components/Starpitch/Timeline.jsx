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

function Timeline() {
  return (
    <div className="w-full max-w-full py-8 sm:py-12 md:py-16 flex flex-col items-center gap-8 sm:gap-10 md:gap-12 relative z-10 pointer-events-none">
      <h1 className="font-black text-3xl sm:text-4xl md:text-5xl text-white pointer-events-auto mb-3 sm:mb-4 drop-shadow-lg text-center">Timeline</h1>
      <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl flex flex-col gap-8 sm:gap-10 md:gap-12 pointer-events-auto relative px-0 xs:px-1 sm:px-3 md:px-4">
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
              className={`
                absolute md:static left-1/2 md:left-auto transform md:transform-none
                -translate-x-1/2 md:translate-x-0 z-20
              `}
              style={{ minWidth: 60 }}
            >
              <div className="relative flex flex-col items-center">
                <span className="absolute animate-ping w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-400 opacity-50 z-0" />
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-purple-700 rounded-full border-2 sm:border-4 border-white shadow-lg flex items-center justify-center relative z-10 transition-transform group-hover:scale-110">
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
                  <div className="hidden md:block w-1 h-20 lg:h-24 bg-purple-400/30"></div>
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
              <div className={`
                bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl px-4 py-4 sm:px-6 sm:py-5 md:py-6 shadow-xl border border-white/20 relative
                transition-transform duration-300 group-hover:scale-105
                w-full max-w-md md:max-w-none
              `}>
                <span className="text-xs sm:text-sm tracking-wide uppercase text-purple-200 font-semibold opacity-80 block">{event.date}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-purple-100 mt-1 sm:mt-2 mb-1 drop-shadow-sm">{event.title}</h2>
                <p className="text-white text-sm sm:text-base opacity-90">{event.description}</p>
                <span className="hidden sm:block absolute -top-2 right-6 w-8 h-0.5 bg-gradient-to-r from-purple-400/60 via-white/30 to-purple-600/60 rounded blur-[1px] animate-pulse" />
              </div>
            </div>
            {/* Blank space on desktop, hidden on mobile */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
        {/* Faded overlay for possible trailing effect */}
        <div className="pointer-events-none absolute left-0 bottom-0 w-full h-10 sm:h-20 md:h-28" />
      </div>
    </div>
  );
}

export default Timeline;