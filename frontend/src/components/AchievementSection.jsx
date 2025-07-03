import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GltfScene from './GltfScene';


gsap.registerPlugin(ScrollTrigger);

const AchievementSection = () => {

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page2",
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      "#animated-line",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
        <div id="scroll-container" className=" absolute inset-0 w-full h-full pointer-events-none z-5">
          <div id="gltf-pin-wrapper" className="sticky top-0 w-full h-[200vh]">
            <GltfScene />
          </div>
        </div>
        <div
          id="page1-text"
          className="absolute top-[3vh] left-1/2 -translate-x-1/2 text-[4vw] text-white tracking-[0.2vw] z-0 pointer-events-none select-none whitespace-nowrap"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          <h1>OUR ACHIEVEMENT</h1>
          <div
            className="absolute top-[30vh] left-1/2 -translate-x-1/2 flex flex-row gap-[6vw] z-0 pointer-events-none select-none"
            style={{ fontFamily: ' sans-serif' }}
          >
            {/* Left side */}
            <div className="flex flex-col gap-[2vw] text-[1.5vw]  text-white tracking-[0.1vw] whitespace-nowrap">
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>E-Cell at Startup Mela at SJU</span>
                <div className="text-[1vw] text-white/80 font-normal m-0">
                E-Cell excelled at Startup Mela, SJU—pitching, networking, <br /> and learning.
                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>E-Cell at Startup Junction at IITBHU</span>
                <div className="text-[1vw] text-white/80 font-normal m-0">
                Bikesh Kumar startup ShareWallet qualified for the <br /> IIT BHU Zonal Startup Junction.

                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>E-Cell at Blueprint at IITD(zonal)</span>
                <div className="text-[1vw] text-white/80 font-normal m-0">
                  Team ECell SMVIT reached IIT Delhi Blueprint 
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col gap-[2vw] text-[1.5vw] text-white tracking-[0.1vw] whitespace-nowrap">
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>E-Cell  Blueprint Final at IITD</span>
                <div className="text-[1vw] text-white/80 font-normal m-0">
                Share Wallet by Bikesh Kumar reached the Blueprint <br /> 2025 finals at IIT Delhi!
                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>NEC finals at IITB </span>
                <div className="text-[1vw] text-white/80 font-normal m-0">
                Reached NEC 2025 Finals at IIT Bombay—38th out <br /> of 1500+ E-Cells. Represented by 12 members at E-Summit.
                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>winners of the IPL Auction at IITB</span>
                <div className="text-[1vw] text-white/80 font-normal m-0">
                Shashwat, Satvik, and Anant won the IPL Auction at IITB!
                </div>
              </div>
            </div>
          </div>
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
        <div
          id="page2-text"
          className="fixed bottom-60 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 w-full pointer-events-none select-none"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          <h1 className="text-[4vw] text-white tracking-[0.2vw] whitespace-nowrap mb-8">
            STARTUP BACKED BY E-CELL
          </h1>
          <div className="flex flex-row justify-center items-end w-full gap-40 pointer-events-auto">
            {/* Left Images */}
            <div className="flex flex-col gap-10">
              <div className="w-[8vw] rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/Artboard%2018%20copy%205_3%20(3).svg"
                  alt="Left 1"
                  className="w-full h-full object-cover rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
              <div className="w-[8vw]  rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/Group%207.svg"
                  alt="Left 2"
                  className="w-full h-full object-cover rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
            </div>
            {/* Center Spacer */}
            <div className="w-[10vw]"></div>
            {/* Right Images */}
            <div className="flex flex-col gap-8">
              <div className="w-[8vw] rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/Logo%20gradient.svg"
                  alt="Right 1"
                  className="w-full h-full object-cover rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
              <div className="w-[8vw]  rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/aers2.png"
                  alt="Right 2"
                  className="w-full h-full object-cover rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementSection;
