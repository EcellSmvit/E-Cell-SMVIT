import React from 'react'
import Particles from './Particlesbackground'

function Background() {
  return (
    <div>
        <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#000000' }}>
  <Particles
    particleColors={['#ffffff', '#6D4DFE']}
    particleCount={600}
    particleSpread={10}
    speed={0.2}
    particleBaseSize={100}
    moveParticlesOnHover={false}
    alphaParticles={false}
    disableRotation={false}
  />
</div>

    </div>
  )
}

export default Background