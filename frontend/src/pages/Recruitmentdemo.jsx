import AchievmentRecru from '@/components/AchievmentRecru'
import EventsRecru from '@/components/EventsRecru'
import Facingtrouble from '@/components/Facingtrouble'
import FooterRecu from '@/components/FooterRecu'
import OpeningPost from '@/components/OpeningPost'
import Position from '@/components/Position'
import React from 'react'

function Recruitmentdemo() {
  return (
    <div>
      <div className=" sm:h-[100vh] h-[70vh] w-full bg-[#f9fafb] relative">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #d1d5db 1px, transparent 1px),
              linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8 md:px-14">
          <img
            src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
            className="w-10 sm:w-12"
            alt="logo"
          />
          <div className="text-xl font-bold text-[#8B5CF6] sm:text-2xl">
            2025
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex relative z-10 justify-center items-center px-6 sm:px-14 h-[50vh] sm:h-[90vh] text-center sm:text-left">
          <div>
            <button className="px-4 py-2 rounded-full border-2 text-[#111111] mb-4 sm:mb-6">
              Join Our Team
            </button>
            <p className="font-medium text-[#111111] text-4xl sm:text-8xl">
              E-CELL SMVIT
            </p>
            <p className="font-black text-[#111111] text-6xl sm:text-[12rem] leading-[1]">
              Recruiting!
            </p>
            <p className="text-[#545554] text-base sm:text-2xl font-medium w-full sm:w-2/3 mt-6 sm:mt-10 mx-auto sm:mx-0">
              Are you ready to take charge, innovate, and create impact on campus? E-Cell SMVIT is recruiting enthusiastic minds like YOU!
            </p>
          </div>
          <div className="hidden sm:block">
            {/* You can re-enable the image here if needed */}
          </div>
        </div>
      </div>

      <OpeningPost />
      <Position />
      <Facingtrouble/>
      <AchievmentRecru/>
      <EventsRecru/>
      <FooterRecu/>
    </div>
  )
}

export default Recruitmentdemo
