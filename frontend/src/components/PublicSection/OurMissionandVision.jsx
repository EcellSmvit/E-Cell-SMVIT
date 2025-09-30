import React from "react";
import { RetroGrid } from "../magicui/retro-grid";

function OurMissionandVision() {
  return (
    <div className="relative flex flex-col md:flex-row h-auto md:h-[100vh] w-full items-center justify-center overflow-hidden rounded-lg border bg-background px-4 md:px-8 py-8 md:py-0">
      {/* Left Side: Our Mission */}
      <div className="flex flex-col justify-center items-start mb-8 w-full h-auto md:pr-8 md:w-1/2 md:h-full md:mb-0">
        <div className="flex gap-2 items-center mb-4 md:gap-4 md:mb-6">
          <span className="bg-[#6D4DFE] text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow">
            OUR
          </span>
          <span className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">MISSION</span>
        </div>
        <div className="z-10 text-lg sm:text-xl md:text-2xl font-bold text-justify text-white w-full max-w-full md:max-w-[90%]">
          Our mission is to create a self-sustaining campus hub that fosters
          entrepreneurship by connecting students with industry experts,
          understanding market demands, and providing hands-on training to launch
          start-ups seamlessly.
        </div>
      </div>
      {/* Right Side: Our Vision */}
      <div className="flex flex-col justify-center items-end w-full h-auto md:pl-8 md:w-1/2 md:h-full">
        <div className="flex gap-2 items-center mb-4 w-full md:gap-4 md:mb-6">
          <span className="bg-[#6D4DFE] text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow">
            OUR
          </span>
          <span className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">VISION</span>
        </div>
        <div className="z-10 text-lg sm:text-xl md:text-2xl font-bold text-justify text-white w-full max-w-full md:max-w-[90%]">
          Our vision is to create a self-sustaining club that supports
          entrepreneurs through workshops, innovation labs, and networking
          opportunities like ideathons and hackathons. We aim to host an annual
          E-Summit, building partnerships, generating revenue, and showcasing our
          ability to manage large-scale projects. Additionally, we will offer
          micro-grant programs, on-campus incubators, and a strong alumni network
          for mentorship, investment, and partnerships to support ventures beyond
          campus.
        </div>
      </div>
      <RetroGrid />
    </div>
  );
}

export default OurMissionandVision;
