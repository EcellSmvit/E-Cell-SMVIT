import React from 'react';

function Navbar() {
  return (
    <nav className="w-[95vw] fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-between px-8 py-3 rounded-full">
      <div className="flex-shrink-0">
        <img
          src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
          alt="StarPitch Logo"
          className="h-12 w-12"
        />
      </div>
      <div className=" space-x-7 md:flex hidden">
        <a href="/" className="text-white text-lg  hover:text-yellow-400 transition">Home</a>
        <a href="#event" className="text-white text-lg  hover:text-yellow-400 transition">Event Details</a>
        <a href="#about" className="text-white text-lg  hover:text-yellow-400 transition">About</a>
        <a href="#team" className="text-white text-lg  hover:text-yellow-400 transition">Team</a>
        <a href="#contact" className="text-white text-lg  hover:text-yellow-400 transition">Contact</a>
      </div>
      <div className="flex-shrink-0">
        <a
          href="#register"
          className="bg-white/20 border border-white/30 hover:bg-white/40 text-white px-6 py-2 rounded-full  text-lg backdrop-blur-2xl shadow transition"
          style={{
            boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.20), 0 4px 12px 0 rgba(255, 255, 255, 0.10)'
          }}
        >
          Registration
        </a>
      </div>
    </nav>
  )
}

export default Navbar