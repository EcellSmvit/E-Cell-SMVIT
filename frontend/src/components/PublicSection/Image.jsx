import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: "https://ik.imagekit.io/es6xialea/IMG_2510.JPG?updatedAt=1754758464033",
    title: "OUR MISSION",
    desc: "Our mission is to create a self-sustaining campus hub that fosters entrepreneurship by connecting students with industry experts, understanding market demands, and providing hands-on training to launch start-ups seamlessly.",
  },
  {
    src: "https://ik.imagekit.io/96gea10vb/Gallery%20Images/ideaExpo-11.avif?updatedAt=1747310806941",
    title: "OUR VISION",
    desc: "Our vision is to create a self-sustaining club that supports entrepreneurs through workshops, innovation labs, and networking opportunities like ideathons and hackathons. We aim to host an annual E-Summit, building partnerships, generating revenue, and showcasing our ability to manage large-scale projects.",
  },
  {
    src: "https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-7.avif?updatedAt=1747310803549",
    title: "E-Summit 2024",
    desc: "Annual Entrepreneurship Summit",
  },
]

export default function ImageSection() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef(null)
  const leftRef = useRef(null)
  const middleRef = useRef(null)
  const rightRef = useRef(null)
  const buttonRef = useRef(null)
  const cardRef = useRef(null) 

  const getIndices = (idx) => {
    const total = images.length
    return [
      (idx - 1 + total) % total,
      idx,
      (idx + 1) % total,
    ]
  }

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { width: '0%' })
      gsap.set(rightRef.current, { width: '0%' })
      gsap.set(middleRef.current, { width: '100%' })
      gsap.set(cardRef.current, { opacity: 1 })
      gsap.set(buttonRef.current, { opacity: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: 2,
          pin: true,
          onUpdate: self => {
            const width = parseFloat(window.getComputedStyle(middleRef.current).width)
            const parentWidth = parseFloat(window.getComputedStyle(containerRef.current).width)
            const percent = width / parentWidth
            if (percent <= 0.5) {
              gsap.set(cardRef.current, { opacity: 0 })
              gsap.set(buttonRef.current, { opacity: 0 })
            } else {
              gsap.set(cardRef.current, { opacity: 1 })
              gsap.set(buttonRef.current, { opacity: 1 })
            }
          }
        }
      })

      tl.to(middleRef.current, { width: '33.33%', height: '33.33%', ease: 'power4.out' }, 0)
      tl.to(leftRef.current, { width: '33.33%', height: '33.33%', ease: 'power4.out' }, 0)
      tl.to(rightRef.current, { width: '33.34%', height: '33.33%', ease: 'power4.out' }, 0)

    }, containerRef)

    return () => ctx.revert()
  }, []) 

  const [leftIdx, middleIdx, rightIdx] = getIndices(current)

  return (
    <div className="relative bg-gradient-to-t to-[#6C4DFF] via-[#1f1c4d] from-black">
      <div ref={containerRef} className="flex overflow-hidden items-center p-6 w-full h-screen">
        <div
          ref={leftRef}
          className="overflow-hidden h-full"
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
            className="absolute right-1 top-1/2 z-30 w-14 h-14 text-2xl font-bold text-black rounded-full shadow-lg transition -translate-x-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            &gt;
          </button>

          <div
            ref={cardRef}
            className="absolute bottom-4 left-4 z-20 w-1/2 text-white rounded-lg drop-shadow-lg backdrop-blur-md bg-white/20"
          >
            <h1 className="px-4 py-2 text-3xl font-bold">{images[middleIdx].title}</h1>
            <p className="px-4 py-2 text-lg">{images[middleIdx].desc}</p>
          </div>
        </div>

        <div
          ref={rightRef}
          className="overflow-hidden h-full"
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
