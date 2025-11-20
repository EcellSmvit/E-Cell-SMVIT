import React from 'react'

function Sponser() {
  return (
    <div
      className="w-[100vw] h-[50vh] flex items-center justify-center flex-col gap-10 relative z-10 pointer-events-none"
    >
      <h1 className="font-black text-5xl p-4 text-white">
        POWERED BY
      </h1>
      <img className='w-52' src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo-white.svg" alt="Unstop Logo" />
    </div>
  )
}

export default Sponser