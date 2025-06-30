import React from 'react'
// import ScrollVelocity from './ScrollVelocity';
import ScrollVelocity from './ScrollVelocity'

function Section4() {
    const velocity = 100;
  return (
    <div className="bg-[#4F46E5]">
      <ScrollVelocity
        texts={['ENTREPRENEURSHIP', 'E-CELL SMVIT']}
        velocity={ velocity}
        className="custom-scroll-text"
      />
    </div>

  )
}

export default Section4