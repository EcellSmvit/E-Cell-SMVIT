import React from "react";
import { ArrowUpRight } from "lucide-react";

function FooterRecu() {
  return (
    <footer className="w-full bg-[#F7F5EF] px-5 py-10 text-[#111111] sm:px-10 sm:py-12">

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black">
              <img
                src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
                alt="E-Cell SMVIT Logo"
                className="w-8 invert"
              />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">
                E-Cell SMVIT
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#999791]">
                Entrepreneurship • Innovation • Impact
              </p>
            </div>

          </div>


          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">

            <a
              href="https://www.instagram.com/ecell_smvit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#6F6D68] transition hover:text-[#6D4CFF]"
            >
              Instagram
            </a>

            <a
              href="https://www.linkedin.com/company/e-cell-sirmvit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#6F6D68] transition hover:text-[#6D4CFF]"
            >
              LinkedIn
            </a>

            <a
              href="mailto:ecellsmvit@gmail.com"
              className="text-xs font-semibold text-[#6F6D68] transition hover:text-[#6D4CFF]"
            >
              Contact
            </a>
            <a
              href="https://ecellsmvit.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-semibold text-[#111111]"
            >
              Website
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D8D5CD] transition group-hover:border-[#6D4CFF] group-hover:bg-[#6D4CFF] group-hover:text-white">
                <ArrowUpRight size={12} />
              </span>
            </a>
          </nav>
        </div>
        <div className="my-8 h-px w-full bg-[#DAD7CF]" />
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-[10px] font-medium text-[#999791]">
            © {new Date().getFullYear()} E-Cell SMVIT. All rights reserved.
          </p>
          <p className="text-[10px] font-medium text-[#999791]">
            Made with{" "}
            <span className="text-[#6D4CFF]">♥</span>{" "}
            by the E-Cell Tech Team
          </p>
        </div>
        <div className="mt-12 overflow-hidden">
          <p className="select-none text-center text-[18vw] font-black uppercase leading-[0.7] tracking-[-0.08em] text-black/[0.035] sm:text-[13vw]">
            E-CELL
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterRecu;