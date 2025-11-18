import React from 'react'
import Background from './Background';
import Firstsection from './Firstsection';
import Sponser from './Sponser';
import Prizepool from './Prizepool';
import Eventdetails from './Eventdetails';
import Footer from './Footer';
import About from './About';
import Faq from './Faq';
import Timeline from './Timeline';


function Landingpage() {
  return (
    <div className="w-full h-full">
        <Firstsection/>
        <Background/>
        <Timeline/>
        <Eventdetails/>
        <Prizepool/>
        <About/>
        <Sponser/>
        <Faq/>
        <Footer/>
      <div className="fixed right-5 bottom-5 w-48 h-10 bg-black rounded shadow-lg text-white flex items-center justify-center z-20">
        Made by E-CELL with ❤️
      </div>
    </div>
  )
}

export default Landingpage