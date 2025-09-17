import React from 'react'
import { SparklesText } from "../components/magicui/sparkles-text";
import { Highlighter } from "../components/magicui/highlighter";
import { cn } from "../lib/utils";
import { GridPattern } from "../components/magicui/grid-pattern";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import ThreeScene from '@/components/PublicSection/ThreeScene';
import Ecell3dLogo from '@/components/Ecell3dLogo';

function Recruitment() {
  return (
    <div className="flex overflow-hidden relative items-center size-full bg-background">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] ",
        )}
      />

      {/* Left Section (Text) */}
      <div className="p-8 w-2/3 relative z-10">
        <div>
          <img
            src="https://www.ecellsmvit.in/images/ecellwhite.png"
            alt=""
            className="p-4 w-20"
          />
        </div>
        <div className="p-4 text-6xl font-black text-white">
          <h1 className="flex gap-2 justify-start items-center">
            <SparklesText>Welcome To</SparklesText>
            <span className="bg-[#6D4DFE] px-2">E-CELL SMVIT</span>
          </h1>
          <h1>Recruitment Process</h1>
        </div>
        <div className="text-white">
          <div className="p-4 text-3xl font-black text-white">
            <Highlighter action="underline" color="#FF9800">
              Why E-Cell Smvit?
            </Highlighter>
            <p className="pt-3 w-4/5 text-xl font-medium text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Reiciendis atque possimus temporibus, quam neque ex fuga 
              reprehenderit repudiandae ipsa labore. Lorem ipsum dolor sit 
              amet consectetur adipisicing elit. Doloremque aspernatur rerum 
              quibusdam harum minima voluptates hic aut tempore maxime 
              repudiandae? Lorem ipsum, dolor sit amet consectetur 
              adipisicing elit. Quo voluptas harum modi ducimus ratione nulla 
              ad expedita quasi eos deserunt?
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (3D Logo - Centered & Large) */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 z-0">
        <div className="w-[500px] h-[500px]">
          <Ecell3dLogo />
        </div>
      </div>

      {/* Next Button */}
      <div className="fixed right-8 bottom-8 z-[100]">
        <InteractiveHoverButton className="!bg-[#6D4DFE] !text-white !shadow-lg !border-2 !border-white">
          Next
        </InteractiveHoverButton>
      </div>
    </div>
  )
}

export default Recruitment
