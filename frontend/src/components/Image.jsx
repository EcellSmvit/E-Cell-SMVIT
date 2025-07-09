import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: "https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-1.avif?updatedAt=1747310809335",
    title: "OUR MISSION",
    desc: "Our mission is to create a self-sustaining campus hub that fosters entrepreneurship by connecting students with industry experts, understanding market demands, and providing hands-on training to launch start-ups seamlessly.",
  },
  {
    src: "https://ik.imagekit.io/96gea10vb/Gallery%20Images/ideaExpo-11.avif?updatedAt=1747310806941",
    title: "OUR VISION",
    desc: "Our vision is to create a self-sustaining club that supports entrepreneurs through workshops, innovation labs, and networking opportunities like ideathons and hackathons. We aim to host an annual E-Summit, building partnerships, generating revenue, and showcasing our ability to manage large-scale projects. Additionally, we will offer micro-grant programs, on-campus incubators, and a strong alumni network for mentorship, investment, and partnerships to support ventures beyond campus.",
  },
  {
    src: "https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-7.avif?updatedAt=1747310803549",
    title: "E-Summit 2024",
    desc: "Annual Entrepreneurship Summit",
  },
]

function ImageSection() {
  const [current, setCurrent] = useState(0)
  const [buttonOpacity, setButtonOpacity] = useState(1)
  const [textOpacity, setTextOpacity] = useState(1)
  const containerRef = useRef(null)
  const leftRef = useRef(null)
  const middleRef = useRef(null)
  const rightRef = useRef(null)
  const buttonRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  const getIndices = (idx) => {
    const total = images.length
    return [
      (idx - 1 + total) % total, 
      idx,                       
      (idx + 1) % total          
    ]
  }

  
  useEffect(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
    }
    gsap.set(leftRef.current, { width: '0%', height: '100%' })
    gsap.set(rightRef.current, { width: '0%', height: '100%' })
    gsap.set(middleRef.current, { width: '100%', height: '100%', zIndex: 10 })
    gsap.set(buttonRef.current, { opacity: 1 })
    gsap.set(titleRef.current, { opacity: 1 })
    gsap.set(descRef.current, { opacity: 1 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top -5%',
        end: '+=1000',
        scrub: 2,
        pin: true,
        id: "image-section-scroll",
        onUpdate: (self) => {
          
          if (buttonRef.current) {
            const opacity = 1 - self.progress;
            gsap.set(buttonRef.current, { opacity });
            setButtonOpacity(opacity);
          }
          if (titleRef.current && descRef.current) {
            const opacity = 1 - self.progress;
            gsap.set(titleRef.current, { opacity });
            gsap.set(descRef.current, { opacity });
            setTextOpacity(opacity);
          }
        }
      }
    })

    tl.to(
      middleRef.current,
      { width: '33.33%', height: '33.33%', zIndex: 1, ease: 'power4.out' },
      0
    )
    tl.to(
      leftRef.current,
      { width: '33.33%', height: '33.33%', ease: 'power4.out' },
      0
    )
    tl.to(
      rightRef.current,
      { width: '33.34%', height: '33.33%', ease: 'power4.out' },
      0
    )

    
    tl.to(
      [buttonRef.current, titleRef.current, descRef.current],
      { opacity: 0, ease: 'power4.out' },
      0
    )

    scrollTriggerRef.current = tl.scrollTrigger

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [current])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
    
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const [leftIdx, middleIdx, rightIdx] = getIndices(current)

  return (
    <div
      className="relative bg-gradient-to-t to-[#6C4DFF] via-[#1f1c4d] from-black"
      
    >
      <div
        ref={containerRef}
        id="page6"
        className="box-border flex overflow-hidden items-center p-6 w-full h-screen"
      >
       
        <div
          ref={leftRef}
          className="overflow-hidden relative h-full text-white"
          style={{ flexShrink: 0 }}
        >
          <img
            src={images[leftIdx].src}
            alt=""
            className="object-cover p-4 w-full h-full"
          />
        </div>

       
        <div
          ref={middleRef}
          className="overflow-hidden relative h-full"
          style={{ flexShrink: 0, zIndex: 10 }}
        >
          <img
            src={images[middleIdx].src}
            alt=""
            className="object-cover p-4 w-full h-full"
          />
          <button
            ref={buttonRef}
            onClick={handleNext}
            className="flex absolute right-1 top-1/2 z-30 justify-center items-center w-14 h-14 text-2xl font-bold text-black rounded-full shadow-lg transition -translate-x-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            style={{ outline: 'none', opacity: buttonOpacity }}
          >
            &gt;
          </button>
          <div className="flex absolute bottom-4 left-4 z-20 flex-col items-start w-1/2 rounded-lg drop-shadow-lg backdrop-blur-md bg-white/20" style={{ opacity: textOpacity }}>
            <h1
              ref={titleRef}
              className="px-4 py-2 mb-2 text-3xl font-bold text-white"
              
            >
              {images[middleIdx].title}
            </h1>
            <p
              ref={descRef}
              className="px-4 py-2 mb-2 text-lg text-white"
              
            >
              {images[middleIdx].desc}
            </p>
          </div>
        </div>

      
        <div
          ref={rightRef}
          className="overflow-hidden relative h-full"
          style={{ flexShrink: 0 }}
        >
          <img
            src={images[rightIdx].src}
            alt=""
            className="object-cover p-4 w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default ImageSection
