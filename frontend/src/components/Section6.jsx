import React from 'react'
import Section4 from './Section4'

const ShinyText = ({ children, className = "" }) => (
  <span
    className={`inline-block relative shiny-text ${className}`}
    style={{
      background: 'linear-gradient(90deg, #fff 20%, #6C4DFF 40%, #fff 60%)',
      backgroundSize: '200% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'shine 2.5s linear infinite',
      fontWeight: 'inherit',
    }}
  >
    {children}
    <style>
      {`
        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}
    </style>
  </span>
);

function Section6() {
  return (
    <div id='page4' className='w-[100%] h-[100vh] bg-gradient-to-br to-black via-black from-[#6C4DFF] flex flex-col items-center py-10'>
        <h1 className='p-2 mb-8 text-5xl font-extrabold tracking-wide text-center text-white drop-shadow-lg'>
          CONTACT <span className="text-[#6C4DFF]">US</span>
        </h1>
        <div className='flex gap-24 justify-center w-full max-w-6xl items-centre'>
            <div className="flex flex-1 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white drop-shadow">
                  <ShinyText>Let's Connect!</ShinyText>
                </h2>
                <p className="max-w-lg text-2xl font-medium leading-relaxed text-white/80">
                  Have questions, ideas, or want to collaborate with <span className="text-[#6C4DFF] font-semibold"><ShinyText>E-CELL SMVIT</ShinyText></span>? <br />
                  Reach out to us and our team will get back to you as soon as possible.<br /><br />
                  <span className="italic text-white/60"><ShinyText>We love hearing from passionate entrepreneurs, students, and partners!</ShinyText></span>
                </p>
              </div>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="p-8 space-y-6 w-full max-w-md rounded-2xl border shadow-2xl backdrop-blur-lg bg-white/10 border-white/20">
                  
                  
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] font-medium"
                  />
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#6C4DFF] resize-none font-medium"
                  ></textarea>

                  <button className="w-full py-3 rounded-xl bg-[#6C4DFF] text-white font-semibold hover:bg-[#4E46E4] transition duration-300 shadow-lg tracking-wide text-lg">
                    Send Message
                  </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Section6