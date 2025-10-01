import React from 'react'

function OpeningPost() {
  return (
    <div className="w-full min-h-[40vh] bg-[#111111] text-white flex items-center justify-center flex-col px-4 py-8 sm:py-12">
      <p className="mb-2 text-base text-center text-gray-300 sm:text-lg md:text-xl">
        Where Aspiration Meets Opportunity
      </p>
      <div className="p-2 text-3xl font-bold text-center sm:text-5xl md:text-7xl lg:text-8xl">
        Why Join E-CELL SMVIT?
      </div>
      <div className="flex justify-center items-center w-full">
        <p className="p-2 max-w-3xl text-lg font-semibold text-center text-gray-300 sm:p-4 sm:text-2xl md:text-3xl">
          Gain leadership skills &bull; Work on real projects &bull; Represent SMVIT at IITs &amp; national platforms
        </p>
      </div>
    </div>
  )
}

export default OpeningPost