import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setExpanded(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navbarBase =
    "absolute z-20 top-6 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out";
  const navbarExpanded =
    "h-16 w-[90vw] bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-between px-4 md:px-8 text-white opacity-100 pointer-events-auto";
  const navbarCollapsed =
    "h-16 w-16 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-full flex items-center justify-center px-0 text-white opacity-90 pointer-events-auto";

  return (
    <div
      className={
        navbarBase +
        " " +
        (expanded ? navbarExpanded : navbarCollapsed)
      }
      style={{
        boxShadow: expanded
          ? "0 4px 24px 0 rgba(77, 77, 77, 0.10)"
          : "0 2px 8px 0 rgba(77, 77, 77, 0.10)",
        transitionProperty: "width, background, border-radius, box-shadow, opacity, padding",
      }}
    >
      <div className={`flex items-center w-full transition-all duration-500 ${expanded ? "justify-between" : "justify-center"}`}>
        <div className={`hidden md:flex flex-1 transition-all duration-500 ${expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <ul className="flex gap-6 justify-evenly items-center w-full text-sm md:gap-8 md:text-base">
            <li
              className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => handleScrollToSection('home')}
            >
              Home
            </li>
            <li
              className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => handleScrollToSection('events')}
            >
              Events
            </li>
            <li
              className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => handleScrollToSection('our-teams')}
            >
              Our Teams
            </li>
            <li
              className="cursor-pointer relative after:content-[''] after:block after:h-[2px] after:bg-[#4F46E5] after:w-0 after:transition-all after:duration-300 hover:after:w-full"
              onClick={() => handleScrollToSection('gallery')}
            >
              Gallery
            </li>
          </ul>
        </div>
        <div className={`flex ${expanded ? "flex-1 justify-center" : "justify-center"} transition-all duration-500`}>
        <div className="flex absolute top-1/2 left-1/2 justify-center items-center -translate-x-1/2 -translate-y-1/2">
  <img
    className="w-8 transition-all duration-500"
    src="https://www.ecellsmvit.in/images/ecellwhite.png"
    alt="Ecell Logo"
  />
</div>
        </div>
        <div className={`flex flex-1 justify-end items-center transition-all duration-500 ${expanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          
          <InteractiveHoverButton
          
            onClick={() => navigate('/login')}
          >Login/Signup</InteractiveHoverButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
