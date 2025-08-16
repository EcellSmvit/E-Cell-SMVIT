import React from "react";
import { InteractiveGridPattern } from "../magicui/interactive-grid-pattern";
import { Linkedin } from "lucide-react";

// Dummy data for heads
const heads = [
  {
    name: "SHASHIDHAR HEGDE",
    role: "Secretary",
    img: "https://ik.imagekit.io/es6xialea/P1200576.JPG?updatedAt=1754729277612",
    linkedin: "https://www.linkedin.com/in/shashidhar-hegde-9b4645270/",
  },
  {
    name: "TANISH RAJ",
    role: "Head Of Corporate Relations",
    img: "https://ik.imagekit.io/es6xialea/TANISH%20RAJ_TMGOU9Rzo?updatedAt=1754729813985",
    linkedin: "https://www.linkedin.com/in/tanish-raj-598617224/",
  },
  {
    name: "KANISHK CHAUDHARY",
    role: "Head Of Operations",
    img: "https://ik.imagekit.io/es6xialea/KANISHK%20CHAUDHARY_0qGgdIniO?updatedAt=1754729675615",
    linkedin: "https://www.linkedin.com/in/kanishk-chaudhary-917731278/",
  },
  {
    name: "HANSIKHA V",
    role: "Head Of Events & Marketing Head",
    img: "https://ik.imagekit.io/96gea10vb/images/webp/Hansikha.webp?updatedAt=1747321661900",
    linkedin: "https://www.linkedin.com/in/hansikha-venkatesh-6733a7225/",
  },
  {
    name: "CAROL DSILVA",
    role: "Head Of Design & Media",
    img: "https://ik.imagekit.io/es6xialea/CAROL%20DSILVA_w_vU-4aXI?updatedAt=1754729990685",
    linkedin: "https://www.linkedin.com/in/caroldsillva/",
  },
];

function Heads() {
  const CARD_WIDTH = 280;
  const ANIMATION_DURATION = 20; // seconds

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-lg bg-background">
      {/* Background grid */}
      <InteractiveGridPattern
        className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] absolute inset-0 z-0"
        width={40}
        height={40}
        squares={[80, 80]}
        squaresClassName="hover:fill-[#6D4DFE]"
      />

      <div className="flex relative z-10 items-center w-full h-full">
        {/* Fixed text */}
        <div className="flex flex-col gap-4 justify-center items-start ml-12 text-6xl font-black text-black min-w-[270px]">
          <h1 className="bg-[#ffffff] w-44 p-2 text-center">MEET</h1>
          <h1 className="bg-[#ffffff] w-40 p-2 text-center">OUR</h1>
          <h1 className="bg-[#6D4DFE] w-60 p-2 text-white text-center">
            HEADS
          </h1>
        </div>

        {/* Moving cards */}
        <div className="flex overflow-hidden relative flex-1 items-center h-full">
          <div className="w-full h-[420px] flex items-center relative">
            <div
              className="flex gap-12 select-none heads-infinite-scroll"
              style={{
                width: `${heads.length * CARD_WIDTH * 2}px`,
              }}
            >
              {[...heads, ...heads].map((head, idx) => (
                <div
                  key={idx}
                  className="relative group w-[280px] h-[340px] rounded-3xl bg-gradient-to-br from-[#FFAB76] via-[#FFD6A5] to-[#6D4DFE] p-1 shadow-2xl overflow-hidden transition-transform transform flex-shrink-0 hover:scale-105 hover:shadow-3xl duration-300"
                >
                  <div className="flex overflow-hidden relative flex-col w-full h-full rounded-2xl bg-white/90">
                    {/* Image */}
                    <div className="relative w-full h-[62%] flex items-center justify-center overflow-hidden rounded-t-2xl">
                      <img
                        src={head.img}
                        alt={head.name}
                        width={280}
                        height={210}
                        loading="lazy"
                        className="object-cover w-full h-full rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t to-transparent rounded-t-2xl opacity-70 pointer-events-none from-black/40" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center items-center px-4 py-5 w-full h-[38%] rounded-b-2xl bg-white/80 backdrop-blur-md relative">
                      <h2 className="text-xl font-extrabold tracking-wide text-center text-gray-800 drop-shadow-sm">
                        {head.name}
                      </h2>
                      <p className="mt-1 mb-2 text-sm font-medium text-center text-gray-600">
                        {head.role}
                      </p>

                      {/* LinkedIn */}
                      {head.linkedin && (
                        <a
                          href={head.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex items-center justify-center text-[#0A66C2] hover:text-[#004182] transition-colors"
                          aria-label={`LinkedIn profile of ${head.name}`}
                        >
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow hover:bg-[#eaf4fb] transition-all border border-[#0A66C2]">
                            <Linkedin size={22} />
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Floating gradient blob */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#6D4DFE]/60 to-[#FFAB76]/60 rounded-full blur-2xl opacity-60 pointer-events-none z-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smooth animation */}
          <style>
            {`
              .heads-infinite-scroll {
                animation: heads-infinite-scroll-keyframes ${ANIMATION_DURATION}s linear infinite;
                will-change: transform;
              }
              .heads-infinite-scroll:hover {
                animation-play-state: paused;
              }
              @keyframes heads-infinite-scroll-keyframes {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-${heads.length * CARD_WIDTH}px, 0, 0); }
              }
              /* Mobile fix */
              @media (max-width: 1024px) {
                .w-72 { width: 220px !important; }
                .h-\\[420px\\] { height: 300px !important; }
              }
              /* Custom shadow for card hover */
              .shadow-3xl {
                box-shadow: 0 8px 32px 0 rgba(109,77,254,0.18), 0 1.5px 8px 0 rgba(255,171,118,0.12);
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}

export default Heads;
