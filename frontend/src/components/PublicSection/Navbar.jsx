import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const handleScrollToSection = (id) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 150);

      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const navItems = [
    {
      label: "Home",
      action: () => handleScrollToSection("home"),
    },
    {
      label: "Events",
      action: () => handleScrollToSection("events"),
    },
    {
      label: "Our Team",
      action: () => handleNavigate("/ourteam"),
    },
    {
      label: "Alumni",
      action: () => handleNavigate("/alumni"),
    },
  ];

  return (
    <nav
      className={`
        fixed z-50 top-5 left-1/2
        -translate-x-1/2
        w-[92%] max-w-6xl
        rounded-2xl
        border border-[#E7E3F2]
        bg-[#F8F7FB]/95
        backdrop-blur-md
        transition-all duration-300
        ${scrolled ? "shadow-lg" : "shadow-sm"}
      `}
    >
      <div className="h-[68px] px-5 md:px-7 flex items-center justify-between">

        {/* LOGO */}
        <button
          onClick={() => handleScrollToSection("home")}
          className="flex items-center gap-3 group"
        >
          <div
            className="
              w-10 h-10
              rounded-xl
              bg-[#6D4CFF]
              flex items-center justify-center
              overflow-hidden
              transition-transform duration-300
              group-hover:scale-105
            "
          >
            <img
              src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
              alt="E-Cell SMVIT"
              className="w-7 h-7 object-contain"
            />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-[#111111] text-sm font-black tracking-tight">
              E-CELL
            </p>

            <p className="text-[#777777] text-[9px] tracking-[0.22em] uppercase">
              SMVIT
            </p>
          </div>
        </button>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="
                relative
                px-4 py-2
                text-sm
                font-medium
                text-[#555555]
                hover:text-[#6D4CFF]
                transition-colors duration-300
                group
              "
            >
              {item.label}

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  -translate-x-1/2
                  w-0 h-[2px]
                  rounded-full
                  bg-[#6D4CFF]
                  transition-all duration-300
                  group-hover:w-5
                "
              />
            </button>
          ))}
        </div>

        {/* CONTACT CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleScrollToSection("contact")}
            className="
              group
              flex items-center gap-2
              px-5 py-2.5
              rounded-xl
              bg-[#111111]
              text-white
              text-sm font-semibold
              border border-[#111111]
              hover:bg-[#6D4CFF]
              hover:border-[#6D4CFF]
              transition-all duration-300
            "
          >
            Contact Us

            <ArrowUpRight
              size={15}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </button>
        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="
            md:hidden
            w-10 h-10
            rounded-xl
            border border-[#E0DCEF]
            flex items-center justify-center
            text-[#111111]
            hover:bg-[#6D4CFF]
            hover:text-white
            hover:border-[#6D4CFF]
            transition-all duration-300
          "
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300
          ${
            mobileOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-4 pb-4 pt-2 border-t border-[#E7E3F2]">
          <div className="flex flex-col gap-1">

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="
                  w-full
                  text-left
                  px-4 py-3
                  rounded-xl
                  text-sm
                  font-medium
                  text-[#555555]
                  hover:text-[#6D4CFF]
                  hover:bg-[#F0EDFF]
                  transition
                "
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Contact */}
            <button
              onClick={() => handleScrollToSection("contact")}
              className="
                mt-2
                w-full
                flex items-center justify-center gap-2
                px-4 py-3
                rounded-xl
                bg-[#6D4CFF]
                text-white
                text-sm font-semibold
                hover:bg-[#5B3DE0]
                transition
              "
            >
              Contact Us
              <ArrowUpRight size={15} />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;