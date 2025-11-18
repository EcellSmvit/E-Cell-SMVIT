import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function NewMeetOurTeam() {
  const textRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      gsap.to(textRef.current, {
        y: scrollY * 0.25,
        ease: "power1.out",
        duration: 0.5,
      })
      gsap.to(imgRef.current, {
        y: scrollY * 0.40,
        ease: "power1.out",
        duration: 0.5,
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
        <div className='bg-[#CDC6C3] w-screen h-[105vh] relative'>
            <h1
              ref={textRef}
              className='text-[15rem] font-medium text-[#EAEAEA] flex items-center justify-center'
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              MEET THE TEAM
            </h1>
            <img 
              ref={imgRef}
              className='absolute left-0 top-36'
              src="https://ik.imagekit.io/es6xialea/DSC_0255%20(1).png?updatedAt=1763185452961"
              alt=""
            />
        </div>
        <div className='bg-[#CDC6C3] w-screen h-[100vh] relative'>

        </div>
    </div>
  )
}

export default NewMeetOurTeam