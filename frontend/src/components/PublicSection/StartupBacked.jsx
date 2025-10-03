import React, { useRef, useEffect, useState } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { SparklesText } from "@/components/magicui/sparkles-text";
import gsap from "gsap";
import { WordRotate } from "@/components/magicui/word-rotate";

const startups = [
  {
    bg: "#FFAB76",
    img: "https://ik.imagekit.io/es6xialea/Artboard%2018%20copy%205_3%20(3).svg?updatedAt=1758128361100",
    name: "Raahe.co",
    founder: "TANISH RAJ",
    founderRole: "Founder",
    website: "https://raahe.co/",
    linkedin: "https://www.linkedin.com/in/tanish-raj-598617224/",
  },
  {
    bg: "#E84393",
    img: "https://ik.imagekit.io/es6xialea/Tvara%20Logo%201.png?updatedAt=1754836706096",
    name: "Tvara",
    founder: "SHASHIDHAR HEGDE",
    founderRole: "Co-Founder",
    website: "https://www.tvara.org/",
    linkedin: "https://www.linkedin.com/in/shashidhar-hegde-9b4645270/",
  },
  {
    bg: "#50E3C2",
    img: "https://ik.imagekit.io/es6xialea/aers2.png?updatedAt=1758128295486",
    name: "AERS",
    founder: "SATVIK GUPTA",
    founderRole: "Founder",
    website: "https://aers.netlify.app/",
    linkedin: "https://www.linkedin.com/in/satvik--gupta/",
  },
  {
    bg: "#6D4DFE",
    img: "https://ik.imagekit.io/sharewallet/Group%2076.png?updatedAt=1749897228344",
    name: "ShareWallet",
    founder: "BIKESH KUMAR",
    founderRole: "Founder",
    website: "#",
    linkedin: "https://www.linkedin.com/in/bikesh-kumar-37b71428b/",
  },
];

function StartupBacked() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const imgRef = useRef(null);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { y: 400, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, [current]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (imgRef.current && !animating) {
        setAnimating(true);
        gsap.to(imgRef.current, {
          y: -400,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
          onComplete: () => {
            setCurrent((prev) => (prev + 1) % startups.length);
            setAnimating(false);
          },
        });
      }
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [animating]);

  return (
    <div>
      <div className="flex overflow-hidden relative flex-row justify-center items-center p-20 rounded-lg size-full bg-background">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
        <div className="flex flex-col gap-10 justify-around items-center w-full md:flex-row md:gap-20">
          
          <div className="flex flex-col flex-1 justify-center items-start mb-8 min-h-full md:mb-0">
            <SparklesText
              sparklesCount={15}
              className="text-base font-semibold text-white sm:text-lg md:text-xl lg:text-6xl"
            >
              STARTUP BACKED BY
            </SparklesText>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white bg-[#6D4DFE] p-2 sm:p-4 w-full md:w-[28rem]">
              E-CELL SMVIT
            </h1>
          </div>
          
          <div className="flex flex-col flex-1 justify-center items-center w-full">
            <div
              className="flex relative justify-center items-center w-full"
              style={{ maxWidth: "700px", minHeight: "180px", height: "180px" }}
            >
              <img
                ref={imgRef}
                key={startups[current].img}
                className="object-contain w-40 h-40"
                src={startups[current].img}
                alt={startups[current].name}
                style={{
                  borderRadius: "1rem",
                  boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                  padding: "1rem",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
            {/* <div className="text-xl font-bold text-center text-white">
              {startups[current].name}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupBacked;
