import React from 'react'
import { TextReveal } from "../magicui/text-reveal";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import  CircularGallery  from "@/components/ui/Components/CircularGallery/CircularGallery"

function WhyEcell() {
  return (
    
    <div>
        <div className="flex overflow-hidden relative justify-center items-center p-20 rounded-lg border size-full bg-background">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
      <div>
        <div className="flex flex-wrap gap-2 justify-center items-center text-3xl font-black text-white sm:gap-4 sm:text-5xl md:text-6xl">
            <h1>WHY</h1>
            <h1 className="bg-[#6D4DFE] px-3 py-2 sm:px-4 sm:py-4 rounded-md">E-CELL?</h1>
        </div>
        <div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery
   bend={0} 
   textColor="#ffffff" 
   borderRadius={0.05} 
   scrollEase={0.02}
   scrollSpeed={4}
   />
</div>

        <TextReveal>
       E-Cell SMVIT is the campus hub for innovation and entrepreneurship. We help students turn ideas into real ventures through mentorship, events, and industry connections—nurturing future leaders and a strong startup culture.
    </TextReveal>
    </div>
    
    
      
    </div>
    
    </div>
   
    
  )
}

export default WhyEcell