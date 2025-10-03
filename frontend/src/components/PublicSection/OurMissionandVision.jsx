import React from "react";
import { RetroGrid } from "../magicui/retro-grid";

function OurMissionandVision() {
  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-black rounded-3xl shadow-2xl border border-neutral-800 px-2 py-8 md:py-0">
      <RetroGrid className="absolute inset-0 z-0 opacity-30 pointer-events-none" />
      <div className="flex relative z-10 flex-col justify-center items-center w-full max-w-6xl md:flex-row">
        {/* Mission Card - left, slightly up */}
        <div className="relative flex-1 flex flex-col items-start bg-white rounded-2xl shadow-2xl border border-neutral-200 p-8 md:p-10 mb-8 md:mb-0 md:mr-[-40px] md:translate-y-[-30px] group transition-transform duration-300 will-change-transform hover:z-20 hover:-translate-y-6 hover:scale-105 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.25)]">
          <div className="flex gap-2 items-center mb-6">
            <span className="inline-block px-4 py-2 text-2xl font-extrabold tracking-tight text-white bg-[#6D4DFE] rounded-lg shadow sm:text-3xl md:text-4xl">
              OUR
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl md:text-4xl">
              MISSION
            </span>
          </div>
          <p className="text-base font-medium leading-relaxed text-justify sm:text-lg md:text-xl text-neutral-800">
            To build a vibrant, self-sustaining campus hub that empowers students to become entrepreneurs. We connect you with industry leaders, decode market needs, and provide hands-on training—so you can launch your startup journey with confidence.
          </p>
        </div>
        <div className="relative flex-1 flex flex-col items-start bg-black rounded-2xl shadow-2xl border border-neutral-700 p-8 md:p-10 md:ml-[-40px] md:translate-y-[30px] group transition-transform duration-300 will-change-transform hover:z-20 hover:-translate-y-6 hover:scale-105 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.25)]">
          <div className="flex gap-2 items-center mb-6">
            <span className="inline-block px-4 py-2 text-2xl font-extrabold tracking-tight text-black bg-[#6D4DFE] rounded-lg shadow sm:text-3xl md:text-4xl">
              OUR
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              VISION
            </span>
          </div>
          <p className="text-base font-medium leading-relaxed text-justify sm:text-lg md:text-xl text-white/90">
            To nurture a thriving entrepreneurial ecosystem through innovation labs, workshops, and dynamic networking—like ideathons and hackathons. We envision an annual E-Summit, strong industry partnerships, and a robust alumni network offering mentorship, funding, and opportunities that extend far beyond campus.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMissionandVision;
