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
        <div className='flex gap-4 justify-center items-center text-6xl font-black text-white'>
            <h1>WHY </h1>
            <h1 className='bg-[#6D4DFE] p-4'>E-CELL?</h1>
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

        <TextReveal 
   
    >
       E-Cell SMVIT  is the hub for innovation and entrepreneurship on campus. We empower students to transform ideas into impactful ventures through mentorship, workshops, competitions, and industry collaborations. Our mission is to nurture future leaders, foster a startup culture, and bridge the gap between students and the entrepreneurial ecosystem.
    </TextReveal>
    </div>
    
    
      
    </div>
    
    </div>
   
    
  )
}

export default WhyEcell