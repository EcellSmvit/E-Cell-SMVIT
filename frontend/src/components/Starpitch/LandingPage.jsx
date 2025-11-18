import React from 'react'
import Spline from '@splinetool/react-spline';

function Landingpage() {
  return (
    <div className="w-full h-screen bg-gray-900 relative flex justify-center items-center">
      <div className="absolute  z-10 pointer-events-none">
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
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/91NvPoTGv5JkxAgS/scene.splinecode" />
      </div>
      
      <div className="absolute right-5 bottom-5 w-48 h-10 bg-black rounded shadow-lg text-white flex items-center justify-center">
        Made by E-CELL with ❤️
      </div>
    </div>
  )
}

export default Landingpage