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
      imgTimeline.kill(); 
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        id="page2"
        className="bg-[radial-gradient(circle,_#6C4DFF_10%,_#000000_70%)] w-full h-[200vh] relative flex items-center justify-center"
      >
        <div id="scroll-container" className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <div id="gltf-pin-wrapper" className="sticky top-0 w-full h-[200vh]">
            <GltfScene />
          </div>
        </div>
        <div
          id="page1-text"
          className="absolute top-[3vh] left-1/2 -translate-x-1/2 text-[4vw] text-white tracking-[0.2vw] z-0 pointer-events-none select-none whitespace-nowrap"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          <h1
            className="px-2 text-2xl font-bold tracking-wide leading-tight text-center text-white select-none sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            OUR ACHIEVEMENT
          </h1>
          <div
            className="
              absolute 
              left-1/2 -translate-x-1/2
              top-[10vh] md:top-[30vh]
              md:flex  md:flex-row 
              gap-8 md:gap-[6vw] 
              z-0 pointer-events-none select-none 
              w-[95vw] max-w-6xl hidden
            "
            style={{ fontFamily: 'sans-serif' }}
          >
            {/* Left side */}
            <div className="flex flex-col gap-6 md:gap-[2vw] text-base md:text-[1.5vw] text-white tracking-wide md:tracking-[0.1vw] whitespace-normal md:whitespace-nowrap w-full md:w-1/2 text-center md:text-left">
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>
                  E-Cell at Startup Mela at SJU
                </span>
                <div className="text-sm md:text-[1vw] text-white/80 font-normal m-0">
                  E-Cell excelled at Startup Mela, SJU—pitching, networking,
                  <span className="hidden md:inline"><br /></span>
                  <span className="inline md:hidden"> </span>
                  and learning.
                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>
                  E-Cell at Startup Junction at IITBHU
                </span>
                <div className="text-sm md:text-[1vw] text-white/80 font-normal m-0">
                  Bikesh Kumar startup ShareWallet qualified for the
                  <span className="hidden md:inline"><br /></span>
                  <span className="inline md:hidden"> </span>
                  IIT BHU Zonal Startup Junction.
                </div>
              </div>
              <div id="animated-line" className="hidden md:block">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>
                  E-Cell at Blueprint at IITD(zonal)
                </span>
                <div className="text-sm md:text-[1vw] text-white/80 font-normal m-0">
                  Team ECell SMVIT reached IIT Delhi Blueprint
                </div>
              </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col gap-6 md:gap-[2vw] text-base md:text-[1.5vw] text-white tracking-wide md:tracking-[0.1vw] whitespace-normal md:whitespace-nowrap w-full md:w-1/2 text-center md:text-left">
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>
                  E-Cell  Blueprint Final at IITD
                </span>
                <div className="text-sm md:text-[1vw] text-white/80 font-normal m-0">
                  Share Wallet by Bikesh Kumar reached the Blueprint
                  <span className="hidden md:inline"><br /></span>
                  <span className="inline md:hidden"> </span>
                  2025 finals at IIT Delhi!
                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>
                  NEC finals at IITB
                </span>
                <div className="text-sm md:text-[1vw] text-white/80 font-normal m-0">
                  Reached NEC 2025 Finals at IIT Bombay—38th out
                  <span className="hidden md:inline"><br /></span>
                  <span className="inline md:hidden"> </span>
                  of 1500+ E-Cells. Represented by 12 members at E-Summit.
                </div>
              </div>
              <div id="animated-line">
                <span className="font-bold" style={{ fontFamily: 'Anton, sans-serif' }}>
                  winners of the IPL Auction at IITB
                </span>
                <div className="text-sm md:text-[1vw] text-white/80 font-normal m-0">
                  Shashwat, Satvik, and Anant won the IPL Auction at IITB!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
  className="flex absolute bottom-0 md:left-0 justify-center items-center w-screen h-[80vh] md:h-screen 
             bg-gradient-to-br from-[#6D4DFE]/40 via-white/10 to-[#6D4DFE]/10 
             backdrop-blur-lg border border-white/20 rounded-2xl 
             shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-[3]"
  id="bg1"
>

          <h1
            className="text-[10vw] md:text-[5vw] text-white uppercase text-center absolute bottom-0 md:left-[30%] md:-translate-x-1/2 md:-translate-y-1/2 z-0"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            WINNER OF IPL AUCTION,IITB
          </h1>
          <img
            className="w-[90vw] h-[54vw] md:w-[50vw] md:h-[30vw] object-cover rounded-[4vw] md:rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/476971099_17995442297755800_2833424896387556065_n.png?updatedAt=1751375625880"
            alt=""
          />
        </div>
        <div
  className="flex absolute bottom-0 md:left-0 justify-center items-center w-screen h-[80vh] md:h-screen 
             bg-gradient-to-br from-[#6D4DFE]/40 via-white/10 to-[#6D4DFE]/10 
             backdrop-blur-lg border border-white/20 rounded-2xl 
             shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-[3]"
  id="bg1"
>

          <h1
            className="text-[10vw] md:text-[5vw] text-white uppercase text-center absolute bottom-0 md:left-[30%] md:-translate-x-1/2 md:-translate-y-1/2 z-0"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            CASE COMPETITION FINALIST, IITR
          </h1>
          <img
            className="w-[90vw] h-[54vw] md:w-[50vw] md:h-[30vw] object-cover rounded-[4vw] md:rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/484165290_17999063099755800_2469744340898086729_n.png?updatedAt=1751375906011"
            alt=""
          />
        </div>
        <div
  className="flex absolute bottom-0 md:left-0 justify-center items-center w-screen h-[80vh] md:h-screen 
             bg-gradient-to-br from-[#6D4DFE]/40 via-white/10 to-[#6D4DFE]/10 
             backdrop-blur-lg border border-white/20 rounded-2xl 
             shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-[3]"
  id="bg1"
>

          <h1
            className="text-[10vw] md:text-[5vw] text-white uppercase text-center absolute bottom-0 md:left-[30%] md:-translate-x-1/2 md:-translate-y-1/2 z-0"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            BLUE PRINT FINALIST,IITD
          </h1>
          <img
            className="w-[90vw] h-[54vw] md:w-[50vw] md:h-[30vw] object-cover rounded-[4vw] md:rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202025-07-01%20at%2018.53.39_a50fd182.png?updatedAt=1751376280226"
            alt=""
          />
        </div>
        <div
  className="flex absolute bottom-0 md:left-0 justify-center items-center w-screen h-[80vh] md:h-screen 
             bg-gradient-to-br from-[#6D4DFE]/40 via-white/10 to-[#6D4DFE]/10 
             backdrop-blur-lg border border-white/20 rounded-2xl 
             shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-[3]"
  id="bg1"
>

          <h1
            className="text-[10vw] md:text-[5vw] text-white uppercase text-center absolute bottom-0 md:left-[30%] md:-translate-x-1/2 md:-translate-y-1/2 z-0"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            STARTUP MELA, SJU
          </h1>
          <img
            className="w-[90vw] h-[54vw] md:w-[50vw] md:h-[30vw] object-cover rounded-[4vw] md:rounded-[2vw]"
            id="img1"
            src="https://ik.imagekit.io/jwt52yyie/464984466_560928352994412_508468383643153030_n.png?updatedAt=1751376431935"
            alt=""
          />
        </div>
        <div
          id="page2-text"
          className="flex absolute bottom-60 left-1/2 z-10 flex-col items-center w-full -translate-x-1/2 pointer-events-none select-none"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          <h1
            className="
              text-[6vw] 
              md:text-[4vw] 
              text-white 
              tracking-[0.2vw] 
              whitespace-nowrap 
              mb-4 
              md:mb-8
              absolute 
              md:static 
              -top-40 
              left-1/2 
              -translate-x-1/2 
              md:translate-x-0
              w-full 
              text-center
              z-20
            "
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            STARTUP BACKED BY E-CELL
          </h1>
          <div className="flex flex-row gap-16 justify-center items-end w-full pointer-events-auto md:gap-40">
            {/* Left Images */}
            <div className="flex flex-col gap-10 md:gap-10">
              <div className="w-[20vw] md:w-[8vw] rounded-[3vw] md:rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/Artboard%2018%20copy%205_3%20(3).svg"
                  alt="Left 1"
                  className="w-full h-full object-cover rounded-[3vw] md:rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
              <div className="w-[20vw] md:w-[8vw] rounded-[3vw] md:rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/Group%207.svg"
                  alt="Left 2"
                  className="w-full h-full object-cover rounded-[3vw] md:rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
            </div>
            {/* Center Spacer */}
            <div className="w-[4vw] md:w-[10vw]"></div>
            {/* Right Images */}
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="w-[20vw] md:w-[8vw] rounded-[3vw] md:rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/Logo%20gradient.svg"
                  alt="Right 1"
                  className="w-full h-full object-cover rounded-[3vw] md:rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
                />
              </div>
              <div className="w-[20vw] md:w-[8vw] rounded-[3vw] md:rounded-[1vw] overflow-hidden">
                <img
                  src="https://www.ecellsmvit.in/brand%20images/aers2.png"
                  alt="Right 2"
                  className="w-full h-full object-cover rounded-[3vw] md:rounded-[1vw] shadow-[0_4px_30px_rgba(255,0,0,0.7)]"
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
