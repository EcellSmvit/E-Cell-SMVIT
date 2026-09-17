import React from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Handshake,
  Palette,
} from "lucide-react";

const positions = [
  {
    number: "01",
    title: "Operations",
    icon: BriefcaseBusiness,
    short:
      "Keep the entire E-Cell ecosystem organised, efficient, and running smoothly.",
    responsibilities: [
      "Manage event logistics and permissions",
      "Coordinate venues, resources, and teams",
      "Handle on-ground execution and documentation",
    ],
  },
  {
    number: "02",
    title: "Events & Marketing",
    icon: CalendarDays,
    short:
      "Plan engaging events and build campaigns that bring students and ideas together.",
    responsibilities: [
      "Plan and execute E-Cell events",
      "Promote events across campus",
      "Engage and grow the student community",
    ],
  },
  {
    number: "03",
    title: "Corporate Relations",
    icon: Handshake,
    short:
      "Build meaningful connections with companies, founders, and industry professionals.",
    responsibilities: [
      "Reach out to potential sponsors",
      "Build corporate partnerships",
      "Manage sponsorship and funding opportunities",
    ],
  },
  {
    number: "04",
    title: "Tech",
    icon: Code2,
    short:
      "Build and maintain the digital presence that powers E-Cell's activities.",
    responsibilities: [
      "Develop and maintain the website",
      "Build digital tools and experiences",
      "Improve the technical infrastructure",
    ],
  },
  {
    number: "05",
    title: "Design & Media",
    icon: Palette,
    short:
      "Turn ideas into visual stories that make E-Cell's work impossible to miss.",
    responsibilities: [
      "Design posters and social creatives",
      "Create videos and digital content",
      "Maintain a consistent visual identity",
    ],
  },
];

function Position() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F5EF] px-5 py-16 text-[#111111] sm:px-10 sm:py-24">

      {/* ================= HEADER ================= */}
      <div className="mx-auto max-w-6xl">

        <div className="mb-4 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#E21B12]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C8A85]">
            Find Your Place
          </span>
        </div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl">
            Team{" "}
            <span className="text-[#E21B12]">
              Roles
            </span>
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-[#6E6D68]">
            Every great team needs different minds. Find the role where your
            skills, creativity, and ambition can make an impact.
          </p>

        </div>

        <div className="my-10 h-px w-full bg-[#DAD7CF]" />

      </div>


      {/* ================= ROLES ================= */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

        {positions.map((role) => {
          const Icon = role.icon;

          return (
            <div
              key={role.number}
              className="group relative flex min-h-[370px] flex-col justify-between overflow-hidden rounded-2xl border border-[#DDDAD2] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] sm:p-7"
            >

              {/* Top */}
              <div>

                <div className="flex items-start justify-between">

                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#999791]">
                    {role.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F0EA] transition-all duration-300 group-hover:bg-[#E21B12] group-hover:text-white">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                </div>


                {/* Role */}
                <h2 className="mt-12 text-3xl font-black uppercase leading-none tracking-[-0.04em]">
                  {role.title}
                </h2>

                <div className="mt-4 h-1 w-10 bg-[#E21B12]" />

                <p className="mt-5 text-sm leading-relaxed text-[#686762]">
                  {role.short}
                </p>

              </div>


              {/* Responsibilities */}
              <div className="mt-8 border-t border-[#E5E2DA] pt-5">

                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#999791]">
                  What You'll Do
                </p>

                <ul className="space-y-2.5">

                  {role.responsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs font-medium leading-relaxed text-[#44433F]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#E21B12]" />
                      {item}
                    </li>
                  ))}

                </ul>

              </div>


              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#DDDAD2] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight size={15} />
              </div>

            </div>
          );
        })}

      </div>


      {/* ================= BOTTOM MESSAGE ================= */}
      <div className="mx-auto mt-12 max-w-6xl">

        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#111111] p-6 text-white sm:flex-row sm:items-center sm:p-8">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#888888]">
              One Team. Different Strengths.
            </p>

            <p className="mt-2 text-xl font-bold sm:text-2xl">
              Your skills can create something bigger.
            </p>
          </div>

          <button className="group flex items-center gap-3 rounded-full bg-[#E21B12] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black">

            Apply Now

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
              <ArrowUpRight size={13} />
            </span>

          </button>

        </div>

      </div>

    </section>
  );
}

export default Position;