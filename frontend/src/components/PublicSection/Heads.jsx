import React from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";

const headsList = [
  {
    name: "Satvik Gupta",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Satvik.jpg?updatedAt=1763209006644",
    linkedin: "https://www.linkedin.com/in/satvik--gupta/",
    batch: "Corporate Relations Head",
  },
  {
    name: "Anant Srivastava",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Anant.jpg?updatedAt=1763209004736",
    linkedin: "https://www.linkedin.com/in/anant-srivastava-709174293/",
    batch: "Operations Head",
  },
  {
    name: "Bhoomi Nayak",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Bhoomi.jpg?updatedAt=1763209006562",
    linkedin: "https://www.linkedin.com/in/bhoomi-nayak-943083305/",
    batch: "Events & Marketing Head",
  },
  {
    name: "Shashwat Shaurya",
    img: "https://ik.imagekit.io/es6xialea/drive-download-20251115T121438Z-1-001/Shashwat%20Shaurya.jpg?updatedAt=1763209005937",
    linkedin: "https://www.linkedin.com/in/shashwat-shaurya-0828a5207/",
    batch: "Design & Media Head",
  },
  {
    name: "Bikesh Kumar",
    img: "https://ik.imagekit.io/es6xialea/Bikesh_-y-WYu2bvh?updatedAt=1754730133391",
    linkedin: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/",
    batch: "Tech Head",
  },
];

function HeadCard({ name, img, linkedin, batch }) {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <div
      className="
        group relative
        w-[245px] h-[340px]
        overflow-hidden rounded-[22px]
        bg-[#111111]
        border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        transition-all duration-500
        hover:-translate-y-2
        hover:border-[#6D4DFE]/50
        hover:shadow-[0_20px_60px_rgba(109,77,254,0.18)]
      "
    >
      {/* Image */}
      <img
        src={img}
        alt={name}
        className="
          absolute inset-0
          h-full w-full
          object-cover object-top
          transition-transform duration-700
          group-hover:scale-105
        "
      />

      {/* Dark gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black via-black/35 to-transparent
          opacity-95
        "
      />

      {/* Purple glow */}
      <div
        className="
          absolute -bottom-20 -right-20
          h-40 w-40
          rounded-full
          bg-[#6D4DFE]/20
          blur-3xl
          transition-all duration-500
          group-hover:bg-[#6D4DFE]/35
        "
      />

      {/* Top index */}
      <div
        className="
          absolute top-4 left-4 z-10
          flex h-8 w-8 items-center justify-center
          rounded-full
          border border-white/20
          bg-black/30
          backdrop-blur-md
          text-[10px] font-bold text-white
        "
      >
        {String(headsList.findIndex((head) => head.name === name) + 1).padStart(
          2,
          "0"
        )}
      </div>

      {/* LinkedIn */}
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`LinkedIn profile of ${name}`}
        className="
          absolute top-4 right-4 z-20
          flex h-10 w-10 items-center justify-center
          rounded-full
          border border-white/15
          bg-black/40
          backdrop-blur-md
          text-white
          transition-all duration-300
          hover:scale-110
          hover:bg-[#6D4DFE]
          hover:border-[#6D4DFE]
        "
      >
        <Linkedin size={18} />
      </a>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        {/* Role */}
        <div className="mb-3 flex items-center gap-2">
          <span className="h-[1px] w-7 bg-[#6D4DFE]" />

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
            {batch}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-tight text-white">
          {firstName}
          <br />
          {lastName}
        </h3>

        {/* Bottom line */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
            E-CELL SMVIT
          </span>

          <ArrowUpRight
            size={16}
            className="
              text-white/40
              transition-all duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
              group-hover:text-[#6D4DFE]
            "
          />
        </div>
      </div>
    </div>
  );
}

function Heads() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-5 py-24 sm:px-8 lg:px-12">
      
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-20
          h-[350px] w-[350px]
          -translate-x-1/2
          rounded-full
          bg-[#6D4DFE]/10
          blur-[120px]
        "
      />

      {/* Small background lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#6D4DFE]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
              Leadership Team
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="text-5xl font-black uppercase tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
              OUR
            </h2>

            <div
              className="
                relative
                overflow-hidden
                rounded-xl
                bg-[#6D4DFE]
                px-5 py-2
                sm:px-7 sm:py-3
              "
            >
              <span className="relative z-10 text-5xl font-black uppercase tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
                HEADS
              </span>

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/15 blur-xl" />
            </div>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
            The people driving E-CELL SMVIT forward through innovation,
            leadership, creativity and execution.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-5 lg:justify-between">
          {headsList.map((head, idx) => (
            <HeadCard
              key={head.name + "-" + idx}
              name={head.name}
              img={head.img}
              linkedin={head.linkedin}
              batch={head.batch}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
            E-CELL SMVIT
          </span>

          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#6D4DFE]">
            2026 — 27
          </span>
        </div>
      </div>
    </section>
  );
}

export default Heads;
