import React from 'react'

function Eventdetails() {
  return (
    <section
      id="event"
      className="relative z-10 w-full min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 sm:px-8  pointer-events-none"
    >
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-center text-white drop-shadow-lg pointer-events-auto sm:text-5xl">
        Event Details
      </h1>
      <div className="grid grid-cols-1 gap-10 w-full max-w-5xl pointer-events-auto md:grid-cols-2">
        <div className="bg-white/10 rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-4 transition hover:scale-[1.02] backdrop-blur-sm border border-white/20 pointer-events-none">
          <div className="flex gap-2 items-baseline">
            <span className="text-2xl font-bold text-blue-400">Solution Sprint</span>
          </div>
          <div className="my-2 border-t border-white/10"></div>
          <div>
            <ul className="space-y-3">
              <li className="text-white">
                <span className="font-bold text-yellow-400">Format:</span>{" "}
                A real-world problem will be released 24 hours before the event.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Team Task:</span>{" "}
                Analyze the problem & present an innovative and feasible solution.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Presentation Time:</span>{" "}
                5 minutes.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Q&amp;A:</span>{" "}
                2–3 minutes.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Number of Winners:</span>{" "}
                Top 3 teams
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Judging Criteria:</span>{" "}
                Creativity, Feasibility, Problem Understanding, Presentation, Business Potential
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-4 transition hover:scale-[1.02] backdrop-blur-sm border border-white/20 pointer-events-none">
          <div className="flex gap-2 items-baseline">
            <span className="text-2xl font-bold text-blue-400">Startup Showcase</span>
          </div>
          <div className="my-2 border-t border-white/10"></div>
          <div>
            <ul className="space-y-3">
              <li className="text-white">
                <span className="font-bold text-yellow-400">Format:</span>{" "}
                Participants pitch their own original startup idea.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Presentation Time:</span>{" "}
                5 minutes.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Q&amp;A:</span>{" "}
                3–4 minutes.
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Number of Winners:</span>{" "}
                Single top team
              </li>
              <li className="text-white">
                <span className="font-bold text-yellow-400">Judging Criteria:</span>{" "}
                Innovation, Market Potential, Feasibility, Pitch Quality, Scalability
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-2xl text-base text-center pointer-events-auto text-white/90 sm:text-lg md:text-xl">
        For registration deadlines and updates, stay tuned to our main page or contact the organizing team!
      </div>
    </section>
  )
}

export default Eventdetails