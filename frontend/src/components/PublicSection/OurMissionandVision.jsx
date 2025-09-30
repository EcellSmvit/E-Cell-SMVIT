import React from "react";
import { RetroGrid } from "../magicui/retro-grid";

function OurMissionandVision() {
  return (
    <div className="relative flex h-[100vh] w-full flex-row items-center justify-center overflow-hidden rounded-lg border bg-background px-8">
      {/* Left Side: Our Mission */}
      <div className="flex flex-col justify-center items-start pr-8 w-1/2 h-full">
        <div className="flex gap-4 items-center mb-6">
          <span className="bg-[#6D4DFE] text-white text-5xl md:text-6xl font-bold px-4 py-2 rounded-lg shadow">
            OUR
          </span>
          <span className="text-5xl font-bold text-white md:text-6xl">MISSION</span>
        </div>
        <div className="z-10 text-2xl font-bold text-justify text-white w-full max-w-[90%]">
          Our mission is to create a self-sustaining campus hub that fosters
          entrepreneurship by connecting students with industry experts,
          understanding market demands, and providing hands-on training to launch
          start-ups seamlessly.
        </div>
      </div>
      {/* Right Side: Our Vision */}
      <div className="flex flex-col justify-center items-end pl-8 w-1/2 h-full">
        <div className="flex gap-4 justify-center items-center mb-6 w-full">
          <span className="bg-[#6D4DFE] text-white text-5xl md:text-6xl font-bold px-4 py-2 rounded-lg shadow">
            OUR
          </span>
          <span className="text-5xl font-bold text-white md:text-6xl">VISION</span>
        </div>
        <div className="z-10 text-2xl font-bold text-justify text-white w-full max-w-[90%]">
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
      <RetroGrid/>
    </div>
  );
}

export default OurMissionandVision;
