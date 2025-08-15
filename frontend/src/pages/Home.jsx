import React from 'react'

import About from '../components/PublicSection/About'
import Background from '../components/PublicSection/Background';
import Navbar from '../components/PublicSection/Navbar'
// import Particles from './components/Particlesbackground';
import TextHome from '../components/PublicSection/TextHome';
import ThreeScene from '../components/PublicSection/ThreeScene';
import Section2 from '../components/PublicSection/Section2';
import AchievementSection from '../components/PublicSection/AchievementSection';
import Section5 from '../components/PublicSection/Section5';
import Section6 from '../components/PublicSection/Section6';
import ImageSection from '@/components/PublicSection/Image';
import Text from '@/components/PublicSection/Text';
import InfinityComponent from '@/components/PublicSection/Infinity';
import Footer from '@/components/PublicSection/Footer';
import AchievementMobile from '@/components/ResponsiveComponent/AchievementMobile';
import AboutMobile from '@/components/ResponsiveComponent/AboutMobile';
import Gallery from '@/components/PublicSection/Gallery';
import Events from '@/components/PublicSection/Events';
// import Heads from '@/components/PublicSection/Heads';



function Home() {
  return (
    <div>     
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}>
        <Navbar />
      </div>
      {/* <TextHome/> */}
      {/* <Background/> */}
      <ThreeScene />
      {/* <Heads/> */}
      <InfinityComponent/>
      <Text/>
      <Section2/>
      
      {/* <Gallery/> */}
      <div className="hidden sm:block">
        <ImageSection/>
      </div>
      <div className="block sm:hidden">
        <AboutMobile/>
      </div>
      
      <div className="hidden sm:block">
        <AchievementSection/>
      </div>
      <div className="block sm:hidden">
        <AchievementMobile/>
      </div>
      <Section5/>
      <About/>
      
      {/* <Events/> */}
      <Section6/>
      <Footer/>
    </div>
    
  )
}

export default Home
