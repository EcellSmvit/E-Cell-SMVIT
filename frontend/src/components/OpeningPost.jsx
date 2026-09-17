import React from "react";
import { ArrowUpRight } from "lucide-react";

function OpeningPost() {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111] px-5 py-16 text-white sm:px-10 sm:py-24">

      {/* Top Label */}
      <div className="mx-auto mb-10 flex max-w-6xl items-center justify-between">

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#E21B12]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#888888]">
            Why E-Cell?
          </span>
        </div>

        <span className="hidden text-[10px] font-semibold tracking-widest text-[#666666] sm:block">
          02 / 04
        </span>

      </div>


      {/* Main Content */}
      <div className="mx-auto max-w-6xl">

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#999999] sm:text-sm">
          Where Aspiration Meets Opportunity
        </p>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          {/* Heading */}
          <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-[6.5rem]">

            Why Join{" "}

            <span className="text-[#E21B12]">
              E-CELL
            </span>

            <br />

            SMVIT?

          </h2>


          {/* Arrow */}
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#333333] bg-white text-black lg:flex">
            <ArrowUpRight size={22} />
          </div>

        </div>


        {/* Divider */}
        <div className="my-10 h-px w-full bg-[#303030]" />


        {/* Benefits */}
        <div className="grid gap-8 sm:grid-cols-3">

          {/* 01 */}
          <div className="border-l-2 border-[#E21B12] pl-5">

            <span className="text-[10px] font-bold text-[#666666]">
              01
            </span>

            <p className="mt-2 text-lg font-bold sm:text-xl">
              Leadership
            </p>

            <p className="mt-1 text-xs leading-relaxed text-[#999999] sm:text-sm">
              Develop leadership skills by taking ownership of real initiatives.
            </p>

          </div>


          {/* 02 */}
          <div className="border-l-2 border-[#555555] pl-5">

            <span className="text-[10px] font-bold text-[#666666]">
              02
            </span>

            <p className="mt-2 text-lg font-bold sm:text-xl">
              Real Projects
            </p>

            <p className="mt-1 text-xs leading-relaxed text-[#999999] sm:text-sm">
              Work with a team and turn ideas into meaningful projects.
            </p>

          </div>


          {/* 03 */}
          <div className="border-l-2 border-[#E21B12] pl-5">

            <span className="text-[10px] font-bold text-[#666666]">
              03
            </span>

            <p className="mt-2 text-lg font-bold sm:text-xl">
              Bigger Platforms
            </p>

            <p className="mt-1 text-xs leading-relaxed text-[#999999] sm:text-sm">
              Represent SMVIT at IITs and national-level platforms.
            </p>

          </div>

        </div>

      </div>
      <div className="pointer-events-none absolute -bottom-5 right-5 select-none text-[5rem] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025] sm:right-10 sm:text-[9rem]">
        IMPACT
      </div>
    </section>
  );
}
export default OpeningPost;