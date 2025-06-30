import React from 'react';

function Navbar() {
  return (
    <div className="absolute z-20 top-6 left-1/2 transform -translate-x-1/2 h-16 w-[90vw] 
                    bg-gradient-to-r from-white/10 to-white/5 
                    backdrop-blur-xl rounded-2xl 
                    flex items-center justify-between px-8 
                    text-white 
                    shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

      <div className="font-sans text-2xl font-bold tracking-wide drop-shadow-sm">
        <img className='w-8' src="https://www.ecellsmvit.in/images/ecellwhite.png" alt="" />
      </div>
      <div >
        <ul className='flex items-center justify-center gap-8'>
          <li>Home</li>
          <li>Events</li>
          <li>Our Teams</li>
          <li>Gallery</li>
        </ul>
      </div>
      <div className="space-x-4">
        <button className="px-5 py-2 text-sm font-medium text-white transition-all duration-200 border rounded-lg bg-white/10 hover:bg-white/20 border-white/30 backdrop-blur-md">
          Login
        </button>

        <button className="px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-[#4F46E5] rounded-lg hover:bg-gray-200">
          Signup
        </button>
      </div>
    </div>
  );
}

export default Navbar;
