import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Highlighter } from "@/components/magicui/highlighter";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const lenis = new Lenis({ autoRaf: true });

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
        <img
          src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-7.avif?updatedAt=1747310815568"
          alt=""
          className="block sm:hidden"
        />
        <div
          id="page6"
          className="flex relative justify-center items-center w-full bg-black h-fit sm:min-h-screen mb-[10vh]"
        >
          <video
            src="https://ik.imagekit.io/es6xialea/Ecell.mov/ik-video.mp4?updatedAt=1763052632603"
            autoPlay
            muted
            loop
            preload="auto"
            aria-label="Promotional video for leadership program"
            className="w-[80%] max-w-[90vw] max-h-[80vh] aspect-video object-cover rounded-[1vw] hidden sm:block"
          />
        </div>

        <div
          id="page7"
          className="flex justify-start items-start py-16 w-full bg-black sm:min-h-screen"
        >
          <div
            id="txt-7"
            className="px-4 sm:px-8 md:pl-16 max-w-[1200px] w-full"
          >
            <h1 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              ABOUT <span className="bg-[#6D4DFE] w-60 p-2 text-white text-center">E-CELL SMVIT</span>
            </h1>
            <p className="pt-4 w-full font-medium leading-relaxed text-justify text-white sm:pt-8 sm:text-lg lg:text-2xl sm:w-4/5 md:w-2/3 lg:w-1/2">
              The{" "}
              <Highlighter action="underline" color="#FF9800">
                SMVIT Entrepreneurship Cell (E-Cell)
              </Highlighter>{" "}
              is a{" "}
              <Highlighter action="highlight" color="#87CEFA">
                dynamic platform
              </Highlighter>{" "}
              for aspiring entrepreneurs.{" "}
                Re-established in 2021
              
              , it has represented SMVIT at top events like{" "}
                NEC by IIT Madras & Bombay
             
              
              <Highlighter action="bracket" color="#9C27B0">
                16th place at IIT Bombay
              </Highlighter>
              , and gaining exposure through{" "}
              <Highlighter action="box" color="#F44336">
                startup expos
              </Highlighter>
              . On campus, E-Cell organizes competitions{" "}
              and{" "}
              <Highlighter action="highlight" color="#FFC107">
                networking events
              </Highlighter>{" "}
              to help students turn ideas into impactful ventures. More than just a club,{" "}
              <Highlighter action="underline" color="#FF9800">
                E-Cell is a launchpad
              </Highlighter>{" "}
              for students building innovative and meaningful startups.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section2;
