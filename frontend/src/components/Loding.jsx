import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loding = ({ onComplete }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const videos = document.querySelectorAll("#page1 video");
    const videoTimeline = gsap.timeline();

    // Slide videos up
    videos.forEach((video, i) => {
      videoTimeline.to(
        video,
        {
          y: -900,
          duration: 2,
          delay: 1,
          ease: "power2.out",
        },
        i * 0.5
      );
    });

    // Fade out the loader
    videoTimeline.to(pageRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // After small delay, remove loader completely
    videoTimeline.call(() => {
      onComplete();
    });
  }, [onComplete]);

  return (
    <div id='main' className="relative">
      <div
        ref={pageRef}
        id="page1"
        className='w-full h-screen fixed z-[99999] top-0 left-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000'
      >
        <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/jwt52yyie/match-cut%20(online-video-cutter.com).mp4?updatedAt=1751284289979"></video>
        <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/jwt52yyie/match-cut%20(online-video-cutter.com)%20(1).mp4?updatedAt=1751284289986"></video>
        <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/jwt52yyie/match-cut%20(online-video-cutter.com)%20(2).mp4?updatedAt=1751284289853"></video>
        <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/jwt52yyie/match-cut%20(online-video-cutter.com)%20(3).mp4?updatedAt=1751284290111"></video>
        <video autoPlay muted loop className='w-full h-full object-cover' src="https://ik.imagekit.io/jwt52yyie/match-cut%20(online-video-cutter.com)%20(4).mp4?updatedAt=1751284289968"></video>
      </div>
    </div>
  );
};

export default Loding;
