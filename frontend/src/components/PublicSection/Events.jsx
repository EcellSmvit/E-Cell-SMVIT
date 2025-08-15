import React, { useRef, useEffect, useState } from 'react';

const eventsData = [
  {
    title: "Workshops for Entrepreneurial Growth",
    description:
      "Skill Sprint driven events, upskilling workshops by top entrepreneurs and industry experts.",
    color: "border-blue-400 text-blue-200",
    border: "border-blue-400",
    highlight: "bg-blue-400",
  },
  {
    title: "Pitching for Global Impact",
    description:
      "The Hall Pitch is a mentorship, innovation, and pitching event to incubate startup ideas to address global issues.",
    color: "border-pink-400 text-pink-200",
    border: "border-pink-400",
    highlight: "bg-pink-400",
  },
  {
    title: "Internship Opportunities for College Students",
    description:
      "E-Cell connects college students with startups, providing hands-on experience and networking.",
    color: "border-cyan-400 text-cyan-200",
    border: "border-cyan-400",
    highlight: "bg-cyan-400",
  },
  {
    title: "Wisdom from Industry Leaders",
    description:
      "Talks and Q&A sessions with founders, VCs, and industry leaders to inspire and guide the next generation.",
    color: "border-purple-400 text-purple-200",
    border: "border-purple-400",
    highlight: "bg-purple-400",
  },
  {
    title: "Idea to Thriving Venture",
    description:
      "Guided programs to help students turn their ideas into successful startups, from ideation to launch.",
    color: "border-indigo-400 text-indigo-200",
    border: "border-indigo-400",
    highlight: "bg-indigo-400",
  },
];

function Events() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % eventsData.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  // For manual navigation (optional)
  const goTo = (idx) => setCurrent(idx);

  return (
    <section
      id="events"
      className="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-black py-16"
      style={{
        background: "radial-gradient(circle, #18181b 60%, #000 100%)",
      }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-wider text-white md:text-4xl">
          Our <span className="text-pink-400">Initiatives</span>
        </h2>
        <p className="mt-2 text-xs tracking-wide text-gray-400 md:text-sm">
          Powering the future through technology and innovation
        </p>
      </div>
      <div className="relative flex justify-center items-center w-full max-w-5xl h-[340px] md:h-[360px]">
        {/* Cards */}
        {/* 
          To control the gap between cards, adjust the `cardGap` variable below.
          This value (in percentage) determines how far apart the side cards are from the center card.
          For example, cardGap = 30 means the left card is at 50%-30% = 20% (left-[20%]), 
          and the right card is at 50%+30% = 80% (left-[80%]).
        */}
        {(() => {
          const cardGap =30; // <--- Control the gap between cards here (in percent, e.g., 15 = 15%)
          return (
            <div className="relative w-full h-full">
              {eventsData.map((event, idx) => {
                // Calculate position for animation
                let base =
                  "transition-all duration-700 ease-in-out absolute w-[90vw] max-w-xs md:max-w-sm h-[260px] md:h-[300px] rounded-xl bg-gradient-to-b from-white/5 to-black/80 border backdrop-blur-md shadow-lg";
                let style = "";
                // Calculate left positions based on cardGap
                const leftCenter = "50%";
                const leftRight = `${50 + cardGap}%`;
                const leftLeft = `${50 - cardGap}%`;

                if (idx === current) {
                  style =
                    `left-[${leftCenter}] -translate-x-1/2 scale-100 opacity-100 ` +
                    event.border +
                    " shadow-2xl z-20";
                } else if (
                  (idx === (current + 1) % eventsData.length) ||
                  (current === eventsData.length - 1 && idx === 0)
                ) {
                  style =
                    `left-[${leftRight}] scale-90 opacity-60 blur-[1.5px] ` +
                    event.border +
                    " z-10";
                } else if (
                  (idx === (current - 1 + eventsData.length) % eventsData.length) ||
                  (current === 0 && idx === eventsData.length - 1)
                ) {
                  style =
                    `left-[${leftLeft}] scale-90 opacity-60 blur-[1.5px] ` +
                    event.border +
                    " z-10";
                } else {
                  style =
                    "left-1/2 -translate-x-1/2 scale-75 opacity-0 pointer-events-none z-0";
                }

                return (
                  <div
                    key={idx}
                    className={`${base} ${style}`}
                    style={{
                      top: "0",
                      transitionProperty:
                        "left, transform, opacity, filter, box-shadow",
                    }}
                    aria-hidden={idx !== current}
                  >
                    <div className="flex flex-col justify-between px-6 py-7 h-full">
                      <div>
                        <div
                          className={`h-1 w-12 mb-4 rounded-full ${event.highlight} opacity-80`}
                        ></div>
                        <h3
                          className={`font-bold text-lg md:text-xl mb-2 ${event.color}`}
                          style={{ fontFamily: "Fira Mono, monospace" }}
                        >
                          {event.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                          {event.description}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="flex justify-center items-center w-8 h-8 rounded-full border border-gray-700 transition hover:bg-white/10"
                          tabIndex={idx === current ? 0 : -1}
                          aria-label="Read more"
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gray-400"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M9 18l6-6-6-6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
        {/* Dots */}
        <div className="flex absolute bottom-2 left-1/2 z-30 gap-2 -translate-x-1/2">
          {eventsData.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? "bg-pink-400 scale-125 shadow"
                  : "bg-gray-700"
              }`}
              onClick={() => goTo(idx)}
              aria-label={`Go to event ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;