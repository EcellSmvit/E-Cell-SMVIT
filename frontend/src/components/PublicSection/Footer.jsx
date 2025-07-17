import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Footer() {
  const menuRefs = useRef([]);
  const h1Ref = useRef(null);
  const contactRefs = useRef([]);
  const socialRefs = useRef([]);
  const footerRef = useRef(null);
  const logoRef = useRef(null); // Ref for the background logo

  // Helper to set refs for array items
  const setMenuRef = (el, idx) => (menuRefs.current[idx] = el);
  const setContactRef = (el, idx) => (contactRefs.current[idx] = el);
  const setSocialRef = (el, idx) => (socialRefs.current[idx] = el);

  useEffect(() => {
    let observer;
    // Animation function
    const animateFooter = () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Animate logo first, slightly fading in
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 1.2, ease: "power2.out" },
        "start"
      )
      // Animate menu items
      .fromTo(
        menuRefs.current,
        { y: 50, opacity: 0, autoAlpha: 0 }, // Use autoAlpha for visibility
        { y: 0, opacity: 1, autoAlpha: 1, duration: 0.8, stagger: 0.1, delay: 0.2 },
        "start+=0.3" // Starts slightly after logo
      )
      // Animate h1 with a slight scale up
      .fromTo(
        h1Ref.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "<0.2" // Starts 0.2 seconds before menu ends
      )
      // Animate contact info
      .fromTo(
        contactRefs.current,
        { y: 40, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
        "<0.3" // Starts 0.3 seconds before h1 ends
      )
      // Animate social links
      .fromTo(
        socialRefs.current,
        { y: 40, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1 },
        "<0.3" // Starts 0.3 seconds before contact ends
      );
    };

    // Intersection Observer to trigger animation
    if (footerRef.current) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateFooter();
              obs.disconnect(); // Animate only once
            }
          });
        },
        {
          threshold: 0.25 // Trigger when 25% of the footer is visible
        }
      );
      observer.observe(footerRef.current);
    }

    // Cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      id='footer'
      ref={footerRef}
      className="relative w-screen min-h-screen flex flex-col justify-between overflow-hidden text-white font-['Anton',_sans-serif] select-none"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #000 0%, #6A4CFE 100%)'
        }}
      />

      {/* E-Cell Logo (Subtle Background Element) */}
      <img
        ref={logoRef}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[40rem] lg:w-[50rem] opacity-0 z-10 pointer-events-none'
        src="https://www.ecellsmvit.in/images/Ecell%20Logo%20Vector.svg"
        alt="E-Cell Logo"
      />

      {/* Main Content Wrapper - Centered */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow p-6 md:p-12 text-center">
        {/* Menu Items */}
        <nav className='flex flex-col md:flex-row gap-3 md:gap-8 lg:gap-12 font-black mb-10 text-xl md:text-2xl lg:text-3xl uppercase'>
          {["Home", "Events", "Our Team", "Gallery"].map((text, idx) => (
            <a key={text} ref={el => setMenuRef(el, idx)}
               href={`#${text.toLowerCase().replace(' ', '-')}`} // Example: scroll to section
               className="hover:text-purple-300 transition-colors duration-300 transform hover:-translate-y-1 inline-block"
            >
              {text}
            </a>
          ))}
        </nav>

        {/* Main Title */}
        <h1
          ref={h1Ref}
          className='text-white text-[18vw] md:text-[14vw] lg:text-[12vw] leading-none mb-10 tracking-wide md:tracking-wider'
        >
          E-CELL SMVIT
        </h1>

        {/* Contact and Email */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 font-sans text-base md:text-lg lg:text-xl font-medium">
          <p
            className="text-white hover:text-purple-200 transition-colors duration-300 cursor-pointer"
            ref={el => setContactRef(el, 0)}
          >
            Contact: +91 98765 43210
          </p>
          <p
            className="text-white hover:text-purple-200 transition-colors duration-300 cursor-pointer"
            ref={el => setContactRef(el, 1)}
          >
            Email: ecellsmvit@gmail.com
          </p>
        </div>
      </div>

      {/* Social Links and Footer Bottom */}
      <div className='relative z-20 w-full flex flex-row flex-wrap gap-x-16 md:gap-x-24 lg:gap-x-40 justify-center items-center text-white text-2xl md:text-3xl lg:text-4xl py-6 border-t-[1px] border-gray-700/50'>
        <a
          href="https://www.instagram.com/ecellsmvit"
          target="_blank"
          rel="noopener noreferrer"
          ref={el => setSocialRef(el, 0)}
          className="hover:text-purple-300 transition-colors duration-300 transform hover:scale-105 inline-block my-2"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/company/ecellsmvit"
          target="_blank"
          rel="noopener noreferrer"
          ref={el => setSocialRef(el, 1)}
          className="hover:text-purple-300 transition-colors duration-300 transform hover:scale-105 inline-block my-2"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/ecellsmvit"
          target="_blank"
          rel="noopener noreferrer"
          ref={el => setSocialRef(el, 2)}
          className="hover:text-purple-300 transition-colors duration-300 transform hover:scale-105 inline-block my-2"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}

export default Footer;