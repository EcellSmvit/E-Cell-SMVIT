import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function Footer() {
    const menuRefs = useRef([]);
    const h1Ref = useRef(null);
    const contactRefs = useRef([]);
    const socialRefs = useRef([]);
    const footerRef = useRef(null);

    // Helper to set refs for array items
    const setMenuRef = (el, idx) => (menuRefs.current[idx] = el);
    const setContactRef = (el, idx) => (contactRefs.current[idx] = el);
    const setSocialRef = (el, idx) => (socialRefs.current[idx] = el);

    useEffect(() => {
      let observer;
      // Animation function
      const animateFooter = () => {
        // Animate menu items one by one
        gsap.fromTo(
          menuRefs.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.2,
            ease: "power3.out"
          }
        );

        // Animate h1 after menu
        gsap.fromTo(
          h1Ref.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.2 + 0.15 * menuRefs.current.length,
            ease: "power3.out"
          }
        );

        // Animate contact info one by one after h1
        gsap.fromTo(
          contactRefs.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.2 + 0.15 * menuRefs.current.length + 0.7,
            ease: "power3.out"
          }
        );

        // Animate social links one by one at the end
        gsap.fromTo(
          socialRefs.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.2 + 0.15 * menuRefs.current.length + 0.7 + 0.12 * contactRefs.current.length,
            ease: "power3.out"
          }
        );
      };

      // Intersection Observer to trigger animation when #footer enters viewport
      if (footerRef.current) {
        observer = new window.IntersectionObserver(
          (entries, obs) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                animateFooter();
                obs.disconnect(); // Only animate once
              }
            });
          },
          {
            threshold: 0.2 // Adjust as needed
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
        className="relative w-[100vw] h-[100vh] overflow-hidden text-white font-['Anton',_sans-serif]"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #000 0%, #6A4CFE 100%)'
          }}
        />

        <img 
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 opacity-20 z-10' 
          src="https://www.ecellsmvit.in/images/Ecell%20Logo%20Vector.svg" 
          alt="E-Cell Logo" 
        />
        <div className='text-white text-xl flex gap-2 font-black flex-col p-4 relative z-20'>
          {["Home", "Events", "Our Team", "Gallery"].map((text, idx) => (
            <p key={text} ref={el => setMenuRef(el, idx)}>{text}</p>
          ))}
        </div>
        <h1
          ref={h1Ref}
          className='text-white text-[17vw] p-4 relative z-20 font-["Anton",_sans-serif] w-[90vw] mx-auto text-center'
        >
          E-CELL SMVIT
        </h1>
        {/* Contact and Email just below E-CELL SMVIT, row wise, white color, font sans */}
        <div className="relative z-20 w-full flex flex-row items-center justify-center mt-2 gap-8 font-sans">
          <p
            className="text-lg text-white font-semibold"
            ref={el => setContactRef(el, 0)}
          >
            Contact: +91 98765 43210
          </p>
          <p
            className="text-lg text-white font-semibold"
            ref={el => setContactRef(el, 1)}
          >
            Email: ecellsmvit@gmail.com
          </p>
        </div>
        <div className='w-full flex gap-60 justify-center text-white text-4xl  border-t-[1px] border-gray-300 absolute bottom-0 p-4 left-0 z-20'>
          <a
            href="https://www.instagram.com/ecellsmvit"
            target="_blank"
            rel="noopener noreferrer"
            ref={el => setSocialRef(el, 0)}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/ecellsmvit"
            target="_blank"
            rel="noopener noreferrer"
            ref={el => setSocialRef(el, 1)}
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/ecellsmvit"
            target="_blank"
            rel="noopener noreferrer"
            ref={el => setSocialRef(el, 2)}
          >
            Twitter
          </a>
        </div>
      </div>
    )
}

export default Footer