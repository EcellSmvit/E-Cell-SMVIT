import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Scroll to section by id
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute z-20 top-6 left-1/2 transform -translate-x-1/2 h-16 w-[90vw]
                bg-gradient-to-r from-white/10 to-white/5
                backdrop-blur-xl rounded-2xl
                flex items-center justify-between px-4 md:px-8
                text-white
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

      <div className="font-sans text-2xl font-bold tracking-wide drop-shadow-sm">
        <img className='w-8' src="https://www.ecellsmvit.in/images/ecellwhite.png" alt="Ecell Logo" />
      </div>

      {/* Navigation Links - hidden on small screens */}
      <div className="hidden md:flex">
        <ul className='flex items-center justify-center gap-6 text-sm md:gap-8 md:text-base'>
          <li
            className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => handleScroll('home')}
          >
            Home
          </li>
          <li
            className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => handleScroll('events')}
          >
            Events
          </li>
          <li
            className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => handleScroll('our-teams')}
          >
            Our Teams
          </li>
          <li
            className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
            onClick={() => handleScroll('gallery')}
          >
            Gallery
          </li>
        </ul>
      </div>

      {/* Single Auth Button */}
      <div className="flex items-center">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm md:text-base font-semibold text-white transition-all duration-200 bg-[#4F46E5] rounded-full hover:bg-gray-200 hover:text-[#4F46E5] flex items-center justify-center"
        >
         Login/Signup
        </button>
      </div>
    </div>
  );
}

export default Navbar;
