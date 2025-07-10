import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Text() {
  const h1Ref = useRef(null)
  const pRef = useRef(null)
  const containerRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    gsap.set([h1Ref.current, pRef.current], { y: 50, opacity: 0 })
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%', 
        toggleActions: 'play none none none',
      }
    })
    tlRef.current.to(h1Ref.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    })
    tlRef.current.to(pRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.7") 

    return () => {
      if (tlRef.current) {
        tlRef.current.scrollTrigger && tlRef.current.scrollTrigger.kill()
        tlRef.current.kill()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className='flex flex-col gap-4 justify-center items-center p-4'
    >
      <h1
        ref={h1Ref}
        className='text-6xl text-center text-[#4F45E0]'
      >
        Our purpose is to empower dreams 
        & <br />build a culture of innovation.
      </h1> 

      <p
        ref={pRef}
        className='w-1/2 text-xl text-center text-white'
      >
        E-Cell SMVIT is committed to fostering entrepreneurial spirit,  nurturing innovative minds,  and creating a dynamic ecosystem  where students transform ideas into impactful ventures.  For years, we've been empowering changemakers and redefining  what's possible. 
        Explore our Purpose & Vision, Journey, and more.
      </p>
    </div>
  )
}

export default Text