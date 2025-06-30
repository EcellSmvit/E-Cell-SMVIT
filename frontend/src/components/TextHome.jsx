import React from 'react'
import BlurText from "./BlurText";


function TextHome() {
    const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

  return (
    <div className='absolute z-20 font-black transform -translate-x-1/2 left-1/2 bottom-20'>
        

<BlurText
  text="WHERE ASPIRATION MEETS OPPORTUNITY"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="mb-8 text-2xl text-white"
/>
    </div>
  )
}

export default TextHome