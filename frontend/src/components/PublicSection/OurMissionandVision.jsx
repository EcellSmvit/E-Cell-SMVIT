import React, { useEffect, useRef } from "react";
import { RetroGrid } from "@/components/magicui/retro-grid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function OurMissionandVision() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6000",
          pin: true,
          scrub: true,
        },
      });

      sectionsRef.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { z: -800, opacity: 0, scale: 0.1 },
          { z: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
        if (i < sectionsRef.current.length - 1) {
          tl.to(el, {
            z: 500,
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.in",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background perspective-[1000px]"
    >
      <span
        ref={(el) => (sectionsRef.current[0] = el)}
        className="absolute z-10 text-6xl font-bold text-center text-white"
      >
        <span className="bg-[#6D4DFE] text-white">OUR</span> MISSION
      </span>
      <span
        ref={(el) => (sectionsRef.current[1] = el)}
        className="absolute z-10 w-1/2 text-2xl font-bold text-justify text-white"
      >
        Our mission is to create a self-sustaining campus hub that fosters
        entrepreneurship by connecting students with industry experts,
        understanding market demands, and providing hands-on training to launch
        start-ups seamlessly.
      </span>
      <span
        ref={(el) => (sectionsRef.current[2] = el)}
        className="absolute z-10 text-6xl font-bold text-center text-white"
      >
        <span className="bg-[#6D4DFE] text-white">OUR</span> VISION
      </span>
      <span
        ref={(el) => (sectionsRef.current[3] = el)}
        className="absolute z-10 w-1/2 text-2xl font-bold text-justify text-white"
      >
        Our vision is to create a self-sustaining club that supports
        entrepreneurs through workshops, innovation labs, and networking
        opportunities like ideathons and hackathons. We aim to host an annual
        E-Summit, building partnerships, generating revenue, and showcasing our
        ability to manage large-scale projects. Additionally, we will offer
        micro-grant programs, on-campus incubators, and a strong alumni network
        for mentorship, investment, and partnerships to support ventures beyond
        campus.
      </span>
      <RetroGrid />
    </div>
  );
}

export default OurMissionandVision;
