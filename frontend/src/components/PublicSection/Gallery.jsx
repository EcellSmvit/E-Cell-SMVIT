
import React, { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

function Gallery() {
    const scrollRef = useRef(null)
    const locoScroll = useRef(null)
  
    useEffect(() => {
      if (scrollRef.current) {
        locoScroll.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          lerp: 0.08,
          multiplier: 1,
          smartphone: { smooth: true },
          tablet: { smooth: true },
        })
      }
  
      const handleResize = () => {
        locoScroll.current && locoScroll.current.update()
      }
      window.addEventListener('resize', handleResize)
  
      return () => {
        if (locoScroll.current) locoScroll.current.destroy()
        window.removeEventListener('resize', handleResize)
      }
    }, [])
  return (
    <div ref={scrollRef} data-scroll-container>
      
      <section
        data-scroll
        className="flex justify-center items-center h-screen bg-red-300"
      >
        <h1 className="text-4xl font-bold">Section 2</h1>
      </section>




      
      <section
        data-scroll
        className="flex flex-col gap-4 justify-center items-center p-4 w-full h-auto"
        style={{
          background: "radial-gradient(circle at 50% 50%, #6D4DFE 0%, #000 100%)"
        }}
      >
        <div className="flex gap-4 justify-center items-center w-full h-full" data-scroll data-scroll-speed="-1" data-scroll-direction="horizontal">
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-6.avif?updatedAt=1747310815791"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-5.avif?updatedAt=1747310814547"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/ideaExpo-11.avif?updatedAt=1747310806941"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-7.avif?updatedAt=1747310803549"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/ideaExpo-1.avif?updatedAt=1747310803817"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-8.avif?updatedAt=1747310803058"
              alt=""
            />
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center w-full h-full" data-scroll data-scroll-speed="1" data-scroll-direction="horizontal">
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-4.avif?updatedAt=1747310815104"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/NEC%20IIT%20Bombay-7.avif?updatedAt=1747310815568"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-9.avif?updatedAt=1747310803115"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-2.avif?updatedAt=1747310803896"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/ideaExpo-1.avif?updatedAt=1747310803817"
              alt=""
            />
          </div>
          <div data-scroll>
            <img
              className="object-cover w-96 h-40 rounded-lg"
              src="https://ik.imagekit.io/96gea10vb/Gallery%20Images/esummit24-8.avif?updatedAt=1747310803058"
              alt=""
            />
          </div>
        </div>
      </section>





      
      <section
        data-scroll
        className="flex justify-center items-center h-screen bg-green-300"
      >
        <h1 className="text-4xl font-bold">Section 3</h1>
      </section>
    </div>
  )
}

export default Gallery