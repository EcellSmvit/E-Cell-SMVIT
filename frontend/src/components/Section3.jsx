import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Section3 = () => {
    useEffect(() =>{
        gsap.to("#page1", {
            //   x: 300,
              scrollTrigger: {
                trigger: "#page1",
                start: "top top",
                end: "bottom top",
                scrub: 2,
                pin:true,
                // markers: true,
              }
            });

            const imgTimeline = gsap.timeline({
                scrollTrigger: {
                  trigger: "#page1",
                  start: "top top",
                  end: "bottom top",
                  scrub: 2,
                }
              });
              
              
              imgTimeline
                .to("#img4", {
                  y: -700,
                  duration:0.2,
                  ease: "power2.out"
                }, 0)
                .to("#img3", {
                  y: -700,
                  duration: 0.2,
                  ease: "power2.out"
                }, 0.2)
                .to("#img2", {
                  y: -700,
                  duration: 0.2,
                  ease: "power2.out"
                }, 0.4);
                // .to("#img1", {
                //   y: -700,
                //   duration: 0.2,
                //   ease: "power2.out"
                // }, 0.6);
              
                imgTimeline
                .to("#card3", {
                  y: -700,
                  duration:0.2,
                  ease: "power2.out"
                }, 0)
                .to("#card2", {
                  y: -700,
                  duration: 0.2,
                  ease: "power2.out"
                }, 0.2);
                // .to("#card1", {
                //   y: -700,
                //   duration: 0.2,
                //   ease: "power2.out"
                // }, 0.4);
                
    },[])

  return (
    <div id="page1" className="bg-black w-[100%] h-[100vh] relative flex">
        <div id="right" className="h-[100vh] w-1/2 flex items-center justify-center ">
            <div id="card1" className="flex items-center justify-center flex-col z-0 gap-10 p-4 w-[40rem] h-[20rem] absolute text-white bg-gradient-to-b from-black to-[#4F46E5] rounded-xl">
            <h1 className="text-2xl font-black">OUR VISION</h1>
            <p>
            Our vision is to create a self-sustaining club that supports entrepreneurs through workshops, innovation labs, and networking opportunities like ideathons and hackathons. We aim to host an annual E-Summit, building partnerships, generating revenue, and showcasing our ability to manage large-scale projects. Additionally, we will offer micro-grant programs, on-campus incubators, and a strong alumni network for mentorship, investment, and partnerships to support ventures beyond campus.
            </p>

            </div>
            <div id="card2" className="flex items-center justify-center z-10 flex-col gap-10 p-4 w-[40rem] h-[20rem] absolute text-white bg-gradient-to-b from-black to-[#4F46E5] rounded-xl">
            <h1 className="text-2xl font-black">OUR MISSION</h1>
            <p>Our mission is to create a self-sustaining campus hub that fosters entrepreneurship by connecting students with industry experts, understanding market demands, and providing hands-on training to launch start-ups seamlessly.</p>
            </div>
            <div id="card3" className="flex items-center flex-col gap-10 z-20 justify-center w-[40rem] h-[20rem] absolute text-white bg-gradient-to-b from-black to-[#4F46E5] rounded-xl">
                <h1 className="text-2xl font-black">STATISTICS</h1>
                <div className="flex gap-10 justify-center items-center text-2xl font-medium text-center">
                    <p>4+ <br /> Years</p>
                    <p>20+ <br /> Speakers</p>
                    <p>15+ <br /> Events</p>
                    <p>3000+ <br /> Footfall</p>
                </div>
            </div>
        </div>
        <div id="left" className="h-[100vh] w-1/2 flex items-center justify-center">
            <img className="w-[40rem] absolute z-0 rounded-[2vw] border-[10px] border-white" id="img1" src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-1.avif?updatedAt=1747310809335" alt="" />

            <img className="w-[40rem] absolute z-10 rounded-[2vw] border-[10px] border-white" id="img2" src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-6.avif?updatedAt=1747310815791" alt="" />

            <img className="w-[40rem] absolute z-20 rounded-[2vw] border-[10px] border-white" id="img3" src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-4.avif?updatedAt=1747310815104" alt="" />

            <img className="w-[40rem] absolute z-30 rounded-[2vw] border-[10px] border-white" id="img4" src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/ideaExpo-11.avif?updatedAt=1747310806941" alt="" />
        </div>
        <h1 className="text-[14rem] -z-10 text-gray-400 font-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
          E-CELL
        </h1>
    </div>
  )
}

export default Section3