import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const RecruitmentHero = () => {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#F7F5EF] text-[#111111]">
      <div className="relative z-30 flex items-center justify-between px-4 py-4 sm:px-8 md:px-14">
        <div className="flex items-center gap-7">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl sm:h-16 sm:w-16">
            <img
              src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
              className="w-9 sm:w-10"
              alt="E-Cell SMVIT"
            />
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />

            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#92908B]">
              SMVIT
            </span>
          </div>
        </div>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full bg-[#EAE8E2] p-1 sm:flex">
          <a
            href="/"
            className="rounded-full bg-black px-7 py-2.5 text-[10px] font-bold tracking-wide text-white"
          >
            HOME
          </a>
          <a
            href="https://www.ecellsmvit.in/"
            className="rounded-full px-7 py-2.5 text-[10px] font-bold tracking-wide text-black transition hover:bg-white"
          >
            ABOUT
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden text-[10px] font-medium sm:block">
            ecellsmvit@gmail.com
          </span>
          <a
            href="https://www.ecellsmvit.in/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDDAD2] text-xs transition hover:bg-black hover:text-white"
          >
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.linkedin.com/company/e-cell-sirmvit"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDDAD2] text-[10px] font-semibold transition hover:bg-black hover:text-white"
          >
            in
          </a>
        </div>
      </div>
      <div className="relative z-10 flex min-h-[calc(90vh-90px)] flex-col items-center justify-center px-5 pb-10 pt-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-black" />
          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#8E8C87] sm:text-[10px]">
            Entrepreneurship • Innovation • Impact
          </p>
          <span className="h-px w-6 bg-black" />
        </div>

        <div className="text-center">
          <h1 className="text-[17vw] font-black uppercase leading-[0.78] tracking-[-0.06em] sm:text-[9vw]">
            <span className="text-[#6D4CFF]">
              E-CELL SMVIT
            </span>
          </h1>
          <h2 className="mt-2 text-[12vw] font-black uppercase leading-[0.82] tracking-[-0.06em] sm:mt-1 sm:text-[7.5vw]">
            RECRUITMENT
          </h2>
        </div>

        <div className="mt-7 flex flex-col items-center gap-5 sm:mt-8 sm:flex-row sm:gap-8">
          <p className="max-w-md text-center text-xs font-medium leading-relaxed text-[#65645F] sm:text-left sm:text-sm">
            Ready to innovate, lead and create an impact?
            Join E-Cell SMVIT and turn your ideas into reality.
          </p>
          <SignInButton>
            <button className="group flex items-center gap-3 rounded-full bg-black px-5 py-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-[#6D4CFF]">
              Join Our Team
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:rotate-45">
                <ArrowUpRight size={13} />
              </span>
            </button>
          </SignInButton>
        </div>

        <div className="mt-10 flex w-full max-w-6xl items-end justify-center gap-3 sm:mt-12">
          <div className="hidden h-28 w-44 -rotate-3 rounded-2xl border border-[#DDDAD2] bg-white p-4 shadow-sm sm:block">
            <p className="text-[8px] font-bold tracking-widest text-[#999]">
              01
            </p>
            <p className="mt-5 text-xl font-black">
              IDEATE.
            </p>
            <div className="mt-2 h-0.5 w-8 bg-[#6D4CFF]" />
          </div>
          <div className="hidden h-32 w-48 rotate-2 rounded-2xl bg-black p-5 text-white sm:block">
            <p className="text-[8px] font-bold tracking-widest text-[#777]">
              02
            </p>
            <p className="mt-4 text-2xl font-black">
              CREATE.
            </p>
          </div>
          <div className="relative h-36 w-64 rounded-2xl bg-[#6D4CFF] p-5 text-white shadow-lg sm:h-40 sm:w-72">
            <div className="flex items-start justify-between">
              <p className="text-[8px] font-bold tracking-widest">
                E-CELL SMVIT
              </p>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                <ArrowUpRight size={13} />
              </span>
            </div>
            <div className="absolute bottom-5 left-5">
              <p className="text-3xl font-black leading-none">
                YOUR
              </p>
              <p className="text-3xl font-black leading-none">
                MOVE.
              </p>
            </div>
          </div>
          <div className="hidden h-32 w-48 -rotate-2 rounded-2xl border border-[#DDDAD2] bg-white p-5 sm:block">
            <p className="text-[8px] font-bold tracking-widest text-[#999]">
              03
            </p>
            <p className="mt-4 text-2xl font-black">
              IMPACT.
            </p>
          </div>
          <div className="hidden h-28 w-44 rotate-3 rounded-2xl bg-[#EAE8E2] p-4 sm:block">
            <p className="text-[8px] font-bold tracking-widest text-[#999]">
              04
            </p>
            <p className="mt-5 text-xl font-black">
              LEAD.
            </p>
            <div className="mt-2 h-0.5 w-8 bg-[#6D4CFF]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentHero;