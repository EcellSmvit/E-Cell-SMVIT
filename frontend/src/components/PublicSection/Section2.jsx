import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const lenis = new Lenis({ autoRaf: true });
  lenis.on("scroll", (e) => console.log(e));

  useEffect(() => {
    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#page6",
        start: "top top",
        end: "bottom top",
        scrub: true,
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

    {/* Page 6 - Video with margin below */}
    <div
      id="page6"
      className="flex relative justify-center items-center w-full bg-black h-fit sm:min-h-screen mb-[10vh]"
    >
      <video
        src="https://ik.imagekit.io/96gea10vb/images/videos/ecellintro.mp4?updatedAt=1747323394315"
        autoPlay
        muted
        loop
        preload="auto"
        aria-label="Promotional video for leadership program"
        className="w-[80%] max-w-[90vw] max-h-[80vh] aspect-video object-cover rounded-[1vw] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
      />
    </div>

    {/* Page 7 - About Section */}
    <div
      id="page7"
      className="w-full bg-gradient-to-b from-black via-[#1f1c4d] to-[#6C4DFF] flex items-start justify-start py-16 sm:min-h-screen"
    >
      <div
        id="txt-7"
        className="px-4 sm:px-8 md:pl-16 max-w-[1200px] w-full"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
          About E-CELL SMVIT
        </h1>
        <p className="pt-4 sm:pt-8 text-base sm:text-lg lg:text-xl font-medium text-white w-full sm:w-4/5 md:w-2/3 lg:w-1/2 leading-relaxed">
          The SMVIT Entrepreneurship Cell (E-Cell) is a dynamic platform for
          aspiring entrepreneurs. Re-established in 2021, it has represented
          SMVIT at top events like NEC by IIT Madras & Bombay, securing 16th
          place at IIT Bombay, and gaining exposure through startup expos. On
          campus, E-Cell organizes competitions and networking events to help
          students turn ideas into impactful ventures. More than just a club,
          E-Cell is a launchpad for students building innovative and meaningful
          startups.
        </p>
      </div>
    </div>

  </div>
</div>

  );
};

export default Section2;
