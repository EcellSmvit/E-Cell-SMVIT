import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ShinyText component remains the same, providing a cool text effect
const ShinyText = ({ children, className = "" }) => (
  <span
    className={`inline-block relative shiny-text ${className}`}
    style={{
      background: 'linear-gradient(90deg, #fff 20%, #6C4DFF 40%, #fff 60%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'shine 2.5s linear infinite',
      fontWeight: 'inherit',
    }}
  >
    {children}
    <style>
      {`
        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}
    </style>
  </span>
);

function Section6() {
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const connectTextRef = useRef(null);
  const paragraphRef = useRef(null);
  const inputRefs = useRef([]); // To store refs for all input fields
  const buttonRef = useRef(null);

  // Helper to set refs for input fields dynamically
  const setInputRef = (el, idx) => (inputRefs.current[idx] = el);

  useEffect(() => {
    let observer;

    const animateSection = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate main heading
      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "start"
      )
      // Animate "Let's Connect!" text
      .fromTo(
        connectTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "<0.2" // Starts 0.2 seconds before the previous animation ends
      )
      // Animate descriptive paragraph
      .fromTo(
        paragraphRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "<0.2"
      )
      // Animate form inputs (staggered)
      .fromTo(
        inputRefs.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        "<0.3"
      )
      // Animate send message button
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "<0.2"
      );
    };

    // Intersection Observer to trigger animation when section enters viewport
    if (sectionRef.current) {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateSection();
              obs.disconnect(); // Disconnect after animation to run only once
            }
          });
        },
        {
          threshold: 0.2 // Trigger when 20% of the section is visible
        }
      );
      observer.observe(sectionRef.current);
    }

    // Cleanup function for the observer
    return () => {
      if (observer) observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div
      id='contact-section' // Changed ID for clarity
      ref={sectionRef}
      className='w-full min-h-screen bg-gradient-to-br from-[#6C4DFF] via-black to-black flex flex-col items-center justify-center p-6 md:p-12 lg:p-20'
    >
      <h1
        ref={headingRef}
        className='p-2 mb-8 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-center text-white drop-shadow-lg'
      >
        CONTACT <span className="text-[#6C4DFF]">US</span>
      </h1>

      <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 justify-center w-full max-w-7xl items-center lg:items-start'>
        {/* Left Text Content */}
        <div className="flex flex-1 flex-col items-center lg:items-start text-center lg:text-left">
          <h2 ref={connectTextRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow">
            <ShinyText>Let's Connect!</ShinyText>
          </h2>
          <p ref={paragraphRef} className="max-w-lg text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white/80 mb-8">
            Have questions, ideas, or want to collaborate with{' '}
            <span className="text-[#6C4DFF] font-semibold">
              <ShinyText>E-CELL SMVIT</ShinyText>
            </span>
            ? <br />
            Reach out to us and our team will get back to you as soon as possible.
            <br /><br />
            <span className="italic text-white/60">
              <ShinyText>We love hearing from passionate entrepreneurs, students, and partners!</ShinyText>
            </span>
          </p>
        </div>

        {/* Right Contact Form */}
        <div className="flex flex-1 justify-center w-full lg:w-auto">
          <div className="p-6 md:p-8 space-y-5 md:space-y-6 w-full max-w-md rounded-2xl border shadow-2xl backdrop-blur-lg bg-white/10 border-white/20">
            <input
              type="text"
              placeholder="Name"
              ref={el => setInputRef(el, 0)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium transition-all duration-300 hover:border-[#6C4DFF]"
            />
            <input
              type="email"
              placeholder="Email"
              ref={el => setInputRef(el, 1)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium transition-all duration-300 hover:border-[#6C4DFF]"
            />
            <input
              type="text"
              placeholder="Subject"
              ref={el => setInputRef(el, 2)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium transition-all duration-300 hover:border-[#6C4DFF]"
            />
            <textarea
              placeholder="Message"
              rows="4"
              ref={el => setInputRef(el, 3)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] resize-none font-medium transition-all duration-300 hover:border-[#6C4DFF]"
            ></textarea>

            <button
              ref={buttonRef}
              className="w-full py-3 rounded-xl bg-[#6C4DFF] text-white font-semibold hover:bg-[#4E46E4] transition duration-300 shadow-lg tracking-wide text-lg transform hover:-translate-y-1 hover:shadow-xl"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section6;
