import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AchievementSection = () => {
  useEffect(() => {
    const imgTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#page2",
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: true,
        // markers: true,
      }
    });

    imgTimeline
      .to("#bg4", { y: -700, ease: "power2.out" }, 0)
      .to("#bg3", { y: -700, ease: "power2.out" }, 0.4)
      .to("#bg4", { opacity: 0, ease: "power2.out" }, 0.4)
      .to("#bg2", { y: -700, ease: "power2.out" }, 0.8)
      .to("#bg3", { opacity: 0, ease: "power2.out" }, 0.8)
      .to("#bg1", { y: -700, ease: "power2.out" }, 1.2)
      .to("#bg2", { opacity: 0, ease: "power2.out" }, 1.2);

    return () => {
      imgTimeline.kill(); // Clean up the timeline
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all scroll triggers
    };
  }, []);

  // Use font-[anton] utility class (if Tailwind config is set up) or fallback to style attribute
  // Here, we use style={{ fontFamily: 'Anton, sans-serif' }} for reliability

  return (
    <div className="overflow-hidden">
      <div
        id="page2"
        className="bg-[radial-gradient(circle,_#6C4DFF_0%,_#000000_100%)] w-full h-[200vh] relative flex items-center justify-center"
      >
        <div
          id="page1-text"
          className="absolute top-[3vh] left-1/2 -translate-x-1/2 text-[4vw] text-white tracking-[0.2vw] z-0 pointer-events-none select-none whitespace-nowrap"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          <h1>OUR ACHIEVEMENT</h1>
          {/* <ul
            className="absolute top-[15vh] left-[3vw] text-[1.5vw] text-white tracking-[0.1vw] z-0 pointer-events-none select-none whitespace-nowrap"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            <li>
              <span>IIT</span>
              <div className="text-[1vw] text-white/80 font-normal m-0">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, fugit?
              </div>
            </li>
            <li>hello</li>
            <li>hii</li>
            <li>bikesh</li>
            <li>kumat</li>
          </ul> */}
        </div>
        <div
          className="flex absolute bottom-0 left-0 justify-center items-center w-screen h-screen bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-[3]"
          id="bg1"
        >
          <h1
            className="text-[5vw] text-white uppercase text-center absolute bottom-0 left-[30%] -translate-x-1/2 -translate-y-1/2 z-0 "
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            WINNER OF IPL AUCTION,IITB
          </h1>
          <img
            className="w-[50vw] h-[30vw] object-cover rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/476971099_17995442297755800_2833424896387556065_n.png?updatedAt=1751375625880"
            alt=""
          />
        </div>
        <div
          className="flex absolute bottom-0 left-0 justify-center items-center w-screen h-screen bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-[2]"
          id="bg2"
        >
          <h1
            className="text-[5vw] text-white uppercase text-center absolute bottom-0 left-[30%] -translate-x-1/2 -translate-y-1/2 z-0 "
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            CASE COMPETITION FINALIST, IITR
          </h1>
          <img
            className="w-[50vw] h-[30vw] object-cover rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/484165290_17999063099755800_2469744340898086729_n.png?updatedAt=1751375906011"
            alt=""
          />
        </div>
        <div
          className="flex absolute bottom-0 left-0 justify-center items-center w-screen h-screen bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-[1]"
          id="bg3"
        >
          <h1
            className="text-[5vw] text-white uppercase text-center absolute bottom-0 left-[30%] -translate-x-1/2 -translate-y-1/2 z-0 "
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            BLUE PRINT FINALIST,IITD
          </h1>
          <img
            className="w-[50vw] h-[30vw] object-cover rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202025-07-01%20at%2018.53.39_a50fd182.png?updatedAt=1751376280226"
            alt=""
          />
        </div>
        <div
          className="flex absolute bottom-0 left-0 justify-center items-center w-screen h-screen bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-[0]"
          id="bg4"
        >
          <h1
            className="text-[5vw] text-white uppercase text-center absolute bottom-0 left-[30%] -translate-x-1/2 -translate-y-1/2 z-0"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            STARTUP MELA, SJU
          </h1>
          <img
            className="w-[50vw] h-[30vw] object-cover rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/464984466_560928352994412_508468383643153030_n.png?updatedAt=1751376431935"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default AchievementSection;
