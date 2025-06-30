import React from 'react'
import Particles from './Particlesbackground'

function Background() {
  return (
    <div>
        <div style={{ width: '100%', height: '100vh', position: 'relative' ,background: 'linear-gradient(145deg, #4F46E5 0%, #000 30%, #000 100%)'}}>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={400}
    particleSpread={10}
    speed={0.2}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
</div>

    </div>
  )
}

export default Background