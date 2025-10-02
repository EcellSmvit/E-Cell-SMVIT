import React from 'react'

function FooterRecu() {
  return (
    <footer className="w-full bg-[#111111] text-white py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Name */}
        <div className="flex items-center gap-3">
          <img
            src="https://ik.imagekit.io/es6xialea/blacklogo.svg?updatedAt=1759263103995"
            alt="E-Cell SMVIT Logo"
            className="w-10 h-10 bg-white rounded-full p-1"
          />
          <span className="text-xl font-bold tracking-wide">E-Cell SMVIT</span>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 text-gray-300 text-base font-medium">
          <a href="https://www.instagram.com/ecell_smvit/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
          <a href="https://www.linkedin.com/company/e-cell-sirmvit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
          <a href="mailto:ecellsmvit@gmail.com" className="hover:text-white transition">Contact</a>
          <a href="https://ecellsmvit.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Website</a>
        </nav>
      </div>
      {/* Divider */}
      <div className="w-full max-w-5xl border-t border-gray-700 my-6"></div>
      {/* Bottom Info */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-sm text-gray-400 text-center md:text-left">
          &copy; {new Date().getFullYear()} E-Cell SMVIT. All rights reserved.
        </div>
        <div className="text-sm text-gray-400 text-center md:text-right">
          Made with <span className="text-red-500">&hearts;</span> by the E-Cell Tech Team
        </div>
      </div>
    </footer>
  )
}

export default FooterRecu