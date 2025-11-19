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
        <div className="bg-white/10 rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-4 transition hover:scale-[1.02] backdrop-blur-sm border border-white/20">
          <div className="flex gap-2 items-baseline">
            <span className="text-2xl font-bold text-blue-400">Round 1</span>
            <span className="text-base font-medium text-white/80">| 23rd March 2024</span>
          </div>
          <div className="my-2 border-t border-white/10"></div>
          <div>
            <h2 className="mb-1 text-lg font-semibold text-white md:text-xl">Preliminary Pitch (Online)</h2>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              Teams submit their pitch decks online, presenting ideas ranging from innovative products to new business models. Judges will evaluate based on creativity, viability, and impact. Shortlisted teams will be notified for progression to the next round.
            </p>
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl shadow-lg px-8 py-6 flex flex-col gap-4 transition hover:scale-[1.02] backdrop-blur-sm border border-white/20">
          <div className="flex gap-2 items-baseline">
            <span className="text-2xl font-bold text-blue-400">Round 2</span>
            <span className="text-base font-medium text-white/80">| 31st March 2024</span>
          </div>
          <div className="my-2 border-t border-white/10"></div>
          <div>
            <h2 className="mb-1 text-lg font-semibold text-white md:text-xl">Grand Finale (Onsite)</h2>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              Finalists deliver live, in-person pitches at StarPitch 3.0 before a panel of esteemed judges and an audience. This round emphasizes clarity, innovation, and presentation skills. Winners will be awarded prizes, mentorship, and recognition on stage.
            </p>
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