import React from 'react'

function Firstsection() {
  return (
    <div>
        <div className="relative z-10 pointer-events-none w-full h-screen flex justify-center items-center flex-col">
        <h1 className='text-white font-bold text-xl'>E-CELL SMVIT Present</h1>
        <h1
          className="font-[Modak] text-white text-7xl md:text-[12rem] drop-shadow-lg select-none text-center "
          style={{ fontFamily: "'Modak', cursive" }}
        >
          StarPitch 3.0
        </h1>
        <div className='flex items-center justify-center gap-6 text-white font-bold text-xl drop-shadow-2xl select-none'>Powered By 
            <img className='w-44 bg-white p-2 rounded-xl' src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Firstsection