import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate(); // ✅ hook for navigation

  return (
    <div className="absolute z-20 top-6 left-1/2 transform -translate-x-1/2 h-16 w-[90vw] 
                bg-gradient-to-r from-white/10 to-white/5 
                backdrop-blur-xl rounded-2xl 
                flex items-center justify-between px-4 md:px-8 
                text-white 
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

      <div className="font-sans text-2xl font-bold tracking-wide drop-shadow-sm">
        <img className='w-8' src="https://www.ecellsmvit.in/images/ecellwhite.png" alt="" />
      </div>

      {/* Navigation Links - hidden on small screens */}
      <div className="hidden md:flex">
        <ul className='flex items-center justify-center gap-6 text-sm md:gap-8 md:text-base'>
          <li className="cursor-pointer hover:underline">Home</li>
          <li className="cursor-pointer hover:underline">Events</li>
          <li className="cursor-pointer hover:underline">Our Teams</li>
          <li className="cursor-pointer hover:underline">Gallery</li>
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-1.5 text-xs md:text-sm font-medium text-[#4F46E5] bg-white"
        >
          Login
        </button>

        <button
          onClick={() => navigate('/login')}
          className="px-4 py-1.5 text-xs md:text-sm font-medium text-white transition-all duration-200 bg-[#4F46E5] rounded-lg hover:bg-gray-200"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Navbar;
