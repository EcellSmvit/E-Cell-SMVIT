import React, { useState, useEffect } from 'react'
import BlurText from "./BlurText";

function TextHome() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className="absolute z-20 font-black left-1/2 bottom-20 w-[90vw] max-w-3xl text-center px-4 flex justify-center items-center transform -translate-x-1/2">
      {showText && (
        <BlurText
          text="WHERE ASPIRATION MEETS OPPORTUNITY"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="flex justify-center items-center mb-8 text-sm text-center text-white sm:text-xl md:text-2xl lg:text-3xl"
        />
      )}
    </div>
  );
}

export default TextHome