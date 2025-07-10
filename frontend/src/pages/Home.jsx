import React from 'react'

import About from '../components/About'
import Background from '../components/Background';
import Navbar from '../components/Navbar'
// import Particles from './components/Particlesbackground';
import TextHome from '../components/TextHome';
import ThreeScene from '../components/ThreeScene';
import Section2 from '../components/Section2';
import Section3 from '../components/Section3';
// import Loding from './components/Loding';
// import Section4 from './components/Section4';
import AchievementSection from '../components/AchievementSection';
import Section5 from '../components/Section5';
import Section6 from '../components/Section6';
import ImageSection from '@/components/Image';
import Text from '@/components/Text';
import InfinityComponent from '@/components/Infinity';
import Footer from '@/components/Footer';
// import Section6 from './components/Section6';



function Home() {
  return (
    <div>
      <Navbar/>
      <TextHome/>
      <Background/>
      <ThreeScene />
      <InfinityComponent/>
      <Text/>
      <Section2/>
      <ImageSection/>
      <AchievementSection/>
      <Section5/>
      <About/>
      <Section6/>
      <Footer/>
    </div>
    
  )
}

export default Home
