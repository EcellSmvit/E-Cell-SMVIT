import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    
    // Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    console.log(e);
  });

  useEffect(() => {
    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#page6",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // pin: true,
        markers: false, 
      },
    });

    videoTimeline.to("#page6 video", {
      x: "50%", 
      y: "125%",
      duration: 1,
      ease: "power1.inOut",
    });

   
    

      
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(["#page6 video", "#txt-7"]);
    };
  }, []);

  return (
    <div id="main">
      <div id="pages" className="relative z-[1]">
        <div
          id="page6"
          className="w-full h-screen bg-black flex items-center justify-center relative"
        >
          <video
            src="https://ik.imagekit.io/96gea10vb/images/videos/ecellintro.mp4?updatedAt=1747323394315"
            autoPlay
            muted
            loop
            className="absolute w-[80%] h-[80vh] object-cover rounded-[1vw]"
            aria-label="Promotional video for leadership program"
            preload="auto" // Optimize loading
          />
        </div>
        <div id="page7" className="w-full  h-[100vh] bg-gradient-to-b from-black to-[#4F46E5]
">
          <div id="txt-7" className="pt-[10vw] pl-[2vw] relative ">
            <h1 className="text-white text-3xl font-black ">About E-CELL SMVIT</h1>
            <p className="pt-[4vw] text-xl font-medium text-white text-wrap w-1/3 ">
            The SMVIT Entrepreneurship Cell (E-Cell) is a dynamic platform for aspiring entrepreneurs. Re-established in 2021, it has represented SMVIT at top events like NEC by IIT Madras & Bombay, securing 16th place at IIT Bombay, and gaining exposure through startup expos.On campus, E-Cell organizes competitions and networking events to help students turn ideas into impactful ventures.More than just a club, E-Cell is a launchpad for students building innovative and meaningful startups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;