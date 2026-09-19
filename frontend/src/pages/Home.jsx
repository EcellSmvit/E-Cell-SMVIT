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
import Cohead from '@/components/PublicSection/Cohead';
// import OurMissionandVisionpart from '@/components/PublicSection/OurMissionandVisionpart';



function Home() {
  return (
    <div>     
      <ThreeScene />
      <InfinityComponent/>
      <Text/>
      <Section2/>
      <OurMissionandVision/>
      <StartupBacked/>
      <Heads/>
      <Cohead/>
      <WhyEcell/>
      <Section6/>
      <Footer/>
    </div>
    
  )
}

export default Home
