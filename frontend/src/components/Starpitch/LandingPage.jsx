import React from 'react'
import Background from './Background';
import Firstsection from './Firstsection';
import Sponser from './Sponser';
import Prizepool from './Prizepool';
import Eventdetails from './Eventdetails';
import Footer from './Footer';
import About from './About';
import Faq from './Faq';
import TimelineTwo from './TimeLineTwo';


function Landingpage() {
  return (
    <div className="w-full h-full">
        <Firstsection/>
        <Background/>
        <TimelineTwo/>
        <Eventdetails/>
        <Prizepool/>
        <About/>
        <Sponser/>
        <Faq/>
        <Footer/>
      <div className="flex fixed right-5 bottom-5 z-20 justify-center items-center w-48 h-10 text-white bg-blue-700 rounded shadow-lg">
        Made by E-CELL with ❤️
      </div>
    </div>
  )
}

export default Landingpage