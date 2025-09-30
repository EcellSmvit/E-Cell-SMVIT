import React from 'react'

// import About from '../components/PublicSection/About'
// import Background from '../components/PublicSection/Background';
import Navbar from '../components/PublicSection/Navbar'
import ThreeScene from '../components/PublicSection/ThreeScene';
import Section2 from '../components/PublicSection/Section2';
import Section6 from '../components/PublicSection/Section6';
import Text from '@/components/PublicSection/Text';
import InfinityComponent from '@/components/PublicSection/Infinity';
import Footer from '@/components/PublicSection/Footer';
import Heads from '@/components/PublicSection/Heads';
import StartupBacked from '@/components/PublicSection/StartupBacked';
import OurMissionandVision from '@/components/PublicSection/OurMissionandVision';
import WhyEcell from '@/components/PublicSection/WhyEcell';
import Stepperform from './Stepperform';
import { SignedIn } from '@clerk/clerk-react';



function Home() {
  return (
    <div>     
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}>
        <Navbar />
      </div>
      <ThreeScene />
      <InfinityComponent/>
      <Text/>
      <Section2/>
      <OurMissionandVision/>
      <StartupBacked/>
      <Heads/>
      <WhyEcell/>
      <Section6/>
      <Footer/>
      <SignedIn>
        <Stepperform/>
      </SignedIn>
    </div>
    
  )
}

export default Home
