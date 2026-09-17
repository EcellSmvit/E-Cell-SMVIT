import React from "react";
import { ArrowUpRight } from "lucide-react";

const events = [
  {
    name: "StarPitch 2.0",
    description:
      "Compete, innovate, and win cash prizes! 50+ teams pitched their startup ideas to industry experts, gaining mentorship, feedback, and valuable networking opportunities.",
    image:
      "https://ik.imagekit.io/es6xialea/466920954_1317652862939208_1165416226951461315_n.jpg?updatedAt=1759420800249",
  },
  {
    name: "Idea Expo",
    description:
      "A showcase of 7 student startups, inspiring 1000+ students to explore entrepreneurship and innovation.",
    image:
      "https://ik.imagekit.io/es6xialea/468787892_526762070357263_7985119509233558350_n.jpg?updatedAt=1759420800200",
  },
  {
    name: "SuperOver",
    description:
      "Pitch your advertising idea for a ₹3 crore India vs Pakistan match slot and compete to win exciting prizes.",
    image:
      "https://ik.imagekit.io/es6xialea/482284504_17998207142755800_2672864441992816042_n.jpg?updatedAt=1759420800236",
  },
  {
    name: "SMVIT Stock Exchange",
    description:
      "A stock-market themed event designed to make financial literacy engaging, interactive, and competitive.",
    image:
      "https://ik.imagekit.io/es6xialea/491534651_18003548816755800_7425644674137084509_n.jpg?updatedAt=1759420800291",
  },
  {
    name: "Crisis CTRL",
    description:
      "A high-stakes business simulation where teams tackle real-time crises, test their strategy, and fight to regain control.",
    image:
      "https://ik.imagekit.io/es6xialea/501817145_18007795895755800_8048588466809766982_n.jpg?updatedAt=1759420800204",
  },
  {
    name: "Startup Mela",
    description:
      "An entrepreneurship-focused platform where aspiring founders showcase their ideas, connect with fellow innovators, and gain valuable exposure.",
    image: "YOUR_STARTUP_MELA_IMAGE_URL",
  },
];

function EventsRecru() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#111111] px-5 py-16 text-white sm:px-10 sm:py-24">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex items-end justify-between">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#E21B12]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#777777]">
                What We Do
              </span>
            </div>

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Events We{" "}
              <span className="text-[#E21B12]">
                Create
              </span>
            </h1>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#666666]">
              E-CELL SMVIT
            </p>

            <p className="mt-1 text-xs text-[#777777]">
              Ideas into experiences.
            </p>
          </div>

        </div>


        {/* Divider */}
        <div className="mb-10 h-px w-full bg-[#303030]" />


        {/* ================= EVENTS GRID ================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {events.map((event, idx) => (
            <article
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-[#292929] bg-[#181818] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            >

              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden bg-[#222222]">

                <img
                  src={event.image}
                  alt={event.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Number */}
                <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Arrow */}
                <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-[#E21B12] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </div>

              </div>


              {/* CONTENT */}
              <div className="p-5 sm:p-6">

                <div className="mb-3 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#E21B12]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#777777]">
                    E-CELL SMVIT
                  </span>

                </div>

                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {event.name}
                </h2>

                <p className="mt-3 text-xs leading-relaxed text-[#999999] sm:text-sm">
                  {event.description}
                </p>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-[#2B2B2B] pt-4">

                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#666666]">
                    Entrepreneurship
                  </span>

                  <span className="text-[9px] font-bold text-[#555555]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                </div>

              </div>

            </article>
          ))}

        </div>


        {/* ================= BOTTOM CTA ================= */}
        <div className="mt-10 flex flex-col justify-between gap-5 rounded-2xl bg-[#E21B12] p-6 sm:flex-row sm:items-center sm:p-7">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/60">
              More Than Events
            </p>

            <p className="mt-2 text-xl font-bold sm:text-2xl">
              We create spaces where ideas come alive.
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black">
            <ArrowUpRight size={18} />
          </div>

        </div>

      </div>


      {/* Background Decoration */}
      <div className="pointer-events-none absolute -bottom-8 right-4 select-none text-[5rem] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025] sm:right-10 sm:text-[10rem]">
        EVENTS
      </div>

    </section>
  );
}

export default EventsRecru;